import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metric-card";
import { BarChart3, TrendingUp, Users, DollarSign, Target, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Análisis</h1>
        <p className="text-muted-foreground">
          Portafolio Management · Insights detallados de tu cartera Premium
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Crecimiento AUM (YTD)"
          value="+18.3%"
          trend={{ value: 5.2, direction: "up" }}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricCard
          title="Net New Money"
          value="$8.4M"
          trend={{ value: 12.1, direction: "up" }}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Tasa de Conversión"
          value="68%"
          trend={{ value: 3.5, direction: "up" }}
          icon={<Target className="h-4 w-4" />}
        />
        <MetricCard
          title="Interacciones/Cliente"
          value="12.4"
          trend={{ value: 1.2, direction: "up" }}
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Distribución por Segmento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Ultra Premium</span>
                <span className="font-mono font-semibold">$28.5M (63%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-chart-1" style={{ width: "63%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Premium</span>
                <span className="font-mono font-semibold">$16.7M (37%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-chart-2" style={{ width: "37%" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5" />
              Distribución por Industria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Tecnología", value: 32, color: "bg-chart-1" },
              { name: "Inmobiliario", value: 24, color: "bg-chart-2" },
              { name: "Manufactura", value: 18, color: "bg-chart-3" },
              { name: "Retail", value: 15, color: "bg-chart-4" },
              { name: "Otros", value: 11, color: "bg-chart-5" },
            ].map((industry) => (
              <div key={industry.name} className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${industry.color}`} />
                <span className="text-sm flex-1">{industry.name}</span>
                <span className="text-sm font-medium">{industry.value}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Tendencias Mensuales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground text-center py-8">
            Gráficos de tendencias disponibles próximamente
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
