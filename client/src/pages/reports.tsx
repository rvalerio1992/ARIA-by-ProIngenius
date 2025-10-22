import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Reports() {
  // TODO: Remove mock data
  const reports = [
    {
      id: "1",
      name: "Reporte Mensual - Diciembre 2024",
      type: "Mensual",
      date: "01/01/2025",
      status: "Disponible",
    },
    {
      id: "2",
      name: "Análisis Trimestral Q4 2024",
      type: "Trimestral",
      date: "15/12/2024",
      status: "Disponible",
    },
    {
      id: "3",
      name: "Cumplimiento KYC - Resumen",
      type: "Cumplimiento",
      date: "20/12/2024",
      status: "Disponible",
    },
    {
      id: "4",
      name: "Reporte de Riesgos Premium",
      type: "Riesgos",
      date: "10/12/2024",
      status: "Disponible",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Reportes</h1>
        <p className="text-muted-foreground">
          Accede a reportes automáticos y documentación de cumplimiento
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Reportes Disponibles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-md border hover-elevate"
            >
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold">{report.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{report.date}</span>
                  <Badge variant="outline" className="text-xs">
                    {report.type}
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => console.log("Download:", report.id)}
                data-testid={`button-download-${report.id}`}
              >
                <Download className="h-4 w-4" />
                Descargar
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Generar Reporte Personalizado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground text-center py-8">
            Herramienta de generación de reportes disponible próximamente
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
