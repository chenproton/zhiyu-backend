"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, MoreHorizontal, Pencil, Power, Trash2, Search, Filter, Upload, Download, GraduationCap } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface Student {
  id: string
  name: string
  studentNo: string
  idCard: string
  className: string
  major: string
  enrollYear: string
  status: "active" | "inactive"
}

const mockStudents: Student[] = [
  { id: "1", name: "王五", studentNo: "S2024001", idCard: "330102200301010011", className: "计算机2401班", major: "软件技术", enrollYear: "2024", status: "active" },
  { id: "2", name: "赵六", studentNo: "S2024002", idCard: "330102200302020022", className: "计算机2401班", major: "软件技术", enrollYear: "2024", status: "active" },
  { id: "3", name: "钱七", studentNo: "S2024003", idCard: "330102200303030033", className: "大数据2401班", major: "大数据技术", enrollYear: "2024", status: "active" },
  { id: "4", name: "孙八", studentNo: "S2024004", idCard: "330102200304040044", className: "大数据2401班", major: "大数据技术", enrollYear: "2024", status: "active" },
  { id: "5", name: "周九", studentNo: "S2023005", idCard: "330102200205050055", className: "软件2301班", major: "软件技术", enrollYear: "2023", status: "active" },
  { id: "6", name: "吴十", studentNo: "S2023006", idCard: "330102200206060066", className: "软件2301班", major: "软件技术", enrollYear: "2023", status: "active" },
  { id: "7", name: "郑十一", studentNo: "S2022007", idCard: "330102200107070077", className: "计算机2201班", major: "计算机应用", enrollYear: "2022", status: "active" },
  { id: "8", name: "冯十二", studentNo: "S2022008", idCard: "330102200108080088", className: "计算机2201班", major: "计算机应用", enrollYear: "2022", status: "inactive" },
]

const enrollYears = ["2024", "2023", "2022", "2021", "2020"]

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isGraduateDialogOpen, setIsGraduateDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [yearFilter, setYearFilter] = useState("all")
  const [selectedGraduateYear, setSelectedGraduateYear] = useState("")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  const filteredStudents = students.filter((student) => {
    const matchSearch = student.name.includes(searchTerm) || student.studentNo.includes(searchTerm)
    const matchYear = yearFilter === "all" || student.enrollYear === yearFilter
    return matchSearch && matchYear
  })

  const toggleStatus = (id: string) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s)))
  }

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }

  const handleBatchGraduate = () => {
    if (!selectedGraduateYear) return
    // 模拟批量毕业操作
    const graduatingStudents = students.filter(s => s.enrollYear === selectedGraduateYear)
    setStudents(prev => prev.filter(s => s.enrollYear !== selectedGraduateYear))
    setIsGraduateDialogOpen(false)
    setSelectedGraduateYear("")
    alert(`已将 ${graduatingStudents.length} 名 ${selectedGraduateYear} 级学生转入毕业学生管理`)
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
          <Button variant="outline" size="sm" onClick={() => setIsGraduateDialogOpen(true)}>
            <GraduationCap className="h-4 w-4 mr-1" />
            批量毕业
          </Button>
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
        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="入学年份" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部年份</SelectItem>
            {enrollYears.map(year => (
              <SelectItem key={year} value={year}>{year}级</SelectItem>
            ))}
          </SelectContent>
        </Select>
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
              <TableHead>身份证号</TableHead>
              <TableHead>班级</TableHead>
              <TableHead>专业</TableHead>
              <TableHead>入学年份</TableHead>
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
                <TableCell className="text-muted-foreground text-sm">{student.idCard}</TableCell>
                <TableCell>{student.className}</TableCell>
                <TableCell className="text-muted-foreground">{student.major}</TableCell>
                <TableCell>
                  <Badge variant="outline">{student.enrollYear}级</Badge>
                </TableCell>
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
              <Label>身份证号 <span className="text-destructive">*</span></Label>
              <Input placeholder="18位身份证号" defaultValue={selectedStudent?.idCard} />
            </div>
            <div className="grid gap-2">
              <Label>密码 <span className="text-destructive">*</span></Label>
              <Input type="password" placeholder="请输入密码" />
            </div>
            <div className="grid gap-2">
              <Label>入学年份 <span className="text-destructive">*</span></Label>
              <Select defaultValue={selectedStudent?.enrollYear || "2024"}>
                <SelectTrigger><SelectValue placeholder="选择入学年份" /></SelectTrigger>
                <SelectContent>
                  {enrollYears.map(year => (
                    <SelectItem key={year} value={year}>{year}级</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>取消</Button>
            <Button onClick={() => setIsDialogOpen(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 批量毕业对话框 */}
      <Dialog open={isGraduateDialogOpen} onOpenChange={setIsGraduateDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>批量毕业</DialogTitle>
            <DialogDescription>选择入学年份，将该年份的所有学生转入毕业学生管理</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label className="mb-2 block">选择入学年份</Label>
            <Select value={selectedGraduateYear} onValueChange={setSelectedGraduateYear}>
              <SelectTrigger>
                <SelectValue placeholder="请选择要毕业的年级" />
              </SelectTrigger>
              <SelectContent>
                {enrollYears.map(year => {
                  const count = students.filter(s => s.enrollYear === year).length
                  return (
                    <SelectItem key={year} value={year}>
                      {year}级 ({count}人)
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            {selectedGraduateYear && (
              <p className="mt-3 text-sm text-muted-foreground">
                将有 <span className="text-primary font-medium">{students.filter(s => s.enrollYear === selectedGraduateYear).length}</span> 名学生被转入毕业学生管理
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGraduateDialogOpen(false)}>取消</Button>
            <Button onClick={handleBatchGraduate} disabled={!selectedGraduateYear}>确认毕业</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
