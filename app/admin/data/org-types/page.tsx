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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Pencil, Trash2, Search, Upload, Download } from "lucide-react"

interface OrgType {
  id: string
  name: string
  category: "internal" | "business" | "external"
  description: string
}

const categoryLabels = {
  internal: "内部组织",
  business: "业务组织",
  external: "外部协作组织",
}

const categoryColors = {
  internal: "bg-blue-500/20 text-blue-400",
  business: "bg-primary/20 text-primary",
  external: "bg-amber-500/20 text-amber-400",
}

const mockOrgTypes: OrgType[] = [
  { id: "1", name: "行政部门", category: "internal", description: "学校行政管理部门" },
  { id: "2", name: "二级学院", category: "internal", description: "学校下属二级学院" },
  { id: "3", name: "教研室", category: "internal", description: "学院下属教研室" },
  { id: "4", name: "专业群", category: "business", description: "按专业群组织的业务单元" },
  { id: "5", name: "专业系", category: "business", description: "按专业划分的系部" },
  { id: "6", name: "班级", category: "business", description: "学生班级" },
  { id: "7", name: "产业学院", category: "business", description: "产教融合的产业学院" },
  { id: "8", name: "订单班", category: "business", description: "企业定向培养班级" },
  { id: "9", name: "企业", category: "external", description: "外部合作企业" },
]

export default function OrgTypesPage() {
  const [orgTypes, setOrgTypes] = useState<OrgType[]>(mockOrgTypes)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingType, setEditingType] = useState<OrgType | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<"all" | "internal" | "business" | "external">("all")

  const filteredTypes = orgTypes.filter((type) => {
    const matchesSearch =
      type.name.includes(searchTerm) || type.description.includes(searchTerm)
    const matchesCategory = filterCategory === "all" || type.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleEdit = (type: OrgType) => {
    setEditingType(type)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setOrgTypes((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "组织类型管理" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">组织类型管理</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              管理内部组织、业务组织和外部协作组织类型
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
                setEditingType(null)
                setIsDialogOpen(true)
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              新增类型
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索组织类型..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={filterCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory("all")}
            >
              全部
            </Button>
            <Button
              variant={filterCategory === "internal" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory("internal")}
            >
              内部组织
            </Button>
            <Button
              variant={filterCategory === "business" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory("business")}
            >
              业务组织
            </Button>
            <Button
              variant={filterCategory === "external" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory("external")}
            >
              外部协作
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">类型分类</TableHead>
                <TableHead className="text-muted-foreground">名称</TableHead>
                <TableHead className="text-muted-foreground">描述</TableHead>
                <TableHead className="text-muted-foreground text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTypes.map((type) => (
                <TableRow key={type.id} className="border-border">
                  <TableCell>
                    <Badge className={categoryColors[type.category]}>
                      {categoryLabels[type.category]}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{type.name}</TableCell>
                  <TableCell className="text-muted-foreground">{type.description}</TableCell>
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
                        className="text-destructive hover:text-destructive"
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
          共 {filteredTypes.length} 条记录
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{editingType ? "编辑组织类型" : "新增组织类型"}</DialogTitle>
            <DialogDescription>
              {editingType ? "修改组织类型信息" : "创建新的组织类型"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">类型分类</Label>
              <Select defaultValue={editingType?.category || "internal"}>
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">内部组织</SelectItem>
                  <SelectItem value="business">业务组织</SelectItem>
                  <SelectItem value="external">外部协作组织</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">名称</Label>
              <Input
                id="name"
                placeholder="如：行政部门"
                defaultValue={editingType?.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">描述</Label>
              <Input
                id="description"
                placeholder="如：学校行政管理部门"
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
