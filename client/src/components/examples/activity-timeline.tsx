import { ActivityTimeline } from "../activity-timeline";

export default function ActivityTimelineExample() {
  const items = [
    {
      id: "1",
      type: "call" as const,
      title: "Llamada de seguimiento",
      description: "Discusión sobre nuevas oportunidades de inversión en mercados emergentes",
      timestamp: "Hace 2 horas",
      actor: "María González",
    },
    {
      id: "2",
      type: "meeting" as const,
      title: "Reunión trimestral",
      description: "Revisión de cartera y ajuste de estrategia para Q2 2025",
      timestamp: "Hace 1 día",
      actor: "Carlos Ruiz",
    },
    {
      id: "3",
      type: "email" as const,
      title: "Propuesta de producto",
      description: "Envío de información sobre nuevos fondos ESG",
      timestamp: "Hace 3 días",
      actor: "Ana Martínez",
    },
    {
      id: "4",
      type: "transaction" as const,
      title: "Transacción completada",
      description: "Depósito a plazo de $500,000 USD a 12 meses",
      timestamp: "Hace 5 días",
    },
  ];

  return <ActivityTimeline items={items} />;
}
