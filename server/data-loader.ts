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

let clientsCache: Client[] | null = null;

export function loadClients(): Client[] {
  if (clientsCache) {
    return clientsCache;
  }

  const dataPath = path.join(__dirname, 'api_rag', 'data', 'row_cards.jsonl');
  const fileContent = fs.readFileSync(dataPath, 'utf-8');
  
  const clients: Client[] = [];
  const lines = fileContent.split('\n').filter(line => line.trim());
  
  for (const line of lines) {
    try {
      const client = JSON.parse(line);
      clients.push(client);
    } catch (error) {
      console.error('Error parsing client line:', error);
    }
  }
  
  clientsCache = clients;
  console.log(`✓ Loaded ${clients.length} clients from row_cards.jsonl`);
  
  return clients;
}

export function getClientById(id: string): Client | undefined {
  const clients = loadClients();
  return clients.find(c => c.cliente_id === id);
}

export function getClientStats() {
  const clients = loadClients();
  
  const sectorPublico = clients.filter(c => c.perfil.sector_publico_flag === 1).length;
  const sectorPrivado = clients.length - sectorPublico;
  
  const mujeres = clients.filter(c => c.perfil.sexo === 'FEMENINO').length;
  const hombres = clients.length - mujeres;
  
  const edadPromedio = clients.reduce((sum, c) => sum + c.perfil.edad, 0) / clients.length;
  const ingresoPromedio = clients.reduce((sum, c) => sum + c.perfil.ingreso, 0) / clients.length;
  
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
