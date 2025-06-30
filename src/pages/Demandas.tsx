import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { DemandaForm } from "@/components/forms/DemandaForm";

const mockDemandas = [
  {
    id: 1,
    titulo: "Buraco na Rua das Flores, 123",
    categoria: "infraestrutura",
    status: "nova",
    localizacao: "Rua das Flores, 123 - Centro",
    cidadao: "Maria Silva",
    data: "2024-01-15",
    descricao: "Buraco grande na pista que está causando acidentes"
  },
  {
    id: 2,
    titulo: "Falta de iluminação na Praça Central",
    categoria: "infraestrutura", 
    status: "em-andamento",
    localizacao: "Praça Central - Centro",
    cidadao: "João Santos",
    data: "2024-01-14",
    descricao: "Postes de luz queimados na praça central"
  },
  {
    id: 3,
    titulo: "Problema no posto de saúde",
    categoria: "saude",
    status: "resolvida",
    localizacao: "UBS Centro",
    cidadao: "Ana Costa",
    data: "2024-01-13",
    descricao: "Demora excessiva no atendimento"
  }
];

export default function Demandas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [demandas, setDemandas] = useState(mockDemandas);

  const handleSaveDemanda = (novaDemanda: any) => {
    const demandaComId = {
      ...novaDemanda,
      id: Date.now(),
      data: new Date().toISOString().split('T')[0]
    };
    setDemandas(prev => [demandaComId, ...prev]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "nova": return "bg-blue-50 text-blue-700 border-blue-200";
      case "em-andamento": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "resolvida": return "bg-green-50 text-green-700 border-green-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "nova": return <AlertCircle className="w-4 h-4" />;
      case "em-andamento": return <Clock className="w-4 h-4" />;
      case "resolvida": return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getCategoriaLabel = (categoria: string) => {
    const labels: { [key: string]: string } = {
      "saude": "Saúde",
      "educacao": "Educação", 
      "transporte": "Transporte",
      "infraestrutura": "Infraestrutura",
      "seguranca": "Segurança",
      "meio-ambiente": "Meio Ambiente",
      "assistencia-social": "Assistência Social",
      "outros": "Outros"
    };
    return labels[categoria] || categoria;
  };

  const filteredDemandas = demandas.filter(demanda =>
    demanda.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demanda.localizacao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demanda.cidadao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Demandas</h1>
          <p className="text-slate-500 mt-1">Gerencie as solicitações dos cidadãos</p>
        </div>
        
        <Button 
          onClick={() => setShowForm(true)}
          className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          <Plus className="w-4 h-4" />
          Nova Demanda
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-slate-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {demandas.filter(d => d.status === "nova").length}
                </p>
                <p className="text-sm text-slate-500">Novas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {demandas.filter(d => d.status === "em-andamento").length}
                </p>
                <p className="text-sm text-slate-500">Em Andamento</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {demandas.filter(d => d.status === "resolvida").length}
                </p>
                <p className="text-sm text-slate-500">Resolvidas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-slate-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                <Filter className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{demandas.length}</p>
                <p className="text-sm text-slate-500">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar demandas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-4 h-4" />
          Filtros
        </Button>
      </div>

      {/* Demandas List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDemandas.map((demanda) => (
          <Card key={demanda.id} className="bg-white border border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-slate-900 leading-tight">
                    {demanda.titulo}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {getCategoriaLabel(demanda.categoria)}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(demanda.status)}`}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(demanda.status)}
                        {demanda.status.replace('-', ' ')}
                      </span>
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-600 line-clamp-2">
                {demanda.descricao}
              </p>
              
              <div className="space-y-2 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {demanda.localizacao}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {demanda.cidadao}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(demanda.data).toLocaleDateString('pt-BR')}
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  Ver Detalhes
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Editar Status
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDemandas.length === 0 && (
        <Card className="bg-white border border-slate-200">
          <CardContent className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Nenhuma demanda encontrada
            </h3>
            <p className="text-slate-500">
              {searchTerm ? "Tente ajustar os filtros de busca." : "Comece cadastrando uma nova demanda."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Dialog do Formulário */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DemandaForm 
            onClose={() => setShowForm(false)}
            onSave={handleSaveDemanda}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
