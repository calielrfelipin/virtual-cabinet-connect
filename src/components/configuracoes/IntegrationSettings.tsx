
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

export default function IntegrationSettings() {
  return (
    <Card className="gov-card">
      <CardHeader>
        <CardTitle className="text-gov-gray-900">Integrações</CardTitle>
        <CardDescription>Configure APIs e serviços externos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="google-maps">Google Maps API Key</Label>
          <Input
            id="google-maps"
            type="password"
            placeholder="Sua chave da API do Google Maps"
          />
          <p className="text-sm text-gov-gray-500">
            Necessária para exibir mapas e localização dos cidadãos
          </p>
        </div>

        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Salvar Integrações
        </Button>
      </CardContent>
    </Card>
  );
}
