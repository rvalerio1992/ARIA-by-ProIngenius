import { db } from "./db";
import { clients, columnMetadata } from "@shared/schema";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

interface CSVRow {
  ID_CATEGORIA?: string;
  SEXO?: string;
  EDAD?: string;
  ESTADO_CIVIL?: string;
  PROFESION?: string;
  PROFESION_CATEGORIA?: string;
  GRADO_ACADEMICO?: string;
  NIVEL_EDUCATIVO?: string;
  NACIONALIDAD?: string;
  GENERACION?: string;
  HIJOS?: string;
  EDAD_HIJO_MENOR?: string;
  EDAD_PADRE_MAYOR?: string;
  INGRESO?: string;
  VENTAS_ANUAL?: string;
  FUENTE_INGRESOS?: string;
  ID_PATRONO?: string;
  NOM_PATRONO?: string;
  SECTOR_PUBLICO_FLAG?: string;
  ANTIGUEDAD_LABORAL?: string;
  NSE?: string;
  BI_Q?: string;
  BI_MONTO?: string;
  BM_Q?: string;
  BM_LUJO_Q?: string;
  BM_MONTO?: string;
  BI_BM_Q?: string;
  BI_BM_MONTO?: string;
  PAIS_DEFAULT?: string;
  PROVINCIA_DEFAULT?: string;
  CANTON_DEFAULT?: string;
  DISTRITO_DEFAULT?: string;
  PROVINCIA_TRABAJO?: string;
  CANTON_TRABAJO?: string;
  DISTRITO_TRABAJO?: string;
  PROVINCIA_VOTO?: string;
  CANTON_VOTO?: string;
  DISTRITO_VOTO?: string;
  GAM_FLAG?: string;
  ESTADO_CLIENTE?: string;
  TIPO_PERSONA?: string;
  OFICINA_ADMINISTRATIVA?: string;
  SEGMENTO_BANCA?: string;
  SEGMENTO_RISK?: string;
  SEGMENTO_BANCA_2?: string;
  OFICINA_BANCARIA?: string;
  QTY_CTAS?: string;
  TIENE_TARJETA?: string;
  NIVEL_VALOR?: string;
  PRODUCTOS_PASIVOS_FLAG?: string;
  PRODUCTOS_ACTIVOS_FLAG?: string;
  ULTIMO_MES_ACTIVO?: string;
  MONTHS_SINCE_ACTIVE?: string;
  VINCULACION?: string;
  PRODUCTOS_ACTUALES?: string;
  PRODUCTOS_POTENCIALES?: string;
  CE_SALDO?: string;
  CDI_SALDO?: string;
  CE_PLAN_METAS_SALDO?: string;
  TD_SALDO?: string;
  PR_PRENDARIO_SALDO?: string;
  PR_HIPOTECARIO_SALDO?: string;
  PR_OTROS_SALDO?: string;
  TC_SALDO?: string;
  TOTAL_PASIVOS?: string;
  TOTAL_ACTIVOS?: string;
  RANGO_SALDO?: string;
  RATIO?: string;
  BALANCE_TIPO?: string;
  [key: string]: string | undefined;
}

function parseNumber(value: string | undefined): number | null {
  if (!value || value.trim() === '' || value === 'ND') return null;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
}

function parseIntSafe(value: string | undefined): number | null {
  if (!value || value.trim() === '' || value === 'ND') return null;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? null : parsed;
}

function parseText(value: string | undefined): string | null {
  if (!value || value.trim() === '' || value === 'ND') return null;
  return value.trim();
}

