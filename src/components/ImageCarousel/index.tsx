import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import "./ImageCarousel.css"

interface ImageCarouselProps {
  images: string[]
  autoplayDelay?: number
  className?: string
}

export function ImageCarousel({ images, autoplayDelay = 2000, className }: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className={`image-carousel ${className || ""}`}>
      <Carousel
        className="image-carousel-container"
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]}
        setApi={setApi}
      >
        <CarouselContent>
          {images.map((image, i) => (
            <CarouselItem key={i}>
              <div className="image-carousel-item-wrapper">
                <img src={image} alt={`轮播图 - 图片 ${i + 1}`} className="image-carousel-image" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="image-carousel-nav-previous" />
        <CarouselNext className="image-carousel-nav-next" />
      </Carousel>
      {count > 0 && (
        <div className="image-carousel-indicators">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className={`image-carousel-indicator-item ${index + 1 === current ? 'active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

