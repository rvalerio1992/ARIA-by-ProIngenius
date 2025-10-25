import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { CreditCard } from "lucide-react";

interface CardUsageData {
  mes: string;
  transacciones: number;
  monto: number;
}

interface CardUsageHistoryChartProps {
  data?: CardUsageData[];
}

export function CardUsageHistoryChart({ data }: CardUsageHistoryChartProps) {
  // Mock data - histórico de uso de tarjetas (últimos 6 meses)
  const defaultData: CardUsageData[] = [
    { mes: "Sep", transacciones: 42, monto: 5240 },
    { mes: "Oct", transacciones: 38, monto: 4890 },
    { mes: "Nov", transacciones: 51, monto: 6120 },
    { mes: "Dic", transacciones: 67, monto: 8350 },
    { mes: "Ene", transacciones: 45, monto: 5680 },
    { mes: "Feb", transacciones: 53, monto: 6420 },
  ];

  const chartData = data || defaultData;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-md p-3 shadow-md">
          <p className="text-sm font-medium mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-xs flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-2))" }}></span>
              <span className="text-muted-foreground">Transacciones:</span>
              <span className="font-medium">{payload[0].value}</span>
            </p>
            <p className="text-xs flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-1))" }}></span>
              <span className="text-muted-foreground">Monto:</span>
              <span className="font-medium">${payload[1].value.toLocaleString()}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card data-testid="card-usage-history">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" data-testid="title-usage-history">
          <CreditCard className="h-5 w-5" />
          Histórico de Uso de Tarjetas
        </CardTitle>
        <CardDescription>
          Evolución de transacciones y montos (últimos 6 meses)
        </CardDescription>
      </CardHeader>
      <CardContent data-testid="content-usage-history">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="mes" 
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
              label={{ value: 'Transacciones', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
              tickFormatter={(value) => `$${value}`}
              label={{ value: 'Monto ($)', angle: 90, position: 'insideRight', style: { fontSize: 12 } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="transacciones" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Transacciones"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="monto" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Monto ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
