import { db } from "./db";
import { clients, columnMetadata } from "@shared/schema";
import { sql, eq, and, or, gte, lte, like, desc, asc } from "drizzle-orm";

const OPENAI_API_KEY = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || '';
const OPENAI_BASE_URL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || 'https://api.openai.com/v1';

interface QueryContext {
  type: 'general_stats' | 'client_search' | 'segmentation' | 'products' | 'specific_client' | 'metrics';
  params: Record<string, any>;
}

// Analizar la pregunta del usuario para entender qué consultar
async function analyzeUserQuestion(question: string): Promise<QueryContext> {
  const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Eres un analista de preguntas sobre carteras bancarias. Analiza la pregunta del usuario y determina qué tipo de consulta necesita.

Tipos de consulta disponibles:
- general_stats: Estadísticas generales (total clientes, promedios, distribuciones)
- client_search: Buscar clientes específicos por criterios (edad, ingreso, profesión, ubicación, etc)
- segmentation: Análisis de segmentos (sector público/privado, NSE, generación, etc)
- products: Análisis de productos y saldos (captaciones, colocaciones, balance)
- specific_client: Información sobre un cliente específico por ID
- metrics: Métricas de cartera (saldo total, productos más usados, distribución)

Responde SOLO con un JSON con esta estructura:
{
  "type": "tipo_de_consulta",
  "params": {
    // parámetros relevantes extraídos de la pregunta
  }
}

Ejemplos:
Pregunta: "¿Cuántos clientes tengo en total?"
Respuesta: {"type": "general_stats", "params": {}}

Pregunta: "Muéstrame clientes del sector público con ingresos mayores a 5000"
Respuesta: {"type": "client_search", "params": {"sector_publico": 1, "ingreso_min": 5000}}

Pregunta: "¿Cuál es el saldo total en captaciones?"
Respuesta: {"type": "metrics", "params": {"metric": "captaciones"}}

Pregunta: "Dame información del cliente cli_00042"
Respuesta: {"type": "specific_client", "params": {"cliente_id": "cli_00042"}}`,
        },
        {
          role: 'user',
          content: question,
        },
      ],
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    console.error('OpenAI API error:', await response.text());
    return { type: 'general_stats', params: {} };
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  if (!content) {
    return { type: 'general_stats', params: {} };
  }

  try {
    return JSON.parse(content);
  } catch {
    return { type: 'general_stats', params: {} };
  }
}

// Ejecutar la consulta según el contexto
async function executeQuery(context: QueryContext) {
  switch (context.type) {
    case 'general_stats':
      return await getGeneralStats();
    
    case 'client_search':
      return await searchClients(context.params);
    
    case 'segmentation':
      return await getSegmentation(context.params);
    
    case 'products':
      return await getProductAnalysis(context.params);
    
    case 'specific_client':
      return await getSpecificClient(context.params.cliente_id);
    
    case 'metrics':
      return await getMetrics(context.params);
    
    default:
      return await getGeneralStats();
  }
}

async function getGeneralStats() {
  const [stats] = await db.select({
    total: sql<number>`count(*)`,
    edadPromedio: sql<number>`avg(${clients.edad})`,
    ingresoPromedio: sql<number>`avg(${clients.ingreso})`,
    sectorPublico: sql<number>`count(*) filter (where ${clients.sectorPublicoFlag} = 1)`,
    sectorPrivado: sql<number>`count(*) filter (where ${clients.sectorPublicoFlag} = 0 or ${clients.sectorPublicoFlag} is null)`,
    hombres: sql<number>`count(*) filter (where ${clients.sexo} = 'MASCULINO')`,
    mujeres: sql<number>`count(*) filter (where ${clients.sexo} = 'FEMENINO')`,
  }).from(clients);

  return {
    tipo: 'estadisticas_generales',
    datos: stats,
  };
}

async function searchClients(params: Record<string, any>) {
  const conditions = [];

  if (params.sector_publico !== undefined) {
    conditions.push(eq(clients.sectorPublicoFlag, params.sector_publico));
  }

  if (params.ingreso_min !== undefined) {
    conditions.push(gte(clients.ingreso, params.ingreso_min));
  }

  if (params.ingreso_max !== undefined) {
    conditions.push(lte(clients.ingreso, params.ingreso_max));
  }

  if (params.edad_min !== undefined) {
    conditions.push(gte(clients.edad, params.edad_min));
  }

  if (params.edad_max !== undefined) {
    conditions.push(lte(clients.edad, params.edad_max));
  }

  if (params.sexo) {
    conditions.push(eq(clients.sexo, params.sexo));
  }

  if (params.profesion) {
    conditions.push(like(clients.profesion, `%${params.profesion}%`));
  }

  if (params.provincia) {
    conditions.push(eq(clients.provinciaDefault, params.provincia));
  }

  if (params.generacion) {
    conditions.push(eq(clients.generacion, params.generacion));
  }

  const limit = params.limit || 10;
  
  const results = await db.select()
    .from(clients)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(limit);

  return {
    tipo: 'busqueda_clientes',
    cantidad: results.length,
    clientes: results.map(c => ({
      cliente_id: c.clienteId,
      nombre_ficticio: `Cliente ${c.clienteId}`,
      edad: c.edad,
      sexo: c.sexo,
      ingreso: c.ingreso,
      profesion: c.profesion,
      sector: c.sectorPublicoFlag === 1 ? 'Público' : 'Privado',
      provincia: c.provinciaDefault,
      resumen: c.resumen,
    })),
  };
}

async function getSegmentation(params: Record<string, any>) {
  const groupBy = params.group_by || 'sector';
  
  let results;
  
  if (groupBy === 'sector') {
    results = await db.select({
      segmento: sql<string>`case when ${clients.sectorPublicoFlag} = 1 then 'Sector Público' else 'Sector Privado' end`,
      cantidad: sql<number>`count(*)`,
      ingreso_promedio: sql<number>`avg(${clients.ingreso})`,
      edad_promedio: sql<number>`avg(${clients.edad})`,
    })
    .from(clients)
    .groupBy(sql`case when ${clients.sectorPublicoFlag} = 1 then 'Sector Público' else 'Sector Privado' end`);
  } else if (groupBy === 'generacion') {
    results = await db.select({
      segmento: clients.generacion,
      cantidad: sql<number>`count(*)`,
      ingreso_promedio: sql<number>`avg(${clients.ingreso})`,
      edad_promedio: sql<number>`avg(${clients.edad})`,
    })
    .from(clients)
    .where(sql`${clients.generacion} is not null`)
    .groupBy(clients.generacion);
  } else if (groupBy === 'nse') {
    results = await db.select({
      segmento: sql<string>`'NSE ' || ${clients.nse}`,
      cantidad: sql<number>`count(*)`,
      ingreso_promedio: sql<number>`avg(${clients.ingreso})`,
      edad_promedio: sql<number>`avg(${clients.edad})`,
    })
    .from(clients)
    .where(sql`${clients.nse} is not null`)
    .groupBy(clients.nse);
  }

  return {
    tipo: 'segmentacion',
    criterio: groupBy,
    segmentos: results,
  };
}

async function getProductAnalysis(params: Record<string, any>) {
  const [totals] = await db.select({
    total_captaciones: sql<number>`sum(coalesce(${clients.ceSaldo}, 0) + coalesce(${clients.cdiSaldo}, 0) + coalesce(${clients.cePlanMetasSaldo}, 0) + coalesce(${clients.tdSaldo}, 0))`,
    total_colocaciones: sql<number>`sum(coalesce(${clients.prPrendarioSaldo}, 0) + coalesce(${clients.prHipotecarioSaldo}, 0) + coalesce(${clients.prOtrosSaldo}, 0) + coalesce(${clients.tcSaldo}, 0))`,
    clientes_con_captaciones: sql<number>`count(*) filter (where coalesce(${clients.ceSaldo}, 0) + coalesce(${clients.cdiSaldo}, 0) + coalesce(${clients.cePlanMetasSaldo}, 0) + coalesce(${clients.tdSaldo}, 0) > 0)`,
    clientes_con_colocaciones: sql<number>`count(*) filter (where coalesce(${clients.prPrendarioSaldo}, 0) + coalesce(${clients.prHipotecarioSaldo}, 0) + coalesce(${clients.prOtrosSaldo}, 0) + coalesce(${clients.tcSaldo}, 0) > 0)`,
  }).from(clients);

  const [productBreakdown] = await db.select({
    ce_total: sql<number>`sum(coalesce(${clients.ceSaldo}, 0))`,
    cdi_total: sql<number>`sum(coalesce(${clients.cdiSaldo}, 0))`,
    plan_metas_total: sql<number>`sum(coalesce(${clients.cePlanMetasSaldo}, 0))`,
    td_total: sql<number>`sum(coalesce(${clients.tdSaldo}, 0))`,
    prendario_total: sql<number>`sum(coalesce(${clients.prPrendarioSaldo}, 0))`,
    hipotecario_total: sql<number>`sum(coalesce(${clients.prHipotecarioSaldo}, 0))`,
    otros_creditos_total: sql<number>`sum(coalesce(${clients.prOtrosSaldo}, 0))`,
    tc_total: sql<number>`sum(coalesce(${clients.tcSaldo}, 0))`,
  }).from(clients);

  return {
    tipo: 'analisis_productos',
    totales: totals,
    desglose_productos: productBreakdown,
  };
}

async function getSpecificClient(clienteId: string) {
  const [client] = await db.select()
    .from(clients)
    .where(eq(clients.clienteId, clienteId))
    .limit(1);

  if (!client) {
    return {
      tipo: 'cliente_especifico',
      encontrado: false,
      mensaje: `No se encontró el cliente ${clienteId}`,
    };
  }

  return {
    tipo: 'cliente_especifico',
    encontrado: true,
    cliente: {
      id: client.clienteId,
      perfil: {
        edad: client.edad,
        sexo: client.sexo,
        profesion: client.profesion,
        ingreso: client.ingreso,
        antiguedad_laboral: client.antiguedadLaboral,
        sector: client.sectorPublicoFlag === 1 ? 'Público' : 'Privado',
        estado_civil: client.estadoCivil,
        hijos: client.hijos,
        generacion: client.generacion,
        nivel_educativo: client.nivelEducativo,
      },
      ubicacion: {
        provincia: client.provinciaDefault,
        canton: client.cantonDefault,
        distrito: client.distritoDefault,
      },
      productos: {
        captaciones: {
          ce: client.ceSaldo,
          cdi: client.cdiSaldo,
          plan_metas: client.cePlanMetasSaldo,
          td: client.tdSaldo,
          total: (client.ceSaldo || 0) + (client.cdiSaldo || 0) + (client.cePlanMetasSaldo || 0) + (client.tdSaldo || 0),
        },
        colocaciones: {
          prendario: client.prPrendarioSaldo,
          hipotecario: client.prHipotecarioSaldo,
          otros: client.prOtrosSaldo,
          tc: client.tcSaldo,
          total: (client.prPrendarioSaldo || 0) + (client.prHipotecarioSaldo || 0) + (client.prOtrosSaldo || 0) + (client.tcSaldo || 0),
        },
      },
      segmentacion: {
        nse: client.nse,
        nivel_valor: client.nivelValor,
        segmento_banca: client.segmentoBanca,
      },
      resumen: client.resumen,
    },
  };
}

async function getMetrics(params: Record<string, any>) {
  if (params.metric === 'captaciones' || params.metric === 'colocaciones') {
    return await getProductAnalysis({});
  }
  
  return await getGeneralStats();
}

// Generar respuesta con OpenAI usando el contexto
export async function generateAriaResponse(question: string): Promise<string> {
  try {
    // 1. Analizar la pregunta
    const context = await analyzeUserQuestion(question);
    
    // 2. Ejecutar la consulta
    const queryResult = await executeQuery(context);
    
    // 3. Generar respuesta con GPT-4
    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Eres ARIA (Agente de Relación Inteligente Automatizado), un asistente bancario experto para ejecutivos premium de Promerica. 

Tu tono es profesional pero cercano, usas lenguaje bancario preciso en español, y siempre proporcionas insights accionables basados en los datos.

Cuando respondas:
- Sé conciso pero completo
- Usa SOLO texto plano con formato simple
- Incluye números y datos específicos
- Proporciona contexto y comparaciones cuando sea relevante
- Sugiere acciones o próximos pasos cuando sea apropiado
- NO uses emojis, solo texto profesional
- Para énfasis usa palabras en **negrita** únicamente

Los datos que te proporciono vienen directamente de la base de datos de la cartera de clientes.`,
          },
          {
            role: 'user',
            content: `Pregunta del usuario: "${question}"

Datos obtenidos de la base de datos:
\`\`\`json
${JSON.stringify(queryResult, null, 2)}
\`\`\`

Genera una respuesta clara y útil basada en estos datos.`,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content || "Lo siento, no pude generar una respuesta en este momento.";
  } catch (error) {
    console.error('Error generating ARIA response:', error);
    return "Lo siento, ocurrió un error al procesar tu pregunta. Por favor intenta nuevamente.";
  }
}
