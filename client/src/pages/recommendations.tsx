import { useState } from "react";
import { CampaignCard } from "@/components/campaign-card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Target, Sparkles, Bell, TrendingUp, CreditCard, Shield, Heart, Smartphone, User, Globe, MessageSquare, BarChart3, Clock, Briefcase } from "lucide-react";

export default function Recommendations() {
  const { toast } = useToast();

  // TODO: Remove mock data - Campaign opportunities with ProIngenius dimensions
  const [campaigns, setCampaigns] = useState([
    {
      id: "camp-1",
      title: "Renovación Anticipada DP Q1 2025",
      description: "184 clientes con DPs venciendo entre 5-15 días. Oportunidad de retención con tasas preferenciales basadas en perfil de bajo riesgo y AUM promedio de $2.3M.",
      portfolioPercentage: 18,
      clientsAffected: 184,
      totalValue: "$8.4M",
      category: "Retención Masiva",
      portfolioImpact: "alto" as const,
      dimensions: [
        { name: "Triggers operativos", icon: Bell, description: "184 DPs vencen en 5-15 días" },
        { name: "Snapshot de relación", icon: BarChart3, description: "AUM promedio $2.3M · Segmento Premium+" },
        { name: "Insights predictivos", icon: TrendingUp, description: "89% propensión a renovar · Score churn bajo" },
        { name: "Comportamiento transaccional", icon: CreditCard, description: "Depósitos estables +12% vs trimestre anterior" },
      ],
    },
    {
      id: "camp-2",
      title: "Campaña ESG - Inversión Sostenible",
      description: "112 clientes han mostrado engagement digital en contenido ESG. Proponer fondos sostenibles con rendimiento 7.2% anual alineado con valores de sustentabilidad.",
      portfolioPercentage: 11,
      clientsAffected: 112,
      totalValue: "$5.8M",
      category: "Cross-sell",
      portfolioImpact: "medio" as const,
      dimensions: [
        { name: "Engagement digital", icon: Smartphone, description: "3+ visitas a contenido ESG en 30 días" },
        { name: "Perfil sociodemográfico", icon: User, description: "45-60 años · Ingresos altos · Educación superior" },
        { name: "Sentimiento del cliente", icon: Heart, description: "NPS 8+ · Interés expresado en sustentabilidad" },
        { name: "Contexto macroeconómico", icon: Globe, description: "Flujos ESG +$24B este trimestre" },
      ],
    },
    {
      id: "camp-3",
      title: "Refresh KYC Preventivo",
      description: "156 clientes con documentación KYC venciendo en 15-30 días. Iniciar proceso de renovación preventiva para mantener cumplimiento y evitar restricciones operativas.",
      portfolioPercentage: 15,
      clientsAffected: 156,
      totalValue: "$12.8M",
      category: "Cumplimiento Preventivo",
      portfolioImpact: "alto" as const,
      dimensions: [
        { name: "Triggers operativos", icon: Bell, description: "156 KYC vencen en 15-30 días" },
        { name: "Riesgos & cumplimiento", icon: Shield, description: "Documentación por actualizar · Sin alertas PEP/FATCA" },
        { name: "Historial de interacción", icon: MessageSquare, description: "No contactados en 60+ días" },
      ],
    },
    {
      id: "camp-4",
      title: "TC Cashback - Alto Gasto Comercios",
      description: "92 clientes con alto gasto en comercios ($15K+ mensual) sin tarjeta premium. Ofrecer TC con 3% cashback en categoría dominante.",
      portfolioPercentage: 9,
      clientsAffected: 92,
      totalValue: "$2.1M",
      category: "Cross-sell",
      portfolioImpact: "medio" as const,
      dimensions: [
        { name: "Comportamiento transaccional", icon: CreditCard, description: "$15K+ gasto mensual · Categoría: comercios" },
        { name: "Snapshot de relación", icon: BarChart3, description: "Sin TC premium · Línea crédito subutilizada 20%" },
        { name: "Insights predictivos", icon: TrendingUp, description: "72% propensión a producto · CLV alto" },
        { name: "Servicios complementarios", icon: Briefcase, description: "Oportunidad cross-sell seguro + beneficios" },
      ],
    },
    {
      id: "camp-5",
      title: "Planificación Fiscal Premium",
      description: "67 clientes Ultra Premium sin asesoría fiscal activa. Ofrecer consulta gratuita para optimización tributaria 2025 y retención de patrimonio.",
      portfolioPercentage: 7,
      clientsAffected: 67,
      totalValue: "$1.8M",
      category: "Cross-sell",
      portfolioImpact: "medio" as const,
      dimensions: [
        { name: "Ciclo de vida y madurez", icon: Clock, description: "Fase consolidación patrimonial · Clientes 50+ años" },
        { name: "Snapshot de relación", icon: BarChart3, description: "AUM $3M+ · Sin servicio asesoría activo" },
        { name: "Perfil sociodemográfico", icon: User, description: "Ingresos $200K+ · Empresarios/ejecutivos" },
      ],
    },
    {
      id: "camp-6",
      title: "Retención - Riesgo Churn Detectado",
      description: "48 clientes con score de churn medio-alto. Contacto preventivo con oferta de mejora en condiciones actuales basada en competencia de mercado.",
      portfolioPercentage: 5,
      clientsAffected: 48,
      totalValue: "$3.2M",
      category: "Retención",
      portfolioImpact: "bajo" as const,
      dimensions: [
        { name: "Insights predictivos", icon: TrendingUp, description: "Score churn 60-80% · Probabilidad fuga 6 meses" },
        { name: "Sentimiento del cliente", icon: Heart, description: "NPS <6 · Sentimiento negativo detectado" },
        { name: "Comparativa de mercado", icon: Globe, description: "Competencia ofrece mejores tasas en 2 productos" },
        { name: "Historial de interacción", icon: MessageSquare, description: "Ofertas previas rechazadas · 90+ días sin contacto" },
        { name: "Impacto acciones previas", icon: BarChart3, description: "Campañas anteriores sin éxito · Requiere ajuste" },
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
