
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, 
  BarChart3, 
  PieChart, 
  Map,
  Calendar,
  Users,
  MapPin,
  FileText,
  TrendingUp
} from "lucide-react";

const mockData = {
  cidadaosPorBairro: [
    { bairro: "Centro", total: 345 },
    { bairro: "Jardim América", total: 287 },
    { bairro: "Vila Nova", total: 198 },
    { bairro: "São José", total: 156 },
    { bairro: "Outros", total: 261 }
  ],
  demandasPorCategoria: [
    { categoria: "Infraestrutura", total: 45, resolvidas: 23 },
    { categoria: "Iluminação", total: 32, resolvidas: 28 },
    { categoria: "Limpeza", total: 28, resolvidas: 25 },
    { categoria: "Saúde", total: 15, resolvidas: 8 },
    { categoria: "Educação", total: 12, resolvidas: 10 }
  ],
  demograficos: {
    totalCidadaos: 1247,
    homens: 612,
    mulheres: 635,
    faixaEtaria: {
      "18-30": 298,
      "31-45": 487,
      "46-60": 312,
      "60+": 150
    }
  }
};

export default function Relatorios() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gov-gray-900">Relatórios</h1>
          <p className="text-gov-gray-500 mt-1">Análise de dados e estatísticas do gabinete</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select defaultValue="30">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
              <SelectItem value="365">Último ano</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="gap-2 bg-gradient-gov hover:opacity-90">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">{mockData.demograficos.totalCidadaos}</p>
                <p className="text-sm text-gov-gray-500">Total Cidadãos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">
                  {mockData.demandasPorCategoria.reduce((acc, item) => acc + item.total, 0)}
                </p>
                <p className="text-sm text-gov-gray-500">Total Demandas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">
                  {Math.round((mockData.demandasPorCategoria.reduce((acc, item) => acc + item.resolvidas, 0) / 
                    mockData.demandasPorCategoria.reduce((acc, item) => acc + item.total, 0)) * 100)}%
                </p>
                <p className="text-sm text-gov-gray-500">Taxa Resolução</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gov-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Map className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gov-gray-900">{mockData.cidadaosPorBairro.length}</p>
                <p className="text-sm text-gov-gray-500">Bairros Atendidos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cidadãos por Bairro */}
        <Card className="gov-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gov-gray-900">
              <BarChart3 className="w-5 h-5" />
              Cidadãos por Bairro
            </CardTitle>
            <CardDescription>Distribuição geográfica dos cidadãos cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.cidadaosPorBairro.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gov-blue-500 rounded"></div>
                    <span className="font-medium text-gov-gray-700">{item.bairro}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-gov-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gov-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${(item.total / Math.max(...mockData.cidadaosPorBairro.map(b => b.total))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gov-gray-900 w-12 text-right">
                      {item.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demandas por Categoria */}
        <Card className="gov-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gov-gray-900">
              <PieChart className="w-5 h-5" />
              Demandas por Categoria
            </CardTitle>
            <CardDescription>Status de resolução por tipo de demanda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.demandasPorCategoria.map((item, index) => (
                <div key={index} className="p-3 bg-gov-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gov-gray-700">{item.categoria}</span>
                    <span className="text-sm text-gov-gray-500">
                      {item.resolvidas}/{item.total}
                    </span>
                  </div>
                  <div className="w-full bg-gov-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${(item.resolvidas / item.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gov-gray-500 mt-1">
                    <span>{Math.round((item.resolvidas / item.total) * 100)}% resolvidas</span>
                    <span>{item.total - item.resolvidas} pendentes</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demografia */}
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gov-gray-900">
            <Users className="w-5 h-5" />
            Dados Demográficos
          </CardTitle>
          <CardDescription>Distribuição por gênero e faixa etária</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gênero */}
            <div>
              <h4 className="font-medium text-gov-gray-700 mb-4">Distribuição por Gênero</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Mulheres</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 bg-gov-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(mockData.demograficos.mulheres / mockData.demograficos.totalCidadaos) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-12">
                      {mockData.demograficos.mulheres}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Homens</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 bg-gov-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(mockData.demograficos.homens / mockData.demograficos.totalCidadaos) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-12">
                      {mockData.demograficos.homens}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Faixa Etária */}
            <div>
              <h4 className="font-medium text-gov-gray-700 mb-4">Distribuição por Faixa Etária</h4>
              <div className="space-y-3">
                {Object.entries(mockData.demograficos.faixaEtaria).map(([faixa, total]) => (
                  <div key={faixa} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-purple-500 rounded"></div>
                      <span>{faixa} anos</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 bg-gov-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${(total / mockData.demograficos.totalCidadaos) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold w-12">{total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gov-gray-900">
            <FileText className="w-5 h-5" />
            Opções de Exportação
          </CardTitle>
          <CardDescription>Baixe relatórios detalhados em diferentes formatos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Download className="w-6 h-6" />
              <span>Relatório Completo</span>
              <span className="text-xs text-gov-gray-500">PDF • Excel</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="w-6 h-6" />
              <span>Lista de Cidadãos</span>
              <span className="text-xs text-gov-gray-500">CSV • Excel</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <MapPin className="w-6 h-6" />
              <span>Relatório de Demandas</span>
              <span className="text-xs text-gov-gray-500">PDF • Excel</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
