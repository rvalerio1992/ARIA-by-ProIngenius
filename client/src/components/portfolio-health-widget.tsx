import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, Users, AlertTriangle, Percent } from "lucide-react";
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
  // Nuevas métricas inventadas
  const margenFinanciero = 4.25; // Diferencia entre tasa pasiva promedio y tasa activa promedio (%)
  const clientesVinculacionAlta = 62; // Porcentaje de clientes con vinculación alta
  const clientesMora90 = 3.8; // Porcentaje de clientes con mora mayor a 90 días
  
  // Color thresholds para Margen Financiero: Green ≥4%, Yellow 3-3.99%, Red <3%
  const getMargenColor = (margen: number) => {
    if (margen >= 4) return "text-green-600";
    if (margen >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getMargenBgColor = (margen: number) => {
    if (margen >= 4) return "bg-green-600/10";
    if (margen >= 3) return "bg-yellow-600/10";
    return "bg-red-600/10";
  };

  // Color thresholds para Vinculación: Green ≥60%, Yellow 45-59%, Red <45%
  const getVinculacionColor = (percentage: number) => {
    if (percentage >= 60) return "text-green-600";
    if (percentage >= 45) return "text-yellow-600";
    return "text-red-600";
  };

  const getVinculacionBgColor = (percentage: number) => {
    if (percentage >= 60) return "bg-green-600/10";
    if (percentage >= 45) return "bg-yellow-600/10";
    return "bg-red-600/10";
  };

  // Color thresholds para Mora: Green <3%, Yellow 3-5%, Red >5%
  const getMoraColor = (percentage: number) => {
    if (percentage < 3) return "text-green-600";
    if (percentage <= 5) return "text-yellow-600";
    return "text-red-600";
  };

  const getMoraBgColor = (percentage: number) => {
    if (percentage < 3) return "bg-green-600/10";
    if (percentage <= 5) return "bg-yellow-600/10";
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Margen Financiero Promedio
              </div>
              <div className={cn("text-2xl font-mono font-bold", getMargenColor(margenFinanciero))}>
                {margenFinanciero.toFixed(2)}%
              </div>
              <Badge variant="secondary" className={cn("text-xs", getMargenBgColor(margenFinanciero))}>
                {margenFinanciero >= 4 ? "Excelente" : margenFinanciero >= 3 ? "Aceptable" : "Bajo"}
              </Badge>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Mora Mayor a 90 días
              </div>
              <div className={cn("text-2xl font-mono font-bold", getMoraColor(clientesMora90))}>
                {clientesMora90.toFixed(1)}%
              </div>
              <Badge variant="secondary" className={cn("text-xs", getMoraBgColor(clientesMora90))}>
                {clientesMora90 < 3 ? "Excelente" : clientesMora90 <= 5 ? "Controlado" : "Crítico"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
