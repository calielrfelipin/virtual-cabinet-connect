
import { 
  Home, 
  Users, 
  MapPin, 
  FileText, 
  UserCheck, 
  BarChart3, 
  Settings,
  Building2 
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Cidadãos", url: "/cidadaos", icon: Users },
  { title: "Demandas", url: "/demandas", icon: MapPin },
  { title: "Equipe", url: "/equipe", icon: UserCheck },
  { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavCls = (path: string) =>
    isActive(path) 
      ? "bg-gov-blue-50 text-gov-blue-700 border-r-2 border-gov-blue-500 font-medium" 
      : "hover:bg-gov-gray-50 text-gov-gray-700 hover:text-gov-blue-600";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r border-gov-gray-200 bg-white`}
      collapsible="icon"
    >
      <div className="p-4 border-b border-gov-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-gov rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-gov-gray-900">Gabinete Virtual</h2>
              <p className="text-xs text-gov-gray-500">Gestão Municipal</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gov-gray-500 text-xs uppercase tracking-wider font-semibold px-3 py-2">
            {!collapsed && "Menu Principal"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${getNavCls(item.url)}`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <div className="p-4 border-t border-gov-gray-200 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gov-gray-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gov-gray-600">V</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gov-gray-900 truncate">Vereador(a)</p>
              <p className="text-xs text-gov-gray-500 truncate">Online</p>
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  );
}
