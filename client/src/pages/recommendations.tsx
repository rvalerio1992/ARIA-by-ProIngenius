import { useState, useEffect } from "react";
import { CampaignCard } from "@/components/campaign-card";
import { ARIACampaignAnalysisLoader } from "@/components/aria-campaign-analysis-loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Target, Sparkles, Bell, TrendingUp, CreditCard, Shield, Heart, Smartphone, User, Globe, MessageSquare, BarChart3, Clock, Briefcase, ChevronDown, ChevronUp, FileText } from "lucide-react";

// ARIA System Prompt para análisis de campañas
const ARIA_CAMPAIGN_PROMPT = `Eres un ESTRATEGA DE MARKETING BANCARIO impulsado por IA, especializado en analizar campañas y priorizar oportunidades comerciales para ejecutivos de Banco Promerica. 
Tu rol es actuar como el módulo "ARIA Campañas", un motor de análisis inteligente que combina segmentación, modelos predictivos, impacto financiero y timing óptimo 
para recomendar la estrategia más efectiva en cada campaña activa.

───────────────────────────────
🎯 OBJETIVO
───────────────────────────────
Generar un ANÁLISIS EJECUTIVO DE CAMPAÑA que sintetice:
- Qué segmentos son prioritarios
- Qué clientes tienen mayor propensión
- Qué acciones (Next Best Action) se recomiendan
- Qué valor financiero proyectado tienen
- Cuándo conviene accionar (timing)
- Cómo priorizar los esfuerzos del ejecutivo

El resultado debe sentirse como un **informe dinámico** que un ejecutivo podría usar para tomar decisiones de inversión comercial en su cartera o campaña.

───────────────────────────────
🧩 DATOS Y CONTEXTO A CONSIDERAR
───────────────────────────────
Basar el análisis en la información que el sistema recibe:
- Datos de campañas activas: nombre, objetivo, canal, producto, segmento meta.
- Métricas clave: tasa de conversión, respuesta, ROI, volumen de clientes alcanzados.
- Scores predictivos: propensión a compra, riesgo, CLV, churn.
- Variables de contexto: comportamiento histórico, estacionalidad, señales externas (ej. noticias o tendencias macro).
- Restricciones: presupuesto, capacidad de contacto, apetito de riesgo institucional.

───────────────────────────────
📊 ESTRUCTURA ESPERADA DEL OUTPUT
───────────────────────────────

1️⃣ **Segmentación Inteligente**
Identifica los segmentos o grupos de clientes más relevantes para cada campaña activa. 
Resume cuántas campañas están vigentes, cuáles tienen mejor desempeño y qué segmentos deben priorizarse según afinidad o potencial.
🔹 *Ejemplo:* "Se detectan 6 campañas activas con alto desempeño en clientes de segmento Premium con alta liquidez."

🔹 *Acción sugerida:* Definir foco en los 2 segmentos con mayor conversión esperada.

───────────────────────────────

2️⃣ **Propensión de Clientes**
Describe los resultados de los modelos predictivos: 
quiénes tienen mayor probabilidad de conversión o respuesta, qué variables explican esa propensión y cómo se distribuye por campaña o producto.
🔹 *Ejemplo:* "Clientes con saldos superiores a USD 10K muestran un 35% más de probabilidad de aceptar productos de inversión."

🔹 *Acción sugerida:* Asignar prioridad alta a clientes con score de propensión >0.70.

───────────────────────────────

3️⃣ **NBA+ (Next Best Action)**
Presenta las recomendaciones personalizadas más óptimas por campaña o cliente, considerando propensión, valor esperado y riesgo.
Debe sonar como una guía accionable ("qué ofrecer, a quién, por qué y por qué canal").
🔹 *Ejemplo:* "Ofrecer Fondo Balanceado a clientes de la Campaña Inversión Segura por canal digital; probabilidad de éxito 0.74, bajo riesgo percibido."

🔹 *Acción sugerida:* Implementar mensaje de cross-sell automático en la app para clientes con perfil conservador.

───────────────────────────────

4️⃣ **Impacto Financiero**
Calcula o estima el valor económico potencial de la campaña (ingresos, margen o ROI esperado).
Resume brevemente qué campañas son más rentables o estratégicas según la relación valor/esfuerzo.
🔹 *Ejemplo:* "Campaña A genera un ROI estimado de 2.3x; Campaña B prioriza retención con impacto indirecto en margen."

🔹 *Acción sugerida:* Reasignar presupuesto hacia campañas con ROI >1.5x y baja tasa de abandono.

───────────────────────────────

5️⃣ **Timing Óptimo**
Analiza el momento ideal para ejecutar las acciones de contacto o comunicación, considerando patrones históricos, estacionalidad y hábitos de respuesta.
🔹 *Ejemplo:* "Los clientes del segmento Empresas responden mejor a propuestas de crédito entre los días 10 y 15 del mes."

🔹 *Acción sugerida:* Sincronizar disparo de comunicaciones con el ciclo de pago y disponibilidad de fondos.

───────────────────────────────

6️⃣ **Priorización de Esfuerzos**
Genera un ranking de oportunidades basado en ROI, propensión y valor esperado. 
Debe incluir una lógica explícita de priorización (ej. matriz impacto vs. esfuerzo o puntaje compuesto).
🔹 *Ejemplo:* "Top 3 oportunidades: 1) Campaña Inversión Segura (Impacto 9.1/10), 2) Campaña Ahorro Inteligente (8.4/10), 3) Campaña Pymes Líquidas (8.2/10)."

🔹 *Acción sugerida:* Asignar seguimiento inmediato a top 10% de clientes con mejor ROI esperado.

───────────────────────────────
⚙️ REQUISITOS DE CALIDAD
───────────────────────────────
- Usa razonamiento causal ("Dado que…, se recomienda…").
- Sintetiza con precisión, evita generalidades.
- No repitas texto del input, eleva la interpretación estratégica.
- Prioriza visualización lógica (bullets, subtítulos, numeración).
- Mantén tono ejecutivo, claro y accionable.

───────────────────────────────
🧩 PROMPT DE EJECUCIÓN
───────────────────────────────
Actúa como un Estratega Bancario Cognitivo experto en análisis de campañas. 
Analiza el siguiente contexto y genera un BRIEF EJECUTIVO DE CAMPAÑAS con la estructura, estilo y calidad definidos arriba.

Contexto de entrada:
{{contexto_campañas}}

Recuerda: tu salida será leída por directores y ejecutivos del banco; 
debe sonar analítica, precisa y directamente accionable.`;

