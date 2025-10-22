import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageSquare, Calendar, FileText, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: string;
  type: "call" | "email" | "meeting" | "note" | "transaction";
  title: string;
  description: string;
  timestamp: string;
  actor?: string;
}

interface ActivityTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const getIcon = (type: TimelineItem["type"]) => {
  switch (type) {
    case "call":
      return <Phone className="h-4 w-4" />;
    case "email":
      return <Mail className="h-4 w-4" />;
    case "meeting":
      return <Calendar className="h-4 w-4" />;
    case "note":
      return <FileText className="h-4 w-4" />;
    case "transaction":
      return <TrendingUp className="h-4 w-4" />;
  }
};

export function ActivityTimeline({ items, className }: ActivityTimelineProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                {getIcon(item.type)}
              </div>
              {index < items.length - 1 && (
                <div className="w-px flex-1 bg-border mt-2" />
              )}
            </div>
            <div className="flex-1 space-y-1 pb-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium">{item.title}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {item.timestamp}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              {item.actor && (
                <p className="text-xs text-muted-foreground">Por {item.actor}</p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
