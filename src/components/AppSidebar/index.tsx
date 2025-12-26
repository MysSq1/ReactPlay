import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, Settings, FileText, BarChart3, Bell, HelpCircle, LogOut } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import "./AppSidebar.css"

interface MenuItem {
  title: string
  icon: LucideIcon
  url: string
  isActive?: boolean
}

interface AppSidebarProps {
  menuItems?: MenuItem[]
  userTitle?: string
  userSubtitle?: string
}

const defaultMenuItems: MenuItem[] = [
  { title: "首页", icon: LayoutDashboard, url: "#",},
  { title: "创意圈", icon: Users, url: "#" },
  { title: "数据分析", icon: BarChart3, url: "#" },
]

export function AppSidebar({
  menuItems = defaultMenuItems,

}: AppSidebarProps) {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

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
          {isAuthenticated ? (
            <>
              <Avatar size="lg">
                <AvatarImage src="/path/to/image.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {/* <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} tooltip="退出登录">
                  <LogOut className="menu-item-icon" />
                  <span className="menu-item-text">退出登录</span>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </>
          ) : (
            <SidebarMenuItem>
              <button
                onClick={() => navigate("/login")}
                className="login-button-input-style"
                data-slot="input"
              >
                登录
              </button>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

