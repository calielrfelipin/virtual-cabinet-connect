
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin, FileText, TrendingUp, Plus, Calendar } from "lucide-react";

const stats = [
  {
    title: "Cidadãos Cadastrados",
    value: "1,247",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Demandas Ativas",
    value: "89",
    change: "+8%",
    icon: MapPin,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Demandas Resolvidas",
    value: "156",
    change: "+23%",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Taxa de Resolução",
    value: "64%",
    change: "+5%",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

const recentActivities = [
  {
    type: "cidadao",
    title: "Novo cidadão cadastrado",
    description: "Maria Silva foi adicionada ao sistema",
    time: "há 2 horas",
  },
  {
    type: "demanda",
    title: "Demanda resolvida",
    description: "Buraco na Rua das Flores foi solucionado",
    time: "há 4 horas",
  },
  {
    type: "equipe",
    title: "Novo membro da equipe",
    description: "João Santos foi adicionado como assessor",
    time: "há 1 dia",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gov-gray-900">Dashboard</h1>
          <p className="text-gov-gray-500 mt-1">Visão geral do seu gabinete</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Hoje
          </Button>
          <Button className="gap-2 bg-gradient-gov hover:opacity-90">
            <Plus className="w-4 h-4" />
            Nova Demanda
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="gov-card hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gov-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gov-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 font-medium mt-1">
                {stat.change} em relação ao mês passado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="gov-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-gov-gray-900">Atividades Recentes</CardTitle>
            <CardDescription>Últimas movimentações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-gov-gray-50">
                  <div className="w-2 h-2 bg-gov-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gov-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gov-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gov-gray-400 mt-2">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="gov-card">
          <CardHeader>
            <CardTitle className="text-gov-gray-900">Ações Rápidas</CardTitle>
            <CardDescription>Acesso direto às principais funcionalidades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3 h-12">
              <Users className="w-5 h-5 text-gov-blue-600" />
              Cadastrar Cidadão
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 h-12">
              <MapPin className="w-5 h-5 text-gov-green-600" />
              Nova Demanda
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 h-12">
              <FileText className="w-5 h-5 text-gov-purple-600" />
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Map Preview */}
      <Card className="gov-card">
        <CardHeader>
          <CardTitle className="text-gov-gray-900">Mapa da Cidade</CardTitle>
          <CardDescription>Visualização geográfica de cidadãos e demandas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-subtle rounded-lg flex items-center justify-center border-2 border-dashed border-gov-gray-300">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gov-gray-400 mx-auto mb-4" />
              <p className="text-gov-gray-500 font-medium">Mapa Interativo</p>
              <p className="text-sm text-gov-gray-400 mt-1">
                Conecte a API do Google Maps para visualizar dados geográficos
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
