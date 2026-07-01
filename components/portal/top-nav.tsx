"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Briefcase, LayoutGrid, ChevronDown, User, Settings, LogOut, LogIn, Building2, RefreshCw, Link2, LayoutDashboard } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/portal", label: "门户首页", icon: Home },
  { href: "/portal/workspace", label: "我的服务台", icon: Briefcase },
  { href: "/portal/apps", label: "应用服务中心", icon: LayoutGrid },
]

export function TopNav() {
  const pathname = usePathname()
  const { user, isLoggedIn, login, logout, switchRole, availableTenants } = useAuth()
  const [currentTime, setCurrentTime] = useState("")
  const [mounted, setMounted] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [loginStep, setLoginStep] = useState<"tenant" | "credentials">("tenant")
  const [selectedTenantId, setSelectedTenantId] = useState("")
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [loginError, setLoginError] = useState("")

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      const now = new Date()
      const weekDays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, "0")
      const day = String(now.getDate()).padStart(2, "0")
      const weekDay = weekDays[now.getDay()]
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")
      const seconds = String(now.getSeconds()).padStart(2, "0")
      setCurrentTime(`${year}年${month}月${day}日 ${weekDay} ${hours}:${minutes}:${seconds}`)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const isActive = (href: string) => {
    if (href === "/portal") {
      return pathname === "/portal"
    }
    return pathname.startsWith(href)
  }

  const handleTenantSelect = (tenantId: string) => {
    setSelectedTenantId(tenantId)
    setLoginStep("credentials")
  }

  const handleLogin = async () => {
    setLoginError("")
    if (!loginForm.username || !loginForm.password) {
      setLoginError("请输入用户名和密码")
      return
    }
    const success = await login(loginForm.username, loginForm.password, selectedTenantId)
    if (success) {
      setShowLoginDialog(false)
      setLoginForm({ username: "", password: "" })
      setLoginStep("tenant")
      setSelectedTenantId("")
    } else {
      setLoginError("登录失败，请重试")
    }
  }

  const handleLogout = () => {
    logout()
  }

  const openLoginDialog = () => {
    setLoginStep("tenant")
    setSelectedTenantId("")
    setLoginForm({ username: "", password: "" })
    setLoginError("")
    setShowLoginDialog(true)
  }

  const selectedTenant = availableTenants.find(t => t.id === selectedTenantId)

  return (
    <>
      <header className="h-14 bg-white/70 backdrop-blur-xl border-b border-white/20 flex items-center justify-between px-6 shrink-0 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="flex items-center gap-8">
          <Link href="/portal" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-semibold text-foreground text-base">场景化数智教学服务平台</span>
          </Link>
          
          {isLoggedIn && (
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-md transition-colors relative ${
                      active
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    {active && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-6">
          {mounted && (
            <div className="text-sm text-muted-foreground">
              {currentTime}
            </div>
          )}
          
          {isLoggedIn && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 h-auto py-1.5 hover:bg-muted">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                    {user.avatar}
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-foreground">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.currentRole?.label || "用户"} · {user.tenant?.name || "组织"}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  个人中心
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  账号设置
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/portal/config/links" className="cursor-pointer">
                    <Link2 className="w-4 h-4 mr-2" />
                    平台地址配置
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href="http://111.170.170.202:3010/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    SaaS 管理后台
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                  切换身份
                </DropdownMenuLabel>
                {user.roles?.map((role) => (
                  <DropdownMenuItem
                    key={role.id}
                    onSelect={(e) => {
                      e.preventDefault()
                      switchRole(role.id)
                    }}
                    className={cn(user.currentRole?.id === role.id && "bg-primary/10 text-primary")}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {role.label}
                    {user.currentRole?.id === role.id && (
                      <span className="ml-auto text-xs text-primary">当前</span>
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5"
              onClick={openLoginDialog}
            >
              <LogIn className="w-4 h-4" />
              登录
            </Button>
          )}
        </div>
      </header>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              {loginStep === "tenant" ? "选择组织" : "登录"}
            </DialogTitle>
          </DialogHeader>
          
          {loginStep === "tenant" ? (
            <div className="py-4">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mb-6">请选择您要登录的组织</p>
              <div className="space-y-2">
                {availableTenants.map((tenant) => (
                  <button
                    key={tenant.id}
                    onClick={() => handleTenantSelect(tenant.id)}
                    className="w-full flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-left"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{tenant.name}</div>
                      <div className="text-xs text-muted-foreground">组织代码：{tenant.code}</div>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                提示：选择任意组织即可登录体验
              </p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">{selectedTenant?.name}</span>
                  <button 
                    onClick={() => setLoginStep("tenant")}
                    className="text-xs text-muted-foreground hover:text-primary ml-2"
                  >
                    切换
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">用户名</Label>
                <Input 
                  placeholder="请输入用户名"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">密码</Label>
                <Input 
                  type="password"
                  placeholder="请输入密码"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
              </div>
              {loginError && (
                <p className="text-sm text-red-500 text-center">{loginError}</p>
              )}
              <Button className="w-full" onClick={handleLogin}>
                登录
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                提示：输入任意用户名和密码即可登录体验
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
