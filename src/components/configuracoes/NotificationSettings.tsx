
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const notificationItems = [
  {
    title: "Nova demanda cadastrada",
    description: "Receber quando uma nova demanda for criada",
    defaultChecked: true
  },
  {
    title: "Demanda resolvida",
    description: "Notificar quando uma demanda for marcada como resolvida",
    defaultChecked: true
  },
  {
    title: "Novo cidadão cadastrado",
    description: "Alertar sobre novos cadastros de cidadãos",
    defaultChecked: false
  },
  {
    title: "Relatórios semanais",
    description: "Receber resumo semanal por e-mail",
    defaultChecked: false
  }
];

export default function NotificationSettings() {
  return (
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
          {notificationItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gov-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gov-gray-900">{item.title}</p>
                <p className="text-sm text-gov-gray-500">{item.description}</p>
              </div>
              <input type="checkbox" className="w-4 h-4" defaultChecked={item.defaultChecked} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
