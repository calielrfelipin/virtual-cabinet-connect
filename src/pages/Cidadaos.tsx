
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Users,
  Map
} from "lucide-react";

const mockCidadaos = [
  {
    id: 1,
    nome: "Maria Silva Santos",
    endereco: "Rua das Flores, 123 - Centro",
    telefone: "(11) 99999-9999",
    email: "maria.silva@email.com",
    idade: 45,
    genero: "Feminino",
    recebe_informativos: true,
    multiplicador: false,
    bairro: "Centro"
  },
  {
    id: 2,
    nome: "João Pedro Oliveira",
    endereco: "Av. Principal, 456 - Jardim América",
    telefone: "(11) 88888-8888",
    email: "joao.pedro@email.com",
    idade: 32,
    genero: "Masculino",
    recebe_informativos: true,
    multiplicador: true,
    bairro: "Jardim América"
  },
  {
    id: 3,
    nome: "Ana Carolina Costa",
    endereco: "Rua do Comércio, 789 - Vila Nova",
    telefone: "(11) 77777-7777",
    email: "ana.costa@email.com",
    idade: 28,
    genero: "Feminino",
    recebe_informativos: false,
    multiplicador: true,
    bairro: "Vila Nova"
  }
];

export default function Cidadaos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const filteredCidadaos = mockCidadaos.filter(cidadao =>
    cidadao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cidadao.endereco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cidadao.bairro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gov-gray-900">Cidadãos</h1>
          <p className="text-gov-gray-500 mt-1">Gerencie o cadastro de cidadãos do seu município</p>
        </div>
        
        <Button className="gap-2 bg-gradient-gov hover:opacity-90">
          <Plus className="w-4 h-4" />
          Novo Cidadão
        </Button>
      </div>

      {/* Stats and Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">{mockCidadaos.length}</p>
                <p className="text-sm text-gov-gray-500">Total de Cidadãos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">
                  {mockCidadaos.filter(c => c.recebe_informativos).length}
                </p>
                <p className="text-sm text-gov-gray-500">Recebem Informativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">
                  {mockCidadaos.filter(c => c.multiplicador).length}
                </p>
                <p className="text-sm text-gov-gray-500">Multiplicadores</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">
                  {new Set(mockCidadaos.map(c => c.bairro)).size}
                </p>
                <p className="text-sm text-gov-gray-500">Bairros</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="gov-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gov-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Buscar por nome, endereço ou bairro..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                Lista
              </Button>
              <Button 
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="gap-2"
              >
                <Map className="w-4 h-4" />
                Mapa
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {viewMode === "list" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCidadaos.map((cidadao) => (
            <Card key={cidadao.id} className="gov-card hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-gov-gray-900">
                      {cidadao.nome}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {cidadao.endereco}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-1">
                    {cidadao.multiplicador && (
                      <Badge variant="secondary" className="text-xs">
                        Multiplicador
                      </Badge>
                    )}
                    {cidadao.recebe_informativos && (
                      <Badge variant="outline" className="text-xs">
                        Informativos
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gov-gray-600">
                  <Phone className="w-4 h-4" />
                  {cidadao.telefone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gov-gray-600">
                  <Mail className="w-4 h-4" />
                  {cidadao.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gov-gray-600">
                  <Calendar className="w-4 h-4" />
                  {cidadao.idade} anos • {cidadao.genero}
                </div>
                <div className="pt-3 border-t">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="gov-card">
          <CardHeader>
            <CardTitle className="text-gov-gray-900">Mapa de Cidadãos</CardTitle>
            <CardDescription>Visualização geográfica dos cidadãos cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gradient-subtle rounded-lg flex items-center justify-center border-2 border-dashed border-gov-gray-300">
              <div className="text-center">
                <Map className="w-16 h-16 text-gov-gray-400 mx-auto mb-4" />
                <p className="text-gov-gray-500 font-medium text-lg">Mapa Interativo de Cidadãos</p>
                <p className="text-sm text-gov-gray-400 mt-2 max-w-md">
                  Aqui será exibido o mapa com a localização de todos os cidadãos cadastrados. 
                  Configure a API do Google Maps para ativar esta funcionalidade.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
