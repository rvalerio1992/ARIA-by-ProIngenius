import { useState } from "react";
import { RecommendationCard } from "@/components/recommendation-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Target, Sparkles } from "lucide-react";

export default function Recommendations() {
  const { toast } = useToast();

  // TODO: Remove mock data
  const [recommendations, setRecommendations] = useState([
    {
      id: "rec-1",
      title: "Renovación Anticipada de Depósito a Plazo",
      description: "Cliente Roberto Fernández tiene DP venciendo en 5 días. Proponer renovación con tasa preferencial 4.5% considerando su perfil de bajo riesgo y AUM superior a $2M.",
      impactScore: 8.5,
      probability: 85,
      value: "$45,000",
      risk: "Bajo",
      category: "Retención",
      priority: "alta" as const,
    },
    {
      id: "rec-2",
      title: "Propuesta de Fondo ESG Premium",
      description: "Ana Chen ha mostrado interés en inversiones sostenibles. Recomendar nuevo fondo ESG con rendimiento proyectado 7.2% anual y alineación con sus valores.",
      impactScore: 7.8,
      probability: 72,
      value: "$28,000",
      risk: "Medio",
      category: "Cross-sell",
      priority: "alta" as const,
    },
    {
      id: "rec-3",
      title: "Actualización KYC - Michael Johnson",
      description: "Documentación KYC vence en 15 días. Iniciar proceso de renovación para mantener cumplimiento y evitar restricciones operativas.",
      impactScore: 9.2,
      probability: 95,
      value: "N/A",
      risk: "Alto",
      category: "Cumplimiento",
      priority: "alta" as const,
    },
    {
      id: "rec-4",
      title: "Asesoría Fiscal Anual",
      description: "Layla Hassan califica para servicio de asesoría fiscal premium. Ofrecer consulta gratuita para optimización tributaria 2025.",
      impactScore: 6.5,
      probability: 68,
      value: "$15,000",
      risk: "Bajo",
      category: "Cross-sell",
      priority: "media" as const,
    },
    {
      id: "rec-5",
      title: "Diversificación de Cartera",
      description: "David Okonkwo tiene concentración alta en sector tech (78%). Sugerir diversificación con bonos corporativos y commodities.",
      impactScore: 7.2,
      probability: 65,
      value: "$32,000",
      risk: "Medio",
      category: "Gestión Riesgo",
      priority: "media" as const,
    },
  ]);

  const handleAccept = (id: string) => {
    console.log("Recommendation accepted:", id);
    setRecommendations(recommendations.filter((r) => r.id !== id));
    toast({
      title: "Acción Iniciada",
      description: "Se ha programado la acción recomendada.",
    });
  };

  const handleDismiss = (id: string) => {
    console.log("Recommendation dismissed:", id);
    setRecommendations(recommendations.filter((r) => r.id !== id));
    toast({
      title: "Acción Descartada",
      description: "La recomendación ha sido eliminada.",
    });
  };

  const highPriority = recommendations.filter((r) => r.priority === "alta");
  const mediumPriority = recommendations.filter((r) => r.priority === "media");

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
            ARIA analizando · {recommendations.length} oportunidades detectadas
          </Badge>
        </div>
        <h1 className="text-3xl font-semibold flex items-center gap-2">
          <Target className="h-8 w-8" />
          Enfoque Campaña
        </h1>
        <p className="text-muted-foreground">
          Next Best Action · Acciones priorizadas por ARIA
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-all-recommendations">
            Todas ({recommendations.length})
          </TabsTrigger>
          <TabsTrigger value="high" data-testid="tab-high-priority">
            Alta Prioridad ({highPriority.length})
          </TabsTrigger>
          <TabsTrigger value="medium" data-testid="tab-medium-priority">
            Media ({mediumPriority.length})
          </TabsTrigger>
          <TabsTrigger value="low" data-testid="tab-low-priority">
            Baja (0)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {recommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              onAccept={handleAccept}
              onDismiss={handleDismiss}
            />
          ))}
        </TabsContent>

        <TabsContent value="high" className="space-y-4">
          {highPriority.map((rec) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              onAccept={handleAccept}
              onDismiss={handleDismiss}
            />
          ))}
        </TabsContent>

        <TabsContent value="medium" className="space-y-4">
          {mediumPriority.map((rec) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              onAccept={handleAccept}
              onDismiss={handleDismiss}
            />
          ))}
        </TabsContent>

        <TabsContent value="low" className="space-y-4">
          <p className="text-muted-foreground text-center py-8">
            No hay recomendaciones de baja prioridad en este momento.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
