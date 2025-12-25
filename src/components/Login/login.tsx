import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import "./login.css"

export function Login() {
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [countdown, setCountdown] = useState(0)
  const { login } = useAuth()
  const navigate = useNavigate()

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
    }, 1000)
  }

  // 手机登录
  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone || !code) {
      alert("请填写手机号和验证码")
      return
    }
    // 测试账号验证
    if (phone === "18806034698" && code === "123456") {
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
      <div className="login-video-section"></div>

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
