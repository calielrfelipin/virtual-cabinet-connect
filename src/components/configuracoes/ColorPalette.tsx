
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Palette, Save } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

const coresPredefinidas = [
  { nome: "Cinza Neutro", primaria: "#64748b", secundaria: "#f1f5f9" },
  { nome: "Azul Governo", primaria: "#3b82f6", secundaria: "#f1f5f9" },
  { nome: "Verde Sustentável", primaria: "#10b981", secundaria: "#f0fdf4" },
  { nome: "Roxo Moderno", primaria: "#8b5cf6", secundaria: "#faf5ff" },
  { nome: "Vermelho Ativo", primaria: "#ef4444", secundaria: "#fef2f2" },
  { nome: "Índigo Profissional", primaria: "#4f46e5", secundaria: "#eef2ff" },
];

export default function ColorPalette() {
  const { primaryColor, secondaryColor, updateColors } = useTheme();
  const [corPrimaria, setCorPrimaria] = useState(primaryColor);
  const [corSecundaria, setCorSecundaria] = useState(secondaryColor);

  const handleSave = () => {
    updateColors(corPrimaria, corSecundaria);
    toast.success("Cores atualizadas com sucesso!");
  };

  const aplicarPaleta = (paleta: { primaria: string; secundaria: string }) => {
    setCorPrimaria(paleta.primaria);
    setCorSecundaria(paleta.secundaria);
  };

  return (
    <Card className="gov-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
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
                placeholder="#64748b"
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
          <Label className="text-sm font-medium text-slate-700 mb-3 block">
            Paletas Predefinidas
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {coresPredefinidas.map((paleta, index) => (
              <div
                key={index}
                className="p-3 border border-slate-200 rounded-lg cursor-pointer hover:border-blue-300 transition-colors"
                onClick={() => aplicarPaleta(paleta)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{paleta.nome}</p>
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
        <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg">
          <p className="text-sm text-slate-500 mb-3">Preview das cores:</p>
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-10 rounded flex items-center justify-center text-white font-medium text-xs"
              style={{ backgroundColor: corPrimaria }}
            >
              Primária
            </div>
            <div 
              className="w-16 h-10 rounded flex items-center justify-center border text-xs"
              style={{ backgroundColor: corSecundaria }}
            >
              <span style={{ color: corPrimaria }}>Sec.</span>
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Salvar Configurações
        </Button>
      </CardContent>
    </Card>
  );
}
