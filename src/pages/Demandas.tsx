
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Map,
  Calendar
} from "lucide-react";

const mockDemandas = [
  {
    id: 1,
    titulo: "Buraco na Rua das Flores",
    descricao: "Buraco grande causando transtornos no trânsito",
    categoria: "Infraestrutura",
    status: "Em andamento",
    endereco: "Rua das Flores, 123 - Centro",
    cidadao: "Maria Silva Santos",
    data_criacao: "2024-01-15",
    prioridade: "Alta"
  },
  {
    id: 2,
    titulo: "Falta de Iluminação Pública",
    descricao: "Poste queimado deixando a rua escura à noite",
    categoria: "Iluminação",
    status: "Nova",
    endereco: "Av. Principal, 456 - Jardim América",
    cidadao: "João Pedro Oliveira",
    data_criacao: "2024-01-20",
    prioridade: "Média"
  },
  {
    id: 3,
    titulo: "Limpeza de Terreno Baldio",
    descricao: "Terreno com mato alto e lixo acumulado",
    categoria: "Limpeza",
    status: "Resolvida",
    endereco: "Rua do Comércio, 789 - Vila Nova",
    cidadao: "Ana Carolina Costa",
    data_criacao: "2024-01-10",
    prioridade: "Baixa"
  }
];

const categorias = ["Todas", "Infraestrutura", "Iluminação", "Limpeza", "Saúde", "Educação", "Transporte"];
const statusOptions = ["Todos", "Nova", "Em andamento", "Resolvida"];

export default function Demandas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("Todas");
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  const filteredDemandas = mockDemandas.filter(demanda => {
    const matchesSearch = demanda.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         demanda.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         demanda.endereco.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategoria = selectedCategoria === "Todas" || demanda.categoria === selectedCategoria;
    const matchesStatus = selectedStatus === "Todos" || demanda.status === selectedStatus;
    
    return matchesSearch && matchesCategoria && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Nova":
        return <AlertCircle className="w-4 h-4" />;
      case "Em andamento":
        return <Clock className="w-4 h-4" />;
      case "Resolvida":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Nova":
        return "bg-red-50 text-red-700 border-red-200";
      case "Em andamento":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Resolvida":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case "Alta":
        return "bg-red-100 text-red-800";
      case "Média":
        return "bg-yellow-100 text-yellow-800";
      case "Baixa":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gov-gray-900">Demandas</h1>
          <p className="text-gov-gray-500 mt-1">Gerencie as demandas e solicitações dos cidadãos</p>
        </div>
        
        <Button className="gap-2 bg-gradient-gov hover:opacity-90">
          <Plus className="w-4 h-4" />
          Nova Demanda
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">
                  {mockDemandas.filter(d => d.status === "Nova").length}
                </p>
                <p className="text-sm text-gov-gray-500">Novas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">
                  {mockDemandas.filter(d => d.status === "Em andamento").length}
                </p>
                <p className="text-sm text-gov-gray-500">Em Andamento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">
                  {mockDemandas.filter(d => d.status === "Resolvida").length}
                </p>
                <p className="text-sm text-gov-gray-500">Resolvidas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">{mockDemandas.length}</p>
                <p className="text-sm text-gov-gray-500">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="gov-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gov-gray-400 w-4 h-4" />
              <Input 
                placeholder="Buscar demandas..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map(categoria => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Map className="w-4 h-4" />
              Ver no Mapa
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Demandas List */}
      <div className="space-y-4">
        {filteredDemandas.map((demanda) => (
          <Card key={demanda.id} className="gov-card hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gov-gray-900">
                      {demanda.titulo}
                    </h3>
                    <Badge className={`${getStatusColor(demanda.status)} gap-1 font-medium`}>
                      {getStatusIcon(demanda.status)}
                      {demanda.status}
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(demanda.prioridade)}>
                      {demanda.prioridade}
                    </Badge>
                  </div>
                  
                  <p className="text-gov-gray-600 mb-3">
                    {demanda.descricao}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gov-gray-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {demanda.endereco}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(demanda.data_criacao).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Solicitante:</span>
                      {demanda.cidadao}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" size="sm">
                    Editar Status
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDemandas.length === 0 && (
        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gov-gray-400 mx-auto mb-4" />
              <p className="text-gov-gray-500 font-medium">Nenhuma demanda encontrada</p>
              <p className="text-sm text-gov-gray-400 mt-1">
                Tente ajustar os filtros ou criar uma nova demanda
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
