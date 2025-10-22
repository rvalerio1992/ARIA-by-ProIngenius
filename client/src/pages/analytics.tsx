import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, TrendingDown, AlertTriangle, Users, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Analytics() {
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Análisis</h1>
        <p className="text-muted-foreground">
          Portafolio Management · Métricas ejecutivas de tu cartera
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Salud
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn("text-3xl font-mono font-bold mb-1", getHealthColor(portfolioHealth))}>
              {portfolioHealth}
            </div>
            <Badge variant="secondary" className={cn("text-xs", getHealthBgColor(portfolioHealth))}>
              {portfolioHealth >= 80 ? "Excelente" : portfolioHealth >= 60 ? "Aceptable" : "Crítico"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              {balanceDirection === "up" ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              Δ Saldo 30d
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn("text-3xl font-mono font-bold mb-1", balanceDirection === "up" ? "text-green-600" : "text-red-600")}>
              {balanceDirection === "up" ? "+" : ""}{balanceChange}%
            </div>
            <Badge variant="secondary" className={balanceDirection === "up" ? "bg-green-600/10" : "bg-red-600/10"}>
              <span className="text-xs">vs mes anterior</span>
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Riesgo Alto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold mb-1 text-red-600">
              {highRiskClients}
            </div>
            <Badge variant="secondary" className="bg-red-600/10 text-xs">
              clientes
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Contactados ≤30d
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn("text-3xl font-mono font-bold mb-1", getContactedColor(contactedPercentage))}>
              {contactedPercentage}%
            </div>
            <Badge variant="secondary" className={cn("text-xs", getContactedBgColor(contactedPercentage))}>
              {contactedPercentage >= 75 ? "Óptimo" : contactedPercentage >= 60 ? "Mejorar" : "Urgente"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 flex-shrink-0">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Top 5 oportunidades</h3>
                <p className="text-sm text-muted-foreground">
                  ARIA ha identificado las acciones de mayor impacto para tu cartera
                </p>
              </div>
            </div>
            <Button className="gap-2 flex-shrink-0" data-testid="button-ask-aria">
              <Sparkles className="h-4 w-4" />
              Preguntar a ARIA
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
