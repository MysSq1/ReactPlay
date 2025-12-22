import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, Settings, User, FileText, BarChart3, Bell, HelpCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import "./AppSidebar.css"

interface MenuItem {
  title: string
  icon: LucideIcon
  url: string
  isActive?: boolean
}

interface SidebarBrandProps {
  icon: LucideIcon
  title: string
  subtitle: string
}

const SidebarBrand = ({ icon: Icon, title, subtitle }: SidebarBrandProps) => (
  <SidebarMenuItem>
    <SidebarMenuButton size="lg" asChild>
      <a href="#">
        <div className="sidebar-icon-wrapper"><Icon className="size-4" /></div>
        <div className="sidebar-text-wrapper">
          <span className="sidebar-text-title">{title}</span>
          <span className="sidebar-text-subtitle">{subtitle}</span>
        </div>
      </a>
    </SidebarMenuButton>
  </SidebarMenuItem>
)

interface AppSidebarProps {
  menuItems?: MenuItem[]
  userTitle?: string
  userSubtitle?: string
}

const defaultMenuItems: MenuItem[] = [
  { title: "仪表盘", icon: LayoutDashboard, url: "#", isActive: true },
  { title: "用户管理", icon: Users, url: "#" },
  { title: "数据分析", icon: BarChart3, url: "#" },
  { title: "文档", icon: FileText, url: "#" },
  { title: "通知", icon: Bell, url: "#" },
  { title: "帮助", icon: HelpCircle, url: "#" },
  { title: "设置", icon: Settings, url: "#" },
]

export function AppSidebar({
  menuItems = defaultMenuItems,

}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          {/* <SidebarBrand icon={LayoutDashboard} title={brandTitle} subtitle={brandSubtitle} /> */}
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive} className="menu-item-vertical">
                <a href={item.url}>
                  <item.icon className="menu-item-icon" />
                  <span className="menu-item-text">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

