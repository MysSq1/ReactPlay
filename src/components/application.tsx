import {
  Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
  SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar"
import { Home, LayoutDashboard, Users, Settings, User, FileText, BarChart3, Bell, HelpCircle } from "lucide-react"
import { ImageCarousel } from "@/components/ImageCarousel"
import "./application.css"
import img1 from "@/assets/img/1.jpg"
import img2 from "@/assets/img/2.jpg"
import img3 from "@/assets/img/3.jpg"
import img4 from "@/assets/img/4.jpg"
import img5 from "@/assets/img/5.jpg"

const images = [img1, img2, img3, img4, img5]

const menuItems = [
  { title: "仪表盘", icon: LayoutDashboard, url: "#", isActive: true },
  { title: "用户管理", icon: Users, url: "#" },
  { title: "数据分析", icon: BarChart3, url: "#" },
  { title: "文档", icon: FileText, url: "#" },
  { title: "通知", icon: Bell, url: "#" },
  { title: "帮助", icon: HelpCircle, url: "#" },
  { title: "设置", icon: Settings, url: "#" },
]


const SidebarBrand = ({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle: string }) => (
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


export function ApplicationPage() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarBrand icon={Home} title="应用系统" subtitle="" />
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarBrand icon={User} title="管理员" subtitle="admin@example.com" />
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="app-header">
          <SidebarTrigger className="app-sidebar-trigger" />
          <div className="app-header-content">
            <h1 className="app-header-title">仪表盘</h1>
          </div>
        </header>

        <div className="app-main-content">
          <div className="carousel-wrapper">
            <ImageCarousel images={images} />
          </div>
          <div className="carousel-wrapper">
            <ImageCarousel images={images} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

