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
import { Plus, Pencil, Trash2, Search, Lock, Upload, Download } from "lucide-react"

interface ResourceCode {
  id: string
  code: string
  name: string
  description: string
  type: "public" | "custom"
}

const mockResourceCodes: ResourceCode[] = [
  { id: "1", code: "SCENE", name: "场景", description: "场景资源", type: "public" },
  { id: "2", code: "KNOWLEDGE", name: "知识点", description: "知识点资源", type: "public" },
  { id: "3", code: "POSITION", name: "岗位", description: "岗位资源", type: "public" },
  { id: "4", code: "COURSE", name: "课程", description: "课程资源", type: "public" },
  { id: "5", code: "PROJECT", name: "项目", description: "项目资源", type: "custom" },
  { id: "6", code: "CLASS", name: "班级", description: "班级资源", type: "custom" },
  { id: "7", code: "ASSET", name: "资产", description: "资产管理资源", type: "custom" },
  { id: "8", code: "CERT", name: "证书", description: "证书资源", type: "custom" },
]

export default function ResourceCodesPage() {
  const [codes, setCodes] = useState<ResourceCode[]>(mockResourceCodes)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCode, setEditingCode] = useState<ResourceCode | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "public" | "custom">("all")

  const filteredCodes = codes.filter((code) => {
    const matchesSearch =
      code.code.includes(searchTerm.toUpperCase()) ||
      code.name.includes(searchTerm) ||
      code.description.includes(searchTerm)
    const matchesType = filterType === "all" || code.type === filterType
    return matchesSearch && matchesType
  })

  const handleEdit = (code: ResourceCode) => {
    if (code.type === "public") return
    setEditingCode(code)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    const code = codes.find((c) => c.id === id)
    if (code?.type === "public") return
    setCodes((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "资源类型编码管理" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">资源类型编码管理</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              管理公共类型编码和自定义类型编码
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              批量导入
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              批量导出
            </Button>
            <Button
              onClick={() => {
                setEditingCode(null)
                setIsDialogOpen(true)
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              新增自定义编码
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索编码、名称或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("all")}
            >
              全部
            </Button>
            <Button
              variant={filterType === "public" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("public")}
            >
              公共编码
            </Button>
            <Button
              variant={filterType === "custom" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType("custom")}
            >
              自定义编码
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">类型</TableHead>
                <TableHead className="text-muted-foreground">编码</TableHead>
                <TableHead className="text-muted-foreground">名称</TableHead>
                <TableHead className="text-muted-foreground">描述</TableHead>
                <TableHead className="text-muted-foreground text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCodes.map((code) => (
                <TableRow key={code.id} className="border-border">
                  <TableCell>
                    <Badge
                      variant={code.type === "public" ? "secondary" : "default"}
                      className={
                        code.type === "public"
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary/20 text-primary hover:bg-primary/30"
                      }
                    >
                      {code.type === "public" ? (
                        <span className="flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          公共
                        </span>
                      ) : (
                        "自定义"
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{code.code}</TableCell>
                  <TableCell className="font-medium">{code.name}</TableCell>
                  <TableCell className="text-muted-foreground">{code.description}</TableCell>
                  <TableCell className="text-right">
                    {code.type === "custom" ? (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(code)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(code.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">不可修改</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          共 {filteredCodes.length} 条记录
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{editingCode ? "编辑自定义编码" : "新增自定义编码"}</DialogTitle>
            <DialogDescription>
              {editingCode ? "修改自定义资源类型编码" : "创建新的自定义资源类型编码"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">编码</Label>
              <Input
                id="code"
                placeholder="如：PROJECT"
                defaultValue={editingCode?.code}
                className="uppercase"
              />
              <p className="text-xs text-muted-foreground">建议使用大写英文字母</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">名称</Label>
              <Input
                id="name"
                placeholder="如：项目"
                defaultValue={editingCode?.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">描述</Label>
              <Input
                id="description"
                placeholder="如：项目资源"
                defaultValue={editingCode?.description}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {editingCode ? "保存" : "创建"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
