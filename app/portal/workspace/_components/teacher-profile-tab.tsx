"use client"

import { useState, useRef } from "react"
import {
  Bell, Lock, Mail, Phone, Save, Shield, Smartphone, User,
  BookOpen, Briefcase, MapPin, Calendar, GraduationCap, Star,
  Image, FileText, Plus, X, Upload, Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  })

  const [skills, setSkills] = useState(["路由交换", "网络安全", "Linux系统管理", "云计算", "网络工程实训"])
  const [skillInput, setSkillInput] = useState("")

  const [materials, setMaterials] = useState<{ id: string; name: string; fileName: string; fileSize: string }[]>([])
  const [materialName, setMaterialName] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !materialName.trim()) return
    const size = file.size < 1024 * 1024
      ? `${(file.size / 1024).toFixed(1)} KB`
      : `${(file.size / 1024 / 1024).toFixed(1)} MB`
    setMaterials([...materials, {
      id: Date.now().toString(),
      name: materialName.trim(),
      fileName: file.name,
      fileSize: size,
    }])
    setMaterialName("")
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
                <p className="text-sm text-gray-500">
                  {mockTeacherInfo.title} · {mockTeacherInfo.department}
                </p>
                <Button variant="outline" size="sm" className="mt-2 text-xs border-gray-200 text-gray-700 hover:bg-gray-50">
                  <Image className="w-3.5 h-3.5 mr-1" />
                  更换头像
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              {/* 基础信息 */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-500" />
                  基础信息
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">姓名</Label>
                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-white border-gray-200 h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">性别</Label>
                    <Select value={formData.gender} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                      <SelectTrigger className="bg-white border-gray-200 h-9"><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="男">男</SelectItem><SelectItem value="女">女</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">年龄</Label>
                    <Input value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} className="bg-white border-gray-200 h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">工号</Label>
                    <Input value={formData.teacherNo} disabled className="bg-gray-50 border-gray-200 h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">手机号</Label>
                    <Input value={formData.phone} className="bg-white border-gray-200 h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">所在城市</Label>
                    <Input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="bg-white border-gray-200 h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">职称/职务</Label>
                    <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="bg-white border-gray-200 h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">现任岗位/负责人</Label>
                    <Input value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="bg-white border-gray-200 h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">工作年限</Label>
                    <Input value={formData.workYears} onChange={(e) => setFormData({ ...formData, workYears: e.target.value })} className="bg-white border-gray-200 h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">教育背景</Label>
                    <Input value={formData.education} onChange={(e) => setFormData({ ...formData, education: e.target.value })} className="bg-white border-gray-200 h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">研究/擅长领域</Label>
                    <Input value={formData.researchAreas} onChange={(e) => setFormData({ ...formData, researchAreas: e.target.value })} className="bg-white border-gray-200 h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">业务方向/服务领域</Label>
                    <Input value={formData.businessDirection} onChange={(e) => setFormData({ ...formData, businessDirection: e.target.value })} className="bg-white border-gray-200 h-9" />
                  </div>
                </div>
              </div>

              {/* 教师照片与擅长领域 */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Image className="w-4 h-4 text-blue-500" />
                  教师照片与擅长领域
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">上传头像</Label>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 bg-gray-50/50">
                      <Avatar className="w-12 h-12 ring-2 ring-white">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold">{mockTeacherInfo.avatar}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="text-xs border-gray-200"><Upload className="w-3.5 h-3.5 mr-1" />选择文件</Button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">上传封面</Label>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed border-gray-300 bg-gray-50/50">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-400">
                        <Image className="w-5 h-5" />
                      </div>
                      <Button variant="outline" size="sm" className="text-xs border-gray-200"><Upload className="w-3.5 h-3.5 mr-1" />选择文件</Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-500">擅长领域</Label>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {skills.map((s, i) => (
                      <Badge key={i} variant="secondary" className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200">
                        {s}
                        <button onClick={() => setSkills(skills.filter((_, j) => j !== i))} className="ml-1.5 text-blue-400 hover:text-blue-600">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="输入擅长领域" className="bg-white border-gray-200 h-9 flex-1" />
                    <Button size="sm" variant="outline" className="h-9 text-xs" onClick={() => { if (skillInput.trim() && !skills.includes(skillInput.trim())) { setSkills([...skills, skillInput.trim()]); setSkillInput("") } }}>
                      <Plus className="w-3.5 h-3.5 mr-1" />添加
                    </Button>
                  </div>
                </div>
              </div>

              {/* 教师简介 */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-blue-500" />
                  教师简介
                </h4>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="bg-white border-gray-200 resize-none"
                  placeholder="请填写教师简介..."
                />
              </div>

              {/* 从业经历 */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-500" />
                  从业经历
                </h4>
                <Textarea
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  rows={5}
                  className="bg-white border-gray-200 resize-none font-mono text-xs"
                  placeholder="请填写从业经历..."
                />
              </div>

              {/* 资质荣誉 */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  资质荣誉（佐证材料）
                </h4>
                <div className="space-y-3 mb-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-gray-500">材料名称</Label>
                    <Input
                      value={materialName}
                      onChange={(e) => setMaterialName(e.target.value)}
                      placeholder="请输入材料名称，如：教师资格证、优秀教师奖状"
                      className="bg-white border-gray-200 h-9"
                    />
                  </div>
                  <div
                    className="flex items-center gap-3 p-4 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 cursor-pointer hover:bg-gray-100/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">拖拽文件到此处，或点击上传</p>
                      <p className="text-xs text-gray-400">支持 PDF、JPG、PNG 格式，单个文件不超过 10MB</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs border-gray-200 pointer-events-none">
                      <Upload className="w-3.5 h-3.5 mr-1" />选择文件
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </div>
                </div>
                {materials.length > 0 && (
                  <div className="space-y-2">
                    {materials.map((m) => (
                      <div key={m.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white">
                        <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{m.name}</p>
                          <p className="text-xs text-gray-400 truncate">{m.fileName} · {m.fileSize}</p>
                        </div>
                        <button
                          onClick={() => removeMaterial(m.id)}
                          className="p-1 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
