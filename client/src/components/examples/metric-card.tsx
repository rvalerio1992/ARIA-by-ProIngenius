import { MetricCard } from "../metric-card";
import { DollarSign } from "lucide-react";

export default function MetricCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="AUM Total"
        value="$45.2M"
        trend={{ value: 12.5, direction: "up" }}
        icon={<DollarSign className="h-4 w-4" />}
      />
      <MetricCard
        title="Clientes Premium"
        value="127"
        trend={{ value: 3.2, direction: "up" }}
      />
      <MetricCard
        title="NPS Score"
        value="8.4"
        trend={{ value: 0.5, direction: "down" }}
      />
      <MetricCard
        title="Tasa Retención"
        value="94.2%"
        trend={{ value: 0, direction: "neutral" }}
      />
    </div>
  );
}
