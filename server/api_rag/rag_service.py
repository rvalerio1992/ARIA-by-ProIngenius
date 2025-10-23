"""
Servicio RAG (Retrieval-Augmented Generation) para consultas sobre clientes.
Usa ChromaDB + OpenAI embeddings para búsqueda semántica sobre row_cards.jsonl
"""
import json
import os
from pathlib import Path
from typing import List, Dict, Any
import chromadb
from chromadb.config import Settings
from openai import OpenAI

class RAGService:
    def __init__(
        self, 
        data_dir: str = "data",
        chroma_dir: str = "rag_cartera",
        openai_api_key: str = None
    ):
        self.data_dir = Path(__file__).parent / data_dir
        self.chroma_dir = Path(__file__).parent / chroma_dir
        
        # Configurar cliente OpenAI
        self.openai_api_key = openai_api_key or os.getenv("AI_INTEGRATIONS_OPENAI_API_KEY")
        if not self.openai_api_key:
            raise ValueError("OPENAI_API_KEY no encontrada. Configura AI_INTEGRATIONS_OPENAI_API_KEY en Secrets")
        
        self.openai_client = OpenAI(api_key=self.openai_api_key)
        
        # Configurar ChromaDB persistente
        self.chroma_client = chromadb.PersistentClient(
            path=str(self.chroma_dir),
            settings=Settings(anonymized_telemetry=False)
        )
        
        # Nombre de la colección
        self.collection_name = "clientes_cartera"
        
        # Cargar o crear colección
        self.collection = self._get_or_create_collection()
        
        # Indexar si es necesario
        self._ensure_indexed()
    
    def _get_or_create_collection(self):
        """Obtiene la colección existente o crea una nueva"""
        try:
            # Intentar obtener colección existente
            collection = self.chroma_client.get_collection(name=self.collection_name)
            print(f"✓ Colección '{self.collection_name}' encontrada")
            return collection
        except Exception:
            # Crear nueva colección
            print(f"→ Creando colección '{self.collection_name}'...")
            return self.chroma_client.create_collection(
                name=self.collection_name,
                metadata={"description": "Resúmenes de clientes bancarios para RAG"}
            )
    
    def _load_row_cards(self) -> List[Dict]:
        """Carga todos los row_cards desde el archivo JSONL"""
        row_cards = []
        jsonl_path = self.data_dir / "row_cards.jsonl"
        
        with open(jsonl_path, 'r', encoding='utf-8') as f:
            for line in f:
                if line.strip():
                    row_cards.append(json.loads(line))
        
        return row_cards
    
    def _ensure_indexed(self):
        """Asegura que los row_cards estén indexados en ChromaDB"""
        # Verificar si ya hay documentos
        count = self.collection.count()
        
        if count > 0:
            print(f"✓ Colección ya indexada con {count} documentos")
            return
        
        print("→ Indexando row_cards.jsonl...")
        row_cards = self._load_row_cards()
        
        # Preparar datos para indexación por lotes
        ids = []
        documents = []
        metadatas = []
        
        for card in row_cards:
            ids.append(card['cliente_id'])
            documents.append(card['resumen'])
            
            # Metadata útil para filtrado
            metadata = {
                "cliente_id": card['cliente_id'],
                "sexo": card['perfil'].get('sexo', 'UNKNOWN'),
                "edad": card['perfil'].get('edad', 0),
                "ingreso": card['perfil'].get('ingreso', 0),
                "sector_publico": card['perfil'].get('sector_publico_flag', 0)
            }
            metadatas.append(metadata)
        
        # Indexar en lotes
        batch_size = 100
        total_batches = (len(ids) + batch_size - 1) // batch_size
        
        for i in range(0, len(ids), batch_size):
            batch_ids = ids[i:i+batch_size]
            batch_docs = documents[i:i+batch_size]
            batch_metas = metadatas[i:i+batch_size]
            
            # Generar embeddings con OpenAI
            embeddings = self._get_embeddings(batch_docs)
            
            # Agregar a ChromaDB
            self.collection.add(
                ids=batch_ids,
                documents=batch_docs,
                embeddings=embeddings,
                metadatas=batch_metas
            )
            
            batch_num = (i // batch_size) + 1
            print(f"  Lote {batch_num}/{total_batches} indexado ({len(batch_ids)} docs)")
        
        print(f"✓ Indexación completada: {len(ids)} clientes")
    
    def _get_embeddings(self, texts: List[str]) -> List[List[float]]:
        """Genera embeddings usando OpenAI text-embedding-3-small"""
        response = self.openai_client.embeddings.create(
            model="text-embedding-3-small",
            input=texts
        )
        return [item.embedding for item in response.data]
    
    def search(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        """
        Busca clientes relevantes usando RAG
        
        Args:
            query: Consulta en lenguaje natural
            top_k: Número de resultados a retornar
            
        Returns:
            Lista de matches con cliente_id, resumen, y metadata
        """
        # Generar embedding de la consulta
        query_embedding = self._get_embeddings([query])[0]
        
        # Buscar en ChromaDB
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k
        )
        
        # Formatear resultados
        matches = []
        for i in range(len(results['ids'][0])):
            match = {
                "cliente_id": results['ids'][0][i],
                "resumen": results['documents'][0][i],
                "metadata": results['metadatas'][0][i],
                "distance": results['distances'][0][i] if 'distances' in results else None
            }
            matches.append(match)
        
        return matches
    
    def ask_with_gpt(self, query: str, top_k: int = 5) -> Dict[str, Any]:
        """
        Responde una pregunta usando RAG + GPT-4
        
        Args:
            query: Pregunta sobre clientes
            top_k: Número de contextos a recuperar
            
        Returns:
            Dict con answer y matches utilizados
        """
        # Recuperar contexto relevante
        matches = self.search(query, top_k=top_k)
        
        # Construir prompt con contexto
        context = "\n\n".join([
            f"Cliente {m['cliente_id']}: {m['resumen']}"
            for m in matches
        ])
        
        system_prompt = """Eres un asistente bancario especializado. 
Responde SOLO basándote en la información de los clientes proporcionados.
Si no hay suficiente información, di "no disponible en los datos proporcionados".
Cita siempre los cliente_id cuando sea relevante.
Sé conciso y preciso."""
        
        user_prompt = f"""Contexto de clientes:
{context}

Pregunta: {query}

Responde basándote únicamente en el contexto proporcionado."""
        
        # Llamar a GPT-4
        response = self.openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.3,
            max_tokens=500
        )
        
        answer = response.choices[0].message.content
        
        return {
            "answer": answer,
            "matches": matches,
            "context_used": len(matches)
        }
    
    def get_stats(self) -> Dict[str, Any]:
        """Retorna estadísticas de la colección"""
        count = self.collection.count()
        return {
            "collection_name": self.collection_name,
            "total_documents": count,
            "status": "ready" if count > 0 else "empty"
        }
