"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, MoreHorizontal, Pencil, Power, Trash2, Search, Filter, Upload, Download, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Teacher {
  id: string
  name: string
  workNo: string
  idCard: string
  department: string
  roles: string[]
  positions: string[]
  status: "active" | "inactive"
}

const mockTeachers: Teacher[] = [
  { id: "1", name: "张三", workNo: "T001", idCard: "330102199001010011", department: "计算机系", roles: ["超级管理员"], positions: ["系主任", "教授"], status: "active" },
  { id: "2", name: "李四", workNo: "T002", idCard: "330102199002020022", department: "计算机系", roles: ["教师"], positions: ["讲师"], status: "active" },
  { id: "3", name: "王五", workNo: "T003", idCard: "330102198503030033", department: "软件工程系", roles: ["教师", "教研室主任"], positions: ["专业负责人"], status: "active" },
  { id: "4", name: "赵六", workNo: "T004", idCard: "330102199204040044", department: "软件工程系", roles: ["教师"], positions: [], status: "active" },
  { id: "5", name: "孙七", workNo: "T005", idCard: "330102198805050055", department: "大数据学院", roles: ["教师", "班主任"], positions: ["教研室主任"], status: "active" },
  { id: "6", name: "钱八", workNo: "T006", idCard: "330102197006060066", department: "人工智能学院", roles: ["超级管理员", "教师"], positions: ["院长", "教授"], status: "active" },
]

const allRoles = ["超级管理员", "系统管理员", "教师", "教研室主任", "班主任", "辅导员"]
const allPositions = ["院长", "副院长", "系主任", "副系主任", "教研室主任", "专业负责人", "教授", "副教授", "讲师", "助教", "实验员", "行政人员"]

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  
  // 编辑表单状态
  const [editRoles, setEditRoles] = useState<string[]>([])
  const [editPositions, setEditPositions] = useState<string[]>([])
  const [positionSearchTerm, setPositionSearchTerm] = useState("")
  const [showPositionDropdown, setShowPositionDropdown] = useState(false)
  const positionInputRef = useRef<HTMLInputElement>(null)

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.includes(searchTerm) || teacher.workNo.includes(searchTerm)
  )

  const filteredPositions = allPositions.filter(p => 
    p.includes(positionSearchTerm) && !editPositions.includes(p)
  )

  const toggleStatus = (id: string) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, status: t.status === "active" ? "inactive" : "active" } : t)))
  }

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id))
  }

  const openEditDialog = (teacher: Teacher | null) => {
    setSelectedTeacher(teacher)
    setEditRoles(teacher?.roles || [])
    setEditPositions(teacher?.positions || [])
    setPositionSearchTerm("")
    setIsDialogOpen(true)
  }

  const toggleRole = (role: string) => {
    setEditRoles(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    )
  }

  const addPosition = (position: string) => {
    if (!editPositions.includes(position)) {
      setEditPositions([...editPositions, position])
    }
    setPositionSearchTerm("")
    setShowPositionDropdown(false)
  }

  const removePosition = (position: string) => {
    setEditPositions(editPositions.filter(p => p !== position))
  }

  // 点击外部关闭下拉
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (positionInputRef.current && !positionInputRef.current.contains(e.target as Node)) {
        setShowPositionDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="p-6 bg-[#f5f7fa] min-h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">教职工管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">管理系统中的教职工用户信息</p>
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
          <Button size="sm" onClick={() => openEditDialog(null)}>
            <Plus className="h-4 w-4 mr-1" />
            新增教职工
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="搜索姓名或工号..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-1" />
          筛选
        </Button>
      </div>

      <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead>姓名</TableHead>
              <TableHead>工号</TableHead>
              <TableHead>身份证号</TableHead>
              <TableHead>部门</TableHead>
              <TableHead>角色</TableHead>
              <TableHead>职位</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.map((teacher) => (
              <TableRow key={teacher.id} className="border-border">
                <TableCell className="font-medium">{teacher.name}</TableCell>
                <TableCell className="font-mono text-sm">{teacher.workNo}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{teacher.idCard}</TableCell>
                <TableCell>{teacher.department}</TableCell>
                <TableCell>
                  {teacher.roles.length > 0 ? (
                    <div className="flex gap-1 flex-wrap">
                      {teacher.roles.map((role, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{role}</Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {teacher.positions.length > 0 ? (
                    <div className="flex gap-1 flex-wrap">
                      {teacher.positions.map((pos, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{pos}</Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={teacher.status === "active" ? "default" : "secondary"}>
                    {teacher.status === "active" ? "在职" : "离职"}
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
                      <DropdownMenuItem onClick={() => openEditDialog(teacher)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        编辑
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleStatus(teacher.id)}>
                        <Power className="mr-2 h-4 w-4" />
                        {teacher.status === "active" ? "设为离职" : "设为在职"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => deleteTeacher(teacher.id)} className="text-destructive">
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

      <div className="mt-4 text-sm text-muted-foreground">共 {filteredTeachers.length} 条记录</div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{selectedTeacher ? "编辑教职工" : "新增教职工"}</DialogTitle>
            <DialogDescription>填写教职工基本信息</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>姓名 <span className="text-destructive">*</span></Label>
              <Input placeholder="请输入姓名" defaultValue={selectedTeacher?.name} />
            </div>
            <div className="grid gap-2">
              <Label>工号 <span className="text-destructive">*</span></Label>
              <Input placeholder="如：T001" defaultValue={selectedTeacher?.workNo} />
            </div>
            <div className="grid gap-2">
              <Label>身份证号 <span className="text-destructive">*</span></Label>
              <Input placeholder="18位身份证号" defaultValue={selectedTeacher?.idCard} />
            </div>
            <div className="grid gap-2">
              <Label>密码 <span className="text-destructive">*</span></Label>
              <Input type="password" placeholder="请输入密码" />
            </div>
            
            {/* 角色选择 - 多选复选框 */}
            <div className="grid gap-2">
              <Label>角色（可多选）</Label>
              <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-muted/30">
                {allRoles.map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    className={cn(
                      "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border transition-colors",
                      editRoles.includes(role) 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-background hover:bg-muted border-border"
                    )}
                  >
                    {editRoles.includes(role) && <Check className="w-3 h-3" />}
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* 职位选择 - 搜索+标签 */}
            <div className="grid gap-2">
              <Label>职位（可多选）</Label>
              <div className="border rounded-md p-2 min-h-[80px]">
                {/* 已选择的职位标签 */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {editPositions.map(pos => (
                    <Badge key={pos} variant="secondary" className="gap-1 pr-1">
                      {pos}
                      <button
                        type="button"
                        onClick={() => removePosition(pos)}
                        className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                {/* 搜索输入框 */}
                <div className="relative" ref={positionInputRef}>
                  <Input
                    placeholder="搜索职位..."
                    value={positionSearchTerm}
                    onChange={(e) => {
                      setPositionSearchTerm(e.target.value)
                      setShowPositionDropdown(true)
                    }}
                    onFocus={() => setShowPositionDropdown(true)}
                    className="h-8 text-sm"
                  />
                  
                  {/* 下拉选项 */}
                  {showPositionDropdown && filteredPositions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                      {filteredPositions.map(pos => (
                        <button
                          key={pos}
                          type="button"
                          onClick={() => addPosition(pos)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
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
