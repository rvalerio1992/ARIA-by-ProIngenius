import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  User, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Building2,
  AlertTriangle,
  PlusCircle,
  MinusCircle,
  Shield,
  ChevronDown,
  ChevronUp,
  FileText
} from "lucide-react";
import { Link } from "wouter";
import { MCCConsumptionChart } from "@/components/mcc-consumption-chart";
import { CardUsageHistoryChart } from "@/components/card-usage-history-chart";
import { ARIAAnalysisLoader } from "@/components/aria-analysis-loader";

interface ClientProfile {
  sexo: string;
  edad: number;
  ingreso: number;
  antiguedad_laboral: number;
  sector_publico_flag: number;
}

interface Client {
  cliente_id: string;
  perfil: ClientProfile;
  resumen: string;
}

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

interface ClientWithInsights {
  cliente_id: string;
  perfil: ClientProfile;
  resumen: string;
  insights: ClientInsights;
}

// ARIA System Prompt usado para generar análisis 1:1
const ARIA_SYSTEM_PROMPT = `Eres un ANALISTA BANCARIO DE CLASE MUNDIAL que actúa como el GEMELO EJECUTIVO de un Relationship Manager (RM) del Banco Promerica. 
Tu misión es generar un ANÁLISIS 1-A-1 INTEGRAL Y ACCIONABLE de un cliente, combinando datos estructurados, contexto relacional y señales predictivas, 
para preparar al ejecutivo antes de cada interacción. 

───────────────────────────────
🎯 OBJETIVO
───────────────────────────────
Producir un BRIEF EJECUTIVO de alto nivel que un banquero podría leer antes de reunirse con su cliente más importante. 
Debe sonar profesional, humano, conciso y centrado en decisiones y acciones, no en teoría.

───────────────────────────────
🧩 FUENTES DE INFORMACIÓN
───────────────────────────────
Basar el análisis en los siguientes tipos de datos:

- Estructurados: productos, saldos, límites vs. utilización, NPS, antigüedad, segmento.
- No estructurados: notas de visitas, minutas, comentarios del ejecutivo, sentimientos o señales en reclamos.
- Predictivos: propensión a inversión, probabilidad de churn, CLV, mora, riesgo crediticio.
- Operativos: vencimientos, alertas KYC/AML, reclamos abiertos, cambios de nómina o variaciones de liquidez.

───────────────────────────────
🧠 ROL Y ESTILO DE RESPUESTA
───────────────────────────────
- Actúa como un **Asesor Bancario Cognitivo**, con mentalidad híbrida entre analista financiero, estratega relacional y copiloto de IA.
- Redacta con tono **profesional, proactivo y humano**, sin tecnicismos innecesarios.
- Utiliza un formato estructurado, con títulos claros, bullets e íconos si aplican.
- Cada sección debe cerrar con una línea que empiece con "🔹 Acción sugerida: …"
- Si faltan datos, deduce de forma prudente o explica qué información sería útil recolectar.

───────────────────────────────
📊 ESTRUCTURA ESPERADA DEL OUTPUT
───────────────────────────────

1️⃣ SNAPSHOT DE RELACIÓN (Contexto actual)
Describe brevemente la situación financiera, el nivel de satisfacción y la dinámica reciente del cliente. 
Incluye saldos, productos clave, engagement digital o señales de fricción.
🔹 Acción sugerida: …

2️⃣ INSIGHTS PREDICTIVOS (Qué podría pasar)
Resume las predicciones relevantes: probabilidad de churn, propensión a inversión, o señales de riesgo. 
Conecta cada insight con su posible impacto comercial o de retención.
🔹 Acción sugerida: …

3️⃣ OPORTUNIDADES IDENTIFICADAS (Potencial de valor)
Identifica oportunidades específicas que el ejecutivo podría accionar: inversión, fondeo, seguros, préstamos, etc. 
Prioriza las de mayor impacto económico esperado.
🔹 Acción sugerida: …

4️⃣ RIESGOS Y VULNERABILIDADES (Alertas preventivas)
Menciona señales de deterioro o riesgo operativo y crediticio. Evalúa si son transitorias o estructurales. 
Incluye recomendaciones preventivas.
🔹 Acción sugerida: …

5️⃣ NEXT BEST ACTION (Síntesis ejecutiva)
Formula una recomendación concreta y personalizada: qué debe hacer el ejecutivo, por qué, a través de qué canal (visita, llamada, email) 
y con qué enfoque de conversación.
🔹 Acción sugerida: …

───────────────────────────────
⚙️ REQUISITOS DE CALIDAD
───────────────────────────────
- Integra razonamiento causal ("Dado que… se recomienda…").
- No repitas datos, sintetiza y extrae insights.
- Evita frases genéricas ("mejorar la relación", "ofrecer productos"), sé específico.
- Si detectas conflictos de datos, acláralos.
- La redacción final debe sentirse como un informe hecho por un banquero senior con mentalidad de IA.

───────────────────────────────
🧩 PROMPT DE EJECUCIÓN
───────────────────────────────
Actúa como un Asesor Bancario Cognitivo experto en gestión relacional 1-a-1. 
Analiza el siguiente contexto de cliente y genera un BRIEF EJECUTIVO con la estructura, estilo y calidad definidos arriba.

Contexto del cliente:
{{contexto_cliente}}

Recuerda: tu salida será leída por un ejecutivo frente a un cliente Premium; 
debe sonar precisa, elegante y directamente accionable.`;

