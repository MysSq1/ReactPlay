import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ImageCarousel } from "@/components/ImageCarousel"
import { AppSidebar } from "@/components/AppSidebar/index"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { useState } from "react"
import "./application.css"
import img1 from "@/assets/img/1.jpg"
import img2 from "@/assets/img/2.jpg"
import img3 from "@/assets/img/3.jpg"
import img4 from "@/assets/img/4.jpg"
import img5 from "@/assets/img/5.jpg"

const images = [img1, img2, img3, img4, img5]

const cards = [
  { id: 1, text: "大卡片 (42:9)", className: "card-item card-item-42-9" },
  { id: 2, text: "卡片 1", className: "card-item" },
  { id: 3, text: "卡片 2", className: "card-item" },
  { id: 4, text: "卡片 3", className: "card-item" },
  { id: 5, text: "卡片 4", className: "card-item" },
]

const menuItems = ["推荐", "关注", "活动"]

export function ApplicationPage() {
  const [activeMenu, setActiveMenu] = useState("推荐")
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "4rem",
        "--sidebar-width-icon": "4rem",
      } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        <div className="app-main-content">
          <div className="carousel-section">
            {[1, 2].map((i) => (
              <div key={i} className="carousel-wrapper">
                <ImageCarousel images={images} />
              </div>
            ))}
          </div>
          
          <div className="cards-section">
            {cards.map((card) => (
              <Card key={card.id} className={card.className}>
                <CardContent className="card-content-21-9">
                  <p>{card.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="basic-menu-section">
            <div className="basic-menu">
              {menuItems.map((item) => (
                <Button
                  key={item}
                  variant={activeMenu === item ? "default" : "outline"}
                  onClick={() => setActiveMenu(item)}
                  className="basic-menu-item"
                >
                  {item}
                </Button>
              ))}
            </div>
            <Separator orientation="vertical" className="basic-menu-vertical" />
            <div className="basic-menu-right">
              <InputGroup className="basic-menu-search">
                <InputGroupInput type="search" placeholder="搜索..." />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton size="icon-xs" variant="ghost">
                    <Search />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

  