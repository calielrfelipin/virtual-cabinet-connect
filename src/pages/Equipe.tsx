
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  Phone, 
  Mail, 
  Shield, 
  User,
  Settings
} from "lucide-react";

const mockEquipe = [
  {
    id: 1,
    nome: "Carlos Eduardo Silva",
    cargo: "Chefe de Gabinete",
    telefone: "(11) 99999-0001",
    email: "carlos.silva@gabinete.gov.br",
    acesso_sistema: true,
    permissoes: ["Administrador"]
  },
  {
    id: 2,
    nome: "Fernanda Costa Santos",
    cargo: "Assessora Parlamentar",
    telefone: "(11) 99999-0002",
    email: "fernanda.costa@gabinete.gov.br",
    acesso_sistema: true,
    permissoes: ["Visualizar", "Editar Demandas"]
  },
  {
    id: 3,
    nome: "Roberto Almeida",
    cargo: "Assistente Administrativo",
    telefone: "(11) 99999-0003",
    email: "roberto.almeida@gabinete.gov.br",
    acesso_sistema: false,
    permissoes: []
  }
];

export default function Equipe() {
  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gov-gray-900">Equipe</h1>
          <p className="text-gov-gray-500 mt-1">Gerencie os membros da sua equipe e suas permissões</p>
        </div>
        
        <Button className="gap-2 bg-gradient-gov hover:opacity-90">
          <Plus className="w-4 h-4" />
          Novo Membro
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">{mockEquipe.length}</p>
                <p className="text-sm text-gov-gray-500">Total de Membros</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">
                  {mockEquipe.filter(m => m.acesso_sistema).length}
                </p>
                <p className="text-sm text-gov-gray-500">Com Acesso ao Sistema</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">
                  {mockEquipe.filter(m => m.permissoes.includes("Administrador")).length}
                </p>
                <p className="text-sm text-gov-gray-500">Administradores</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockEquipe.map((membro) => (
          <Card key={membro.id} className="gov-card hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-gov text-white font-semibold">
                    {getInitials(membro.nome)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-gov-gray-900">
                        {membro.nome}
                      </CardTitle>
                      <CardDescription className="text-gov-gray-500 font-medium">
                        {membro.cargo}
                      </CardDescription>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {membro.acesso_sistema ? (
                        <Badge className="bg-green-50 text-green-700 border-green-200">
                          Acesso Ativo
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gov-gray-500">
                          Sem Acesso
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gov-gray-600">
                  <Phone className="w-4 h-4" />
                  {membro.telefone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gov-gray-600">
                  <Mail className="w-4 h-4" />
                  {membro.email}
                </div>
              </div>

              {membro.permissoes.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gov-gray-700 mb-2">Permissões:</p>
                  <div className="flex flex-wrap gap-1">
                    {membro.permissoes.map((permissao, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {permissao}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Permissões
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Permissions Info */}
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="text-gov-gray-900">Níveis de Permissão</CardTitle>
          <CardDescription>Entenda os diferentes tipos de acesso no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Administrador</h4>
              <p className="text-sm text-red-600">Acesso total ao sistema, incluindo configurações e relatórios</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Editor</h4>
              <p className="text-sm text-blue-600">Pode editar cidadãos, demandas e visualizar relatórios</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Visualizador</h4>
              <p className="text-sm text-green-600">Apenas visualização de dados, sem permissão de edição</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">Sem Acesso</h4>
              <p className="text-sm text-gray-600">Membro da equipe sem acesso ao sistema digital</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
