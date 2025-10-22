import { RiskIndicator } from "../risk-indicator";

export default function RiskIndicatorExample() {
  return (
    <div className="flex gap-2 flex-wrap">
      <RiskIndicator level="bajo" />
      <RiskIndicator level="medio" />
      <RiskIndicator level="alto" />
    </div>
  );
}
