import { RecommendationCard } from "../recommendation-card";

export default function RecommendationCardExample() {
  const recommendation = {
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

  return (
    <div className="max-w-md">
      <RecommendationCard
        recommendation={recommendation}
        onAccept={(id) => console.log("Accepted:", id)}
        onDismiss={(id) => console.log("Dismissed:", id)}
      />
    </div>
  );
}
