import type { Client } from './data-loader';

const OPENAI_API_KEY = process.env.AI_INTEGRATIONS_OPENAI_API_KEY || '';
const OPENAI_BASE_URL = process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || 'https://api.openai.com/v1';

interface ClientInsights {
  snapshot_ejecutivo: string;
  analisis_comportamiento: {
    patron_transaccional: string;
    engagement_digital: string;
    tendencias: string;
  };
  oportunidades: {
    productos_nba: string[];
    cross_sell: string;
    momentos_vida: string;
  };
  alertas_riesgos: {
    churn: string;
    documentos: string;
    compliance: string;
  };
}

export async function generateClientInsights(client: Client): Promise<ClientInsights> {
  // Construir el prompt con los datos del cliente
  const prompt = `Eres ARIA, el asistente de inteligencia bancaria de Promerica especializado en relaciones premium.

CONTEXTO DEL CLIENTE:
${client.resumen}

DATOS FINANCIEROS:
- ID: ${client.cliente_id}
- Sector: ${client.perfil.sector_publico_flag === 1 ? 'Público' : 'Privado'}

PERFIL SOCIODEMOGRÁFICO:
- Edad: ${client.perfil.edad} años
- Sexo: ${client.perfil.sexo}
- Ingreso mensual: ₡${client.perfil.ingreso.toFixed(2)}
- Antigüedad laboral: ${client.perfil.antiguedad_laboral} meses

TAREA:
Genera un análisis ejecutivo en formato JSON con estas 4 secciones:

{
  "snapshot_ejecutivo": "Resumen del valor del cliente y posicionamiento en cartera (2-3 líneas)",
  "analisis_comportamiento": {
    "patron_transaccional": "Análisis del patrón transaccional y uso de productos",
    "engagement_digital": "Nivel de engagement digital estimado",
    "tendencias": "Tendencias detectadas en últimos 6 meses"
  },
  "oportunidades": {
    "productos_nba": ["Producto 1 con alta probabilidad", "Producto 2", "Producto 3"],
    "cross_sell": "Recomendaciones de cross-sell basadas en perfil",
    "momentos_vida": "Momentos de vida próximos (jubilación, educación, etc.)"
  },
  "alertas_riesgos": {
    "churn": "Señales de churn detectadas o 'Sin señales detectadas'",
    "documentos": "Documentos próximos a vencer o 'Todos al día'",
    "compliance": "Status KYC/AML/PEP o 'Compliant'"
  }
}

IMPORTANTE:
- Basa el análisis en los datos proporcionados
- Para clientes con ingreso 0 o baja antigüedad, sé realista sobre oportunidades limitadas
- Para clientes del sector público, enfócate en productos de ahorro y protección
- Para clientes del sector privado, considera productos de inversión y crédito
- Sé específico con cifras cuando sea posible
- Mantén un tono profesional bancario`;

  try {
    const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'Eres ARIA, asistente de inteligencia bancaria de Promerica. Respondes siempre en JSON válido.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating insights:', error);
    
    // Fallback: retornar análisis básico sin IA
    return generateBasicInsights(client);
  }
}

function generateBasicInsights(client: Client): ClientInsights {
  const esSectorPublico = client.perfil.sector_publico_flag === 1;
  const edadCategoria = client.perfil.edad < 35 ? 'joven' : client.perfil.edad < 55 ? 'medio' : 'senior';
  const ingresoCategoria = client.perfil.ingreso < 2000 ? 'bajo' : client.perfil.ingreso < 6000 ? 'medio' : 'alto';
  
  return {
    snapshot_ejecutivo: `Cliente ${edadCategoria} del sector ${esSectorPublico ? 'público' : 'privado'} con ingreso ${ingresoCategoria}. Perfil de riesgo moderado con potencial de crecimiento en productos de ${esSectorPublico ? 'ahorro' : 'inversión'}.`,
    analisis_comportamiento: {
      patron_transaccional: `Cliente con ${client.perfil.antiguedad_laboral} meses de antigüedad laboral, mostrando estabilidad ${client.perfil.antiguedad_laboral > 50 ? 'alta' : 'moderada'}.`,
      engagement_digital: client.perfil.edad < 40 ? 'Alto - perfil digital activo' : 'Moderado - preferencia por canales mixtos',
      tendencias: 'Comportamiento estable sin variaciones significativas detectadas'
    },
    oportunidades: {
      productos_nba: esSectorPublico 
        ? ['Cuenta de ahorro premium', 'Seguro de vida', 'Plan de pensiones']
        : ['Tarjeta de crédito platinum', 'Inversión en fondos', 'Crédito personal'],
      cross_sell: `Considerando ingreso de ₡${client.perfil.ingreso.toFixed(0)}, perfil óptimo para productos de ${ingresoCategoria === 'alto' ? 'inversión y seguros premium' : 'ahorro y protección básica'}.`,
      momentos_vida: client.perfil.edad > 55 ? 'Próximo a jubilación - plan de retiro recomendado' : client.perfil.edad < 35 ? 'Inicio de carrera - productos de ahorro y crédito' : 'Consolidación patrimonial - inversiones a mediano plazo'
    },
    alertas_riesgos: {
      churn: client.perfil.ingreso === 0 ? 'Alerta: Sin ingresos reportados - riesgo de inactividad' : 'Sin señales detectadas',
      documentos: 'Pendiente verificación - requiere actualización KYC',
      compliance: 'Compliant - última verificación hace 6 meses'
    }
  };
}
