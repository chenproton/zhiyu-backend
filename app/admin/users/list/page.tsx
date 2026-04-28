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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Power,
  Trash2,
  Search,
  Filter,
  Upload,
  Download,
  Eye,
  EyeOff,
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface User {
  id: string
  name: string
  identityType: "教职工" | "学生" | "企业" | "系统管理员"
  phone: string
  workId: string
  studentId: string
  idCard: string
  status: "active" | "inactive"
  oauth: string[]
  positions: string[]
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "张三",
    identityType: "教职工",
    phone: "138****1234",
    workId: "T2024001",
    studentId: "-",
    idCard: "110***********1234",
    status: "active",
    oauth: ["微信", "钉钉"],
    positions: ["教授", "系主任"],
  },
  {
    id: "2",
    name: "李四",
    identityType: "学生",
    phone: "139****5678",
    workId: "-",
    studentId: "S2024001",
    idCard: "310***********5678",
    status: "active",
    oauth: ["微信"],
    positions: ["班长"],
  },
  {
    id: "3",
    name: "王五",
    identityType: "教职工",
    phone: "137****9012",
    workId: "T2024002",
    studentId: "-",
    idCard: "440***********9012",
    status: "inactive",
    oauth: [],
    positions: ["副教授"],
  },
  {
    id: "4",
    name: "赵六",
    identityType: "企业",
    phone: "136****3456",
    workId: "-",
    studentId: "-",
    idCard: "-",
    status: "active",
    oauth: ["钉钉"],
    positions: ["企业导师"],
  },
  {
    id: "5",
    name: "钱七",
    identityType: "学生",
    phone: "135****7890",
    workId: "-",
    studentId: "S2024002",
    idCard: "320***********7890",
    status: "active",
    oauth: ["微信", "飞书"],
    positions: [],
  },
  {
    id: "6",
    name: "孙八",
    identityType: "系统管理员",
    phone: "134****2468",
    workId: "-",
    studentId: "-",
    idCard: "-",
    status: "active",
    oauth: [],
    positions: ["超级管理员"],
  },
]

