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
  Plus,
  MoreHorizontal,
  Pencil,
  Power,
  Trash2,
  Search,
  Upload,
  Download,
  Users,
  Eye,
} from "lucide-react"

interface Position {
  id: string
  name: string
  code: string
  userCount: number
  status: "active" | "inactive"
  description: string
}

const mockPositions: Position[] = [
  { id: "1", name: "院长", code: "POS001", userCount: 5, status: "active", description: "二级学院院长" },
  { id: "2", name: "副院长", code: "POS002", userCount: 12, status: "active", description: "二级学院副院长" },
  { id: "3", name: "系主任", code: "POS003", userCount: 28, status: "active", description: "专业系主任" },
  { id: "4", name: "教研室主任", code: "POS004", userCount: 45, status: "active", description: "教研室负责人" },
  { id: "5", name: "班主任", code: "POS005", userCount: 120, status: "active", description: "班级班主任" },
  { id: "6", name: "辅导员", code: "POS006", userCount: 35, status: "active", description: "学生辅导员" },
  { id: "7", name: "教授", code: "POS007", userCount: 86, status: "active", description: "教授职称" },
  { id: "8", name: "副教授", code: "POS008", userCount: 156, status: "active", description: "副教授职称" },
  { id: "9", name: "讲师", code: "POS009", userCount: 320, status: "active", description: "讲师职称" },
  { id: "10", name: "实验员", code: "POS010", userCount: 25, status: "inactive", description: "实验室管理员" },
]

export default function PositionsPage() {
  const [positions, setPositions] = useState<Position[]>(mockPositions)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [editingPosition, setEditingPosition] = useState<Position | null>(null)
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPositions = positions.filter(
    (pos) =>
      pos.name.includes(searchTerm) ||
      pos.code.includes(searchTerm) ||
      pos.description.includes(searchTerm)
  )

  const toggleStatus = (id: string) => {
    setPositions((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p
      )
    )
  }

  const handleDelete = (id: string) => {
    setPositions((prev) => prev.filter((p) => p.id !== id))
  }

  const handleViewDetail = (position: Position) => {
    setSelectedPosition(position)
    setIsDetailDialogOpen(true)
  }

  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "职位管理" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">职位管理</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              管理系统职位，配置职位与用户关联
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
            <Button
              onClick={() => {
                setEditingPosition(null)
                setIsDialogOpen(true)
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              新增职位
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索职位名称、编码或描述..."
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
                <TableHead className="text-muted-foreground">职位编码</TableHead>
                <TableHead className="text-muted-foreground">职位名称</TableHead>
                <TableHead className="text-muted-foreground">描述</TableHead>
                <TableHead className="text-muted-foreground">关联用户数</TableHead>
                <TableHead className="text-muted-foreground">状态</TableHead>
                <TableHead className="text-muted-foreground text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPositions.map((position) => (
                <TableRow key={position.id} className="border-border">
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {position.code}
                  </TableCell>
                  <TableCell className="font-medium">{position.name}</TableCell>
                  <TableCell className="text-muted-foreground">{position.description}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleViewDetail(position)}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Users className="h-4 w-4" />
                      {position.userCount}
                    </button>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={position.status === "active" ? "default" : "secondary"}
                      className={
                        position.status === "active"
                          ? "bg-primary/20 text-primary hover:bg-primary/30"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {position.status === "active" ? "启用" : "停用"}
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
                        <DropdownMenuItem onClick={() => handleViewDetail(position)}>
                          <Eye className="mr-2 h-4 w-4" />
                          查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingPosition(position)
                            setIsDialogOpen(true)
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleStatus(position.id)}>
                          <Power className="mr-2 h-4 w-4" />
                          {position.status === "active" ? "停用" : "启用"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(position.id)}
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
          <span>共 {filteredPositions.length} 条记录</span>
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

      {/* 新增/编辑职位对话框 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{editingPosition ? "编辑职位" : "新增职位"}</DialogTitle>
            <DialogDescription>
              {editingPosition ? "修改职位信息" : "创建新的职位"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">职位编码</Label>
              <Input
                id="code"
                placeholder="如：POS001"
                defaultValue={editingPosition?.code}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">职位名称</Label>
              <Input
                id="name"
                placeholder="如：院长"
                defaultValue={editingPosition?.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">描述</Label>
              <Input
                id="description"
                placeholder="如：二级学院院长"
                defaultValue={editingPosition?.description}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {editingPosition ? "保存" : "创建"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 关联用户详情对话框 */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>关联用户 - {selectedPosition?.name}</DialogTitle>
            <DialogDescription>
              查看该职位下的所有关联用户
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                共 {selectedPosition?.userCount} 位用户
              </span>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                添加用户
              </Button>
            </div>
            <div className="max-h-64 overflow-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">姓名</TableHead>
                    <TableHead className="text-muted-foreground">工号</TableHead>
                    <TableHead className="text-muted-foreground">部门</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "张三", workId: "T2024001", dept: "信息工程学院" },
                    { name: "李四", workId: "T2024002", dept: "商学院" },
                    { name: "王五", workId: "T2024003", dept: "艺术学院" },
                  ].map((user, index) => (
                    <TableRow key={index} className="border-border">
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="text-muted-foreground">{user.workId}</TableCell>
                      <TableCell className="text-muted-foreground">{user.dept}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDetailDialogOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
