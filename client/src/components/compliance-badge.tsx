import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type ComplianceStatus = "compliant" | "pending" | "warning" | "alert";

interface ComplianceBadgeProps {
  type: "KYC" | "AML" | "FATCA" | "PEP";
  status: ComplianceStatus;
  className?: string;
}

export function ComplianceBadge({ type, status, className }: ComplianceBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "compliant":
        return {
          icon: <CheckCircle className="h-3 w-3" />,
          className: "bg-chart-2/10 text-chart-2 border-chart-2/20",
        };
      case "pending":
        return {
          icon: <Clock className="h-3 w-3" />,
          className: "bg-chart-3/10 text-chart-3 border-chart-3/20",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="h-3 w-3" />,
          className: "bg-chart-3/10 text-chart-3 border-chart-3/20",
        };
      case "alert":
        return {
          icon: <AlertTriangle className="h-3 w-3" />,
          className: "bg-chart-5/10 text-chart-5 border-chart-5/20",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge variant="outline" className={cn("gap-1 font-medium", config.className, className)}>
      {config.icon}
      {type}
    </Badge>
  );
}
