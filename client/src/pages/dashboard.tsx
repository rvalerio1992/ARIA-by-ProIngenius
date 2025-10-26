import { MetricCard } from "@/components/metric-card";
import { ClientProfileCard } from "@/components/client-profile-card";
import { ActivityTimeline } from "@/components/activity-timeline";
import { PortfolioHealthWidget } from "@/components/portfolio-health-widget";
import { CampaignSummaryWidget } from "@/components/campaign-summary-widget";
import { DollarSign, Users, TrendingUp, Target, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

// TODO: Remove mock data
import avatar1 from "@assets/generated_images/Hispanic_male_executive_headshot_11740d94.png";
import avatar2 from "@assets/generated_images/Asian_female_executive_headshot_f90e7ca6.png";

interface MetricsData {
  captaciones_crc: number;
  colocaciones_crc: number;
  neto_crc: number;
  n_clientes: number;
}

interface ClientStats {
  total: number;
  sectorPublico: number;
  sectorPrivado: number;
  mujeres: number;
  hombres: number;
  edadPromedio: number;
  ingresoPromedio: number;
}

export default function Dashboard() {
  const { toast } = useToast();
  
  // Fetch real metrics from API
  const { data: metrics, isLoading: metricsLoading } = useQuery<MetricsData>({
    queryKey: ['/api/metrics'],
  });
  
  // Fetch client stats
  const { data: clientStats, isLoading: statsLoading } = useQuery<ClientStats>({
    queryKey: ['/api/clients/stats'],
  });

  // Calculated values for USD (usando los valores existentes como USD)
  const saldosPasivos = metrics?.captaciones_crc || 42196704;
  const saldosActivos = metrics?.colocaciones_crc || 10931313;
  const contribucionNeta = 45280500; // Valor inventado para Contribución Neta
  const principalidadAlta = 62; // % de clientes con alta principalidad
  
  // Metas YTD (inventadas)
  const metaSaldosPasivos = 40000000;
  const metaSaldosActivos = 11000000;
  const metaContribucionNeta = 44000000;
  const metaPrincipalidadAlta = 60; // Meta de 60% de clientes con alta principalidad
  
  // Calcular diferencias porcentuales con meta
  const diffPasivosPct = ((saldosPasivos - metaSaldosPasivos) / metaSaldosPasivos * 100);
  const diffActivosPct = ((saldosActivos - metaSaldosActivos) / metaSaldosActivos * 100);
  const diffContribucionPct = ((contribucionNeta - metaContribucionNeta) / metaContribucionNeta * 100);
  const diffPrincipalidadPct = principalidadAlta - metaPrincipalidadAlta; // Diferencia absoluta en puntos porcentuales

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

  // Campañas alineadas con metas del dashboard
  const activeCampaigns = [
    {
      id: "camp-1",
      title: "Impulso Colocaciones - Créditos Personales",
      portfolioPercentage: 22,
      clientsAffected: 198,
      totalValue: "$4.2M",
      category: "Saldos Activos",
      portfolioImpact: "alto" as const,
      metaRelacionada: "Saldos Activos"
    },
    {
      id: "camp-2",
      title: "Captación DP Premium - Tasa Preferencial",
      portfolioPercentage: 18,
      clientsAffected: 167,
      totalValue: "$6.8M",
      category: "Saldos Pasivos",
      portfolioImpact: "alto" as const,
      metaRelacionada: "Saldos Pasivos"
    },
    {
      id: "camp-3",
      title: "Colocación Hipotecaria - Segmento Alto",
      portfolioPercentage: 15,
      clientsAffected: 142,
      totalValue: "$8.5M",
      category: "Saldos Activos",
      portfolioImpact: "alto" as const,
      metaRelacionada: "Saldos Activos"
    },
    {
      id: "camp-4",
      title: "Upselling Principalidad - Multi-producto",
      portfolioPercentage: 12,
      clientsAffected: 124,
      totalValue: "$5.2M",
      category: "Alta Principalidad",
      portfolioImpact: "medio" as const,
      metaRelacionada: "Alta Principalidad"
    },
    {
      id: "camp-5",
      title: "Retención Pasivos - Inversiones Q2",
      portfolioPercentage: 14,
      clientsAffected: 135,
      totalValue: "$7.4M",
      category: "Saldos Pasivos",
      portfolioImpact: "medio" as const,
      metaRelacionada: "Contribución Neta"
    },
    {
      id: "camp-6",
      title: "Cross-sell Tarjetas Premium",
      portfolioPercentage: 8,
      clientsAffected: 89,
      totalValue: "$2.1M",
      category: "Contribución Neta",
      portfolioImpact: "bajo" as const,
      metaRelacionada: "Contribución Neta"
    },
  ];

  // TODO: Remove mock data
  const recentActivity = [
    {
      id: "1",
      type: "call" as const,
      title: "Llamada con Ana Chen",
      description: "Discusión sobre nuevas oportunidades de inversión en mercados emergentes",
      timestamp: "Hace 2 horas",
      actor: "Victor Hugo Pavon",
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
      actor: "Victor Hugo Pavon",
    },
  ];

  // Portfolio metrics based on real client stats
  const totalClients = clientStats?.total || 926;
  const portfolioMetrics = [
    { 
      label: "Sector Público", 
      value: clientStats?.sectorPublico || 312, 
      total: totalClients, 
      status: "good" as const 
    },
    { 
      label: "Sector Privado", 
      value: clientStats?.sectorPrivado || 614, 
      total: totalClients, 
      status: "good" as const 
    },
    { 
      label: "Requieren Seguimiento", 
      value: Math.round(totalClients * 0.09), 
      total: totalClients, 
      status: "warning" as const 
    },
    { 
      label: "En Riesgo Alto", 
      value: Math.round(totalClients * 0.02), 
      total: totalClients, 
      status: "critical" as const 
    },
  ];

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
          <Badge variant="outline" className="gap-1" data-testid="badge-aria-status">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            ARIA activo · Analizando {clientStats?.total || 926} clientes
          </Badge>
        </div>
        <h1 className="text-3xl font-semibold">Análisis de Cartera</h1>
        <p className="text-muted-foreground">
          Bienvenido Victor Hugo Pavon · ARIA te ha preparado tu resumen inteligente
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Saldos Pasivos"
          value={metricsLoading ? "Cargando..." : `$${(saldosPasivos / 1000000).toFixed(1)}M`}
          trend={{ value: Math.abs(diffPasivosPct), direction: diffPasivosPct >= 0 ? "up" : "down" }}
          status={{
            label: diffPasivosPct >= 0 ? "Sobre meta" : "Bajo meta",
            type: diffPasivosPct >= 0 ? "success" : "warning"
          }}
          subtitle={`Meta YTD: $${(metaSaldosPasivos / 1000000).toFixed(1)}M`}
          icon={<DollarSign className="h-4 w-4" />}
          data-testid="metric-saldos-pasivos"
        />
        <MetricCard
          title="Saldos Activos"
          value={metricsLoading ? "Cargando..." : `$${(saldosActivos / 1000000).toFixed(1)}M`}
          trend={{ value: Math.abs(diffActivosPct), direction: diffActivosPct >= 0 ? "up" : "down" }}
          status={{
            label: diffActivosPct >= 0 ? "Sobre meta" : "Bajo meta",
            type: diffActivosPct >= 0 ? "success" : "warning"
          }}
          subtitle={`Meta YTD: $${(metaSaldosActivos / 1000000).toFixed(1)}M`}
          icon={<DollarSign className="h-4 w-4" />}
          data-testid="metric-saldos-activos"
        />
        <MetricCard
          title="Contribución Neta"
          value={`$${(contribucionNeta / 1000000).toFixed(1)}M`}
          trend={{ value: Math.abs(diffContribucionPct), direction: diffContribucionPct >= 0 ? "up" : "down" }}
          status={{
            label: diffContribucionPct >= 0 ? "Sobre meta" : "Bajo meta",
            type: diffContribucionPct >= 0 ? "success" : "warning"
          }}
          subtitle={`Meta YTD: $${(metaContribucionNeta / 1000000).toFixed(1)}M`}
          icon={<TrendingUp className="h-4 w-4" />}
          data-testid="metric-contribucion-neta"
        />
        <MetricCard
          title="% Clientes con Alta Principalidad"
          value={`${principalidadAlta.toFixed(0)}%`}
          trend={{ value: Math.abs(diffPrincipalidadPct), direction: diffPrincipalidadPct >= 0 ? "up" : "down" }}
          status={{
            label: diffPrincipalidadPct >= 0 ? "Sobre meta" : "Bajo meta",
            type: diffPrincipalidadPct >= 0 ? "success" : "warning"
          }}
          subtitle={`Meta YTD: ${metaPrincipalidadAlta.toFixed(0)}%`}
          icon={<Target className="h-4 w-4" />}
          data-testid="metric-principalidad-alta"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <CampaignSummaryWidget campaigns={activeCampaigns} />

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
