import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ImageCarousel } from "@/components/ImageCarousel"
import { AppSidebar } from "@/components/AppSidebar/index"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { useState, useLayoutEffect, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import "./ContentFeed.css"
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
const generateRatioCards = () => {
  const ratios = [
    { w: 9, h: 16, count: 20 },
    { w: 16, h: 9, count: 20 }, 
  ]
  
  const allCards: Array<{ id: number; image: string; aspectRatio: string }> = []
  
  ratios.forEach((ratio) => {
    for (let i = 0; i < ratio.count; i++) {
      const randomImage = images[Math.floor(Math.random() * images.length)]
      allCards.push({
        id: allCards.length + 1,
        image: randomImage,
        aspectRatio: `${ratio.w} / ${ratio.h}`,
      })
    }
  })
  
  // 随机打乱顺序
  return allCards.sort(() => Math.random() - 0.5)
}

const ratioCards = generateRatioCards()

const menuItems = ["推荐", "关注", "活动"]

export function ContentFeed() {
  const [activeMenu, setActiveMenu] = useState("推荐")
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // 处理菜单点击
  const handleMenuClick = (item: string) => {
    if (item === "关注") {
      // 检查用户是否已登录
      if (!isAuthenticated) {
        // 未登录，跳转到登录页面
        navigate("/login")
        return
      }
    }
    // 已登录或点击其他菜单项，正常切换
    setActiveMenu(item)
  }

  // 计算瀑布流布局的函数
  const calculateLayout = () => {
    if (!containerRef.current) return
    const container = containerRef.current
    const wrappers = cardRefs.current.filter(Boolean) as HTMLElement[]
    if (wrappers.length === 0) return

    // 根据容器宽度自适应列数
    const containerWidth = container.offsetWidth
    let columnCount = 5
    if (containerWidth < 480) {
      columnCount = 2
    } else if (containerWidth < 768) {
      columnCount = 3
    } else if (containerWidth < 1024) {
      columnCount = 4
    } else {
      columnCount = 5
    }

    // 响应式间距：根据容器宽度计算，最小4px，最大8px
    const gap = Math.max(4, Math.min(8, containerWidth * 0.01))
    const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount
    const columnHeights = new Array(columnCount).fill(0)

    wrappers.forEach((wrapper) => {
      const card = wrapper.querySelector('[data-slot="card"]') as HTMLElement
      if (!card) return

      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      const left = shortestColumnIndex * (columnWidth + gap)
      const top = columnHeights[shortestColumnIndex]

      wrapper.style.position = 'absolute'
      wrapper.style.left = `${left}px`
      wrapper.style.top = `${top}px`
      wrapper.style.width = `${columnWidth}px`

      const cardHeight = wrapper.offsetHeight || wrapper.getBoundingClientRect().height
      columnHeights[shortestColumnIndex] += cardHeight + gap
    })

    container.style.height = `${Math.max(...columnHeights)}px`
  }

  useLayoutEffect(() => {
    calculateLayout()
  }, [ratioCards])

  // 监听窗口大小变化，重新计算瀑布流布局
  useEffect(() => {
    const handleResize = () => {
      calculateLayout()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [ratioCards])

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
                  onClick={() => handleMenuClick(item)}
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

          <div className="cards-section-1" ref={containerRef}>
            {ratioCards.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => { cardRefs.current[index] = el }}
                className="card-wrapper"
              >
                <Card style={{ aspectRatio: card.aspectRatio, padding: 0, overflow: 'hidden' }}>
                  <img src={card.image} alt={`卡片 ${card.id}`} className="card-image" />
                </Card>
              </div>
            ))}
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

