
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Users, 
  MapPin, 
  Phone, 
  Mail,
  Filter,
  Download
} from "lucide-react";
import { CidadaoForm } from "@/components/forms/CidadaoForm";

export default function Cidadaos() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cidadaos, setCidadaos] = useState([
    {
      id: 1,
      nome: "Maria Silva Santos",
      endereco: "Rua das Flores, 123 - Centro",
      telefone: "(11) 99999-1111",
      email: "maria.silva@email.com",
      genero: "Feminino",
      recebeInformativos: true,
      multiplicador: false
    },
    {
      id: 2,
      nome: "João Paulo Oliveira",
      endereco: "Av. Principal, 456 - Jardim São José",
      telefone: "(11) 99999-2222",
      email: "joao.paulo@email.com",
      genero: "Masculino",
      recebeInformativos: true,
      multiplicador: true
    }
  ]);

  const handleSaveCidadao = (data: any) => {
    const newCidadao = {
      id: cidadaos.length + 1,
      ...data,
      recebeInformativos: data.recebeInformativos === "sim",
      multiplicador: data.multiplicador === "sim"
    };
    setCidadaos([...cidadaos, newCidadao]);
  };

  const filteredCidadaos = cidadaos.filter(cidadao =>
    cidadao.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cidadao.endereco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gov-gray-900">Cidadãos</h1>
            <p className="text-gov-gray-500 mt-1">Cadastro e gerenciamento de cidadãos</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowForm(false)}
          >
            Voltar à Lista
          </Button>
        </div>

        <div className="flex justify-center">
          <CidadaoForm 
            onClose={() => setShowForm(false)}
            onSave={handleSaveCidadao}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gov-gray-900">Cidadãos</h1>
          <p className="text-gov-gray-500 mt-1">Cadastro e gerenciamento de cidadãos</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Cadastrar Cidadão
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gov-accent-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-gov-accent-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">{cidadaos.length}</p>
                <p className="text-sm text-gov-gray-500">Total de Cidadãos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">
                  {cidadaos.filter(c => c.recebeInformativos).length}
                </p>
                <p className="text-sm text-gov-gray-500">Recebem Informativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">
                  {cidadaos.filter(c => c.multiplicador).length}
                </p>
                <p className="text-sm text-gov-gray-500">Multiplicadores</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">8</p>
                <p className="text-sm text-gov-gray-500">Bairros Atendidos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gov-gray-400 w-4 h-4" />
              <Input 
                placeholder="Buscar por nome ou endereço..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Cidadãos */}
      <div className="grid gap-4">
        {filteredCidadaos.map((cidadao) => (
          <Card key={cidadao.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-gov rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {cidadao.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gov-gray-900">{cidadao.nome}</h3>
                        <div className="flex gap-1">
                          {cidadao.recebeInformativos && (
                            <Badge variant="secondary" className="text-xs">
                              Recebe Informativos
                            </Badge>
                          )}
                          {cidadao.multiplicador && (
                            <Badge className="text-xs bg-purple-100 text-purple-700">
                              Multiplicador
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gov-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{cidadao.endereco}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{cidadao.telefone}</span>
                          </div>
                          {cidadao.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <span>{cidadao.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gov-gray-500">
                    Ver Mais
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredCidadaos.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-gov-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gov-gray-900 mb-2">
                Nenhum cidadão encontrado
              </h3>
              <p className="text-gov-gray-500 mb-4">
                {searchTerm ? "Tente ajustar os filtros de busca" : "Comece cadastrando o primeiro cidadão"}
              </p>
              {!searchTerm && (
                <Button onClick={() => setShowForm(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Cadastrar Primeiro Cidadão
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
