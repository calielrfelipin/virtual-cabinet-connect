import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface EquipeFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export function EquipeForm({ onClose, onSave }: EquipeFormProps) {
  const { vereadorId } = useAuth();
  const [formData, setFormData] = useState({
    nome: "",
    cargo: "",
    telefone: "",
    email: "",
    acessoSistema: false,
    permissoes: {
      visualizarCidadaos: false,
      editarCidadaos: false,
      visualizarDemandas: false,
      editarDemandas: false,
      visualizarRelatorios: false
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.cargo || !formData.telefone) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    if (!vereadorId) {
      toast.error("Erro: usuário não identificado");
      return;
    }

    setIsLoading(true);

    try {
      const permissoesArray = formData.acessoSistema 
        ? Object.entries(formData.permissoes)
            .filter(([_, value]) => value)
            .map(([key, _]) => key)
        : [];

      const { error } = await supabase
        .from('equipe')
        .insert({
          vereador_id: vereadorId,
          nome: formData.nome,
          cargo: formData.cargo,
          telefone: formData.telefone,
          email: formData.email || null,
          acesso_sistema: formData.acessoSistema,
          permissoes: permissoesArray
        });

      if (error) {
        console.error('Error inserting equipe:', error);
        toast.error("Erro ao cadastrar membro da equipe");
        return;
      }

      toast.success("Membro da equipe cadastrado com sucesso!");
      onSave();
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error("Erro ao cadastrar membro da equipe");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePermissaoChange = (permissao: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissoes: {
        ...prev.permissoes,
        [permissao]: checked
      }
    }));
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-slate-900">Cadastrar Membro da Equipe</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                placeholder="Nome completo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargo">Cargo *</Label>
              <Input
                id="cargo"
                value={formData.cargo}
                onChange={(e) => handleChange("cargo", e.target.value)}
                placeholder="Ex: Assessor, Secretário"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone *</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => handleChange("telefone", e.target.value)}
                placeholder="(11) 99999-9999"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="email@exemplo.com"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="acessoSistema"
                checked={formData.acessoSistema}
                onCheckedChange={(checked) => handleChange("acessoSistema", !!checked)}
              />
              <Label htmlFor="acessoSistema">Tem acesso ao sistema</Label>
            </div>

            {formData.acessoSistema && (
              <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
                <Label className="text-sm font-medium">Permissões de Acesso:</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="visualizarCidadaos"
                      checked={formData.permissoes.visualizarCidadaos}
                      onCheckedChange={(checked) => handlePermissaoChange("visualizarCidadaos", !!checked)}
                    />
                    <Label htmlFor="visualizarCidadaos" className="text-sm">Visualizar Cidadãos</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="editarCidadaos"
                      checked={formData.permissoes.editarCidadaos}
                      onCheckedChange={(checked) => handlePermissaoChange("editarCidadaos", !!checked)}
                    />
                    <Label htmlFor="editarCidadaos" className="text-sm">Editar Cidadãos</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="visualizarDemandas"
                      checked={formData.permissoes.visualizarDemandas}
                      onCheckedChange={(checked) => handlePermissaoChange("visualizarDemandas", !!checked)}
                    />
                    <Label htmlFor="visualizarDemandas" className="text-sm">Visualizar Demandas</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="editarDemandas"
                      checked={formData.permissoes.editarDemandas}
                      onCheckedChange={(checked) => handlePermissaoChange("editarDemandas", !!checked)}
                    />
                    <Label htmlFor="editarDemandas" className="text-sm">Editar Demandas</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="visualizarRelatorios"
                      checked={formData.permissoes.visualizarRelatorios}
                      onCheckedChange={(checked) => handlePermissaoChange("visualizarRelatorios", !!checked)}
                    />
                    <Label htmlFor="visualizarRelatorios" className="text-sm">Visualizar Relatórios</Label>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="gap-2" disabled={isLoading}>
              <Save className="w-4 h-4" />
              {isLoading ? "Salvando..." : "Salvar Membro"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
