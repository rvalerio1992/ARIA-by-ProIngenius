import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiskIndicator } from "@/components/risk-indicator";
import { ComplianceBadge } from "@/components/compliance-badge";
import { Search, Filter, ArrowUpDown } from "lucide-react";

// TODO: Remove mock data
import avatar1 from "@assets/generated_images/Hispanic_male_executive_headshot_11740d94.png";
import avatar2 from "@assets/generated_images/Asian_female_executive_headshot_f90e7ca6.png";
import avatar3 from "@assets/generated_images/Senior_male_executive_headshot_16557bd9.png";
import avatar4 from "@assets/generated_images/Middle_Eastern_female_executive_headshot_8a359cfc.png";
import avatar5 from "@assets/generated_images/African_male_executive_headshot_f9ecf3cf.png";

import { useLocation } from "wouter";

export default function Portfolio() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSegment, setFilterSegment] = useState("all");

  // TODO: Remove mock data
  const clients = [
    {
      id: "1",
      name: "Roberto Fernández",
      avatar: avatar1,
      segment: "Ultra Premium",
      aum: "$3.2M",
      industry: "Tecnología",
      riskLevel: "bajo" as const,
      kycStatus: "compliant" as const,
      lastContact: "Hace 2 días",
    },
    {
      id: "2",
      name: "Ana Chen",
      avatar: avatar2,
      segment: "Premium",
      aum: "$1.8M",
      industry: "Manufactura",
      riskLevel: "bajo" as const,
      kycStatus: "compliant" as const,
      lastContact: "Hace 1 semana",
    },
    {
      id: "3",
      name: "Michael Johnson",
      avatar: avatar3,
      segment: "Ultra Premium",
      aum: "$5.1M",
      industry: "Inmobiliario",
      riskLevel: "medio" as const,
      kycStatus: "pending" as const,
      lastContact: "Hace 3 días",
    },
    {
      id: "4",
      name: "Layla Hassan",
      avatar: avatar4,
      segment: "Premium",
      aum: "$2.3M",
      industry: "Retail",
      riskLevel: "bajo" as const,
      kycStatus: "compliant" as const,
      lastContact: "Hace 5 días",
    },
    {
      id: "5",
      name: "David Okonkwo",
      avatar: avatar5,
      segment: "Premium",
      aum: "$1.5M",
      industry: "Consultoría",
      riskLevel: "alto" as const,
      kycStatus: "warning" as const,
      lastContact: "Hace 2 semanas",
    },
  ];

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = filterSegment === "all" || client.segment === filterSegment;
    return matchesSearch && matchesSegment;
  });

  const handleClientClick = (clientId: string) => {
    setLocation(`/enfoque/${clientId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Enfoque 1:1 · Vista Premium</h1>
        <p className="text-muted-foreground">
          {clients.length} clientes en tu libro · Vista consolidada con prep inteligente
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros y Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                data-testid="input-search-clients"
              />
            </div>
            <Select value={filterSegment} onValueChange={setFilterSegment}>
              <SelectTrigger className="sm:w-[200px]" data-testid="select-segment-filter">
                <SelectValue placeholder="Segmento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Segmentos</SelectItem>
                <SelectItem value="Ultra Premium">Ultra Premium</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Más Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Clientes ({filteredClients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-md border hover-elevate active-elevate-2 cursor-pointer"
                onClick={() => handleClientClick(client.id)}
                data-testid={`client-row-${client.id}`}
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={client.avatar} alt={client.name} />
                  <AvatarFallback>
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{client.name}</h3>
                    <RiskIndicator level={client.riskLevel} showLabel={false} />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                    <span>{client.segment}</span>
                    <span>•</span>
                    <span>{client.industry}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="font-mono font-semibold">{client.aum}</p>
                  <div className="flex gap-2 flex-wrap">
                    <ComplianceBadge type="KYC" status={client.kycStatus} />
                  </div>
                </div>

                <div className="text-sm text-muted-foreground whitespace-nowrap">
                  {client.lastContact}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
