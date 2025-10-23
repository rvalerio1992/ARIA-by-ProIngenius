import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { User, DollarSign, Briefcase, Search } from "lucide-react";
import { Link } from "wouter";

interface ClientProfile {
  sexo: string;
  edad: number;
  ingreso: number;
  antiguedad_laboral: number;
  sector_publico_flag: number;
}

interface Client {
  cliente_id: string;
  perfil: ClientProfile;
  resumen: string;
}

interface ClientsResponse {
  clients: Client[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function Clients() {
  const [page, setPage] = useState(1);
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Build query params
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: '24',
  });
  
  if (sectorFilter !== "all") {
    queryParams.append('sector', sectorFilter);
  }
  
  // Fetch clients
  const { data, isLoading, error } = useQuery<ClientsResponse>({
    queryKey: ['/api/clients', queryParams.toString()],
    queryFn: async () => {
      const response = await fetch(`/api/clients?${queryParams.toString()}`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      return response.json();
    },
  });
  
  // Filter by search term (client-side)
  const filteredClients = data?.clients.filter(client => 
    searchTerm === "" || 
    client.cliente_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.resumen.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Cartera de Clientes</h1>
        <p className="text-muted-foreground">
          {data?.pagination.total || 926} clientes en tu cartera
        </p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por ID o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-clients"
          />
        </div>
        
        <Select value={sectorFilter} onValueChange={setSectorFilter}>
          <SelectTrigger className="w-[200px]" data-testid="select-sector-filter">
            <SelectValue placeholder="Filtrar por sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los sectores</SelectItem>
            <SelectItem value="publico">Sector Público</SelectItem>
            <SelectItem value="privado">Sector Privado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Client Grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : error ? (
        <Card className="p-8">
          <div className="text-center text-muted-foreground">
            Error cargando clientes. Por favor intenta nuevamente.
          </div>
        </Card>
      ) : filteredClients.length === 0 ? (
        <Card className="p-8">
          <div className="text-center text-muted-foreground">
            No se encontraron clientes con los filtros aplicados.
          </div>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredClients.map((client) => {
              const esSectorPublico = client.perfil.sector_publico_flag === 1;
              const ingresoCategoria = client.perfil.ingreso < 2000 ? 'bajo' : 
                                       client.perfil.ingreso < 6000 ? 'medio' : 'alto';
              
              return (
                <Card 
                  key={client.cliente_id} 
                  className="hover-elevate active-elevate-2 transition-all cursor-pointer"
                  data-testid={`card-client-${client.cliente_id}`}
                >
                  <Link href={`/clients/${client.cliente_id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base">
                          {client.cliente_id}
                        </CardTitle>
                        <Badge 
                          variant={esSectorPublico ? "default" : "outline"}
                          className="text-xs"
                        >
                          {esSectorPublico ? "Público" : "Privado"}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2 text-xs">
                        {client.resumen}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{client.perfil.edad} años · {client.perfil.sexo}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>
                          ₡{client.perfil.ingreso.toLocaleString()}
                          <Badge 
                            variant="outline" 
                            className="ml-2 text-xs"
                          >
                            {ingresoCategoria}
                          </Badge>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{client.perfil.antiguedad_laboral} meses antigüedad</span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
          
          {/* Pagination */}
          {data && data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                data-testid="button-prev-page"
              >
                Anterior
              </Button>
              <span className="text-sm text-muted-foreground">
                Página {page} de {data.pagination.totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))}
                disabled={page === data.pagination.totalPages}
                data-testid="button-next-page"
              >
                Siguiente
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
