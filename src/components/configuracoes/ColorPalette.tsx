
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Palette, Save } from "lucide-react";

const coresPredefinidas = [
  { nome: "Azul Governo", primaria: "#006fd6", secundaria: "#f1f5f9" },
  { nome: "Verde Sustentável", primaria: "#10b981", secundaria: "#f0fdf4" },
  { nome: "Roxo Moderno", primaria: "#8b5cf6", secundaria: "#faf5ff" },
  { nome: "Vermelho Ativo", primaria: "#ef4444", secundaria: "#fef2f2" },
];

export default function ColorPalette() {
  const [corPrimaria, setCorPrimaria] = useState("#006fd6");
  const [corSecundaria, setCorSecundaria] = useState("#f1f5f9");

  return (
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
  );
}
