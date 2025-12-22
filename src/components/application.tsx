import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ImageCarousel } from "@/components/ImageCarousel"
import { AppSidebar } from "@/components/AppSidebar/index"
import "./application.css"
import img1 from "@/assets/img/1.jpg"
import img2 from "@/assets/img/2.jpg"
import img3 from "@/assets/img/3.jpg"
import img4 from "@/assets/img/4.jpg"
import img5 from "@/assets/img/5.jpg"

const images = [img1, img2, img3, img4, img5]

export function ApplicationPage() {
  return (
    <SidebarProvider>
      <AppSidebar />

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

