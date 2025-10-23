"""
Servicio de métricas de cartera bancaria.
Calcula saldos (captaciones, colocaciones, neto) usando definiciones exactas de metrics_config.json
"""
import json
from pathlib import Path
from typing import Dict, List, Any

class MetricsService:
    def __init__(self, data_dir: str = "data"):
        self.data_dir = Path(__file__).parent / data_dir
        self.metrics_config = self._load_metrics_config()
        self.portfolio_totals = self._load_portfolio_totals()
        
    def _load_metrics_config(self) -> Dict:
        """Carga la configuración de métricas"""
        config_path = self.data_dir / "metrics_config.json"
        with open(config_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def _load_portfolio_totals(self) -> Dict:
        """Carga los totales del portafolio"""
        totals_path = self.data_dir / "portfolio_totals.json"
        with open(totals_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def get_saldo(self, tipo: str) -> Dict[str, Any]:
        """
        Calcula saldos según tipo (neto, captaciones, colocaciones)
        
        Args:
            tipo: Tipo de saldo ('neto', 'captaciones', 'colocaciones')
            
        Returns:
            Dict con tipo, valor en CRC, y columnas utilizadas
        """
        tipo = tipo.lower()
        
        if tipo not in ['neto', 'captaciones', 'colocaciones']:
            raise ValueError(f"Tipo inválido: {tipo}. Debe ser 'neto', 'captaciones' o 'colocaciones'")
        
        definitions = self.metrics_config['definitions']
        
        if tipo == 'captaciones':
            cols = definitions['captaciones']
            valor_crc = self.portfolio_totals['captaciones_total_crc']
            return {
                "tipo": "captaciones",
                "crc": round(valor_crc, 2),
                "cols": cols,
                "n_clientes": self.portfolio_totals['n_clientes']
            }
        
        elif tipo == 'colocaciones':
            cols = definitions['colocaciones']
            valor_crc = self.portfolio_totals['colocaciones_total_crc']
            return {
                "tipo": "colocaciones",
                "crc": round(valor_crc, 2),
                "cols": cols,
                "n_clientes": self.portfolio_totals['n_clientes']
            }
        
        elif tipo == 'neto':
            capt = self.portfolio_totals['captaciones_total_crc']
            colo = self.portfolio_totals['colocaciones_total_crc']
            neto = capt - colo
            return {
                "tipo": "neto",
                "crc": round(neto, 2),
                "formula": "captaciones - colocaciones",
                "captaciones_crc": round(capt, 2),
                "colocaciones_crc": round(colo, 2),
                "n_clientes": self.portfolio_totals['n_clientes']
            }
    
    def get_saldo_por_producto(self) -> Dict[str, Any]:
        """
        Retorna desglose detallado por columna/producto
        
        Returns:
            Dict con desglose de captaciones y colocaciones por columna
        """
        return {
            "captaciones": {
                "cols_detectadas": self.portfolio_totals['cols_pasivas_detectadas'],
                "definicion": self.metrics_config['definitions']['captaciones']
            },
            "colocaciones": {
                "cols_detectadas": self.portfolio_totals['cols_activas_detectadas'],
                "definicion": self.metrics_config['definitions']['colocaciones']
            },
            "n_clientes": self.portfolio_totals['n_clientes']
        }
    
    def get_totals_summary(self) -> Dict[str, Any]:
        """Retorna resumen completo de todos los totales"""
        return {
            "captaciones_crc": round(self.portfolio_totals['captaciones_total_crc'], 2),
            "colocaciones_crc": round(self.portfolio_totals['colocaciones_total_crc'], 2),
            "neto_crc": round(self.portfolio_totals['saldo_neto_crc'], 2),
            "n_clientes": self.portfolio_totals['n_clientes'],
            "cols_captaciones": self.metrics_config['definitions']['captaciones'],
            "cols_colocaciones": self.metrics_config['definitions']['colocaciones']
        }
