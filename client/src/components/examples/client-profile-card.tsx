import { ClientProfileCard } from "../client-profile-card";
import avatar1 from "@assets/generated_images/Hispanic_male_executive_headshot_11740d94.png";

export default function ClientProfileCardExample() {
  const client = {
    id: "cl-1",
    name: "Roberto Fernández",
    avatar: avatar1,
    segment: "Ultra Premium",
    industry: "Tecnología",
    aum: "$3.2M",
    lastInteraction: "Hace 2 días - Llamada",
    sentiment: "positive" as const,
    riskLevel: "bajo" as const,
    kycStatus: "compliant" as const,
    email: "roberto.fernandez@email.com",
    phone: "+1 555 0123",
  };

  return (
    <div className="max-w-md">
      <ClientProfileCard
        client={client}
        onContact={(type) => console.log("Contact via:", type)}
      />
    </div>
  );
}
