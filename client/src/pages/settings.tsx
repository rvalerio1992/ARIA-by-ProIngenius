import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon, Bell, Shield, User } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Preferencias</h1>
        <p className="text-muted-foreground">
          Configura tu experiencia en la plataforma Premium CRM
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email</Label>
                <p className="text-xs text-muted-foreground">
                  Recibir alertas por correo electrónico
                </p>
              </div>
              <Switch id="email-notifications" defaultChecked data-testid="switch-email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push</Label>
                <p className="text-xs text-muted-foreground">
                  Notificaciones en tiempo real
                </p>
              </div>
              <Switch id="push-notifications" defaultChecked data-testid="switch-push-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="recommendations">Recomendaciones</Label>
                <p className="text-xs text-muted-foreground">
                  Alertas de NBA+ prioritarias
                </p>
              </div>
              <Switch id="recommendations" defaultChecked data-testid="switch-recommendations" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5" />
              Perfil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <p className="text-sm">María González</p>
            </div>
            <div className="space-y-2">
              <Label>Rol</Label>
              <p className="text-sm">Ejecutivo Premium</p>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <p className="text-sm">maria.gonzalez@banco.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