async function seedClients() {
  console.log("Loading clients from Data.csv...");
  
  const csvPath = path.join(process.cwd(), "attached_assets", "Data_1761251591554.csv");
  const csvContent = fs.readFileSync(csvPath, "utf-8");
  
  const records: CSVRow[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  
  console.log(`Found ${records.length} records in CSV`);
  
  // Insert in batches to avoid memory issues
  const batchSize = 100;
  let inserted = 0;
  
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    
    const clientsData = batch.map((row, idx) => {
      const clientIndex = i + idx;
      const clienteId = `cli_${String(clientIndex).padStart(5, '0')}`;
      
      // Calcular resumen
      const sexo = parseText(row.SEXO) || 'ND';
      const edad = parseIntSafe(row.EDAD) || 0;
      const ingreso = parseNumber(row.INGRESO) || 0;
      const antiguedad = parseNumber(row.ANTIGUEDAD_LABORAL) || 0;
      const sector = parseIntSafe(row.SECTOR_PUBLICO_FLAG) === 1 ? 'público' : 'privado';
      const resumen = `sexo ${sexo}, ${edad} años, ingreso ≈ ${ingreso.toFixed(0)} CRC/mes, ${antiguedad} meses de antigüedad, sector ${sector}`;
      
      return {
        clienteId,
        idCategoria: parseText(row.ID_CATEGORIA),
        sexo: parseText(row.SEXO),
        edad: parseIntSafe(row.EDAD),
        estadoCivil: parseText(row.ESTADO_CIVIL),
        profesion: parseText(row.PROFESION),
        profesionCategoria: parseText(row.PROFESION_CATEGORIA),
        gradoAcademico: parseText(row.GRADO_ACADEMICO),
        nivelEducativo: parseText(row.NIVEL_EDUCATIVO),
        nacionalidad: parseText(row.NACIONALIDAD),
        generacion: parseText(row.GENERACION),
        hijos: parseIntSafe(row.HIJOS),
        edadHijoMenor: parseIntSafe(row.EDAD_HIJO_MENOR),
        edadPadreMayor: parseIntSafe(row.EDAD_PADRE_MAYOR),
        idPatrono: parseText(row.ID_PATRONO),
        nomPatrono: parseText(row.NOM_PATRONO),
        sectorPublicoFlag: parseIntSafe(row.SECTOR_PUBLICO_FLAG),
        antiguedadLaboral: parseNumber(row.ANTIGUEDAD_LABORAL),
        tipoCliente: parseText(row.TIPO_PERSONA),
        fuenteIngresos: parseText(row.FUENTE_INGRESOS),
        ingreso: parseNumber(row.INGRESO),
        ventasAnual: parseNumber(row.VENTAS_ANUAL),
        nse: parseIntSafe(row.NSE),
        biQ: parseIntSafe(row.BI_Q),
        biMonto: parseNumber(row.BI_MONTO),
        bmQ: parseIntSafe(row.BM_Q),
        bmLujoQ: parseIntSafe(row.BM_LUJO_Q),
        bmMonto: parseNumber(row.BM_MONTO),
        biBmQ: parseIntSafe(row.BI_BM_Q),
        biBmMonto: parseNumber(row.BI_BM_MONTO),
        paisDefault: parseText(row.PAIS_DEFAULT),
        provinciaDefault: parseText(row.PROVINCIA_DEFAULT),
        cantonDefault: parseText(row.CANTON_DEFAULT),
        distritoDefault: parseText(row.DISTRITO_DEFAULT),
        provinciaTrabajo: parseText(row.PROVINCIA_TRABAJO),
        cantonTrabajo: parseText(row.CANTON_TRABAJO),
        distritoTrabajo: parseText(row.DISTRITO_TRABAJO),
        provinciaVoto: parseText(row.PROVINCIA_VOTO),
        cantonVoto: parseText(row.CANTON_VOTO),
        distritoVoto: parseText(row.DISTRITO_VOTO),
        gamFlag: parseIntSafe(row.GAM_FLAG),
        estadoCliente: parseText(row.ESTADO_CLIENTE),
        tipoPersona: parseText(row.TIPO_PERSONA),
        oficinaAdministrativa: parseText(row.OFICINA_ADMINISTRATIVA),
        segmentoBanca: parseText(row.SEGMENTO_BANCA),
        segmentoRisk: parseText(row.SEGMENTO_RISK),
        segmentoBanca2: parseText(row.SEGMENTO_BANCA_2),
        oficinaBancaria: parseText(row.OFICINA_BANCARIA),
        qtyCtas: parseIntSafe(row.QTY_CTAS),
        tieneTarjeta: parseIntSafe(row.TIENE_TARJETA),
        nivelValor: parseText(row.NIVEL_VALOR),
        productosPasivosFlag: parseIntSafe(row.PRODUCTOS_PASIVOS_FLAG),
        productosActivosFlag: parseIntSafe(row.PRODUCTOS_ACTIVOS_FLAG),
        ultimoMesActivo: parseText(row.ULTIMO_MES_ACTIVO),
        monthsSinceActive: parseIntSafe(row.MONTHS_SINCE_ACTIVE),
        vinculacion: parseText(row.VINCULACION),
        productosActuales: parseText(row.PRODUCTOS_ACTUALES),
        productosPotenciales: parseText(row.PRODUCTOS_POTENCIALES),
        ceSaldo: parseNumber(row.CE_SALDO),
        cdiSaldo: parseNumber(row.CDI_SALDO),
        cePlanMetasSaldo: parseNumber(row.CE_PLAN_METAS_SALDO),
        tdSaldo: parseNumber(row.TD_SALDO),
        prPrendarioSaldo: parseNumber(row.PR_PRENDARIO_SALDO),
        prHipotecarioSaldo: parseNumber(row.PR_HIPOTECARIO_SALDO),
        prOtrosSaldo: parseNumber(row.PR_OTROS_SALDO),
        tcSaldo: parseNumber(row.TC_SALDO),
        totalPasivos: parseNumber(row.TOTAL_PASIVOS),
        totalActivos: parseNumber(row.TOTAL_ACTIVOS),
        rangoSaldo: parseText(row.RANGO_SALDO),
        ratio: parseNumber(row.RATIO),
        balanceTipo: parseNumber(row.BALANCE_TIPO),
        resumen,
        dataQuality: ["sin_nulos_en_cols_clave"],
      };
    });
    
    await db.insert(clients).values(clientsData);
    inserted += clientsData.length;
    console.log(`Inserted ${inserted}/${records.length} clients...`);
  }
  
  console.log(`✓ Successfully inserted ${inserted} clients`);
}

