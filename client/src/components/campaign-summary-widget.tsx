import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Sparkles, TrendingUp, Users } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface Campaign {
  id: string;
  title: string;
  portfolioPercentage: number;
  clientsAffected: number;
  totalValue: string;
  category: string;
  portfolioImpact: "alto" | "medio" | "bajo";
}

interface CampaignSummaryWidgetProps {
  campaigns: Campaign[];
  className?: string;
}

export function CampaignSummaryWidget({ campaigns, className }: CampaignSummaryWidgetProps) {
  // Get top 3 campaigns by portfolio impact
  const topCampaigns = [...campaigns]
    .sort((a, b) => b.portfolioPercentage - a.portfolioPercentage)
    .slice(0, 3);

  const totalClientsImpacted = campaigns.reduce((sum, c) => sum + c.clientsAffected, 0);
  const totalPortfolioImpact = campaigns.reduce((sum, c) => sum + c.portfolioPercentage, 0);

  const getImpactColor = (impact: "alto" | "medio" | "bajo") => {
    if (impact === "alto") return "text-green-600 bg-green-600/10";
    if (impact === "medio") return "text-yellow-600 bg-yellow-600/10";
    return "text-blue-600 bg-blue-600/10";
  };

  return (
    <Card className={cn("border-accent/20", className)}>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5" />
            Resumen Enfoque Campaña
          </CardTitle>
          <Badge variant="outline" className="gap-1">
            <Sparkles className="h-3 w-3 text-accent" />
            {campaigns.length} activas
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 pb-3 border-b">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              Clientes Impactados
            </div>
            <div className="text-2xl font-mono font-bold" data-testid="metric-total-clients-impacted">
              {totalClientsImpacted}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Impacto Cartera
            </div>
            <div className="text-2xl font-mono font-bold text-accent" data-testid="metric-total-portfolio-impact">
              {totalPortfolioImpact}%
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Top 3 Campañas</div>
          {topCampaigns.map((campaign, index) => (
            <div
              key={campaign.id}
              className="flex items-center justify-between gap-2 p-2 rounded-md bg-muted/30"
              data-testid={`campaign-summary-${index + 1}`}
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate" data-testid={`campaign-title-${index + 1}`}>
                  {campaign.title}
                </div>
                <div className="text-xs text-muted-foreground" data-testid={`campaign-stats-${index + 1}`}>
                  {campaign.clientsAffected} clientes · {campaign.portfolioPercentage}% cartera
                </div>
              </div>
              <Badge
                variant="secondary"
                className={cn("text-xs flex-shrink-0", getImpactColor(campaign.portfolioImpact))}
                data-testid={`campaign-impact-${index + 1}`}
              >
                {campaign.portfolioImpact === "alto" ? "Alto" : campaign.portfolioImpact === "medio" ? "Medio" : "Bajo"}
              </Badge>
            </div>
          ))}
        </div>

        <Button asChild className="w-full gap-1" data-testid="button-view-all-campaigns">
          <Link href="/recommendations">
            <Target className="h-4 w-4" />
            Ver Todas las Campañas
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
