import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ClientProfile {
  sexo: string;
  edad: number;
  ingreso: number;
  antiguedad_laboral: number;
  sector_publico_flag: number;
}

export interface Client {
  cliente_id: string;
  perfil: ClientProfile;
  resumen: string;
  fuente: string;
  data_quality: string[];
}

export interface ClientStats {
  total: number;
  sectorPublico: number;
  sectorPrivado: number;
  mujeres: number;
  hombres: number;
  edadPromedio: number;
  ingresoPromedio: number;
}

// Cache en memoria para evitar lecturas repetidas del archivo
let clientsCache: Client[] | null = null;

/**
 * Carga todos los clientes desde el archivo JSONL
 * Usa caché en memoria para mejorar el rendimiento
 * @returns Array de clientes
 */
export function loadClients(): Client[] {
  // Retornar cache si existe
  if (clientsCache) {
    return clientsCache;
  }

  try {
    const dataPath = path.join(__dirname, 'api_rag', 'data', 'row_cards.jsonl');
    
    // Verificar que el archivo existe
    if (!fs.existsSync(dataPath)) {
      console.warn(`⚠️  Archivo de clientes no encontrado: ${dataPath}`);
      return [];
    }
    
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    const lines = fileContent.split('\n').filter(line => line.trim());
    
    const clients: Client[] = [];
    let errorCount = 0;
    
    for (const line of lines) {
      try {
        const client = JSON.parse(line);
        // Validación básica de estructura
        if (client.cliente_id && client.perfil) {
          clients.push(client);
        } else {
          errorCount++;
        }
      } catch (error) {
        errorCount++;
      }
    }
    
    if (errorCount > 0) {
      console.warn(`⚠️  ${errorCount} líneas con errores omitidas`);
    }
    
    clientsCache = clients;
    console.log(`✓ Cargados ${clients.length} clientes desde row_cards.jsonl`);
    
    return clients;
  } catch (error) {
    console.error('❌ Error cargando clientes:', error);
    return [];
  }
}

/**
 * Busca un cliente por su ID
 * @param id - ID del cliente
 * @returns Cliente encontrado o undefined
 */
export function getClientById(id: string): Client | undefined {
  if (!id || typeof id !== 'string') {
    return undefined;
  }
  
  const clients = loadClients();
  return clients.find(c => c.cliente_id === id);
}

/**
 * Calcula estadísticas agregadas de todos los clientes
 * @returns Objeto con estadísticas
 */
export function getClientStats(): ClientStats {
  const clients = loadClients();
  
  if (clients.length === 0) {
    return {
      total: 0,
      sectorPublico: 0,
      sectorPrivado: 0,
      mujeres: 0,
      hombres: 0,
      edadPromedio: 0,
      ingresoPromedio: 0
    };
  }
  
  const sectorPublico = clients.filter(c => c.perfil.sector_publico_flag === 1).length;
  const sectorPrivado = clients.length - sectorPublico;
  
  const mujeres = clients.filter(c => c.perfil.sexo === 'FEMENINO').length;
  const hombres = clients.length - mujeres;
  
  const edadPromedio = clients.reduce((sum, c) => sum + (c.perfil.edad || 0), 0) / clients.length;
  const ingresoPromedio = clients.reduce((sum, c) => sum + (c.perfil.ingreso || 0), 0) / clients.length;
  
  return {
    total: clients.length,
    sectorPublico,
    sectorPrivado,
    mujeres,
    hombres,
    edadPromedio: Math.round(edadPromedio),
    ingresoPromedio: Math.round(ingresoPromedio)
  };
}

/**
 * Limpia el caché de clientes
 * Útil para forzar recarga de datos
 */
export function clearClientsCache(): void {
  clientsCache = null;
}
