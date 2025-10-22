import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, TrendingUp, Users, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioMetric {
  label: string;
  value: number;
  total: number;
  status: "good" | "warning" | "critical";
}

interface PortfolioHealthWidgetProps {
  metrics: PortfolioMetric[];
  className?: string;
}

export function PortfolioHealthWidget({ metrics, className }: PortfolioHealthWidgetProps) {
  const getStatusColor = (status: PortfolioMetric["status"]) => {
    switch (status) {
      case "good":
        return "bg-chart-2";
      case "warning":
        return "bg-chart-3";
      case "critical":
        return "bg-chart-5";
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Salud de Cartera
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{metric.label}</span>
              <span className="font-medium font-mono">
                {metric.value} / {metric.total}
              </span>
            </div>
            <Progress
              value={(metric.value / metric.total) * 100}
              className={cn("h-2", getStatusColor(metric.status))}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
