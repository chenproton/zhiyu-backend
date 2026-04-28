"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Building2,
  Database,
  Network,
  Users,
  Briefcase,
  Shield,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Factory,
  Building,
  Code2,
  Layers,
  GraduationCap,
  UserCircle,
  CreditCard,
  UserCog,
  FormInput,
  Link2,
  UserCheck,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children?: { title: string; href: string; icon?: React.ComponentType<{ className?: string }> }[]
}

interface NavSection {
  title: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: "超级管理员",
    items: [
      {
        title: "控制台",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "租户管理",
        href: "/admin/tenants",
        icon: Building2,
      },
      {
        title: "行业管理",
        href: "/admin/data/industries",
        icon: Factory,
      },
      {
        title: "企业管理",
        href: "/admin/data/enterprises",
        icon: Building,
      },
      {
        title: "资源类型编码",
        href: "/admin/data/resource-codes",
        icon: Code2,
      },
      {
        title: "组织类型管理",
        href: "/admin/data/org-types",
        icon: Layers,
      },
    ],
  },
  {
    title: "学校管理员",
    items: [
      {
        title: "组织架构管理",
        href: "/admin/organization",
        icon: Network,
      },
      {
        title: "专业管理",
        href: "/admin/data/majors",
        icon: GraduationCap,
      },
      {
        title: "用户与账户",
        href: "/admin/users",
        icon: Users,
        children: [
          { title: "用户列表", href: "/admin/users/list", icon: UserCircle },
          { title: "账户列表", href: "/admin/users/accounts", icon: CreditCard },
          { title: "身份类型管理", href: "/admin/users/identity-types", icon: UserCog },
          { title: "用户字段扩展", href: "/admin/users/fields", icon: FormInput },
          { title: "关系类型管理", href: "/admin/users/relations", icon: Link2 },
          { title: "毕业学生管理", href: "/admin/users/graduates", icon: UserCheck },
        ],
      },
      {
        title: "职位管理",
        href: "/admin/positions",
        icon: Briefcase,
      },
      {
        title: "角色权限管理",
        href: "/admin/roles",
        icon: Shield,
      },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // 根据当前路径自动展开对应的菜单
    if (pathname.startsWith("/admin/users")) {
      setExpandedItems(["/admin/users"])
    }
  }, [])

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]
    )
  }

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar overflow-y-auto">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">P</span>
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">平台 2.0</span>
        </div>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {navSections.map((section) => (
          <div key={section.title} className="mb-4">
            <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </div>
            {section.items.map((item) => {
              const Icon = item.icon
              const hasChildren = item.children && item.children.length > 0
              const isExpanded = expandedItems.includes(item.href)
              const active = isActive(item.href)

              return (
                <div key={item.href}>
                  {hasChildren ? (
                    <button
                      onClick={() => toggleExpand(item.href)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  )}

                  {hasChildren && isExpanded && (
                    <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-sidebar-border pl-4">
                      {item.children!.map((child) => {
                        const ChildIcon = child.icon
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                              pathname === child.href
                                ? "text-sidebar-primary"
                                : "text-muted-foreground hover:text-sidebar-foreground"
                            )}
                          >
                            {ChildIcon && <ChildIcon className="h-4 w-4" />}
                            {child.title}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}
