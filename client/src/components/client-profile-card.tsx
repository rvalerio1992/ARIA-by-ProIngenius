import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, TrendingUp, Briefcase } from "lucide-react";
import { ComplianceBadge } from "./compliance-badge";
import { RiskIndicator } from "./risk-indicator";
import { cn } from "@/lib/utils";

export interface ClientProfile {
  id: string;
  name: string;
  avatar?: string;
  segment: string;
  industry: string;
  aum: string;
  lastInteraction: string;
  sentiment: "positive" | "neutral" | "negative";
  riskLevel: "bajo" | "medio" | "alto";
  kycStatus: "compliant" | "pending" | "warning" | "alert";
  email: string;
  phone: string;
}

interface ClientProfileCardProps {
  client: ClientProfile;
  onContact?: (type: "email" | "phone") => void;
  className?: string;
}

export function ClientProfileCard({ client, onContact, className }: ClientProfileCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getSentimentColor = () => {
    switch (client.sentiment) {
      case "positive":
        return "bg-chart-2/10 text-chart-2 border-chart-2/20";
      case "neutral":
        return "bg-muted text-muted-foreground border-muted";
      case "negative":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20";
    }
  };

  return (
    <Card className={cn("hover-elevate", className)}>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Avatar className="h-16 w-16">
          <AvatarImage src={client.avatar} alt={client.name} />
          <AvatarFallback className="text-lg">{getInitials(client.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <h3 className="text-xl font-semibold">{client.name}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              {client.segment}
            </Badge>
            <RiskIndicator level={client.riskLevel} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">AUM</p>
            <p className="font-mono font-semibold">{client.aum}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Industria</p>
            <p className="font-medium">{client.industry}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Última Interacción</p>
            <p className="text-xs">{client.lastInteraction}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Sentimiento</p>
            <Badge variant="outline" className={cn("text-xs w-fit", getSentimentColor())}>
              {client.sentiment === "positive" && "Positivo"}
              {client.sentiment === "neutral" && "Neutral"}
              {client.sentiment === "negative" && "Negativo"}
            </Badge>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <ComplianceBadge type="KYC" status={client.kycStatus} />
          <ComplianceBadge type="AML" status="compliant" />
          <ComplianceBadge type="FATCA" status="compliant" />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={() => onContact?.("email")}
            data-testid="button-email-client"
          >
            <Mail className="h-4 w-4" />
            Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={() => onContact?.("phone")}
            data-testid="button-call-client"
          >
            <Phone className="h-4 w-4" />
            Llamar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