export default function ClientVista360() {
  const { id } = useParams();
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  
  // Fetch client details with insights
  const { data: clientData, isLoading, error } = useQuery<ClientWithInsights>({
    queryKey: ['/api/clients', id, 'insights'],
    queryFn: async () => {
      const response = await fetch(`/api/clients/${id}/insights`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch client insights');
      }
      return response.json();
    },
    enabled: !!id,
  });
  
  // Reset analysis state when client changes
  useEffect(() => {
    setShowAnalysis(true);
    setAnalysisComplete(false);
  }, [id]);
  
  const handleAnalysisComplete = () => {
    setAnalysisComplete(true);
    setTimeout(() => {
      setShowAnalysis(false);
    }, 300);
  };
  
  // Mock data for additional metrics (these would come from API in production)
  const nivelRiesgo = "Bajo"; // Bajo, Medio, Alto
  const bancoPrincipal = "Promerica"; // Promerica, BAC, BCR, Otro
  const nuevosProductos30d = 2; // Productos adquiridos últimos 30 días
  const cancelaciones30d = 0; // Productos cancelados últimos 30 días
  
  // Show loading skeleton while fetching data
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }
  
  // Show ARIA analysis loader after data is loaded but before showing Vista 360
  if (clientData && showAnalysis) {
    return (
      <ARIAAnalysisLoader
        clientName={clientData.cliente_id}
        onComplete={handleAnalysisComplete}
      />
    );
  }
  
  if (error || !clientData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-16 w-16 text-destructive" />
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Cliente no encontrado</h2>
          <p className="text-muted-foreground mb-4">
            No pudimos cargar la información del cliente {id}
          </p>
          <Button asChild data-testid="button-back-to-clients">
            <Link href="/clients">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Clientes
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const { perfil, resumen, insights } = clientData;
  const esSectorPublico = perfil.sector_publico_flag === 1;
  
  // Determine risk badge color
  const getRiskColor = (nivel: string) => {
    if (nivel === "Bajo") return "bg-green-600/10 text-green-600";
    if (nivel === "Medio") return "bg-yellow-600/10 text-yellow-600";
    return "bg-red-600/10 text-red-600";
  };
  
  // Determine bank principal badge color
  const getBankColor = (banco: string) => {
    if (banco === "Promerica") return "bg-accent/10 text-accent";
    return "bg-muted text-muted-foreground";
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4" 
          asChild
          data-testid="button-back"
        >
          <Link href="/clients">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Clientes
          </Link>
        </Button>
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-3xl font-semibold" data-testid="text-client-id">
                {clientData.cliente_id}
              </h1>
              <Badge 
                variant={esSectorPublico ? "default" : "outline"}
                data-testid="badge-sector"
              >
                {esSectorPublico ? "Sector Público" : "Sector Privado"}
              </Badge>
              <Badge 
                variant="secondary" 
                className={getRiskColor(nivelRiesgo)}
                data-testid="badge-risk-level"
              >
                <Shield className="h-3 w-3 mr-1" />
                Riesgo: {nivelRiesgo}
              </Badge>
              <Badge 
                variant="secondary"
                className={getBankColor(bancoPrincipal)}
                data-testid="badge-main-bank"
              >
                <Building2 className="h-3 w-3 mr-1" />
                Principal: {bancoPrincipal}
              </Badge>
              {nuevosProductos30d > 0 && (
                <Badge 
                  variant="secondary"
                  className="bg-blue-600/10 text-blue-600"
                  data-testid="badge-new-products"
                >
                  <PlusCircle className="h-3 w-3 mr-1" />
                  +{nuevosProductos30d} productos (30d)
                </Badge>
              )}
              {cancelaciones30d > 0 && (
                <Badge 
                  variant="secondary"
                  className="bg-orange-600/10 text-orange-600"
                  data-testid="badge-cancellations"
                >
                  <MinusCircle className="h-3 w-3 mr-1" />
                  {cancelaciones30d} cancelaciones (30d)
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground" data-testid="text-resumen">
              {resumen}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-sm text-muted-foreground">Análisis ARIA</span>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Edad</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-edad">{perfil.edad} años</div>
            <p className="text-xs text-muted-foreground">{perfil.sexo}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingreso Mensual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-ingreso">
              ${perfil.ingreso.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
            <p className="text-xs text-muted-foreground">USD/mes (aprox)</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Antigüedad Laboral</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-antiguedad">
              {perfil.antiguedad_laboral} meses
            </div>
            <p className="text-xs text-muted-foreground">
              ~{Math.round(perfil.antiguedad_laboral / 12)} años
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sector</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {esSectorPublico ? "Público" : "Privado"}
            </div>
            <p className="text-xs text-muted-foreground">Sector laboral</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content - 4 Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 1. Snapshot Ejecutivo */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Snapshot Ejecutivo
            </CardTitle>
            <CardDescription>
              Resumen del valor del cliente y posicionamiento en cartera
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed" data-testid="text-snapshot">
              {insights.snapshot_ejecutivo}
            </p>
          </CardContent>
        </Card>
        
        {/* 2. Análisis de Comportamiento */}
        <Card>
          <CardHeader>
            <CardTitle>Análisis de Comportamiento</CardTitle>
            <CardDescription>
              Patrón transaccional y tendencias detectadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">Patrón Transaccional</h4>
              <p className="text-sm text-muted-foreground" data-testid="text-patron">
                {insights.analisis_comportamiento.patron_transaccional}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Engagement Digital</h4>
              <p className="text-sm text-muted-foreground" data-testid="text-engagement">
                {insights.analisis_comportamiento.engagement_digital}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Tendencias</h4>
              <p className="text-sm text-muted-foreground" data-testid="text-tendencias">
                {insights.analisis_comportamiento.tendencias}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* 3. Oportunidades Detectadas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Oportunidades Detectadas
            </CardTitle>
            <CardDescription>
              NBA+ y cross-sell recomendados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">Top 3 Productos NBA+</h4>
              <ul className="space-y-1">
                {insights.oportunidades.productos_nba.map((producto, i) => (
                  <li key={i} className="text-sm flex items-start gap-2" data-testid={`text-producto-${i}`}>
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{producto}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Cross-sell</h4>
              <p className="text-sm text-muted-foreground" data-testid="text-cross-sell">
                {insights.oportunidades.cross_sell}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Momentos de Vida</h4>
              <p className="text-sm text-muted-foreground" data-testid="text-momentos-vida">
                {insights.oportunidades.momentos_vida}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* 4. Alertas y Riesgos */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Alertas y Riesgos
            </CardTitle>
            <CardDescription>
              Señales de churn, documentos y compliance
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                {insights.alertas_riesgos.churn.includes("Sin señales") ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                Churn
              </h4>
              <p className="text-sm text-muted-foreground" data-testid="text-churn">
                {insights.alertas_riesgos.churn}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                {insights.alertas_riesgos.documentos.includes("al día") || 
                 insights.alertas_riesgos.documentos.includes("Todos") ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                Documentos
              </h4>
              <p className="text-sm text-muted-foreground" data-testid="text-documentos">
                {insights.alertas_riesgos.documentos}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1 flex items-center gap-2">
                {insights.alertas_riesgos.compliance.includes("Compliant") ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                Compliance
              </h4>
              <p className="text-sm text-muted-foreground" data-testid="text-compliance">
                {insights.alertas_riesgos.compliance}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 5. MCC Consumption Chart */}
        <MCCConsumptionChart />
        
        {/* 6. Card Usage History Chart */}
        <CardUsageHistoryChart />
        
        {/* 7. ARIA System Prompt Viewer */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <CardTitle>Sistema de Prompts ARIA</CardTitle>
              </div>
              <Badge variant="outline" className="gap-1">
                <FileText className="h-3 w-3" />
                Mega Prompt v1.1
              </Badge>
            </div>
            <CardDescription>
              Prompt profesional perfeccionado que dirige el análisis 1:1 de ARIA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Collapsible open={showPrompt} onOpenChange={setShowPrompt}>
              <CollapsibleTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  data-testid="button-toggle-prompt"
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
                      <pre className="text-xs whitespace-pre-wrap font-mono leading-relaxed" data-testid="text-system-prompt">
                        {ARIA_SYSTEM_PROMPT}
                      </pre>
                    </div>
                    <div className="mt-4 p-3 bg-accent/10 rounded-md border border-accent/20">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Nota:</span> Este mega prompt ha sido perfeccionado 
                        iterativamente para generar análisis bancarios de clase mundial, combinando estructura profesional, 
                        insights accionables y tono ejecutivo apropiado para relaciones Premium.
                      </p>
                    </div>
                  </>
                )}
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
