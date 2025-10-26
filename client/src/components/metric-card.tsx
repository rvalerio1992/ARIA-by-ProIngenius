import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
  subtitle?: string;
  status?: {
    label: string;
    type: "success" | "warning" | "neutral";
  };
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, value, trend, subtitle, status, icon, className }: MetricCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.direction === "up") return <TrendingUp className="h-4 w-4" />;
    if (trend.direction === "down") return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (!trend) return "";
    if (trend.direction === "up") return "text-chart-2";
    if (trend.direction === "down") return "text-chart-5";
    return "text-muted-foreground";
  };

  const getStatusColor = () => {
    if (!status) return "";
    if (status.type === "success") return "bg-green-600/10 text-green-600";
    if (status.type === "warning") return "bg-red-600/10 text-red-600";
    return "bg-muted text-muted-foreground";
  };

  return (
    <Card className={cn("hover-elevate min-h-[170px] flex flex-col", className)}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="text-2xl font-mono font-semibold">{value}</div>
            {status && (
              <Badge variant="secondary" className={cn("text-xs", getStatusColor())}>
                {status.label}
              </Badge>
            )}
          </div>
          {trend && (
            <div className={cn("flex items-center gap-1 text-xs mt-1", getTrendColor())}>
              {getTrendIcon()}
              <span>{Math.abs(trend.value).toFixed(1)}%</span>
            </div>
          )}
        </div>
        {subtitle && (
          <div className="text-xs text-muted-foreground mt-2">
            {subtitle}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
