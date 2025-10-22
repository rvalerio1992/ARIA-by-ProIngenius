import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, TrendingDown, AlertTriangle, Users, Sparkles } from "lucide-react";
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
  // TODO: Remove mock data - Portfolio health metrics
  const portfolioHealth = 85; // 0-100
  const balanceChange = 12.5; // percentage
  const balanceDirection = "up" as const;
  const highRiskClients = 3;
  const contactedPercentage = 78; // percentage

  // Health color thresholds: Green ≥80, Yellow 60-79, Red <60
  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-green-600";
    if (health >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getHealthBgColor = (health: number) => {
    if (health >= 80) return "bg-green-600/10";
    if (health >= 60) return "bg-yellow-600/10";
    return "bg-red-600/10";
  };

  // Contacted color thresholds: Green ≥75%, Yellow 60-74%, Red <60%
  const getContactedColor = (percentage: number) => {
    if (percentage >= 75) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getContactedBgColor = (percentage: number) => {
    if (percentage >= 75) return "bg-green-600/10";
    if (percentage >= 60) return "bg-yellow-600/10";
    return "bg-red-600/10";
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Portafolio Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Activity className="h-3 w-3" />
                Salud
              </div>
              <div className={cn("text-2xl font-mono font-bold", getHealthColor(portfolioHealth))}>
                {portfolioHealth}
              </div>
              <Badge variant="secondary" className={cn("text-xs", getHealthBgColor(portfolioHealth))}>
                {portfolioHealth >= 80 ? "Excelente" : portfolioHealth >= 60 ? "Aceptable" : "Crítico"}
              </Badge>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                {balanceDirection === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                Δ Saldo 30d
              </div>
              <div className={cn("text-2xl font-mono font-bold", balanceDirection === "up" ? "text-green-600" : "text-red-600")}>
                {balanceDirection === "up" ? "+" : ""}{balanceChange}%
              </div>
              <Badge variant="secondary" className={cn("text-xs", balanceDirection === "up" ? "bg-green-600/10" : "bg-red-600/10")}>
                vs mes anterior
              </Badge>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Riesgo Alto
              </div>
              <div className="text-2xl font-mono font-bold text-red-600">
                {highRiskClients}
              </div>
              <Badge variant="secondary" className="bg-red-600/10 text-xs">
                clientes
              </Badge>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Users className="h-3 w-3" />
                Contactados ≤30d
              </div>
              <div className={cn("text-2xl font-mono font-bold", getContactedColor(contactedPercentage))}>
                {contactedPercentage}%
              </div>
              <Badge variant="secondary" className={cn("text-xs", getContactedBgColor(contactedPercentage))}>
                {contactedPercentage >= 75 ? "Óptimo" : contactedPercentage >= 60 ? "Mejorar" : "Urgente"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
