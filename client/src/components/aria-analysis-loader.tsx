import { useEffect, useState } from "react";
import { Sparkles, Brain, TrendingUp, Shield, DollarSign, Users, Target, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisDimension {
  id: string;
  label: string;
  icon: React.ElementType;
  status: "pending" | "analyzing" | "complete";
  insights?: string;
}

interface ARIAAnalysisLoaderProps {
  clientName: string;
  onComplete: () => void;
  className?: string;
}

export function ARIAAnalysisLoader({ clientName, onComplete, className }: ARIAAnalysisLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  const dimensions: AnalysisDimension[] = [
    {
      id: "comportamiento",
      label: "Comportamiento Transaccional",
      icon: Activity,
      status: "pending",
      insights: "Analizando 847 transacciones · Patrones detectados"
    },
    {
      id: "riesgo",
      label: "Perfil de Riesgo",
      icon: Shield,
      status: "pending",
      insights: "Evaluando exposición · Scoring crediticio"
    },
    {
      id: "rentabilidad",
      label: "Rentabilidad & Contribución",
      icon: DollarSign,
      status: "pending",
      insights: "Calculando margen neto · Lifetime value"
    },
    {
      id: "propension",
      label: "Propensión a Productos",
      icon: Target,
      status: "pending",
      insights: "Modelo predictivo · Cross-sell opportunities"
    },
    {
      id: "relacion",
      label: "Ciclo de Relación",
      icon: Users,
      status: "pending",
      insights: "Historico de interacciones · Sentiment analysis"
    },
    {
      id: "tendencias",
      label: "Tendencias & Forecasting",
      icon: TrendingUp,
      status: "pending",
      insights: "Proyecciones IA · Escenarios futuros"
    },
  ];

  const [dimensionsState, setDimensionsState] = useState(dimensions);

  // Generate particles for visual effect
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  // Progressive analysis animation
  useEffect(() => {
    const totalDuration = 6000; // 6 seconds total
    const dimensionDuration = totalDuration / dimensions.length;
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / (totalDuration / 50));
        return next >= 100 ? 100 : next;
      });
    }, 50);

    const dimensionInterval = setInterval(() => {
      setCurrentDimension((prev) => {
        const next = prev + 1;
        
        if (next > dimensions.length) {
          // Already finished, clean up
          clearInterval(dimensionInterval);
          clearInterval(progressInterval);
          return prev;
        }

        // Update dimension status
        setDimensionsState((dims) => 
          dims.map((dim, idx) => {
            if (idx < prev) return { ...dim, status: "complete" as const };
            if (idx === prev) return { ...dim, status: "analyzing" as const };
            return dim;
          })
        );

        // If this is the last dimension, schedule completion
        if (next === dimensions.length) {
          setTimeout(() => {
            // Mark the last dimension as complete
            setDimensionsState((dims) => 
              dims.map((dim, idx) => ({
                ...dim,
                status: "complete" as const
              }))
            );
            // Wait a bit to show all complete, then trigger onComplete
            setTimeout(() => {
              clearInterval(dimensionInterval);
              clearInterval(progressInterval);
              onComplete();
            }, 500);
          }, dimensionDuration * 0.7); // Show last as analyzing for a bit, then complete
        }
        
        return next;
      });
    }, dimensionDuration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dimensionInterval);
    };
  }, [dimensions.length, onComplete]);

  return (
    <div className={cn("relative min-h-screen flex items-center justify-center bg-background overflow-hidden", className)}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-accent rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-3xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="relative">
              <Brain className="h-12 w-12 text-accent animate-pulse" />
              <Sparkles className="h-6 w-6 text-accent absolute -top-1 -right-1 animate-ping" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-pulse">
            ARIA está analizando a {clientName}
          </h1>
          <p className="text-muted-foreground text-lg">
            Procesando información con Inteligencia Artificial Generativa
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progreso del Análisis</span>
            <span className="font-mono font-semibold text-accent">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent via-accent/80 to-accent transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Analysis dimensions */}
        <div className="space-y-3">
          {dimensionsState.map((dimension, idx) => {
            const Icon = dimension.icon;
            const isActive = idx === currentDimension;
            const isComplete = dimension.status === "complete";
            const isPending = dimension.status === "pending";

            return (
              <div
                key={dimension.id}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-lg border transition-all duration-500",
                  isActive && "bg-accent/10 border-accent shadow-lg shadow-accent/20 scale-[1.02]",
                  isComplete && "bg-muted/50 border-muted-foreground/20",
                  isPending && "border-transparent opacity-40"
                )}
                data-testid={`analysis-dimension-${dimension.id}`}
              >
                <div className={cn(
                  "flex-shrink-0 rounded-full p-2 transition-all duration-300",
                  isActive && "bg-accent text-accent-foreground animate-pulse",
                  isComplete && "bg-green-500/20 text-green-600 dark:text-green-400",
                  isPending && "bg-muted text-muted-foreground"
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={cn(
                      "font-semibold text-sm transition-colors",
                      isActive && "text-accent",
                      isComplete && "text-green-600 dark:text-green-400"
                    )}>
                      {dimension.label}
                    </p>
                    {isActive && (
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    )}
                    {isComplete && (
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {(isActive || isComplete) && dimension.insights && (
                    <p className="text-xs text-muted-foreground animate-fade-in font-mono">
                      {dimension.insights}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer message */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-accent animate-pulse" />
            <span className="font-mono">Generando insights accionables...</span>
          </p>
        </div>
      </div>
    </div>
  );
}
