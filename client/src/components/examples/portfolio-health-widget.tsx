import { PortfolioHealthWidget } from "../portfolio-health-widget";

export default function PortfolioHealthWidgetExample() {
  const metrics = [
    { label: "Clientes Sin Riesgo de Churn", value: 95, total: 127, status: "good" as const },
    { label: "KYC Actualizado", value: 118, total: 127, status: "good" as const },
    { label: "Requieren Seguimiento", value: 12, total: 127, status: "warning" as const },
    { label: "En Riesgo Alto", value: 3, total: 127, status: "critical" as const },
  ];

  return (
    <div className="max-w-sm">
      <PortfolioHealthWidget metrics={metrics} />
    </div>
  );
}
