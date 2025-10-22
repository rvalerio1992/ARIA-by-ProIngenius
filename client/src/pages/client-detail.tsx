import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ComplianceBadge } from "@/components/compliance-badge";
import { RiskIndicator } from "@/components/risk-indicator";
import { ActivityTimeline } from "@/components/activity-timeline";
import {
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Sparkles,
  FileText,
  Target,
  Brain,
  Zap,
  BarChart3,
  Globe,
  Heart,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import { Link } from "wouter";

// TODO: Remove mock data
import avatar1 from "@assets/generated_images/Hispanic_male_executive_headshot_11740d94.png";

export default function ClientDetail() {
  const params = useParams();
  const clientId = params.id || "1";

  // TODO: Fetch real client data based on clientId
  const client = {
    id: clientId,
    name: "Roberto Fernández",
    avatar: avatar1,
    segment: "Ultra Premium",
    industry: "Tecnología",
    aum: "$3.2M",
    email: "roberto.fernandez@email.com",
    phone: "+1 555 0123",
    riskLevel: "bajo" as const,
    kycStatus: "compliant" as const,
    sentiment: "positive" as const,
    lastInteraction: "Hace 2 días",
    joinDate: "Enero 2019",
    age: 52,
    education: "MBA, Stanford",
    interests: ["Golf", "Inversiones ESG", "Tecnología"],
  };

  const talkingPoints = [
    "Vencimiento de DP $500K en 5 días - tasa preferencial 4.5% disponible",
    "Interés expresado en fondos ESG durante última llamada",
    "Hijo iniciando universidad - posible apertura cuenta student",
    "Cumpleaños próximo (28 Oct) - oportunidad para touchpoint",
  ];

  const recommendations = [
    {
      title: "Renovación DP con tasa premium",
      confidence: 92,
      value: "$45K",
      rationale: "Perfil conservador + AUM >$2M = tasa preferencial",
    },
    {
      title: "Fondo ESG Global",
      confidence: 78,
      value: "$28K",
      rationale: "Alineación valores + rentabilidad 7.2% proyectada",
    },
  ];

  const macroContext = [
    "Tasas BCE estables Q1 2025 - favorable para renovaciones",
    "Sector tech +12% YTD - cliente bien posicionado",
    "ESG flows +$24B este trimestre - momento ideal para propuesta",
  ];

  const timeline = [
    {
      id: "1",
      type: "call" as const,
      title: "Llamada seguimiento Q4",
      description: "Discusión sobre rendimiento cartera y nuevas oportunidades ESG",
      timestamp: "Hace 2 días",
      actor: "Tú",
    },
    {
      id: "2",
      type: "meeting" as const,
      title: "Revisión trimestral presencial",
      description: "Ajuste estrategia 2025, focus en diversificación internacional",
      timestamp: "15 días",
      actor: "María González",
    },
    {
      id: "3",
      type: "transaction" as const,
      title: "Depósito $120K",
      description: "Transferencia desde cuenta corporativa",
      timestamp: "1 mes",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/enfoque">
          <Button variant="ghost" size="icon" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-accent">ARIA generando brief inteligente...</span>
          </div>
          <h1 className="text-3xl font-semibold">Gemelo 1:1 Premium · Vista 360°</h1>
          <p className="text-muted-foreground">
            Preparación completa para tu próximo contacto
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5 text-accent" />
                Brief Inteligente ARIA
                <Badge variant="outline" className="ml-auto gap-1">
                  <Zap className="h-3 w-3" />
                  Actualizado hace 2min
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-accent" />
                  Talking Points Sugeridos
                </h4>
                <div className="space-y-2">
                  {talkingPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm p-2 rounded-md bg-card hover-elevate"
                    >
                      <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-accent">{idx + 1}</span>
                      </div>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Propuestas Listas (NBA+)
                </h4>
                <div className="space-y-3">
                  {recommendations.map((rec, idx) => (
                    <div key={idx} className="p-3 rounded-md border bg-card">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h5 className="font-medium text-sm">{rec.title}</h5>
                        <Badge variant="secondary" className="gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {rec.confidence}%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{rec.rationale}</p>
                      <div className="text-sm font-semibold text-accent">
                        Valor potencial: {rec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-accent" />
                  Contexto Macroeconómico
                </h4>
                <div className="space-y-1">
                  {macroContext.map((context, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <div className="h-1 w-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      <span>{context}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Comportamiento Transaccional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Depósitos (6M)</div>
                  <div className="text-2xl font-mono font-semibold">$680K</div>
                  <div className="text-xs text-green-600">+15% vs periodo anterior</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Retiros (6M)</div>
                  <div className="text-2xl font-mono font-semibold">$245K</div>
                  <div className="text-xs text-muted-foreground">Ratio saludable</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Productos Activos</div>
                  <div className="text-2xl font-mono font-semibold">7</div>
                  <div className="text-xs text-muted-foreground">DP, Fondos, Cuenta</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Engagement Digital</div>
                  <div className="text-2xl font-mono font-semibold">Alto</div>
                  <div className="text-xs text-green-600">32 sesiones/mes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Historial de Interacción
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityTimeline items={timeline} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Perfil Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={client.avatar} alt={client.name} />
                  <AvatarFallback>
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1">{client.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{client.segment}</Badge>
                    <RiskIndicator level={client.riskLevel} showLabel={false} />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Cliente desde {client.joinDate}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">AUM Total</div>
                    <div className="font-mono font-semibold">{client.aum}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="text-sm">{client.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground">Teléfono</div>
                    <div className="text-sm">{client.phone}</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="text-xs text-muted-foreground mb-2">Cumplimiento</div>
                <div className="flex gap-2">
                  <ComplianceBadge type="KYC" status={client.kycStatus} />
                  <ComplianceBadge type="AML" status="compliant" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 gap-2" data-testid="button-call-client">
                  <Phone className="h-4 w-4" />
                  Llamar
                </Button>
                <Button variant="outline" className="flex-1 gap-2" data-testid="button-email-client">
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Perfil Sociodemográfico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Edad</div>
                <div>{client.age} años</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Industria</div>
                <div>{client.industry}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Educación</div>
                <div>{client.education}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Intereses</div>
                <div className="flex gap-1 flex-wrap mt-1">
                  {client.interests.map((interest, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Sentimiento & Experiencia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">NPS Score</span>
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  9/10
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Satisfacción</span>
                <Badge variant="secondary" className="text-green-600">Muy Alta</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Riesgo Churn</span>
                <Badge variant="secondary" className="text-green-600">Bajo (8%)</Badge>
              </div>
              <Separator />
              <div className="text-xs text-muted-foreground">
                <span className="font-semibold">Última interacción:</span> {client.lastInteraction} - Sentiment positivo detectado
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
