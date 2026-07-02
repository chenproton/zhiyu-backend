"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, MoreHorizontal, Pencil, Power, Trash2, Search, Filter, Upload, Download } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface Student {
  id: string
  name: string
  studentNo: string
  className: string
  major: string
  status: "active" | "inactive"
}

const mockStudents: Student[] = [
  { id: "1", name: "王五", studentNo: "S2024001", className: "计算机2401班", major: "软件技术", status: "active" },
  { id: "2", name: "赵六", studentNo: "S2024002", className: "计算机2401班", major: "软件技术", status: "active" },
  { id: "3", name: "钱七", studentNo: "S2024003", className: "大数据2401班", major: "大数据技术", status: "active" },
  { id: "4", name: "孙八", studentNo: "S2024004", className: "大数据2401班", major: "大数据技术", status: "active" },
  { id: "5", name: "周九", studentNo: "S2023005", className: "软件2301班", major: "软件技术", status: "active" },
  { id: "6", name: "吴十", studentNo: "S2023006", className: "软件2301班", major: "软件技术", status: "active" },
  { id: "7", name: "郑十一", studentNo: "S2022007", className: "计算机2201班", major: "计算机应用", status: "active" },
  { id: "8", name: "冯十二", studentNo: "S2022008", className: "计算机2201班", major: "计算机应用", status: "inactive" },
]

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  const filteredStudents = students.filter((student) =>
    student.name.includes(searchTerm) || student.studentNo.includes(searchTerm)
  )

  const toggleStatus = (id: string) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s)))
  }

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }

  const toggleSelectStudent = (id: string) => {
    setSelectedStudents(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id))
    }
  }

  return (
    <div className="p-6 bg-[#f5f7fa] min-h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">学生管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">管理系统中的学生用户信息</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-1" />
            导入
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            导出
          </Button>
          <Button size="sm" onClick={() => { setSelectedStudent(null); setIsDialogOpen(true) }}>
            <Plus className="h-4 w-4 mr-1" />
            新增学生
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="搜索姓名或学号..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-1" />
          更多筛选
        </Button>
      </div>

      <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>姓名</TableHead>
              <TableHead>学号</TableHead>
              <TableHead>班级</TableHead>
              <TableHead>专业</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} className="border-border">
                <TableCell>
                  <Checkbox 
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={() => toggleSelectStudent(student.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell className="font-mono text-sm">{student.studentNo}</TableCell>
                <TableCell>{student.className}</TableCell>
                <TableCell className="text-muted-foreground">{student.major}</TableCell>
                <TableCell>
                  <Badge variant={student.status === "active" ? "default" : "secondary"}>
                    {student.status === "active" ? "在校" : "离校"}
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
                      <DropdownMenuItem onClick={() => { setSelectedStudent(student); setIsDialogOpen(true) }}>
                        <Pencil className="mr-2 h-4 w-4" />
                        编辑
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleStatus(student.id)}>
                        <Power className="mr-2 h-4 w-4" />
                        {student.status === "active" ? "设为离校" : "设为在校"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteStudent(student.id)} className="text-destructive">
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
        <span>共 {filteredStudents.length} 条记录 {selectedStudents.length > 0 && `，已选择 ${selectedStudents.length} 条`}</span>
      </div>

      {/* 新增/编辑学生对话框 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedStudent ? "编辑学生" : "新增学生"}</DialogTitle>
            <DialogDescription>填写学生基本信息</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>姓名 <span className="text-destructive">*</span></Label>
              <Input placeholder="请输入姓名" defaultValue={selectedStudent?.name} />
            </div>
            <div className="grid gap-2">
              <Label>学号 <span className="text-destructive">*</span></Label>
              <Input placeholder="如：S2024001" defaultValue={selectedStudent?.studentNo} />
            </div>
            <div className="grid gap-2">
              <Label>密码 <span className="text-destructive">*</span></Label>
              <Input type="password" placeholder="请输入密码" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>取消</Button>
            <Button onClick={() => setIsDialogOpen(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
