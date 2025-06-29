
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Save, 
  Palette, 
  User, 
  Settings,
  Shield,
  Building2,
  Camera,
  Bell
} from "lucide-react";

const coresPredefinidas = [
  { nome: "Azul Governo", primaria: "#006fd6", secundaria: "#f1f5f9" },
  { nome: "Verde Sustentável", primaria: "#10b981", secundaria: "#f0fdf4" },
  { nome: "Roxo Moderno", primaria: "#8b5cf6", secundaria: "#faf5ff" },
  { nome: "Vermelho Ativo", primaria: "#ef4444", secundaria: "#fef2f2" },
];

export default function Configuracoes() {
  const [corPrimaria, setCorPrimaria] = useState("#006fd6");
  const [corSecundaria, setCorSecundaria] = useState("#f1f5f9");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gov-gray-900">Configurações</h1>
          <p className="text-gov-gray-500 mt-1">Personalize seu gabinete virtual</p>
        </div>
      </div>

      <Tabs defaultValue="gabinete" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="gabinete" className="gap-2">
            <Building2 className="w-4 h-4" />
            Gabinete
          </TabsTrigger>
          <TabsTrigger value="perfil" className="gap-2">
            <User className="w-4 h-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="sistema" className="gap-2">
            <Settings className="w-4 h-4" />
            Sistema
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="gap-2">
            <Shield className="w-4 h-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        {/* Configurações do Gabinete */}
        <TabsContent value="gabinete" className="space-y-6">
          <Card className="gov-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gov-gray-900">
                <Camera className="w-5 h-5" />
                Logomarca do Gabinete
              </CardTitle>
              <CardDescription>
                Faça upload da logomarca oficial do seu gabinete
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-gov rounded-lg flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <Button className="gap-2">
                    <Upload className="w-4 h-4" />
                    Fazer Upload
                  </Button>
                  <p className="text-sm text-gov-gray-500">
                    Arquivos aceitos: PNG, JPG (máx. 2MB)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gov-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gov-gray-900">
                <Palette className="w-5 h-5" />
                Cores da Interface
              </CardTitle>
              <CardDescription>
                Personalize as cores principais do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cores Atuais */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cor-primaria">Cor Primária</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="cor-primaria"
                      type="color"
                      value={corPrimaria}
                      onChange={(e) => setCorPrimaria(e.target.value)}
                      className="w-16 h-10 p-1 rounded cursor-pointer"
                    />
                    <Input
                      value={corPrimaria}
                      onChange={(e) => setCorPrimaria(e.target.value)}
                      placeholder="#006fd6"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cor-secundaria">Cor Secundária</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="cor-secundaria"
                      type="color"
                      value={corSecundaria}
                      onChange={(e) => setCorSecundaria(e.target.value)}
                      className="w-16 h-10 p-1 rounded cursor-pointer"
                    />
                    <Input
                      value={corSecundaria}
                      onChange={(e) => setCorSecundaria(e.target.value)}
                      placeholder="#f1f5f9"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Paletas Predefinidas */}
              <div>
                <Label className="text-sm font-medium text-gov-gray-700 mb-3 block">
                  Paletas Predefinidas
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {coresPredefinidas.map((paleta, index) => (
                    <div
                      key={index}
                      className="p-3 border border-gov-gray-200 rounded-lg cursor-pointer hover:border-gov-blue-300 transition-colors"
                      onClick={() => {
                        setCorPrimaria(paleta.primaria);
                        setCorSecundaria(paleta.secundaria);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gov-gray-900">{paleta.nome}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div 
                              className="w-4 h-4 rounded border"
                              style={{ backgroundColor: paleta.primaria }}
                            ></div>
                            <div 
                              className="w-4 h-4 rounded border"
                              style={{ backgroundColor: paleta.secundaria }}
                            ></div>
                          </div>
                        </div>
                        {corPrimaria === paleta.primaria && (
                          <Badge className="bg-green-50 text-green-700">
                            Ativa
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 border-2 border-dashed border-gov-gray-300 rounded-lg">
                <p className="text-sm text-gov-gray-500 mb-3">Preview das cores:</p>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-10 rounded flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: corPrimaria }}
                  >
                    Primária
                  </div>
                  <div 
                    className="w-16 h-10 rounded flex items-center justify-center border"
                    style={{ backgroundColor: corSecundaria }}
                  >
                    <span style={{ color: corPrimaria }}>Sec.</span>
                  </div>
                </div>
              </div>

              <Button className="gap-2">
                <Save className="w-4 h-4" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Perfil do Vereador */}
        <TabsContent value="perfil" className="space-y-6">
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
        </TabsContent>

        {/* Configurações do Sistema */}
        <TabsContent value="sistema" className="space-y-6">
          <Card className="gov-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gov-gray-900">
                <Bell className="w-5 h-5" />
                Notificações
              </CardTitle>
              <CardDescription>Configure quando receber alertas e notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gov-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gov-gray-900">Nova demanda cadastrada</p>
                    <p className="text-sm text-gov-gray-500">Receber quando uma nova demanda for criada</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gov-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gov-gray-900">Demanda resolvida</p>
                    <p className="text-sm text-gov-gray-500">Notificar quando uma demanda for marcada como resolvida</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 bg-gov-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gov-gray-900">Novo cidadão cadastrado</p>
                    <p className="text-sm text-gov-gray-500">Alertar sobre novos cadastros de cidadãos</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" />
                </div>

                <div className="flex items-center justify-between p-3 bg-gov-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gov-gray-900">Relatórios semanais</p>
                    <p className="text-sm text-gov-gray-500">Receber resumo semanal por e-mail</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>

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
        </TabsContent>

        {/* Segurança */}
        <TabsContent value="seguranca" className="space-y-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
