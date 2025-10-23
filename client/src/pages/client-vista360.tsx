import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  User, 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Sparkles
} from "lucide-react";
import { Link } from "wouter";

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

export default function ClientVista360() {
  const { id } = useParams();
  
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
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-semibold" data-testid="text-client-id">
                {clientData.cliente_id}
              </h1>
              <Badge 
                variant={esSectorPublico ? "default" : "outline"}
                data-testid="badge-sector"
              >
                {esSectorPublico ? "Sector Público" : "Sector Privado"}
              </Badge>
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Edad</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-edad">{perfil.edad} años</div>
            <p className="text-xs text-muted-foreground">{perfil.sexo}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingreso Mensual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-ingreso">
              ₡{perfil.ingreso.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">CRC/mes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
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
      </div>
    </div>
  );
}
