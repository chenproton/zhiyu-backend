"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  Plus, MoreHorizontal, Pencil, Power, Trash2, Search, Filter, Upload, Download,
  ChevronRight, ChevronDown, FolderTree, Users, GraduationCap, HardHat, Building2,
  X, Check, Lock, Paperclip
} from "lucide-react"

interface Teacher {
  id: string
  name: string
  workNo: string
  department: string
  roles: string[]
  positions: string[]
  teachingQualifications: string[]
  isEnterpriseMentor: boolean
  enterpriseInfo?: {
    company: string
    position: string
    years: number
    field: string
  }
  agreements?: {
    id: string
    name: string
    company: string
    startDate: string
    endDate: string
    status: "有效" | "过期"
  }[]
  status: "在职" | "离职" | "外聘"
}

interface OrgMajorNode {
  id: string
  name: string
}

interface OrgDeptNode {
  id: string
  name: string
  majors: OrgMajorNode[]
}

const orgTreeData: OrgDeptNode[] = [
  {
    id: "dept-1",
    name: "信息学院",
    majors: [
      { id: "major-1-1", name: "计算机系" },
      { id: "major-1-2", name: "软件工程系" },
    ],
  },
  {
    id: "dept-2",
    name: "经济管理学院",
    majors: [
      { id: "major-2-1", name: "会计系" },
      { id: "major-2-2", name: "金融系" },
    ],
  },
  {
    id: "dept-3",
    name: "教务处",
    majors: [],
  },
  {
    id: "dept-4",
    name: "学生处",
    majors: [],
  },
]

const allDeptNames = orgTreeData.map(d => d.name)

const allRoles = ["超级管理员", "系统管理员", "教师", "教研室主任", "班主任", "辅导员"]
const allPositions = ["院长", "副院长", "系主任", "副系主任", "教研室主任", "专业负责人", "教授", "副教授", "讲师", "助教", "实验员", "行政人员", "企业导师"]
const allTeachingQualifications = ["计算机基础", "数据结构", "编程基础", "Web开发", "软件工程", "数据库", "管理学", "经济学", "会计学", "人工智能", "机器学习", "工业实践", "云计算", "大数据"]

