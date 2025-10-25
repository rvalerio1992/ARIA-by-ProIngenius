import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ShoppingBag } from "lucide-react";

interface MCCData {
  categoria: string;
  monto: number;
  color: string;
}

interface MCCConsumptionChartProps {
  data?: MCCData[];
}

export function MCCConsumptionChart({ data }: MCCConsumptionChartProps) {
  // Mock data - consumo por MCC/categorías de comercios
  const defaultData: MCCData[] = [
    { categoria: "Supermercados", monto: 2850, color: "hsl(var(--chart-1))" },
    { categoria: "Restaurantes", monto: 1920, color: "hsl(var(--chart-2))" },
    { categoria: "Gasolineras", monto: 1540, color: "hsl(var(--chart-3))" },
    { categoria: "Farmacias", monto: 980, color: "hsl(var(--chart-4))" },
    { categoria: "Entretenimiento", monto: 720, color: "hsl(var(--chart-5))" },
  ];

  const chartData = data || defaultData;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-md p-2 shadow-md">
          <p className="text-sm font-medium">{payload[0].payload.categoria}</p>
          <p className="text-sm text-muted-foreground">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card data-testid="card-mcc-consumption">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" data-testid="title-mcc-consumption">
          <ShoppingBag className="h-5 w-5" />
          Consumo por Categoría MCC
        </CardTitle>
        <CardDescription>
          Top 5 categorías de comercios (últimos 30 días)
        </CardDescription>
      </CardHeader>
      <CardContent data-testid="content-mcc-consumption">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="categoria" 
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
              angle={-15}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="monto" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
