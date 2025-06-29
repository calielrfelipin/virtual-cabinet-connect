
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save } from "lucide-react";

export default function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="text-gov-gray-900">Alterar Senha</CardTitle>
          <CardDescription>Mantenha sua conta segura com uma senha forte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="senha-atual">Senha Atual</Label>
            <Input
              id="senha-atual"
              type="password"
              placeholder="Digite sua senha atual"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nova-senha">Nova Senha</Label>
            <Input
              id="nova-senha"
              type="password"
              placeholder="Digite sua nova senha"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
            <Input
              id="confirmar-senha"
              type="password"
              placeholder="Confirme sua nova senha"
            />
          </div>

          <Button className="gap-2">
            <Save className="w-4 h-4" />
            Alterar Senha
          </Button>
        </CardContent>
      </Card>

      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="text-gov-gray-900">Sessões Ativas</CardTitle>
          <CardDescription>Gerencie onde você está logado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gov-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gov-gray-900">Navegador Atual</p>
                <p className="text-sm text-gov-gray-500">Chrome • São Paulo, SP • Ativo agora</p>
              </div>
              <Badge className="bg-green-50 text-green-700">Atual</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gov-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gov-gray-900">Dispositivo Mobile</p>
                <p className="text-sm text-gov-gray-500">Safari • São Paulo, SP • 2 dias atrás</p>
              </div>
              <Button variant="outline" size="sm">
                Encerrar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
