import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Tabla de clientes con todas las columnas del CSV Data.csv
export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clienteId: text("cliente_id").notNull().unique(),
  
  // DEMOGRAFICO
  idCategoria: text("id_categoria"),
  sexo: text("sexo"),
  edad: integer("edad"),
  estadoCivil: text("estado_civil"),
  profesion: text("profesion"),
  profesionCategoria: text("profesion_categoria"),
  gradoAcademico: text("grado_academico"),
  nivelEducativo: text("nivel_educativo"),
  nacionalidad: text("nacionalidad"),
  generacion: text("generacion"),
  hijos: integer("hijos"),
  edadHijoMenor: integer("edad_hijo_menor"),
  edadPadreMayor: integer("edad_padre_mayor"),
  idPatrono: text("id_patrono"),
  nomPatrono: text("nom_patrono"),
  sectorPublicoFlag: integer("sector_publico_flag"),
  antiguedadLaboral: real("antiguedad_laboral"),
  tipoCliente: text("tipo_cliente"),
  fuenteIngresos: text("fuente_ingresos"),
  ingreso: real("ingreso"),
  ventasAnual: real("ventas_anual"),
  
  // NSE y BI
  nse: integer("nse"),
  biQ: integer("bi_q"),
  biMonto: real("bi_monto"),
  bmQ: integer("bm_q"),
  bmLujoQ: integer("bm_lujo_q"),
  bmMonto: real("bm_monto"),
  biBmQ: integer("bi_bm_q"),
  biBmMonto: real("bi_bm_monto"),
  
  // UBICACION
  paisDefault: text("pais_default"),
  provinciaDefault: text("provincia_default"),
  cantonDefault: text("canton_default"),
  distritoDefault: text("distrito_default"),
  provinciaTrabajo: text("provincia_trabajo"),
  cantonTrabajo: text("canton_trabajo"),
  distritoTrabajo: text("distrito_trabajo"),
  provinciaVoto: text("provincia_voto"),
  cantonVoto: text("canton_voto"),
  distritoVoto: text("distrito_voto"),
  gamFlag: integer("gam_flag"),
  
  // CLIENTE
  estadoCliente: text("estado_cliente"),
  tipoPersona: text("tipo_persona"),
  oficinaAdministrativa: text("oficina_administrativa"),
  segmentoBanca: text("segmento_banca"),
  segmentoRisk: text("segmento_risk"),
  segmentoBanca2: text("segmento_banca_2"),
  oficinaBancaria: text("oficina_bancaria"),
  qtyCtas: integer("qty_ctas"),
  tieneTarjeta: integer("tiene_tarjeta"),
  nivelValor: text("nivel_valor"),
  
  // PRODUCTOS
  productosPasivosFlag: integer("productos_pasivos_flag"),
  productosActivosFlag: integer("productos_activos_flag"),
  ultimoMesActivo: text("ultimo_mes_activo"),
  monthsSinceActive: integer("months_since_active"),
  vinculacion: text("vinculacion"),
  productosActuales: text("productos_actuales"),
  productosPotenciales: text("productos_potenciales"),
  
  // SALDOS - Productos Pasivos (Captaciones)
  ceSaldo: real("ce_saldo"),
  cdiSaldo: real("cdi_saldo"),
  cePlanMetasSaldo: real("ce_plan_metas_saldo"),
  tdSaldo: real("td_saldo"),
  
  // SALDOS - Productos Activos (Colocaciones)
  prPrendarioSaldo: real("pr_prendario_saldo"),
  prHipotecarioSaldo: real("pr_hipotecario_saldo"),
  prOtrosSaldo: real("pr_otros_saldo"),
  tcSaldo: real("tc_saldo"),
  
  // TOTALES
  totalPasivos: real("total_pasivos"),
  totalActivos: real("total_activos"),
  rangoSaldo: text("rango_saldo"),
  ratio: real("ratio"),
  balanceTipo: real("balance_tipo"),
  
  // Metadatos
  resumen: text("resumen"),
  dataQuality: jsonb("data_quality"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;

// Tabla de metadata de columnas (del schema_card.json)
export const columnMetadata = pgTable("column_metadata", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  type: text("type"),
  category: text("category"),
  description: text("description"),
  tables: jsonb("tables"),
  pii: integer("pii"), // 0 o 1
  sensitivity: text("sensitivity"),
});

export const insertColumnMetadataSchema = createInsertSchema(columnMetadata).omit({
  id: true,
});

export type InsertColumnMetadata = z.infer<typeof insertColumnMetadataSchema>;
export type ColumnMetadata = typeof columnMetadata.$inferSelect;

// Tabla de mensajes de chat con ARIA
export const ariaChatMessages = pgTable("aria_chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  role: text("role").notNull(), // 'user' o 'assistant'
  content: text("content").notNull(),
  metadata: jsonb("metadata"), // Para guardar contexto adicional usado en la respuesta
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAriaChatMessageSchema = createInsertSchema(ariaChatMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertAriaChatMessage = z.infer<typeof insertAriaChatMessageSchema>;
export type AriaChatMessage = typeof ariaChatMessages.$inferSelect;
