import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import "./login.css"

// 视频列表数据
const videoList = [
  "/video1.mp4",
  "/video2.mp4",
  "/video3.mp4",
  "/video4.mp4",
]

export function Login() {
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)

  // 视频播放结束，切换到下一个视频
  const handleVideoEnded = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentVideoIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % videoList.length
        return nextIndex
      })
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 500) // 淡出时间
  }

  // 处理视频可以播放时的事件
  const handleVideoCanPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        // 忽略 AbortError，这是正常的切换行为
        if (error.name !== 'AbortError') {
          console.error("视频自动播放失败:", error)
        }
      })
    }
  }

  // 当视频索引改变时，加载新视频
  useEffect(() => {
    if (videoRef.current) {
      // 先暂停当前视频
      videoRef.current.pause()
      // 重置视频
      videoRef.current.currentTime = 0
      // 加载新视频源
      videoRef.current.load()
    }
  }, [currentVideoIndex])

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      const handleCanPlay = () => {
        video.play().catch((error) => {
          if (error.name !== 'AbortError') {
            console.error("视频自动播放失败:", error)
          }
        })
      }
      
      video.addEventListener('canplay', handleCanPlay)
      if (video.readyState >= 3) {
        video.play().catch((error) => {
          if (error.name !== 'AbortError') {
            console.error("视频自动播放失败:", error)
          }
        })
      }
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay)
      }
    }
  }, [])

  // 获取验证码
  const handleGetCode = () => {
    if (!phone) {
      alert("请输入手机号")
      return
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      alert("请输入正确的手机号")
      return
    }
    // 开始倒计时
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 100)
  }

  // 手机登录
  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || !code) {
      alert("请填写手机号和验证码")
      return
    }
    // 测试账号验证
    if (phone === "18806034698" && code === "666666") {
      login({
        id: Date.now().toString(),
        email: `${phone}@phone.com`,
        username: phone,
      })
      setPhone("")
      setCode("")
      navigate("/")
    }
  }

  return (
    <div className="login-container">
      {/* 左半边：视频播放区域 */}
      <div className="login-video-section">
        <video
          ref={videoRef}
          className={`login-video ${isTransitioning ? "fade-out" : "fade-in"}`}
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          onCanPlay={handleVideoCanPlay}
        >
          <source src={videoList[currentVideoIndex]} type="video/mp4" />
          您的浏览器不支持视频播放。
        </video>
      </div>
    
      {/* 右半边：登录注册功能区 */}
      <div className="login-form-section">
        <div className="login-content">
          <h1 className="login-title">欢迎登录</h1>
          {/* 标签区域 */}
          <div className="login-tabs-wrapper">
            <div className="login-tabs-list">
              <button className="login-tab-button">
                手机登录
              </button>
            </div>
            <div className="login-tabs-slider" />
          </div>

          {/* 表单内容 */}
          <form className="login-form" onSubmit={handlePhoneLogin}>
            <div className="form-group">
              <Input
                id="phone"
                type="tel"
                autoComplete="off"
                placeholder="请输入手机号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={11}
              />
            </div>

            <div className="form-group">
              <div className="code-input-group">
                <Input
                  id="code"
                  type="text"
                  autoComplete="off"
                  placeholder="请输入验证码"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="get-code-button"
                  onClick={handleGetCode}
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `${countdown}秒` : "获取验证码"}
                </Button>
              </div>
            </div>
            <div className="login-agreement">
              登入即代表同意<span className="agreement-link">《用户协议》</span>和<span className="agreement-link">《隐私政策》 </span>
            </div>
            <Button type="submit" className="submit-button" size="lg">
              登录
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
