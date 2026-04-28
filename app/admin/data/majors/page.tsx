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
import { Pencil, Search } from "lucide-react"

interface Major {
  id: string
  name: string
  code: string
}

const mockMajors: Major[] = [
  { id: "1", name: "计算机科学与技术", code: "080901" },
  { id: "2", name: "软件工程", code: "080902" },
  { id: "3", name: "人工智能", code: "080903" },
  { id: "4", name: "数据科学与大数据技术", code: "080910" },
  { id: "5", name: "电子商务", code: "120801" },
  { id: "6", name: "会计学", code: "120203" },
  { id: "7", name: "金融学", code: "020301" },
  { id: "8", name: "机械工程", code: "080201" },
  { id: "9", name: "电子信息工程", code: "080701" },
  { id: "10", name: "通信工程", code: "080703" },
  { id: "11", name: "市场营销", code: "120202" },
  { id: "12", name: "工商管理", code: "120201" },
]

export default function MajorsPage() {
  const [majors] = useState<Major[]>(mockMajors)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMajor, setEditingMajor] = useState<Major | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMajors = majors.filter(
    (major) =>
      major.name.includes(searchTerm) ||
      major.code.includes(searchTerm)
  )

  const handleEdit = (major: Major) => {
    setEditingMajor(major)
    setIsDialogOpen(true)
  }

  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "专业管理" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">专业管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            管理教育专业信息（仅支持编辑）
          </p>
        </div>

        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索专业名称或代码..."
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
                <TableHead className="text-muted-foreground">专业代码</TableHead>
                <TableHead className="text-muted-foreground">专业名称</TableHead>
                <TableHead className="text-muted-foreground text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMajors.map((major) => (
                <TableRow key={major.id} className="border-border">
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {major.code}
                  </TableCell>
                  <TableCell className="font-medium">{major.name}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(major)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          共 {filteredMajors.length} 条记录
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>编辑专业</DialogTitle>
            <DialogDescription>修改专业信息</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">专业代码</Label>
              <Input
                id="code"
                defaultValue={editingMajor?.code}
                disabled
                className="bg-muted font-mono"
              />
              <p className="text-xs text-muted-foreground">专业代码不可修改</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">专业名称</Label>
              <Input id="name" defaultValue={editingMajor?.name} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
