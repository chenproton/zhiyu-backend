"use client"

import { useState } from "react"
import { Header } from "@/components/admin/header"
import { Button } from "@/components/ui/button"
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
import { Plus, Pencil, Trash2, Search, Upload, Download } from "lucide-react"

interface Industry {
  id: string
  name: string
  code: string
  createdAt: string
}

const mockIndustries: Industry[] = [
  { id: "1", name: "信息技术", code: "IT", createdAt: "2024-01-10" },
  { id: "2", name: "金融服务", code: "FIN", createdAt: "2024-01-15" },
  { id: "3", name: "教育培训", code: "EDU", createdAt: "2024-02-01" },
  { id: "4", name: "医疗健康", code: "MED", createdAt: "2024-02-10" },
  { id: "5", name: "制造业", code: "MFG", createdAt: "2024-02-20" },
  { id: "6", name: "电子商务", code: "ECO", createdAt: "2024-03-01" },
  { id: "7", name: "文化传媒", code: "MDA", createdAt: "2024-03-10" },
  { id: "8", name: "能源环保", code: "ENE", createdAt: "2024-03-15" },
]

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>(mockIndustries)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingIndustry, setEditingIndustry] = useState<Industry | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredIndustries = industries.filter((ind) =>
    ind.name.includes(searchTerm) || ind.code.includes(searchTerm)
  )

  const handleEdit = (industry: Industry) => {
    setEditingIndustry(industry)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setIndustries((prev) => prev.filter((ind) => ind.id !== id))
  }

  const handleSave = () => {
    setIsDialogOpen(false)
    setEditingIndustry(null)
  }

  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "行业管理" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">行业管理</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              管理系统中的行业分类数据
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
                setEditingIndustry(null)
                setIsDialogOpen(true)
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              新增行业
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索行业名称或编码..."
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
                <TableHead className="text-muted-foreground">行业编码</TableHead>
                <TableHead className="text-muted-foreground">行业名称</TableHead>
                <TableHead className="text-muted-foreground">创建时间</TableHead>
                <TableHead className="text-muted-foreground text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIndustries.map((industry) => (
                <TableRow key={industry.id} className="border-border">
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {industry.code}
                  </TableCell>
                  <TableCell className="font-medium">{industry.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {industry.createdAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(industry)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(industry.id)}
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
          共 {filteredIndustries.length} 条记录
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{editingIndustry ? "编辑行业" : "新增行业"}</DialogTitle>
            <DialogDescription>
              {editingIndustry ? "修改行业信息" : "创建新的行业分类"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">行业编码</Label>
              <Input
                id="code"
                placeholder="如：IT"
                defaultValue={editingIndustry?.code}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">行业名称</Label>
              <Input
                id="name"
                placeholder="如：信息技术"
                defaultValue={editingIndustry?.name}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave}>
              {editingIndustry ? "保存" : "创建"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
