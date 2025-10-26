import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";

interface FinancialMetric {
  label: string;
  value: string;
  icon: React.ReactNode;
  status: "good" | "warning" | "critical";
}

interface FinancialMetricsWidgetProps {
  metrics: FinancialMetric[];
}

export function FinancialMetricsWidget({ metrics }: FinancialMetricsWidgetProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-600 dark:text-green-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "critical":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card data-testid="card-financial-metrics">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Métricas Financieras de Portafolio
        </CardTitle>
        <CardDescription>
          Indicadores clave de rentabilidad y riesgo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-4 rounded-lg border bg-card hover-elevate active-elevate-2"
              data-testid={`metric-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {metric.label}
                </span>
                <div className={getStatusColor(metric.status)}>
                  {metric.icon}
                </div>
              </div>
              <div className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
