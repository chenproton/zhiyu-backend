"use client"

import { Header } from "@/components/admin/header"
import Link from "next/link"
import {
  Users,
  UserCog,
  IdCard,
  Settings2,
  Link2,
  GraduationCap,
  ArrowRight,
} from "lucide-react"

const userModules = [
  {
    title: "用户列表",
    description: "管理系统所有用户信息",
    icon: Users,
    href: "/admin/users/list",
    count: 2456,
  },
  {
    title: "账户列表",
    description: "管理用户账户登录信息",
    icon: UserCog,
    href: "/admin/users/accounts",
    count: 2456,
  },
  {
    title: "身份类型管理",
    description: "管理教职工、学生、企业等身份类型",
    icon: IdCard,
    href: "/admin/users/identity-types",
    count: 4,
  },
  {
    title: "用户字段扩展",
    description: "配置用户自定义扩展字段",
    icon: Settings2,
    href: "/admin/users/fields",
    count: 20,
  },
  {
    title: "关系类型",
    description: "管理用户间的关系类型定义",
    icon: Link2,
    href: "/admin/users/relations",
    count: 6,
  },
  {
    title: "毕业学生管理",
    description: "管理已毕业学生的数据归档",
    icon: GraduationCap,
    href: "/admin/users/graduates",
    count: 1280,
  },
]

export default function UsersPage() {
  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "用户与账户管理" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">用户与账户管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            管理系统用户、账户、身份类型和关系
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userModules.map((module) => {
            const Icon = module.icon
            return (
              <Link
                key={module.href}
                href={module.href}
                className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:bg-card/80"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-foreground">{module.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{module.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-2xl font-semibold text-primary">{module.count}</span>
                  <span className="text-sm text-muted-foreground">条记录</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
