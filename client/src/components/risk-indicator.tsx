import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type RiskLevel = "bajo" | "medio" | "alto";

interface RiskIndicatorProps {
  level: RiskLevel;
  showLabel?: boolean;
  className?: string;
}

export function RiskIndicator({ level, showLabel = true, className }: RiskIndicatorProps) {
  const getRiskConfig = () => {
    switch (level) {
      case "bajo":
        return {
          label: "Bajo",
          className: "bg-chart-2/10 text-chart-2 border-chart-2/20",
          dotColor: "bg-chart-2",
        };
      case "medio":
        return {
          label: "Medio",
          className: "bg-chart-3/10 text-chart-3 border-chart-3/20",
          dotColor: "bg-chart-3",
        };
      case "alto":
        return {
          label: "Alto",
          className: "bg-chart-5/10 text-chart-5 border-chart-5/20",
          dotColor: "bg-chart-5",
        };
    }
  };

  const config = getRiskConfig();

  return (
    <Badge variant="outline" className={cn("gap-1.5 font-medium", config.className, className)}>
      <span className={cn("h-2 w-2 rounded-full", config.dotColor)} />
      {showLabel && <span>Riesgo {config.label}</span>}
    </Badge>
  );
}
