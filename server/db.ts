import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Modo desarrollo: usar base de datos local si no hay DATABASE_URL
const useLocalDB = !process.env.DATABASE_URL || process.env.DATABASE_URL.includes('localhost:5432/aria_banking');

let pool: Pool | any;
let db: any;

if (useLocalDB) {
  console.log('⚠️  DATABASE_URL no configurado o usando localhost');
  console.log('📁 Usando base de datos LOCAL (archivos JSON)');
  console.log('💡 Para usar PostgreSQL real, configura DATABASE_URL en .env');
  console.log('');
  
  // Usar mock local
  const localDB = await import('./db-local.js');
  pool = localDB.pool;
  db = localDB.db;
} else {
  console.log('✓ Usando PostgreSQL:', process.env.DATABASE_URL.split('@')[1]?.split('/')[0] || 'remote');
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
}

export { pool, db };
