
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2,
  User, 
  Settings,
  Shield
} from "lucide-react";

import LogoUpload from "@/components/configuracoes/LogoUpload";
import ColorPalette from "@/components/configuracoes/ColorPalette";
import PerfilVereador from "@/components/configuracoes/PerfilVereador";
import NotificationSettings from "@/components/configuracoes/NotificationSettings";
import IntegrationSettings from "@/components/configuracoes/IntegrationSettings";
import SecuritySettings from "@/components/configuracoes/SecuritySettings";

export default function Configuracoes() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gov-gray-900">Configurações</h1>
          <p className="text-gov-gray-500 mt-1">Personalize seu gabinete virtual</p>
        </div>
      </div>

      <Tabs defaultValue="gabinete" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="gabinete" className="gap-2">
            <Building2 className="w-4 h-4" />
            Gabinete
          </TabsTrigger>
          <TabsTrigger value="perfil" className="gap-2">
            <User className="w-4 h-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="sistema" className="gap-2">
            <Settings className="w-4 h-4" />
            Sistema
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="gap-2">
            <Shield className="w-4 h-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        {/* Configurações do Gabinete */}
        <TabsContent value="gabinete" className="space-y-6">
          <LogoUpload />
          <ColorPalette />
        </TabsContent>

        {/* Perfil do Vereador */}
        <TabsContent value="perfil" className="space-y-6">
          <PerfilVereador />
        </TabsContent>

        {/* Configurações do Sistema */}
        <TabsContent value="sistema" className="space-y-6">
          <NotificationSettings />
          <IntegrationSettings />
        </TabsContent>

        {/* Segurança */}
        <TabsContent value="seguranca" className="space-y-6">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
