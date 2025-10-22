import { ComplianceBadge } from "../compliance-badge";

export default function ComplianceBadgeExample() {
  return (
    <div className="flex gap-2 flex-wrap">
      <ComplianceBadge type="KYC" status="compliant" />
      <ComplianceBadge type="AML" status="pending" />
      <ComplianceBadge type="FATCA" status="warning" />
      <ComplianceBadge type="PEP" status="alert" />
    </div>
  );
}
