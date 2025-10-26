import { useState } from "react";
import { CampaignCard } from "@/components/campaign-card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Target, Sparkles, Bell, TrendingUp, CreditCard, Shield, Heart, Smartphone, User, Globe, MessageSquare, BarChart3, Clock, Briefcase } from "lucide-react";

export default function Recommendations() {
  const { toast } = useToast();

  // Campañas alineadas con metas del dashboard (Saldos Pasivos, Saldos Activos, Contribución Neta, Alta Principalidad)
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
      title: "Upselling Principalidad - Multi-producto",
      description: "124 clientes con 1-2 productos activos. Oportunidad para incrementar principalidad a través de cross-sell estratégico. Meta: aumentar % clientes con Alta Principalidad de 62% a 65%.",
      portfolioPercentage: 12,
      clientsAffected: 124,
      totalValue: "$5.2M",
      category: "Alta Principalidad",
      portfolioImpact: "medio" as const,
      dimensions: [
        { name: "Meta Dashboard", icon: Target, description: "Alta Principalidad: 62% / Meta: 60% · Ampliar ventaja" },
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
    </div>
  );
}
