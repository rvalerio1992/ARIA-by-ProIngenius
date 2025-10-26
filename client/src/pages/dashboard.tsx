import { useState, useEffect } from "react";
import { MetricCard } from "@/components/metric-card";
import { FinancialMetricsWidget } from "@/components/financial-metrics-widget";
import { ARIAActionButtons } from "@/components/aria-action-buttons";
import { ARIAPortfolioAnalysisLoader } from "@/components/aria-portfolio-analysis-loader";
import { DollarSign, TrendingUp, Target, Sparkles, Percent, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

interface MetricsData {
  captaciones_crc: number;
  colocaciones_crc: number;
  neto_crc: number;
  n_clientes: number;
}

interface ClientStats {
  total: number;
  sectorPublico: number;
  sectorPrivado: number;
  mujeres: number;
  hombres: number;
  edadPromedio: number;
  ingresoPromedio: number;
}

export default function Dashboard() {
  const [showAnalysis, setShowAnalysis] = useState(true);
  
  // Fetch real metrics from API
  const { data: metrics, isLoading: metricsLoading } = useQuery<MetricsData>({
    queryKey: ['/api/metrics'],
  });
  
  // Fetch client stats
  const { data: clientStats, isLoading: statsLoading } = useQuery<ClientStats>({
    queryKey: ['/api/clients/stats'],
  });

  // Reset analysis on mount
  useEffect(() => {
    setShowAnalysis(true);
  }, []);

  const handleAnalysisComplete = () => {
    setTimeout(() => {
      setShowAnalysis(false);
    }, 300);
  };

  // Show ARIA analysis loader on initial load
  if (!metricsLoading && !statsLoading && metrics && clientStats && showAnalysis) {
    return (
      <ARIAPortfolioAnalysisLoader onComplete={handleAnalysisComplete} />
    );
  }

  // Calculated values for USD (usando los valores existentes como USD)
  const saldosPasivos = metrics?.captaciones_crc || 42196704;
  const saldosActivos = metrics?.colocaciones_crc || 10931313;
  const contribucionNeta = 45280500; // Valor inventado para Contribución Neta
  const vinculacionAlta = 62; // % de clientes con alta vinculación
  
  // Metas YTD (inventadas)
  const metaSaldosPasivos = 40000000;
  const metaSaldosActivos = 11000000;
  const metaContribucionNeta = 44000000;
  const metaVinculacionAlta = 60; // Meta de 60% de clientes con alta vinculación
  
  // Calcular diferencias porcentuales con meta
  const diffPasivosPct = ((saldosPasivos - metaSaldosPasivos) / metaSaldosPasivos * 100);
  const diffActivosPct = ((saldosActivos - metaSaldosActivos) / metaSaldosActivos * 100);
  const diffContribucionPct = ((contribucionNeta - metaContribucionNeta) / metaContribucionNeta * 100);
  const diffVinculacionPct = vinculacionAlta - metaVinculacionAlta; // Diferencia absoluta en puntos porcentuales

  // Financial metrics for the portfolio
  const financialMetrics = [
    {
      label: "Tasa Pasiva Ponderada",
      value: "5.2%",
      icon: <Percent className="h-4 w-4" />,
      status: "good" as const
    },
    {
      label: "Tasa Activa Ponderada",
      value: "9.8%",
      icon: <Percent className="h-4 w-4" />,
      status: "good" as const
    },
    {
      label: "Margen Financiero Promedio",
      value: "4.6%",
      icon: <TrendingUp className="h-4 w-4" />,
      status: "good" as const
    },
    {
      label: "Mora > 90 días",
      value: "3.8%",
      icon: <AlertTriangle className="h-4 w-4" />,
      status: "warning" as const
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          <Badge variant="outline" className="gap-1" data-testid="badge-aria-status">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            ARIA activo · Analizando {clientStats?.total || 926} clientes
          </Badge>
        </div>
        <h1 className="text-3xl font-semibold">Análisis de Cartera</h1>
        <p className="text-muted-foreground">
          Bienvenido Victor Hugo Pavon · ARIA te ha preparado tu resumen inteligente
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Saldos Pasivos"
          value={metricsLoading ? "Cargando..." : `$${(saldosPasivos / 1000000).toFixed(1)}M`}
          trend={{ value: Math.abs(diffPasivosPct), direction: diffPasivosPct >= 0 ? "up" : "down" }}
          status={{
            label: diffPasivosPct >= 0 ? "Sobre meta" : "Bajo meta",
            type: diffPasivosPct >= 0 ? "success" : "warning"
          }}
          subtitle={`Meta YTD: $${(metaSaldosPasivos / 1000000).toFixed(1)}M`}
          icon={<DollarSign className="h-4 w-4" />}
          data-testid="metric-saldos-pasivos"
        />
        <MetricCard
          title="Saldos Activos"
          value={metricsLoading ? "Cargando..." : `$${(saldosActivos / 1000000).toFixed(1)}M`}
          trend={{ value: Math.abs(diffActivosPct), direction: diffActivosPct >= 0 ? "up" : "down" }}
          status={{
            label: diffActivosPct >= 0 ? "Sobre meta" : "Bajo meta",
            type: diffActivosPct >= 0 ? "success" : "warning"
          }}
          subtitle={`Meta YTD: $${(metaSaldosActivos / 1000000).toFixed(1)}M`}
          icon={<DollarSign className="h-4 w-4" />}
          data-testid="metric-saldos-activos"
        />
        <MetricCard
          title="Contribución Neta"
          value={`$${(contribucionNeta / 1000000).toFixed(1)}M`}
          trend={{ value: Math.abs(diffContribucionPct), direction: diffContribucionPct >= 0 ? "up" : "down" }}
          status={{
            label: diffContribucionPct >= 0 ? "Sobre meta" : "Bajo meta",
            type: diffContribucionPct >= 0 ? "success" : "warning"
          }}
          subtitle={`Meta YTD: $${(metaContribucionNeta / 1000000).toFixed(1)}M`}
          icon={<TrendingUp className="h-4 w-4" />}
          data-testid="metric-contribucion-neta"
        />
        <MetricCard
          title="% Clientes con Alta Vinculación"
          value={`${vinculacionAlta.toFixed(0)}%`}
          trend={{ value: Math.abs(diffVinculacionPct), direction: diffVinculacionPct >= 0 ? "up" : "down" }}
          status={{
            label: diffVinculacionPct >= 0 ? "Sobre meta" : "Bajo meta",
            type: diffVinculacionPct >= 0 ? "success" : "warning"
          }}
          subtitle={`Meta YTD: ${metaVinculacionAlta.toFixed(0)}%`}
          icon={<Target className="h-4 w-4" />}
          data-testid="metric-vinculacion-alta"
        />
      </div>

      <FinancialMetricsWidget metrics={financialMetrics} />

      <div>
        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-accent" />
          Explora con ARIA
        </h2>
        <p className="text-muted-foreground mb-6">
          ARIA ha identificado insights accionables en tu cartera. Elige cómo quieres profundizar:
        </p>
        <ARIAActionButtons />
      </div>
    </div>
  );
}
