import { CopilotPanel } from "@/components/copilot-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, FileText, MessageSquare, Shield, Sparkles } from "lucide-react";

export default function Copilot() {
  // TODO: Remove mock data
  const suggestedPrompts = [
    {
      icon: <FileText className="h-4 w-4" />,
      title: "Generar guión de venta",
      prompt: "Genera un guión de venta para ofrecer fondos ESG a un cliente conservador de 55 años",
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      title: "Redactar email de seguimiento",
      prompt: "Redacta un email de seguimiento post-reunión para un cliente que mostró interés en diversificación",
    },
    {
      icon: <Shield className="h-4 w-4" />,
      title: "Consultar política KYC",
      prompt: "¿Cuáles son los requisitos de actualización KYC para clientes Ultra Premium?",
    },
    {
      icon: <Lightbulb className="h-4 w-4" />,
      title: "Estrategia de retención",
      prompt: "Dame estrategias para retener un cliente con riesgo de churn medio que tiene $2M AUM",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          <Badge variant="outline" className="gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            ARIA Copiloto · Listo para asistir
          </Badge>
        </div>
        <h1 className="text-3xl font-semibold">ARIA Copiloto Inteligente</h1>
        <p className="text-muted-foreground">
          Tu agente autónomo entrenado con políticas, productos y conocimiento del banco
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CopilotPanel />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Sugerencias Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestedPrompts.map((item, idx) => (
                <button
                  key={idx}
                  className="w-full text-left p-3 rounded-md border hover-elevate active-elevate-2 transition-colors"
                  onClick={() => console.log("Prompt:", item.prompt)}
                  data-testid={`button-prompt-${idx}`}
                >
                  <div className="flex items-start gap-2">
                    <div className="text-primary mt-0.5">{item.icon}</div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {item.prompt}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Capacidades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Badge variant="outline" className="w-full justify-start gap-2">
                <Shield className="h-3 w-3" />
                Cumplimiento integrado
              </Badge>
              <Badge variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-3 w-3" />
                Generación de documentos
              </Badge>
              <Badge variant="outline" className="w-full justify-start gap-2">
                <MessageSquare className="h-3 w-3" />
                Respuestas citadas
              </Badge>
              <Badge variant="outline" className="w-full justify-start gap-2">
                <Lightbulb className="h-3 w-3" />
                Análisis contextual
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
