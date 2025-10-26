import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, Target, Brain, Lightbulb, DollarSign, Clock, BarChart3, type LucideIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalysisDimension {
  title: string;
  description: string;
  icon: LucideIcon;
  status: "pending" | "analyzing" | "complete";
  insights?: string;
}

interface ARIACampaignAnalysisLoaderProps {
  onComplete: () => void;
}

export function ARIACampaignAnalysisLoader({ onComplete }: ARIACampaignAnalysisLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [dimensionsState, setDimensionsState] = useState<AnalysisDimension[]>([
    {
      title: "Segmentación Inteligente",
      description: "Análisis de segmentos objetivo",
      icon: Target,
      status: "pending",
      insights: "Identificando 6 campañas activas y segmentos prioritarios"
    },
    {
      title: "Propensión de Clientes",
      description: "Modelos predictivos de conversión",
      icon: Brain,
      status: "pending",
      insights: "Calculando probabilidades de éxito por cliente"
    },
    {
      title: "NBA+ (Next Best Action)",
      description: "Recomendaciones óptimas personalizadas",
      icon: Lightbulb,
      status: "pending",
      insights: "Generando acciones recomendadas basadas en perfil"
    },
    {
      title: "Impacto Financiero",
      description: "Proyección de valor potencial",
      icon: DollarSign,
      status: "pending",
      insights: "Estimando impacto de $6.8M en campañas prioritarias"
    },
    {
      title: "Timing Óptimo",
      description: "Análisis de momento ideal de contacto",
      icon: Clock,
      status: "pending",
      insights: "Determinando ventanas de oportunidad por cliente"
    },
    {
      title: "Priorización de Esfuerzos",
      description: "Ranking de oportunidades por ROI",
      icon: BarChart3,
      status: "pending",
      insights: "Ordenando campañas por probabilidad × valor - riesgo"
    }
  ]);

  useEffect(() => {
    const totalDuration = 6000; // 6 seconds
    const dimensions = 6;
    const dimensionDuration = totalDuration / dimensions;

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / (totalDuration / 50));
        return next >= 100 ? 100 : next;
      });
    }, 50);

    const dimensionInterval = setInterval(() => {
      setCurrentDimension((prev) => {
        const next = prev + 1;
        
        if (next > dimensions) {
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
        if (next === dimensions) {
          setTimeout(() => {
            // Mark all dimensions as complete
            setDimensionsState((dims) => 
              dims.map((dim) => ({
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
          }, dimensionDuration * 0.7);
        }
        
        return next;
      });
    }, dimensionDuration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dimensionInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl w-full mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-accent animate-pulse" />
            <h1 className="text-3xl font-bold">ARIA está analizando tus campañas</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Análisis Inteligente de Campañas y Recomendaciones
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Progress 
            value={progress} 
            className="h-2 bg-muted"
          />
          <p className="text-center text-sm text-muted-foreground mt-2">
            {Math.round(progress)}% completado
          </p>
        </motion.div>

        {/* Analysis Dimensions */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {dimensionsState.map((dimension, index) => (
              <motion.div
                key={dimension.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  p-4 rounded-lg border transition-all duration-300
                  ${dimension.status === "complete" 
                    ? "bg-green-600/10 border-green-600/50" 
                    : dimension.status === "analyzing"
                    ? "bg-accent/10 border-accent/50 shadow-lg shadow-accent/20"
                    : "bg-muted/30 border-muted"
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    flex-shrink-0 transition-all duration-300
                    ${dimension.status === "analyzing" ? "animate-pulse scale-110" : ""}
                  `}>
                    {dimension.status === "complete" ? (
                      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                        <Check className="h-5 w-5 text-white" />
                      </div>
                    ) : (
                      <dimension.icon className={`h-6 w-6 ${
                        dimension.status === "analyzing" 
                          ? "text-accent" 
                          : "text-muted-foreground"
                      }`} />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`
                        font-semibold transition-colors
                        ${dimension.status === "complete" 
                          ? "text-green-600" 
                          : dimension.status === "analyzing"
                          ? "text-accent"
                          : "text-muted-foreground"
                        }
                      `}>
                        {dimension.title}
                      </h3>
                      {dimension.status === "analyzing" && (
                        <motion.div
                          className="flex gap-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 bg-accent rounded-full"
                              animate={{ y: [0, -6, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-1">
                      {dimension.description}
                    </p>
                    
                    {(dimension.status === "analyzing" || dimension.status === "complete") && dimension.insights && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-sm text-foreground/80 mt-2 italic"
                      >
                        {dimension.insights}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8 text-sm text-muted-foreground"
        >
          <p>Analizando oportunidades de campaña con IA generativa...</p>
        </motion.div>
      </div>
    </div>
  );
}
