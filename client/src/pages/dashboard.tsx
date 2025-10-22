import { MetricCard } from "@/components/metric-card";
import { ClientProfileCard } from "@/components/client-profile-card";
import { RecommendationCard } from "@/components/recommendation-card";
import { ActivityTimeline } from "@/components/activity-timeline";
import { PortfolioHealthWidget } from "@/components/portfolio-health-widget";
import { DollarSign, Users, TrendingUp, Target, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// TODO: Remove mock data
import avatar1 from "@assets/generated_images/Hispanic_male_executive_headshot_11740d94.png";
import avatar2 from "@assets/generated_images/Asian_female_executive_headshot_f90e7ca6.png";

export default function Dashboard() {
  const { toast } = useToast();

  // TODO: Remove mock data
  const topClient = {
    id: "cl-1",
    name: "Roberto Fernández",
    avatar: avatar1,
    segment: "Ultra Premium",
    industry: "Tecnología",
    aum: "$3.2M",
    lastInteraction: "Hace 2 días - Llamada",
    sentiment: "positive" as const,
    riskLevel: "bajo" as const,
    kycStatus: "compliant" as const,
    email: "roberto.fernandez@email.com",
    phone: "+1 555 0123",
  };

  // TODO: Remove mock data
  const topRecommendation = {
    id: "rec-1",
    title: "Renovación Anticipada de Depósito a Plazo",
    description: "Cliente tiene DP venciendo en 5 días. Proponer renovación con tasa preferencial 4.5% considerando su perfil de bajo riesgo y AUM superior a $2M.",
    impactScore: 8.5,
    probability: 85,
    value: "$45,000",
    risk: "Bajo",
    category: "Retención",
    priority: "alta" as const,
  };

  // TODO: Remove mock data
  const recentActivity = [
    {
      id: "1",
      type: "call" as const,
      title: "Llamada con Ana Chen",
      description: "Discusión sobre nuevas oportunidades de inversión en mercados emergentes",
      timestamp: "Hace 2 horas",
      actor: "Tú",
    },
    {
      id: "2",
      type: "meeting" as const,
      title: "Reunión trimestral - Johnson Inc",
      description: "Revisión de cartera y ajuste de estrategia para Q2 2025",
      timestamp: "Hace 1 día",
      actor: "Carlos Ruiz",
    },
    {
      id: "3",
      type: "email" as const,
      title: "Propuesta enviada a Martínez Group",
      description: "Información sobre nuevos fondos ESG y productos sustentables",
      timestamp: "Hace 3 días",
      actor: "Tú",
    },
  ];

  // TODO: Remove mock data
  const portfolioMetrics = [
    { label: "Clientes Sin Riesgo", value: 95, total: 127, status: "good" as const },
    { label: "KYC Actualizado", value: 118, total: 127, status: "good" as const },
    { label: "Requieren Seguimiento", value: 12, total: 127, status: "warning" as const },
    { label: "En Riesgo Alto", value: 3, total: 127, status: "critical" as const },
  ];

  const handleAcceptRecommendation = (id: string) => {
    console.log("Recommendation accepted:", id);
    toast({
      title: "Acción Iniciada",
      description: "Se ha programado la acción recomendada para este cliente.",
    });
  };

  const handleDismissRecommendation = (id: string) => {
    console.log("Recommendation dismissed:", id);
    toast({
      title: "Acción Descartada",
      description: "La recomendación ha sido eliminada de tu lista.",
    });
  };

  const handleContact = (type: "email" | "phone") => {
    console.log("Contact via:", type);
    toast({
      title: type === "email" ? "Email Abierto" : "Llamada Iniciada",
      description: `Se ha abierto ${type === "email" ? "tu cliente de email" : "el marcador telefónico"}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          <Badge variant="outline" className="gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            ARIA activo · Analizando 127 clientes
          </Badge>
        </div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Visión Global de Cartera · ARIA ha preparado tu resumen inteligente
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Saldos Activos"
          value="$45.2M"
          trend={{ value: 12.5, direction: "up" }}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Saldos Pasivos"
          value="$38.7M"
          trend={{ value: 8.3, direction: "up" }}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Contribución Neta"
          value="$6.5M"
          trend={{ value: 4.2, direction: "up" }}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricCard
          title="Acciones Pendientes"
          value="18"
          icon={<Target className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Acción Prioritaria</h2>
            <RecommendationCard
              recommendation={topRecommendation}
              onAccept={handleAcceptRecommendation}
              onDismiss={handleDismissRecommendation}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Cliente Destacado</h2>
            <ClientProfileCard client={topClient} onContact={handleContact} />
          </div>
        </div>

        <div className="space-y-6">
          <PortfolioHealthWidget metrics={portfolioMetrics} />
          <ActivityTimeline items={recentActivity} />
        </div>
      </div>
    </div>
  );
}
