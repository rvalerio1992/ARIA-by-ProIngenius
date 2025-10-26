import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target, 
  Users, 
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Sparkles
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "opportunity" | "risk" | "goal" | "action";
  priority: "high" | "medium" | "low";
  icon: React.ReactNode;
  actionLabel?: string;
}

export default function Notifications() {
  const notifications: Notification[] = [
    // Oportunidades
    {
      id: "opp-1",
      title: "Cliente cli_00245 cumple 60 días - Momento óptimo para renovación DP",
      description: "Depósito a plazo de $85,000 vence en 3 días. Propensión de renovación: 92%. Oportunidad: Upgrade a tasa premium 6.5%.",
      timestamp: "Hace 2 horas",
      type: "opportunity",
      priority: "high",
      icon: <DollarSign className="h-4 w-4" />,
      actionLabel: "Ver cliente"
    },
    {
      id: "opp-2",
      title: "3 clientes calificados para upgrade Tarjeta Platinum disponibles",
      description: "Clientes cli_00189, cli_00524, cli_00891 con gasto mensual promedio >$8K sin TC premium. Score NBA+ alto (0.87).",
      timestamp: "Hace 4 horas",
      type: "opportunity",
      priority: "high",
      icon: <Target className="h-4 w-4" />,
      actionLabel: "Ver campaña"
    },
    {
      id: "opp-3",
      title: "Campaña 'Impulso Colocaciones' alcanzó 45% de conversión",
      description: "89 de 198 clientes contactados aceptaron propuesta de Crédito Personal. Proyección: +$1.8M en Saldos Activos esta semana.",
      timestamp: "Hace 1 día",
      type: "opportunity",
      priority: "medium",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      id: "opp-4",
      title: "Nuevo cliente premium detectado: cli_00927",
      description: "Ingreso mensual $12,500. Perfil: Sector privado, 38 años. ARIA recomienda: Cuenta Premium + Inversiones.",
      timestamp: "Hace 2 días",
      type: "opportunity",
      priority: "medium",
      icon: <Users className="h-4 w-4" />,
      actionLabel: "Ver perfil"
    },
    
    // Riesgos
    {
      id: "risk-1",
      title: "Cliente cli_00892 sin actividad en 45 días - Riesgo de churn alto",
      description: "Cliente Premium sin transacciones desde 15/Sep. Score churn: 0.78. AUM: $425K. Acción sugerida: Contacto prioritario.",
      timestamp: "Hace 1 hora",
      type: "risk",
      priority: "high",
      icon: <AlertTriangle className="h-4 w-4" />,
      actionLabel: "Contactar ahora"
    },
    {
      id: "risk-2",
      title: "Vencimiento KYC: 12 clientes requieren actualización esta semana",
      description: "Documentos KYC próximos a vencer. Clientes afectados: $2.1M en AUM total. Compliance requiere acción antes del 30/Oct.",
      timestamp: "Hace 3 horas",
      type: "risk",
      priority: "high",
      icon: <FileText className="h-4 w-4" />,
      actionLabel: "Ver lista"
    },
    {
      id: "risk-3",
      title: "Incremento en mora >90 días: +0.3% este mes",
      description: "Mora pasó de 3.5% a 3.8%. 8 clientes nuevos en categoría alto riesgo. Total expuesto: $340K.",
      timestamp: "Hace 6 horas",
      type: "risk",
      priority: "medium",
      icon: <TrendingDown className="h-4 w-4" />,
      actionLabel: "Ver detalles"
    },
    {
      id: "risk-4",
      title: "Cliente cli_00156 redujo saldos en 40% último mes",
      description: "Reducción de $180K a $108K. Posible migración a competencia. Engagement digital: Bajo.",
      timestamp: "Hace 1 día",
      type: "risk",
      priority: "medium",
      icon: <AlertTriangle className="h-4 w-4" />,
      actionLabel: "Investigar"
    },

    // Metas y Desempeño
    {
      id: "goal-1",
      title: "Saldos Activos -0.6% bajo meta YTD - Revisar estrategia",
      description: "Actual: $10.9M | Meta: $11.0M | Brecha: -$100K. Campaña 'Impulso Colocaciones' puede cerrar gap en 2 semanas.",
      timestamp: "Hace 30 minutos",
      type: "goal",
      priority: "high",
      icon: <Target className="h-4 w-4" />,
      actionLabel: "Ver campaña"
    },
    {
      id: "goal-2",
      title: "¡Felicitaciones! Contribución Neta +2.9% sobre objetivo YTD",
      description: "Actual: $45.3M | Meta: $44.0M | Superávit: +$1.3M. Excelente desempeño en margen financiero.",
      timestamp: "Hace 2 horas",
      type: "goal",
      priority: "low",
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      id: "goal-3",
      title: "Alta Vinculación alcanzó 62% - ¡Meta superada!",
      description: "Meta YTD: 60% | Actual: 62% | +2.0pp. 574 clientes con 3+ productos. Estrategia multi-producto funcionando.",
      timestamp: "Hace 5 horas",
      type: "goal",
      priority: "low",
      icon: <TrendingUp className="h-4 w-4" />
    },

    // Acciones Pendientes
    {
      id: "action-1",
      title: "5 propuestas NBA+ requieren seguimiento desde hace 7+ días",
      description: "Clientes: cli_00234, cli_00567, cli_00789, cli_00821, cli_00903. Total oportunidad: $420K. Tasa respuesta baja.",
      timestamp: "Hace 1 hora",
      type: "action",
      priority: "high",
      icon: <Clock className="h-4 w-4" />,
      actionLabel: "Revisar casos"
    },
    {
      id: "action-2",
      title: "Reunión programada: Cliente VIP José Martínez - 2:00 PM hoy",
      description: "Agenda: Revisión portafolio Q4, nuevas oportunidades inversión. AUM: $2.8M. Preparar propuesta fondos premium.",
      timestamp: "Hace 3 horas",
      type: "action",
      priority: "high",
      icon: <Calendar className="h-4 w-4" />,
      actionLabel: "Ver agenda"
    },
    {
      id: "action-3",
      title: "Reporte mensual de cartera pendiente - Vence en 2 días",
      description: "Entrega a gerencia: Viernes 27/Oct. Incluir análisis Saldos Activos, estrategia cierre de brecha, proyección Q4.",
      timestamp: "Hace 8 horas",
      type: "action",
      priority: "medium",
      icon: <FileText className="h-4 w-4" />,
      actionLabel: "Generar reporte"
    },
    {
      id: "action-4",
      title: "Actualizar estrategia para 23 clientes de campaña pausada",
      description: "Campaña 'Cross-sell Seguros' pausada. Clientes en seguimiento requieren reasignación a nueva campaña.",
      timestamp: "Hace 1 día",
      type: "action",
      priority: "low",
      icon: <Users className="h-4 w-4" />,
      actionLabel: "Reasignar"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600/10 text-red-600 border-red-600/20";
      case "medium":
        return "bg-yellow-600/10 text-yellow-600 border-yellow-600/20";
      case "low":
        return "bg-blue-600/10 text-blue-600 border-blue-600/20";
      default:
        return "";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "border-l-green-500";
      case "risk":
        return "border-l-red-500";
      case "goal":
        return "border-l-blue-500";
      case "action":
        return "border-l-yellow-500";
      default:
        return "";
    }
  };

  const filterByType = (type: string) => {
    if (type === "all") return notifications;
    return notifications.filter(n => n.type === type);
  };

  const opportunityCount = notifications.filter(n => n.type === "opportunity").length;
  const riskCount = notifications.filter(n => n.type === "risk").length;
  const goalCount = notifications.filter(n => n.type === "goal").length;
  const actionCount = notifications.filter(n => n.type === "action").length;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          <Badge variant="outline" className="gap-1" data-testid="badge-aria-notifications">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            ARIA monitoreando · {notifications.length} alertas activas
          </Badge>
        </div>
        <h1 className="text-3xl font-semibold flex items-center gap-2">
          <Bell className="h-8 w-8" />
          Notificaciones
        </h1>
        <p className="text-muted-foreground">
          Alertas inteligentes y acciones prioritarias generadas por ARIA
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5" data-testid="tabs-notifications">
          <TabsTrigger value="all" data-testid="tab-all">
            Todas ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="opportunity" data-testid="tab-opportunity">
            Oportunidades ({opportunityCount})
          </TabsTrigger>
          <TabsTrigger value="risk" data-testid="tab-risk">
            Riesgos ({riskCount})
          </TabsTrigger>
          <TabsTrigger value="goal" data-testid="tab-goal">
            Metas ({goalCount})
          </TabsTrigger>
          <TabsTrigger value="action" data-testid="tab-action">
            Acciones ({actionCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`border-l-4 ${getTypeColor(notification.type)} hover-elevate`}
              data-testid={`notification-${notification.id}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">{notification.icon}</div>
                    <div className="flex-1">
                      <CardTitle className="text-base mb-1 flex items-center gap-2">
                        {notification.title}
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getPriorityColor(notification.priority)}`}
                        >
                          {notification.priority === "high" ? "Alta" : notification.priority === "medium" ? "Media" : "Baja"}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {notification.description}
                      </CardDescription>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                  {notification.actionLabel && (
                    <Button variant="outline" size="sm" data-testid={`button-${notification.id}`}>
                      {notification.actionLabel}
                    </Button>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        {["opportunity", "risk", "goal", "action"].map((type) => (
          <TabsContent key={type} value={type} className="space-y-4 mt-6">
            {filterByType(type).map((notification) => (
              <Card 
                key={notification.id} 
                className={`border-l-4 ${getTypeColor(notification.type)} hover-elevate`}
                data-testid={`notification-${notification.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">{notification.icon}</div>
                      <div className="flex-1">
                        <CardTitle className="text-base mb-1 flex items-center gap-2">
                          {notification.title}
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPriorityColor(notification.priority)}`}
                          >
                            {notification.priority === "high" ? "Alta" : notification.priority === "medium" ? "Media" : "Baja"}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {notification.description}
                        </CardDescription>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                    {notification.actionLabel && (
                      <Button variant="outline" size="sm" data-testid={`button-${notification.id}`}>
                        {notification.actionLabel}
                      </Button>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
