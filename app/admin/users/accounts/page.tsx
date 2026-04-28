"use client"

import { useState } from "react"
import { Header } from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Key, Eye, EyeOff } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Account {
  id: string
  name: string
  identityType: string
  loginName: string
  lastLogin: string
}

const mockAccounts: Account[] = [
  {
    id: "1",
    name: "张三",
    identityType: "教职工",
    loginName: "zhangsan",
    lastLogin: "2024-03-15 14:30",
  },
  {
    id: "2",
    name: "李四",
    identityType: "学生",
    loginName: "S2024001",
    lastLogin: "2024-03-15 10:20",
  },
  {
    id: "3",
    name: "王五",
    identityType: "教职工",
    loginName: "wangwu",
    lastLogin: "2024-03-14 16:45",
  },
  {
    id: "4",
    name: "赵六",
    identityType: "企业",
    loginName: "zhaoliu@company.com",
    lastLogin: "2024-03-13 09:15",
  },
  {
    id: "5",
    name: "钱七",
    identityType: "学生",
    loginName: "S2024002",
    lastLogin: "2024-03-15 11:30",
  },
]

export default function AccountsPage() {
  const [accounts] = useState<Account[]>(mockAccounts)
  const [searchTerm, setSearchTerm] = useState("")
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const filteredAccounts = accounts.filter(
    (account) =>
      account.name.includes(searchTerm) ||
      account.loginName.includes(searchTerm)
  )

  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "用户与账户管理", href: "/admin/users" },
          { label: "账户列表" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">账户列表</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            管理用户账户登录信息
          </p>
        </div>

        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索姓名或登录名..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">姓名</TableHead>
                <TableHead className="text-muted-foreground">身份类型</TableHead>
                <TableHead className="text-muted-foreground">账户登录名</TableHead>
                <TableHead className="text-muted-foreground">账户密码</TableHead>
                <TableHead className="text-muted-foreground">最后登录</TableHead>
                <TableHead className="text-muted-foreground text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.map((account) => (
                <TableRow key={account.id} className="border-border">
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        account.identityType === "教职工"
                          ? "bg-blue-500/20 text-blue-400"
                          : account.identityType === "学生"
                          ? "bg-primary/20 text-primary"
                          : "bg-amber-500/20 text-amber-400"
                      }
                    >
                      {account.identityType}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{account.loginName}</TableCell>
                  <TableCell className="text-muted-foreground">••••••••</TableCell>
                  <TableCell className="text-muted-foreground">{account.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedAccount(account)
                        setIsResetDialogOpen(true)
                      }}
                      className="gap-2"
                    >
                      <Key className="h-4 w-4" />
                      重置密码
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          共 {filteredAccounts.length} 条记录
        </div>
      </div>

      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>重置密码</DialogTitle>
            <DialogDescription>
              为 {selectedAccount?.name} ({selectedAccount?.loginName}) 重置登录密码
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="newPassword">新密码</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入新密码"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">确认密码</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="请再次输入新密码"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsResetDialogOpen(false)}>确认重置</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