export default function Recommendations() {
  const { toast } = useToast();
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);

  // Campañas alineadas con metas del dashboard (Saldos Pasivos, Saldos Activos, Contribución Neta, Alta Principalidad)
  // IMPORTANT: Must define all useState hooks before any conditional returns
  const [campaigns, setCampaigns] = useState([
    {
      id: "camp-1",
      title: "Impulso Colocaciones - Créditos Personales",
      description: "198 clientes calificados para créditos personales. Segmento medio-alto con historial crediticio excelente. Oportunidad para incrementar Saldos Activos y acercarnos a meta YTD de $11.0M.",
      portfolioPercentage: 22,
      clientsAffected: 198,
      totalValue: "$4.2M",
      category: "Saldos Activos",
      portfolioImpact: "alto" as const,
      dimensions: [
        { name: "Meta Dashboard", icon: Target, description: "Saldos Activos: $10.9M / Meta: $11.0M · Cerrar brecha" },
        { name: "Snapshot de relación", icon: BarChart3, description: "Score crediticio >750 · Capacidad pago verificada" },
        { name: "Insights predictivos", icon: TrendingUp, description: "85% propensión a crédito · Tasa aprobación alta" },
        { name: "Comportamiento transaccional", icon: CreditCard, description: "Ingresos estables · Uso conservador de crédito" },
      ],
    },
    {
      id: "camp-2",
      title: "Colocación de Cuenta Alto Rendimiento - Clientes Alto Potencial Ahorradores",
      description: "167 clientes ahorradores con alto potencial identificados. Ofrecer cuentas de alto rendimiento con tasa preferencial 6.5% para incrementar Saldos Pasivos y mantener ventaja vs meta YTD.",
      portfolioPercentage: 18,
      clientsAffected: 167,
      totalValue: "$6.8M",
      category: "Saldos Pasivos",
      portfolioImpact: "alto" as const,
      dimensions: [
        { name: "Meta Dashboard", icon: Target, description: "Saldos Pasivos: $42.2M / Meta: $40.0M · Mantener ventaja" },
        { name: "Comportamiento transaccional", icon: CreditCard, description: "Perfil ahorrador · Saldos líquidos promedio $40K+" },
        { name: "Insights predictivos", icon: TrendingUp, description: "Alto potencial ahorro · Propensión captación 78%" },
        { name: "Comparativa de mercado", icon: Globe, description: "Tasa competitiva vs mercado · Ventaja 0.8pp" },
      ],
    },
    {
      id: "camp-3",
      title: "Colocación Hipotecaria - Segmento Alto",
      description: "142 clientes con perfil para crédito hipotecario. Segmento premium con capacidad de enganche 30%+. Impulso fuerte para Saldos Activos con montos significativos.",
      portfolioPercentage: 15,
      clientsAffected: 142,
      totalValue: "$8.5M",
      category: "Saldos Activos",
      portfolioImpact: "alto" as const,
      dimensions: [
        { name: "Meta Dashboard", icon: Target, description: "Saldos Activos: $10.9M / Meta: $11.0M · Impulso alto" },
        { name: "Snapshot de relación", icon: BarChart3, description: "Ingresos $150K+ · Capacidad enganche >30%" },
        { name: "Insights predictivos", icon: TrendingUp, description: "Interés hipotecario detectado · Score >800" },
        { name: "Ciclo de vida y madurez", icon: Clock, description: "35-45 años · Fase expansión familiar" },
      ],
    },
    {
      id: "camp-4",
      title: "Upselling Vinculación - Multi-producto",
      description: "124 clientes con 1-2 productos activos. Oportunidad para incrementar vinculación a través de cross-sell estratégico. Meta: aumentar % clientes con Alta Vinculación de 62% a 65%.",
      portfolioPercentage: 12,
      clientsAffected: 124,
      totalValue: "$5.2M",
      category: "Alta Vinculación",
      portfolioImpact: "medio" as const,
      dimensions: [
        { name: "Meta Dashboard", icon: Target, description: "Alta Vinculación: 62% / Meta: 60% · Ampliar ventaja" },
        { name: "Snapshot de relación", icon: BarChart3, description: "1-2 productos · AUM promedio $1.8M" },
        { name: "Insights predictivos", icon: TrendingUp, description: "Propensión multi-producto 82%" },
        { name: "Servicios complementarios", icon: Briefcase, description: "Paquetes premium · Beneficios adicionales" },
      ],
    },
    {
      id: "camp-5",
      title: "Retención Pasivos - Inversiones Q2",
      description: "135 clientes con DPs venciendo en 30 días. Renovación con mejora de tasas según perfil para mantener Saldos Pasivos y fortalecer Contribución Neta.",
      portfolioPercentage: 14,
      clientsAffected: 135,
      totalValue: "$7.4M",
      category: "Saldos Pasivos",
      portfolioImpact: "medio" as const,
      dimensions: [
        { name: "Meta Dashboard", icon: Target, description: "Contribución Neta: $45.3M / Meta: $44.0M · Consolidar" },
        { name: "Triggers operativos", icon: Bell, description: "135 DPs vencen en 30 días · Ventana óptima" },
        { name: "Insights predictivos", icon: TrendingUp, description: "Propensión renovación 88% · Score churn bajo" },
        { name: "Comportamiento transaccional", icon: CreditCard, description: "Clientes recurrentes · Patrón estable" },
      ],
    },
    {
      id: "camp-6",
      title: "Cross-sell Tarjetas Premium",
      description: "89 clientes con alto gasto mensual sin TC premium. Ofrecer tarjeta con beneficios exclusivos para incrementar Contribución Neta a través de comisiones y uso.",
      portfolioPercentage: 8,
      clientsAffected: 89,
      totalValue: "$2.1M",
      category: "Contribución Neta",
      portfolioImpact: "bajo" as const,
      dimensions: [
        { name: "Meta Dashboard", icon: Target, description: "Contribución Neta: $45.3M / Meta: $44.0M · Optimizar" },
        { name: "Comportamiento transaccional", icon: CreditCard, description: "Gasto mensual $12K+ · Sin TC premium" },
        { name: "Insights predictivos", icon: TrendingUp, description: "Propensión TC 76% · CLV proyectado alto" },
        { name: "Servicios complementarios", icon: Briefcase, description: "Cashback 3% · Seguros incluidos" },
      ],
    },
  ]);

  // Reset analysis on mount
  useEffect(() => {
    setShowAnalysis(true);
  }, []);

  const handleAnalysisComplete = () => {
    setTimeout(() => {
      setShowAnalysis(false);
    }, 300);
  };

  // Show ARIA analysis loader on initial load
  if (showAnalysis) {
    return (
      <ARIACampaignAnalysisLoader onComplete={handleAnalysisComplete} />
    );
  }

  const handleAccept = (id: string) => {
    console.log("Campaign accepted:", id);
    setCampaigns(campaigns.filter((c) => c.id !== id));
    toast({
      title: "Campaña Iniciada",
      description: "La campaña ha sido programada y activada.",
    });
  };

  const handleDismiss = (id: string) => {
    console.log("Campaign dismissed:", id);
    setCampaigns(campaigns.filter((c) => c.id !== id));
    toast({
      title: "Campaña Descartada",
      description: "La campaña ha sido eliminada.",
    });
  };

  const highImpact = campaigns.filter((c) => c.portfolioImpact === "alto");
  const mediumImpact = campaigns.filter((c) => c.portfolioImpact === "medio");
  const lowImpact = campaigns.filter((c) => c.portfolioImpact === "bajo");

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-accent animate-pulse" />
          <Badge variant="outline" className="gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            ProIngenius · 14 dimensiones procesadas
          </Badge>
        </div>
        <h1 className="text-3xl font-semibold flex items-center gap-2">
          <Target className="h-8 w-8" />
          Enfoque Campaña
        </h1>
        <p className="text-muted-foreground">
          Victor Hugo Pavon · Prioritario Plus · ARIA analizó 1020 clientes · {campaigns.length} oportunidades detectadas
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-all-campaigns">
            Todas ({campaigns.length})
          </TabsTrigger>
          <TabsTrigger value="high" data-testid="tab-high-impact">
            Alto Impacto ≥15% ({highImpact.length})
          </TabsTrigger>
          <TabsTrigger value="medium" data-testid="tab-medium-impact">
            Medio 5-15% ({mediumImpact.length})
          </TabsTrigger>
          <TabsTrigger value="low" data-testid="tab-low-impact">
            Bajo &lt;5% ({lowImpact.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onAccept={handleAccept}
              onDismiss={handleDismiss}
            />
          ))}
        </TabsContent>

        <TabsContent value="high" className="space-y-4">
          {highImpact.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onAccept={handleAccept}
              onDismiss={handleDismiss}
            />
          ))}
        </TabsContent>

        <TabsContent value="medium" className="space-y-4">
          {mediumImpact.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onAccept={handleAccept}
              onDismiss={handleDismiss}
            />
          ))}
        </TabsContent>

        <TabsContent value="low" className="space-y-4">
          {lowImpact.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onAccept={handleAccept}
              onDismiss={handleDismiss}
            />
          ))}
        </TabsContent>
      </Tabs>

      {/* ARIA Campaign System Prompt Viewer */}
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <CardTitle>Sistema de Prompts ARIA Campañas</CardTitle>
            </div>
            <Badge variant="outline" className="gap-1">
              <FileText className="h-3 w-3" />
              Mega Prompt v1.0
            </Badge>
          </div>
          <CardDescription>
            Prompt estratégico que dirige el análisis inteligente de campañas NBA+
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Collapsible open={showPrompt} onOpenChange={setShowPrompt}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between"
                data-testid="button-toggle-campaign-prompt"
              >
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {showPrompt ? "Ocultar Prompt Utilizado" : "Ver Prompt Utilizado"}
                </span>
                {showPrompt ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              {showPrompt && (
                <>
                  <div className="rounded-md bg-muted p-4 border">
                    <pre className="text-xs whitespace-pre-wrap font-mono leading-relaxed" data-testid="text-campaign-prompt">
                      {ARIA_CAMPAIGN_PROMPT}
                    </pre>
                  </div>
                  <div className="mt-4 p-3 bg-accent/10 rounded-md border border-accent/20">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Nota:</span> Este prompt especializado combina 
                      segmentación inteligente, modelos predictivos y análisis de ROI para priorizar campañas con 
                      el mayor potencial de impacto en el portafolio del ejecutivo.
                    </p>
                  </div>
                </>
              )}
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
}
