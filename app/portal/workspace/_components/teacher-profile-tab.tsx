"use client"

import { useState } from "react"
import {
  Bell, Lock, Mail, Phone, Save, Shield, Smartphone, User,
  Eye, EyeOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog"
import { SectionCard } from "./section-card"
import { mockTeacherInfo, teacherSecurityItems } from "../_data/mock-teacher-data"

export function TeacherProfileTab() {
  const [formData, setFormData] = useState({
    name: mockTeacherInfo.name,
    teacherNo: mockTeacherInfo.teacherNo,
    phone: "138****6666",
    email: "zhang@example.edu.cn",
    department: mockTeacherInfo.department,
    title: mockTeacherInfo.title,
    gender: "男",
    age: "42",
    city: "北京市",
    position: "网络技术专业负责人",
    workYears: "18",
    education: "博士研究生 · 北京邮电大学",
    researchAreas: "网络架构、网络安全、云计算技术",
    businessDirection: "计算机网络技术专业建设、校企合作实训基地建设",
    bio: "从事计算机网络技术教学与研究18年，主持完成省部级教改项目3项，发表学术论文20余篇。多次指导学生参加全国职业技能大赛获一等奖。",
    experience: "2006-2010  华为技术有限公司  网络工程师\n2010-2015  北京邮电大学  讲师\n2015-至今   本校计算机学院  教授 / 网络技术专业负责人",
    status: "在职",
    roles: ["教师", "专业负责人"],
  })

  const [skills, setSkills] = useState(["路由交换", "网络安全", "Linux系统管理", "云计算", "网络工程实训"])
  const [skillInput, setSkillInput] = useState("")

  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  interface Material { id: string; name: string; fileName: string; fileSize: string }

  const [materials, setMaterials] = useState<Material[]>([])

  const addMaterial = () => {
    setMaterials([...materials, { id: Date.now().toString(), name: "", fileName: "", fileSize: "" }])
  }

  const updateMaterialName = (id: string, name: string) => {
    setMaterials(materials.map((m) => (m.id === id ? { ...m, name } : m)))
  }

  const handleFileSelect = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const size = file.size < 1024 * 1024
      ? `${(file.size / 1024).toFixed(1)} KB`
      : `${(file.size / 1024 / 1024).toFixed(1)} MB`
    setMaterials(materials.map((m) =>
      m.id === id ? { ...m, fileName: file.name, fileSize: size } : m
    ))
    e.target.value = ""
  }

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter((m) => m.id !== id))
  }

  const [notifications, setNotifications] = useState({
    course: true,
    exam: true,
    teaching: true,
    system: true,
    email: true,
    sms: false,
  })

  return (
    <div className="space-y-5">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="h-9 bg-white border border-gray-100 shadow-sm mb-4 p-1">
          <TabsTrigger value="profile" className="text-sm px-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            个人资料
          </TabsTrigger>
          <TabsTrigger value="security" className="text-sm px-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            账号安全
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-sm px-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            通知偏好
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0">
          <SectionCard title="个人资料" icon={User} iconColor="blue">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
              <Avatar className="w-20 h-20 ring-4 ring-white shadow-md">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl font-bold">
                  {mockTeacherInfo.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{mockTeacherInfo.name}</h3>
                <p className="text-sm text-gray-500">{mockTeacherInfo.department}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-500">姓名</Label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-white border-gray-200 h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-500">工号</Label>
                  <Input value={formData.teacherNo} disabled className="bg-gray-50 border-gray-200 h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-500">所属部门</Label>
                  <Input value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="bg-white border-gray-200 h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-500">状态</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                    <SelectTrigger className="bg-white border-gray-200 h-9"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="在职">在职</SelectItem>
                      <SelectItem value="离职">离职</SelectItem>
                      <SelectItem value="外聘">外聘</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-500">职位</Label>
                  <Input value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="bg-white border-gray-200 h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-500">关联角色</Label>
                  <div className="flex items-center gap-1.5 flex-wrap min-h-[36px]">
                    {formData.roles.map((role) => (
                      <Badge key={role} variant="secondary" className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5 md:col-span-2 lg:col-span-3">
                  <Label className="text-xs text-gray-500">密码</Label>
                  <div className="flex items-center gap-2">
                    <Input type="password" value="********" disabled className="bg-gray-50 border-gray-200 h-9 flex-1" />
                    <Button variant="outline" size="sm" className="h-9 text-xs border-gray-200 text-gray-700 hover:bg-gray-50" onClick={() => setPasswordDialogOpen(true)}>
                      修改密码
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-1" />
                保存修改
              </Button>
            </div>
          </SectionCard>
        </TabsContent>

        <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>修改密码</DialogTitle>
              <DialogDescription>请输入新密码，修改后将需要重新登录。</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label className="text-xs text-gray-500">新密码</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="请输入新密码"
                    className="bg-white border-gray-200 h-9 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Button variant="outline" size="sm" className="h-9 text-xs" onClick={() => setPasswordDialogOpen(false)}>取消</Button>
              <Button size="sm" className="h-9 text-xs bg-blue-600 hover:bg-blue-700" onClick={() => setPasswordDialogOpen(false)}>确认修改</Button>
            </div>
          </DialogContent>
        </Dialog>

        <TabsContent value="security" className="mt-0">
          <SectionCard title="账号安全" icon={Shield} iconColor="rose">
            <div className="space-y-3">
              {teacherSecurityItems.map((item, index) => {
                const Icon = [Lock, Smartphone, Mail, Phone][index]
                return (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <p className={`text-xs ${item.status === "strong" || item.status === "bound" ? "text-emerald-600" : "text-gray-400"}`}>
                          {item.statusText}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs border-gray-200 text-gray-700 hover:bg-gray-50">
                      {item.action}
                    </Button>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-100">
              <p className="text-sm text-gray-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-rose-500" />
                <strong>安全建议</strong>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                建议定期修改登录密码，教师账号涉及成绩管理等敏感操作，请务必确保账号安全。
              </p>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <SectionCard title="通知偏好" icon={Bell} iconColor="amber">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">教学通知</h4>
                <div className="space-y-3">
                  {[
                    { key: "course", label: "课程动态提醒", desc: "当学生提交作业或课程有新进展时通知我" },
                    { key: "exam", label: "考试与成绩提醒", desc: "当考试安排变动或成绩需要录入时通知我" },
                    { key: "teaching", label: "教学管理通知", desc: "当有新的教学安排、教务通知时通知我" },
                    { key: "system", label: "系统维护通知", desc: "当系统有更新维护时有新通知时提醒" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <div>
                        <p className="text-sm text-gray-900 font-medium">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">通知渠道</h4>
                <div className="space-y-3">
                  {[
                    { key: "email", label: "邮件通知", desc: "发送通知到绑定邮箱" },
                    { key: "sms", label: "短信通知", desc: "发送通知到绑定手机（紧急事项）" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <div>
                        <p className="text-sm text-gray-900 font-medium">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}