async function seedColumnMetadata() {
  console.log("Loading column metadata from schema_card.json...");
  
  const schemaPath = path.join(process.cwd(), "attached_assets", "schema_card_1761251591553.json");
  const schemaContent = fs.readFileSync(schemaPath, "utf-8");
  const schemaData = JSON.parse(schemaContent);
  
  const columns = schemaData.columns || [];
  console.log(`Found ${columns.length} column definitions`);
  
  const metadataData = columns.map((col: any) => ({
    name: col.name,
    type: col.type || null,
    category: col.category || null,
    description: col.description || null,
    tables: col.tables || null,
    pii: col.pii ? 1 : 0,
    sensitivity: col.sensitivity || null,
  }));
  
  // Insert in batches
  const batchSize = 100;
  let inserted = 0;
  
  for (let i = 0; i < metadataData.length; i += batchSize) {
    const batch = metadataData.slice(i, i + batchSize);
    await db.insert(columnMetadata).values(batch);
    inserted += batch.length;
    console.log(`Inserted ${inserted}/${metadataData.length} column metadata...`);
  }
  
  console.log(`✓ Successfully inserted ${inserted} column metadata`);
}

async function main() {
  try {
    console.log("Starting database seed...\n");
    
    // Clear existing data
    console.log("Clearing existing data...");
    await db.delete(clients);
    await db.delete(columnMetadata);
    console.log("✓ Cleared existing data\n");
    
    // Seed tables
    await seedClients();
    await seedColumnMetadata();
    
    console.log("\n✓ Database seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

main();
