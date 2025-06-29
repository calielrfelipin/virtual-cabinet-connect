
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

export default function PerfilVereador() {
  return (
    <Card className="gov-card">
      <CardHeader>
        <CardTitle className="text-gov-gray-900">Informações Pessoais</CardTitle>
        <CardDescription>Mantenha seus dados atualizados</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              placeholder="Seu nome completo"
              defaultValue="Vereador(a) Exemplo"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              defaultValue="vereador@exemplo.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              placeholder="(11) 99999-9999"
              defaultValue="(11) 99999-9999"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="partido">Partido</Label>
            <Input
              id="partido"
              placeholder="Sigla do partido"
              defaultValue="PARTIDO"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cidade">Cidade/Município</Label>
          <Input
            id="cidade"
            placeholder="Nome da cidade"
            defaultValue="Exemplo - SP"
          />
        </div>

        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Salvar Perfil
        </Button>
      </CardContent>
    </Card>
  );
}