const availablePositions = [
  "教授",
  "副教授",
  "讲师",
  "助教",
  "系主任",
  "副系主任",
  "班主任",
  "辅导员",
  "班长",
  "学习委员",
  "企业导师",
  "超级管理员",
  "租户管理员",
]

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [selectedIdentityType, setSelectedIdentityType] = useState<string>("教职工")
  const [selectedPositions, setSelectedPositions] = useState<string[]>([])

  const filteredUsers = users.filter(
    (user) =>
      user.name.includes(searchTerm) ||
      user.phone.includes(searchTerm) ||
      user.workId.includes(searchTerm) ||
      user.studentId.includes(searchTerm)
  )

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u
      )
    )
  }

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setSelectedIdentityType(user.identityType)
    setSelectedPositions(user.positions)
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    setEditingUser(null)
    setSelectedIdentityType("教职工")
    setSelectedPositions([])
    setIsDialogOpen(true)
  }

  const togglePosition = (position: string) => {
    setSelectedPositions((prev) =>
      prev.includes(position)
        ? prev.filter((p) => p !== position)
        : [...prev, position]
    )
  }

  // 根据身份类型渲染不同的表单字段
  const renderFormFields = () => {
    switch (selectedIdentityType) {
      case "教职工":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">姓名 *</Label>
                <Input
                  id="name"
                  placeholder="请输入姓名"
                  defaultValue={editingUser?.name}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="workId">工号 *</Label>
                <Input
                  id="workId"
                  placeholder="请输入工号"
                  defaultValue={editingUser?.workId}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="idCard">身份证号 *</Label>
                <Input
                  id="idCard"
                  placeholder="请输入身份证号"
                  defaultValue={editingUser?.idCard}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">密码 *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={editingUser ? "留空则不修改密码" : "请输入密码"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      case "学生":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">姓名 *</Label>
                <Input
                  id="name"
                  placeholder="请输入姓名"
                  defaultValue={editingUser?.name}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="studentId">学号 *</Label>
                <Input
                  id="studentId"
                  placeholder="请输入学号"
                  defaultValue={editingUser?.studentId}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="idCard">身份证号 *</Label>
                <Input
                  id="idCard"
                  placeholder="请输入身份证号"
                  defaultValue={editingUser?.idCard}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">密码 *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={editingUser ? "留空则不修改密码" : "请输入密码"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      case "企业":
      case "系统管理员":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">姓名 *</Label>
                <Input
                  id="name"
                  placeholder="请输入姓名"
                  defaultValue={editingUser?.name}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">手机号 *</Label>
                <Input
                  id="phone"
                  placeholder="请输入手机号"
                  defaultValue={editingUser?.phone}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">密码 *</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={editingUser ? "留空则不修改密码" : "请输入密码"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "用户与账户管理", href: "/admin/users" },
          { label: "用户列表" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">用户列表</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              管理系统所有用户信息
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              导入
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              导出
            </Button>
            <Button onClick={handleCreate} className="gap-2">
              <Plus className="h-4 w-4" />
              新增用户
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索姓名、手机号、工号或学号..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            筛选
          </Button>
          {selectedUsers.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                已选择 {selectedUsers.length} 项
              </span>
              <Button variant="outline" size="sm">
                批量启用
              </Button>
              <Button variant="outline" size="sm">
                批量停用
              </Button>
              <Button variant="destructive" size="sm">
                批量删除
              </Button>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedUsers.length === filteredUsers.length &&
                      filteredUsers.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="text-muted-foreground">姓名</TableHead>
                <TableHead className="text-muted-foreground">身份类型</TableHead>
                <TableHead className="text-muted-foreground">手机号/工号/学号</TableHead>
                <TableHead className="text-muted-foreground">身份证号</TableHead>
                <TableHead className="text-muted-foreground">职位</TableHead>
                <TableHead className="text-muted-foreground">OAuth</TableHead>
                <TableHead className="text-muted-foreground">状态</TableHead>
                <TableHead className="text-muted-foreground text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-border">
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => toggleSelect(user.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        user.identityType === "教职工"
                          ? "bg-blue-500/20 text-blue-400"
                          : user.identityType === "学生"
                          ? "bg-primary/20 text-primary"
                          : user.identityType === "企业"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-pink-500/20 text-pink-400"
                      }
                    >
                      {user.identityType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.identityType === "教职工" && user.workId}
                    {user.identityType === "学生" && user.studentId}
                    {(user.identityType === "企业" || user.identityType === "系统管理员") && user.phone}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {user.idCard}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.positions.length > 0 ? (
                        user.positions.slice(0, 2).map((pos) => (
                          <Badge key={pos} variant="outline" className="text-xs">
                            {pos}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                      {user.positions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.positions.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {user.oauth.length > 0 ? (
                        user.oauth.map((o) => (
                          <Badge key={o} variant="outline" className="text-xs">
                            {o}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === "active" ? "default" : "secondary"}
                      className={
                        user.status === "active"
                          ? "bg-primary/20 text-primary hover:bg-primary/30"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {user.status === "active" ? "启用" : "停用"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(user)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleStatus(user.id)}>
                          <Power className="mr-2 h-4 w-4" />
                          {user.status === "active" ? "停用" : "启用"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(user.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>共 {filteredUsers.length} 条记录</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              上一页
            </Button>
            <span className="px-2">1 / 1</span>
            <Button variant="outline" size="sm" disabled>
              下一页
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingUser ? "编辑用户" : "新增用户"}</DialogTitle>
            <DialogDescription>
              {editingUser ? "修改用户信息" : "创建新用户，不同身份类型需要填写不同字段"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="identityType">身份类型 *</Label>
              <Select
                value={selectedIdentityType}
                onValueChange={setSelectedIdentityType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择身份类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="教职工">教职工</SelectItem>
                  <SelectItem value="学生">学生</SelectItem>
                  <SelectItem value="企业">企业</SelectItem>
                  <SelectItem value="系统管理员">系统管理员</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {selectedIdentityType === "教职工" && "需填写：姓名、工号、身份证号、密码"}
                {selectedIdentityType === "学生" && "需填写：姓名、学号、身份证号、密码"}
                {selectedIdentityType === "企业" && "需填写：姓名、手机号、密码"}
                {selectedIdentityType === "系统管理员" && "需填写：姓名、手机号、密码"}
              </p>
            </div>

            {renderFormFields()}

            <div className="grid gap-2">
              <Label>职位（可多选）</Label>
              <div className="flex flex-wrap gap-2 rounded-lg border border-border p-3">
                {availablePositions.map((position) => (
                  <Badge
                    key={position}
                    variant={selectedPositions.includes(position) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      selectedPositions.includes(position)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                    onClick={() => togglePosition(position)}
                  >
                    {position}
                  </Badge>
                ))}
              </div>
              {selectedPositions.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  已选择: {selectedPositions.join("、")}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {editingUser ? "保存" : "创建"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
