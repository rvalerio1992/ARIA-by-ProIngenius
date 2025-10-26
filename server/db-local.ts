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
export const db = {
  select: () => ({
    from: () => ({
      where: () => Promise.resolve([]),
      limit: () => Promise.resolve([]),
    })
  }),
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

