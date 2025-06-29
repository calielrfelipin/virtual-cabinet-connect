
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Building2, Camera } from "lucide-react";

export default function LogoUpload() {
  return (
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
  );
}