const mockTeachers: Teacher[] = [
  { id: "1", name: "张三", workNo: "T001", department: "信息学院", roles: ["超级管理员"], positions: ["系主任", "教授"], teachingQualifications: ["计算机基础", "数据结构"], isEnterpriseMentor: false, status: "在职" },
  { id: "2", name: "李四", workNo: "T002", department: "信息学院", roles: ["教师"], positions: ["讲师"], teachingQualifications: ["编程基础", "Web开发"], isEnterpriseMentor: false, status: "在职" },
  { id: "3", name: "王五", workNo: "T003", department: "信息学院", roles: ["教师", "教研室主任"], positions: ["专业负责人"], teachingQualifications: ["软件工程", "数据库"], isEnterpriseMentor: false, status: "在职" },
  { id: "4", name: "赵六", workNo: "T004", department: "经济管理学院", roles: ["教师"], positions: ["副教授"], teachingQualifications: ["管理学", "经济学"], isEnterpriseMentor: false, status: "在职" },
  { id: "5", name: "孙七", workNo: "T005", department: "经济管理学院", roles: ["教师", "班主任"], positions: ["教研室主任"], teachingQualifications: ["会计学"], isEnterpriseMentor: false, status: "在职" },
  { id: "6", name: "钱八", workNo: "T006", department: "信息学院", roles: ["超级管理员", "教师"], positions: ["院长", "教授"], teachingQualifications: ["人工智能", "机器学习"], isEnterpriseMentor: false, status: "在职" },
  {
    id: "7", name: "周导师", workNo: "T007", department: "信息学院", roles: ["企业导师"], positions: ["企业导师"], teachingQualifications: ["工业实践"],
    isEnterpriseMentor: true,
    enterpriseInfo: { company: "华为技术", position: "高级工程师", years: 10, field: "云计算" },
    status: "外聘",
    agreements: [
      { id: "ag1", name: "校企合作协议-2024", company: "华为技术", startDate: "2024-01-01", endDate: "2026-12-31", status: "有效" },
    ],
  },
]

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [facultyTab, setFacultyTab] = useState<"all" | "teacher" | "mentor">("all")

  const [selectedDeptId, setSelectedDeptId] = useState<string | null>(null)

  const [editRoles, setEditRoles] = useState<string[]>([])
  const [editPositions, setEditPositions] = useState<string[]>([])
  const [editTeachingQualifications, setEditTeachingQualifications] = useState<string[]>([])
  const [editIsMentor, setEditIsMentor] = useState(false)
  const [editEnterpriseCompany, setEditEnterpriseCompany] = useState("")
  const [editEnterprisePosition, setEditEnterprisePosition] = useState("")
  const [editEnterpriseYears, setEditEnterpriseYears] = useState<number>(0)
  const [editEnterpriseField, setEditEnterpriseField] = useState("")
  const [editStatus, setEditStatus] = useState<string>("在职")

  const [positionSearchTerm, setPositionSearchTerm] = useState("")
  const [showPositionDropdown, setShowPositionDropdown] = useState(false)
  const [qualificationSearchTerm, setQualificationSearchTerm] = useState("")
  const [showQualificationDropdown, setShowQualificationDropdown] = useState(false)
  const positionInputRef = useRef<HTMLInputElement>(null)
  const qualificationInputRef = useRef<HTMLInputElement>(null)

  const [agreementOpen, setAgreementOpen] = useState(false)
  const [agreementTeacher, setAgreementTeacher] = useState<Teacher | null>(null)
  const [newAgreementName, setNewAgreementName] = useState("")
  const [newAgreementCompany, setNewAgreementCompany] = useState("")
  const [newAgreementStart, setNewAgreementStart] = useState("")
  const [newAgreementEnd, setNewAgreementEnd] = useState("")
  const [agreementFiles, setAgreementFiles] = useState<{ name: string; size: number }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredTeachers = teachers.filter((teacher) => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      if (!teacher.name.toLowerCase().includes(term) && !teacher.workNo.toLowerCase().includes(term)) return false
    }
    if (statusFilter !== "all" && teacher.status !== statusFilter) return false
    if (facultyTab === "teacher" && teacher.isEnterpriseMentor) return false
    if (facultyTab === "mentor" && !teacher.isEnterpriseMentor) return false
    if (selectedDeptId) {
      const dept = orgTreeData.find(d => d.id === selectedDeptId)
      if (dept && teacher.department !== dept.name) return false
    }
    return true
  })

  const stats = {
    total: teachers.length,
    mentors: teachers.filter(t => t.isEnterpriseMentor).length,
    active: teachers.filter(t => t.status === "在职").length,
    companies: new Set(teachers.filter(t => t.isEnterpriseMentor && t.enterpriseInfo).map(t => t.enterpriseInfo!.company)).size,
  }

  const toggleStatus = (id: string) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, status: t.status === "在职" ? "离职" : "在职" } : t)))
  }

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id))
  }

  const resetPassword = (id: string) => {
    setTeachers((prev) => prev.map((item) => item.id === id ? { ...item } : item))
  }

  const openEditDialog = (teacher: Teacher | null) => {
    setSelectedTeacher(teacher)
    setEditRoles(teacher?.roles || [])
    setEditPositions(teacher?.positions || [])
    setEditTeachingQualifications(teacher?.teachingQualifications || [])
    setEditIsMentor(teacher?.isEnterpriseMentor || false)
    setEditEnterpriseCompany(teacher?.enterpriseInfo?.company || "")
    setEditEnterprisePosition(teacher?.enterpriseInfo?.position || "")
    setEditEnterpriseYears(teacher?.enterpriseInfo?.years || 0)
    setEditEnterpriseField(teacher?.enterpriseInfo?.field || "")
    setEditStatus(teacher?.status || "在职")
    setPositionSearchTerm("")
    setQualificationSearchTerm("")
    setIsDialogOpen(true)
  }

  const toggleRole = (role: string) => {
    setEditRoles(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role])
  }

  const toggleTeachingQualification = (qual: string) => {
    setEditTeachingQualifications(prev => prev.includes(qual) ? prev.filter(q => q !== qual) : [...prev, qual])
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

  const addQualification = (qual: string) => {
    if (!editTeachingQualifications.includes(qual)) {
      setEditTeachingQualifications([...editTeachingQualifications, qual])
    }
    setQualificationSearchTerm("")
    setShowQualificationDropdown(false)
  }

  const removeQualification = (qual: string) => {
    setEditTeachingQualifications(editTeachingQualifications.filter(q => q !== qual))
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (positionInputRef.current && !positionInputRef.current.contains(e.target as Node)) {
        setShowPositionDropdown(false)
      }
      if (qualificationInputRef.current && !qualificationInputRef.current.contains(e.target as Node)) {
        setShowQualificationDropdown(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const filteredPositions = allPositions.filter(p => p.includes(positionSearchTerm) && !editPositions.includes(p))
  const filteredQualifications = allTeachingQualifications.filter(q => q.includes(qualificationSearchTerm) && !editTeachingQualifications.includes(q))

  const openAgreementDialog = (teacher: Teacher) => {
    setAgreementTeacher(teacher)
    setNewAgreementName("")
    setNewAgreementCompany("")
    setNewAgreementStart("")
    setNewAgreementEnd("")
    setAgreementFiles([])
    setAgreementOpen(true)
  }

  return (
    <div className="p-6 bg-[#f5f7fa] min-h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">教职工管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">维护教师档案、授课资格与企业导师信息</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-1" />导入
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />导出
          </Button>
          <Button size="sm" onClick={() => openEditDialog(null)}>
            <Plus className="h-4 w-4 mr-1" />新建教师
          </Button>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="w-64 shrink-0 rounded-lg border border-gray-100 bg-white shadow-sm p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-1.5">
            <FolderTree className="h-4 w-4 text-primary" />组织架构
          </h3>
          <ScrollArea className="h-[500px]">
            <div className="space-y-1">
              <button
                onClick={() => setSelectedDeptId(null)}
                className={cn(
                  "w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors",
                  selectedDeptId === null ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
              >
                全部教职工
              </button>
              {orgTreeData.map(dept => (
                <DeptTreeNode
                  key={dept.id}
                  dept={dept}
                  selectedDeptId={selectedDeptId}
                  onSelectDept={setSelectedDeptId}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid gap-4 grid-cols-4">
            <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">教职工总数</p>
                <p className="text-xl font-bold">{stats.total}</p>
              </div>
              <div className="rounded-full p-2 bg-blue-500"><Users className="h-4 w-4 text-white" /></div>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">企业导师</p>
                <p className="text-xl font-bold">{stats.mentors}</p>
              </div>
              <div className="rounded-full p-2 bg-purple-500"><HardHat className="h-4 w-4 text-white" /></div>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">在职教师</p>
                <p className="text-xl font-bold">{stats.active}</p>
              </div>
              <div className="rounded-full p-2 bg-green-500"><GraduationCap className="h-4 w-4 text-white" /></div>
            </div>
            <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">涉及企业</p>
                <p className="text-xl font-bold">{stats.companies}</p>
              </div>
              <div className="rounded-full p-2 bg-amber-500"><Building2 className="h-4 w-4 text-white" /></div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-3">
            <Tabs value={facultyTab} onValueChange={(v) => setFacultyTab(v as typeof facultyTab)}>
              <TabsList>
                <TabsTrigger value="all">全部师资</TabsTrigger>
                <TabsTrigger value="teacher">普通教师</TabsTrigger>
                <TabsTrigger value="mentor">企业导师</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="搜索姓名或工号..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="全部状态" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部状态</SelectItem>
                  <SelectItem value="在职">在职</SelectItem>
                  <SelectItem value="离职">离职</SelectItem>
                  <SelectItem value="外聘">外聘</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />筛选
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>工号</TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead>所属院系</TableHead>
                  <TableHead>关联角色</TableHead>
                  <TableHead>职位</TableHead>
                  <TableHead>授课资格</TableHead>
                  <TableHead>企业导师</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id} className="border-border">
                    <TableCell className="font-mono text-sm">{teacher.workNo}</TableCell>
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.department}</TableCell>
                    <TableCell>
                      {teacher.roles.length > 0 ? (
                        <div className="flex gap-1 flex-wrap">
                          {teacher.roles.map((role, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{role}</Badge>
                          ))}
                        </div>
                      ) : <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell>
                      {teacher.positions.length > 0 ? (
                        <div className="flex gap-1 flex-wrap">
                          {teacher.positions.map((pos, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{pos}</Badge>
                          ))}
                        </div>
                      ) : <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell>
                      {teacher.teachingQualifications.length > 0
                        ? `${teacher.teachingQualifications.slice(0, 2).join("、")}${teacher.teachingQualifications.length > 2 ? ` 等${teacher.teachingQualifications.length}项` : ""}`
                        : <span className="text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell>
                      {teacher.isEnterpriseMentor ? (
                        <Badge variant="default" className="text-xs">是</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">否</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={teacher.status === "在职" ? "default" : "secondary"}>{teacher.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(teacher)}>编辑</Button>
                        <Button variant="ghost" size="sm" onClick={() => resetPassword(teacher.id)}>
                          <Lock className="h-3.5 w-3.5 mr-1" />重置密码
                        </Button>
                        {teacher.isEnterpriseMentor && (
                          <Button variant="ghost" size="sm" onClick={() => openAgreementDialog(teacher)}>
                            <Paperclip className="h-3.5 w-3.5 mr-1" />协议
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toggleStatus(teacher.id)}>
                              <Power className="mr-2 h-4 w-4" />
                              {teacher.status === "在职" ? "设为离职" : "设为在职"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteTeacher(teacher.id)} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />删除
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTeachers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground py-8">暂无数据</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="text-sm text-muted-foreground">共 {filteredTeachers.length} 条记录</div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTeacher ? "编辑教职工" : "新建教师"}</DialogTitle>
            <DialogDescription>填写教职工基本信息</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>姓名 <span className="text-destructive">*</span></Label>
                <Input placeholder="请输入姓名" defaultValue={selectedTeacher?.name} />
              </div>
              <div className="grid gap-2">
                <Label>工号 <span className="text-destructive">*</span></Label>
                <Input placeholder="如：T001" defaultValue={selectedTeacher?.workNo} />
              </div>
              <div className="grid gap-2">
                <Label>密码 <span className="text-destructive">*</span></Label>
                <Input type="password" placeholder="请输入密码" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>所属院系 <span className="text-destructive">*</span></Label>
                <Select defaultValue={selectedTeacher?.department}>
                  <SelectTrigger><SelectValue placeholder="选择院系" /></SelectTrigger>
                  <SelectContent>
                    {allDeptNames.map(name => (
                      <SelectItem key={name} value={name}>{name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>状态</Label>
                <Select value={editStatus} onValueChange={setEditStatus}>
                  <SelectTrigger><SelectValue placeholder="选择状态" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="在职">在职</SelectItem>
                    <SelectItem value="离职">离职</SelectItem>
                    <SelectItem value="外聘">外聘</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>关联角色（可多选）</Label>
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

            <div className="grid gap-2">
              <Label>职位（可多选）</Label>
              <div className="border rounded-md p-2 min-h-[60px]">
                <div className="flex flex-wrap gap-1 mb-2">
                  {editPositions.map(pos => (
                    <Badge key={pos} variant="secondary" className="gap-1 pr-1">
                      {pos}
                      <button type="button" onClick={() => removePosition(pos)} className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="relative" ref={positionInputRef}>
                  <Input
                    placeholder="搜索职位..."
                    value={positionSearchTerm}
                    onChange={(e) => { setPositionSearchTerm(e.target.value); setShowPositionDropdown(true) }}
                    onFocus={() => setShowPositionDropdown(true)}
                    className="h-8 text-sm"
                  />
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

            <div className="grid gap-2">
              <Label>授课资格（可多选）</Label>
              <div className="border rounded-md p-2 min-h-[60px]">
                <div className="flex flex-wrap gap-1 mb-2">
                  {editTeachingQualifications.map(qual => (
                    <Badge key={qual} variant="outline" className="gap-1 pr-1 bg-blue-50">
                      {qual}
                      <button type="button" onClick={() => removeQualification(qual)} className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="relative" ref={qualificationInputRef}>
                  <Input
                    placeholder="搜索授课资格..."
                    value={qualificationSearchTerm}
                    onChange={(e) => { setQualificationSearchTerm(e.target.value); setShowQualificationDropdown(true) }}
                    onFocus={() => setShowQualificationDropdown(true)}
                    className="h-8 text-sm"
                  />
                  {showQualificationDropdown && filteredQualifications.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                      {filteredQualifications.map(qual => (
                        <button
                          key={qual}
                          type="button"
                          onClick={() => addQualification(qual)}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          {qual}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 border rounded-md bg-muted/30">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editIsMentor}
                  onChange={(e) => setEditIsMentor(e.target.checked)}
                  className="h-4 w-4"
                />
                <Label className="cursor-pointer">企业导师</Label>
              </div>
              {editIsMentor && (
                <div className="flex-1 grid grid-cols-4 gap-2">
                  <Input placeholder="企业名称" value={editEnterpriseCompany} onChange={(e) => setEditEnterpriseCompany(e.target.value)} className="h-8 text-sm" />
                  <Input placeholder="职位" value={editEnterprisePosition} onChange={(e) => setEditEnterprisePosition(e.target.value)} className="h-8 text-sm" />
                  <Input type="number" placeholder="年限" value={editEnterpriseYears || ""} onChange={(e) => setEditEnterpriseYears(Number(e.target.value))} className="h-8 text-sm" />
                  <Input placeholder="领域" value={editEnterpriseField} onChange={(e) => setEditEnterpriseField(e.target.value)} className="h-8 text-sm" />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>取消</Button>
            <Button onClick={() => setIsDialogOpen(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={agreementOpen} onOpenChange={setAgreementOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>补充协议管理 — {agreementTeacher?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {agreementTeacher?.agreements && agreementTeacher.agreements.length > 0 ? (
              <div className="space-y-2">
                {agreementTeacher.agreements.map((ag) => (
                  <div key={ag.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="space-y-0.5">
                      <div className="font-medium text-sm">{ag.name}</div>
                      <div className="text-xs text-muted-foreground">{ag.company} · {ag.startDate} 至 {ag.endDate}</div>
                    </div>
                    <Badge variant={ag.status === "有效" ? "default" : "secondary"}>{ag.status}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-4 text-sm">暂无补充协议</div>
            )}
            <div className="border-t pt-4 space-y-3">
              <div className="text-sm font-medium">新增协议</div>
              <div className="space-y-2"><Label>协议名称</Label><Input value={newAgreementName} onChange={(e) => setNewAgreementName(e.target.value)} placeholder="请输入协议名称" /></div>
              <div className="space-y-2"><Label>合作企业</Label><Input value={newAgreementCompany} onChange={(e) => setNewAgreementCompany(e.target.value)} placeholder="请输入合作企业" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>开始日期</Label><Input type="date" value={newAgreementStart} onChange={(e) => setNewAgreementStart(e.target.value)} /></div>
                <div className="space-y-2"><Label>结束日期</Label><Input type="date" value={newAgreementEnd} onChange={(e) => setNewAgreementEnd(e.target.value)} /></div>
              </div>
              <div className="space-y-2">
                <Label>附件</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    if (files.length === 0) return
                    const newFiles = files.map((f) => ({ name: f.name, size: f.size }))
                    setAgreementFiles((prev) => [...prev, ...newFiles])
                    if (fileInputRef.current) fileInputRef.current.value = ""
                  }}
                />
                <Button variant="outline" size="sm" className="w-full gap-1" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4" />本地上传附件
                </Button>
                {agreementFiles.length > 0 && (
                  <div className="space-y-1.5">
                    {agreementFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between px-2.5 py-1.5 rounded-md border text-sm">
                        <div className="flex items-center gap-2 min-w-0">
                          <Paperclip className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span className="truncate">{file.name}</span>
                          <span className="text-xs text-muted-foreground shrink-0">{(file.size / 1024).toFixed(1)} KB</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => setAgreementFiles((prev) => prev.filter((_, i) => i !== idx))}>
                          <Trash2 className="h-3.5 w-3.5 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button className="w-full" onClick={() => setAgreementOpen(false)}>添加协议</Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAgreementOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function DeptTreeNode({
  dept,
  selectedDeptId,
  onSelectDept,
}: {
  dept: OrgDeptNode
  selectedDeptId: string | null
  onSelectDept: (id: string | null) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button className="flex items-center w-full px-2 py-1.5 text-sm rounded-md hover:bg-muted transition-colors">
          {open ? <ChevronDown className="h-3.5 w-3.5 mr-1 shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 mr-1 shrink-0" />}
          <span
            className="truncate flex-1 cursor-pointer"
            onClick={(e) => { e.stopPropagation(); onSelectDept(dept.id) }}
          >
            {dept.name}
          </span>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ml-4 space-y-1">
          {dept.majors.map(major => (
            <div key={major.id} className="text-xs text-muted-foreground px-2 py-1 truncate">{major.name}</div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
