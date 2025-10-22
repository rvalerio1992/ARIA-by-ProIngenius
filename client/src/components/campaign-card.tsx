import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  X, 
  ArrowRight, 
  Users, 
  TrendingUp, 
  Bell, 
  MessageSquare,
  Shield,
  CreditCard,
  Globe,
  User,
  Heart,
  Smartphone,
  Clock,
  Target,
  BarChart3,
  Briefcase,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface ProIngeniusDimension {
  name: string;
  icon: any;
  description: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  portfolioPercentage: number;
  clientsAffected: number;
  totalValue: string;
  category: string;
  portfolioImpact: "alto" | "medio" | "bajo";
  dimensions: ProIngeniusDimension[];
}

interface CampaignCardProps {
  campaign: Campaign;
  onAccept?: (id: string) => void;
  onDismiss?: (id: string) => void;
  className?: string;
}

export function CampaignCard({
  campaign,
  onAccept,
  onDismiss,
  className,
}: CampaignCardProps) {
  const [showDimensions, setShowDimensions] = useState(false);

  const getImpactColor = () => {
    switch (campaign.portfolioImpact) {
      case "alto":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      case "medio":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20";
      case "bajo":
        return "bg-chart-1/10 text-chart-1 border-chart-1/20";
    }
  };

  return (
    <Card className={cn("hover-elevate", className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className={getImpactColor()}>
              Impacto {campaign.portfolioImpact}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {campaign.category}
            </Badge>
          </div>
          <h3 className="font-semibold">{campaign.title}</h3>
        </div>
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 -mt-1 -mr-1"
            onClick={() => onDismiss(campaign.id)}
            data-testid={`button-dismiss-${campaign.id}`}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{campaign.description}</p>
        
        <div className="flex items-center gap-2 p-3 rounded-md bg-accent/5 border border-accent/20">
          <Users className="h-4 w-4 text-accent flex-shrink-0" />
          <div className="flex-1">
            <div className="text-sm font-semibold">
              {campaign.portfolioPercentage}% de tu cartera · {campaign.clientsAffected} clientes
            </div>
            <div className="text-xs text-muted-foreground">Alcance de campaña</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Valor potencial:</span>
            <span className="ml-2 font-medium font-mono">{campaign.totalValue}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Dimensiones:</span>
            <span className="ml-2 font-medium">{campaign.dimensions.length}</span>
          </div>
        </div>

        <Separator />

        <div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-between p-2 h-auto"
            onClick={() => setShowDimensions(!showDimensions)}
            data-testid={`button-toggle-dimensions-${campaign.id}`}
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Dimensiones ProIngenius activadas</span>
            </div>
            {showDimensions ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>

          {showDimensions && (
            <div className="mt-3 space-y-2">
              {campaign.dimensions.map((dim, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2 rounded-md bg-card text-sm"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-accent/10 flex-shrink-0">
                    <dim.icon className="h-3 w-3 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs">{dim.name}</div>
                    <div className="text-xs text-muted-foreground">{dim.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      {onAccept && (
        <CardFooter>
          <Button
            onClick={() => onAccept(campaign.id)}
            className="w-full gap-2"
            data-testid={`button-accept-${campaign.id}`}
          >
            Iniciar Campaña
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
