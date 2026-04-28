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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2 } from "lucide-react"

interface IdentityType {
  id: string
  name: string
  code: string
  description: string
  userCount: number
  isSystem: boolean
}

const mockIdentityTypes: IdentityType[] = [
  {
    id: "1",
    name: "教职工",
    code: "STAFF",
    description: "学校教职工人员",
    userCount: 856,
    isSystem: true,
  },
  {
    id: "2",
    name: "学生",
    code: "STUDENT",
    description: "在校学生",
    userCount: 3200,
    isSystem: true,
  },
  {
    id: "3",
    name: "企业",
    code: "ENTERPRISE",
    description: "合作企业人员",
    userCount: 120,
    isSystem: true,
  },
  {
    id: "4",
    name: "系统管理员",
    code: "ADMIN",
    description: "系统管理员账户",
    userCount: 5,
    isSystem: true,
  },
]

export default function IdentityTypesPage() {
  const [types, setTypes] = useState<IdentityType[]>(mockIdentityTypes)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingType, setEditingType] = useState<IdentityType | null>(null)

  const handleEdit = (type: IdentityType) => {
    setEditingType(type)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    const type = types.find((t) => t.id === id)
    if (type?.isSystem) return
    setTypes((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "用户与账户管理", href: "/admin/users" },
          { label: "身份类型管理" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">身份类型管理</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              管理用户身份类型，如教职工、学生、企业等
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingType(null)
              setIsDialogOpen(true)
            }}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            新增类型
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">类型编码</TableHead>
                <TableHead className="text-muted-foreground">类型名称</TableHead>
                <TableHead className="text-muted-foreground">描述</TableHead>
                <TableHead className="text-muted-foreground">用户数量</TableHead>
                <TableHead className="text-muted-foreground">类型</TableHead>
                <TableHead className="text-muted-foreground text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {types.map((type) => (
                <TableRow key={type.id} className="border-border">
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {type.code}
                  </TableCell>
                  <TableCell className="font-medium">{type.name}</TableCell>
                  <TableCell className="text-muted-foreground">{type.description}</TableCell>
                  <TableCell>
                    <span className="text-primary">{type.userCount}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={type.isSystem ? "secondary" : "default"}
                      className={
                        type.isSystem
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary/20 text-primary"
                      }
                    >
                      {type.isSystem ? "系统" : "自定义"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(type)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(type.id)}
                        className={
                          type.isSystem
                            ? "text-muted-foreground cursor-not-allowed"
                            : "text-destructive hover:text-destructive"
                        }
                        disabled={type.isSystem}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          共 {types.length} 条记录
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{editingType ? "编辑身份类型" : "新增身份类型"}</DialogTitle>
            <DialogDescription>
              {editingType ? "修改身份类型信息" : "创建新的身份类型"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">类型编码</Label>
              <Input
                id="code"
                placeholder="如：STAFF"
                defaultValue={editingType?.code}
                disabled={editingType?.isSystem}
                className={editingType?.isSystem ? "bg-muted" : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">类型名称</Label>
              <Input
                id="name"
                placeholder="如：教职工"
                defaultValue={editingType?.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">描述</Label>
              <Input
                id="description"
                placeholder="如：学校教职工人员"
                defaultValue={editingType?.description}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {editingType ? "保存" : "创建"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
