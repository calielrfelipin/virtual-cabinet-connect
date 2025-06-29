
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, X } from "lucide-react";

interface DemandaFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export function DemandaForm({ onClose, onSave }: DemandaFormProps) {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    status: "nova",
    localizacao: "",
    cidadaoVinculado: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo || !formData.descricao || !formData.categoria) {
      toast.error("Preencha os campos obrigatórios");
      return;
    }

    console.log("Dados da demanda:", formData);
    onSave(formData);
    toast.success("Demanda cadastrada com sucesso!");
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-gov-gray-900">Cadastrar Demanda</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título da Demanda *</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => handleChange("titulo", e.target.value)}
              placeholder="Ex: Buraco na Rua das Flores"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição *</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleChange("descricao", e.target.value)}
              placeholder="Descreva detalhadamente a demanda..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria *</Label>
              <Select value={formData.categoria} onValueChange={(value) => handleChange("categoria", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saude">Saúde</SelectItem>
                  <SelectItem value="educacao">Educação</SelectItem>
                  <SelectItem value="transporte">Transporte</SelectItem>
                  <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                  <SelectItem value="seguranca">Segurança</SelectItem>
                  <SelectItem value="meio-ambiente">Meio Ambiente</SelectItem>
                  <SelectItem value="assistencia-social">Assistência Social</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nova">Nova</SelectItem>
                  <SelectItem value="em-andamento">Em Andamento</SelectItem>
                  <SelectItem value="resolvida">Resolvida</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="localizacao">Localização</Label>
            <Input
              id="localizacao"
              value={formData.localizacao}
              onChange={(e) => handleChange("localizacao", e.target.value)}
              placeholder="Endereço ou ponto de referência"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cidadaoVinculado">Cidadão Vinculado</Label>
            <Input
              id="cidadaoVinculado"
              value={formData.cidadaoVinculado}
              onChange={(e) => handleChange("cidadaoVinculado", e.target.value)}
              placeholder="Nome do cidadão que reportou"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="gap-2">
              <Save className="w-4 h-4" />
              Salvar Demanda
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
