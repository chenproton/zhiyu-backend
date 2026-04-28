"use client"

import { Header } from "@/components/admin/header"
import {
  Building2,
  Users,
  Network,
  Briefcase,
  Shield,
  TrendingUp,
  Activity,
  Clock,
} from "lucide-react"

const stats = [
  {
    title: "租户总数",
    value: "12",
    change: "+2",
    changeType: "increase",
    icon: Building2,
  },
  {
    title: "用户总数",
    value: "4,231",
    change: "+128",
    changeType: "increase",
    icon: Users,
  },
  {
    title: "组织节点",
    value: "86",
    change: "+5",
    changeType: "increase",
    icon: Network,
  },
  {
    title: "职位数量",
    value: "24",
    change: "0",
    changeType: "neutral",
    icon: Briefcase,
  },
  {
    title: "角色数量",
    value: "15",
    change: "+1",
    changeType: "increase",
    icon: Shield,
  },
  {
    title: "今日活跃",
    value: "1,892",
    change: "+12%",
    changeType: "increase",
    icon: Activity,
  },
]

const recentActivities = [
  { action: "新增租户", target: "浙江工业大学", user: "管理员", time: "5分钟前" },
  { action: "创建用户", target: "张三（教职工）", user: "租户管理员", time: "12分钟前" },
  { action: "编辑组织", target: "信息工程学院", user: "院系管理员", time: "30分钟前" },
  { action: "角色授权", target: "教学管理员", user: "管理员", time: "1小时前" },
  { action: "批量导入", target: "2024级新生 (256人)", user: "教务处", time: "2小时前" },
  { action: "停用账户", target: "李四", user: "管理员", time: "3小时前" },
]

export default function AdminDashboard() {
  return (
    <>
      <Header title="控制台" />

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">欢迎回来</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            平台 2.0 管理控制台 - 统一管理租户、用户和权限
          </p>
        </div>

        {/* 统计卡片 */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.title}
                className="rounded-lg border border-border bg-card p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  {stat.changeType !== "neutral" && (
                    <span
                      className={`flex items-center text-xs ${
                        stat.changeType === "increase"
                          ? "text-primary"
                          : "text-destructive"
                      }`}
                    >
                      <TrendingUp className="mr-1 h-3 w-3" />
                      {stat.change}
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* 最近活动 */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">最近活动</h2>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">
                      {activity.action}：
                      <span className="text-primary">{activity.target}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      操作人：{activity.user}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 快捷操作 */}
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">快捷操作</h2>
            <div className="grid gap-3">
              <a
                href="/admin/tenants"
                className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-secondary"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <Building2 className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">新增租户</p>
                  <p className="text-sm text-muted-foreground">创建新的平台租户</p>
                </div>
              </a>
              <a
                href="/admin/users/list"
                className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-secondary"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">用户管理</p>
                  <p className="text-sm text-muted-foreground">管理系统用户和账户</p>
                </div>
              </a>
              <a
                href="/admin/organization"
                className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-secondary"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                  <Network className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium">组织架构</p>
                  <p className="text-sm text-muted-foreground">管理组织树和成员归属</p>
                </div>
              </a>
              <a
                href="/admin/roles"
                className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-secondary"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/10">
                  <Shield className="h-6 w-6 text-pink-400" />
                </div>
                <div>
                  <p className="font-medium">角色权限</p>
                  <p className="text-sm text-muted-foreground">配置角色和权限策略</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
