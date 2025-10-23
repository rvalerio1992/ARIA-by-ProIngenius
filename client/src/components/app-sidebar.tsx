import {
  LayoutDashboard,
  Users,
  Target,
  Bot,
  Settings,
  FileText,
  Bell,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Cartera Clientes",
    url: "/clients",
    icon: Users,
    badge: "926",
  },
  {
    title: "Enfoque 1:1",
    url: "/enfoque",
    icon: Users,
    badge: "Premium",
  },
  {
    title: "Enfoque Campaña",
    url: "/recommendations",
    icon: Target,
    aiPowered: true,
  },
  {
    title: "ARIA Responde",
    url: "/copilot",
    icon: Bot,
    aiPowered: true,
  },
  {
    title: "Reportes",
    url: "/reports",
    icon: FileText,
    aiPowered: true,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent">
            <Sparkles className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <div className="text-sm font-semibold flex items-center gap-1">
              ARIA
              <Badge variant="secondary" className="text-[10px] px-1 py-0">IA</Badge>
            </div>
            <p className="text-[10px] leading-tight text-[#fcfcfc]">Agente de Relación Inteligente </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={`link-${item.url.slice(1) || "dashboard"}`}>
                      <item.icon className="h-4 w-4" />
                      <span className="flex items-center gap-2">
                        {item.title}
                        {item.aiPowered && (
                          <Sparkles className="h-3 w-3 text-accent" />
                        )}
                        {item.badge && (
                          <Badge variant="outline" className="text-[10px] px-1 py-0">
                            {item.badge}
                          </Badge>
                        )}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Configuración</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/settings" data-testid="link-settings">
                    <Settings className="h-4 w-4" />
                    <span>Preferencias</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/notifications" data-testid="link-notifications">
                    <Bell className="h-4 w-4" />
                    <span>Notificaciones</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="text-xs">
          <p className="text-muted-foreground">Ejecutivo Premium</p>
          <p className="font-medium text-foreground">María González</p>
          <div className="flex items-center gap-1 mt-2 text-accent">
            <Sparkles className="h-3 w-3" />
            <span className="text-[10px]">ARIA activo · Aprendiendo</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
