import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, Target, Sparkles, ArrowRight, Brain } from "lucide-react";

export function ARIAActionButtons() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-accent/50 bg-gradient-to-br from-accent/5 to-transparent hover-elevate" data-testid="card-enfoque-1-1">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent animate-pulse" />
                <span className="text-xs font-medium text-accent">Potenciado por ARIA</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Enfoque 1:1 con ARIA</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Análisis inteligente individualizado de tus <strong>926 clientes</strong>. ARIA identifica oportunidades, riesgos y recomendaciones personalizadas para cada relación.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                <li className="flex items-center gap-2">
                  <Brain className="h-3 w-3 text-accent" />
                  Vista 360° con insights generados por IA
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="h-3 w-3 text-accent" />
                  Análisis de comportamiento transaccional
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="h-3 w-3 text-accent" />
                  Propensión y Next Best Action (NBA+)
                </li>
              </ul>
            </div>

            <Button asChild size="lg" className="w-full gap-2" data-testid="button-enfoque-1-1">
              <Link href="/clients">
                Explorar Clientes con ARIA
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-accent/50 bg-gradient-to-br from-accent/5 to-transparent hover-elevate" data-testid="card-enfoque-campana">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent animate-pulse" />
                <span className="text-xs font-medium text-accent">Potenciado por ARIA</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Enfoque Campaña con ARIA</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Campañas inteligentes alineadas con tus metas. ARIA prioriza oportunidades por <strong>probabilidad × valor - riesgo</strong> para maximizar tu impacto.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                <li className="flex items-center gap-2">
                  <Brain className="h-3 w-3 text-accent" />
                  Segmentación predictiva automática
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="h-3 w-3 text-accent" />
                  Priorización por impacto financiero
                </li>
                <li className="flex items-center gap-2">
                  <Brain className="h-3 w-3 text-accent" />
                  Alineación con metas de dashboard
                </li>
              </ul>
            </div>

            <Button asChild size="lg" className="w-full gap-2" data-testid="button-enfoque-campana">
              <Link href="/recommendations">
                Ver Campañas Prioritarias
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
