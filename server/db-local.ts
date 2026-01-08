/**
 * Base de datos local usando archivos JSON
 * Alternativa temporal a PostgreSQL para desarrollo rápido
 */

export interface LocalDB {
  clients: any[];
  metrics: any;
  initialized: boolean;
}

let localDB: LocalDB = {
  clients: [],
  metrics: {},
  initialized: false
};

/**
 * Inicializar base de datos local
 */
export function initLocalDB() {
  if (localDB.initialized) {
    return localDB;
  }

  console.log('📁 Usando base de datos local (archivos JSON)');
  console.log('   Para usar PostgreSQL, configura DATABASE_URL en .env');

  // Los datos se cargarán dinámicamente desde data-loader.ts
  localDB.initialized = true;

  return localDB;
}

/**
 * Obtener base de datos local
 */
export function getLocalDB() {
  if (!localDB.initialized) {
    initLocalDB();
  }
  return localDB;
}

/**
 * Mock del cliente de Drizzle para compatibilidad
 */
import { loadClients } from "./data-loader";

export const db = {
  select: (fields?: any) => ({
    from: (table?: any) => {
      // Return a "Thenable" which also has where/limit methods
      const queryBuilder = {
        where: () => queryBuilder, // chainable
        limit: (n: number) => queryBuilder, // chainable
        groupBy: () => queryBuilder, // chainable,
        // The magic: make it waitable
        then: (resolve: (value: any) => void) => {
          // Mock logic to return data based on what might be expected
          // For getGeneralStats, it expects an array with 1 object: [{ total: ..., edadPromedio: ... }]
          const clients = loadClients();
          const total = clients.length;
          const sectorPublico = clients.filter(c => c.perfil.sector_publico_flag === 1).length;
          const sectorPrivado = total - sectorPublico;
          const hombres = clients.filter(c => c.perfil.sexo === 'MASCULINO').length;
          const mujeres = total - hombres;
          const sumEdad = clients.reduce((sum, c) => sum + c.perfil.edad, 0);
          const sumIngreso = clients.reduce((sum, c) => sum + c.perfil.ingreso, 0);

          const mockStats = {
            total,
            edadPromedio: total ? Math.round(sumEdad / total) : 0,
            ingresoPromedio: total ? Math.round(sumIngreso / total) : 0,
            sectorPublico,
            sectorPrivado,
            hombres,
            mujeres
          };

          // Generic response: return array of mock stats (for general stats) or empty array
          // Since we can't easily parse the 'fields' or 'table' in this simple mock,
          // we'll return a structure that satisfies the most critical call: getGeneralStats.
          resolve([mockStats]);
        }
      };
      return queryBuilder;
    }
  }),
  // ... keep other methods basic ...
  insert: () => ({
    values: () => Promise.resolve({ rowCount: 0 })
  }),
  update: () => ({
    set: () => ({
      where: () => Promise.resolve({ rowCount: 0 })
    })
  }),
  delete: () => ({
    where: () => Promise.resolve({ rowCount: 0 })
  })
};

export const pool = {
  query: () => Promise.resolve({ rows: [] }),
  end: () => Promise.resolve()
};

console.log('✓ Base de datos local inicializada');

