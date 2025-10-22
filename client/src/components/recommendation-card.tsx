import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impactScore: number;
  probability: number;
  value: string;
  risk: string;
  category: string;
  priority: "alta" | "media" | "baja";
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  onAccept?: (id: string) => void;
  onDismiss?: (id: string) => void;
  className?: string;
}

export function RecommendationCard({
  recommendation,
  onAccept,
  onDismiss,
  className,
}: RecommendationCardProps) {
  const getPriorityColor = () => {
    switch (recommendation.priority) {
      case "alta":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      case "media":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "baja":
        return "bg-chart-1/10 text-chart-1 border-chart-1/20";
    }
  };

  return (
    <Card className={cn("hover-elevate", className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={getPriorityColor()}>
              Prioridad {recommendation.priority}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {recommendation.category}
            </Badge>
          </div>
          <h3 className="font-semibold">{recommendation.title}</h3>
        </div>
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 -mt-1 -mr-1"
            onClick={() => onDismiss(recommendation.id)}
            data-testid={`button-dismiss-${recommendation.id}`}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{recommendation.description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Probabilidad:</span>
            <span className="ml-2 font-medium">{recommendation.probability}%</span>
          </div>
          <div>
            <span className="text-muted-foreground">Valor:</span>
            <span className="ml-2 font-medium font-mono">{recommendation.value}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Impacto:</span>
            <span className="ml-2 font-medium">{recommendation.impactScore}/10</span>
          </div>
          <div>
            <span className="text-muted-foreground">Riesgo:</span>
            <span className="ml-2 font-medium">{recommendation.risk}</span>
          </div>
        </div>
      </CardContent>
      {onAccept && (
        <CardFooter>
          <Button
            onClick={() => onAccept(recommendation.id)}
            className="w-full gap-2"
            data-testid={`button-accept-${recommendation.id}`}
          >
            Ejecutar Acción
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
