"use client"

import { Header } from "@/components/admin/header"
import Link from "next/link"
import {
  Factory,
  GraduationCap,
  Building,
  Code2,
  Network,
  ArrowRight,
} from "lucide-react"

const dataModules = [
  {
    title: "行业管理",
    description: "管理系统中的行业分类数据",
    icon: Factory,
    href: "/admin/data/industries",
    count: 12,
  },
  {
    title: "专业管理",
    description: "管理教育专业信息",
    icon: GraduationCap,
    href: "/admin/data/majors",
    count: 86,
  },
  {
    title: "企业管理",
    description: "管理合作企业信息",
    icon: Building,
    href: "/admin/data/enterprises",
    count: 45,
  },
  {
    title: "资源类型编码管理",
    description: "管理公共和自定义资源类型编码",
    icon: Code2,
    href: "/admin/data/resource-codes",
    count: 28,
  },
  {
    title: "组织类型列表",
    description: "管理内部、业务和外部协作组织类型",
    icon: Network,
    href: "/admin/data/org-types",
    count: 9,
  },
]

export default function DataManagementPage() {
  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "基础数据管理" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">基础数据管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            管理系统基础数据，包括行业、专业、企业和组织类型等
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dataModules.map((module) => {
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
