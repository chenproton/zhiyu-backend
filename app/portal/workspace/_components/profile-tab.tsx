"use client"

import { useState } from "react"
import {
  Bell, Lock, Mail, Phone, Save, Shield, Smartphone, User,
  BookOpen, Calendar, MapPin, Award, FileText, Users, Star, Heart,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionCard } from "./section-card"
import { mockStudentInfo } from "../_data/mock-student-data"

export function ProfileTab() {
  const [formData, setFormData] = useState({
    name: mockStudentInfo.name,
    studentNo: mockStudentInfo.studentNo,
    phone: "138****8888",
    email: "liming@example.edu.cn",
    major: mockStudentInfo.major,
    className: mockStudentInfo.className,
  })

  const [notifications, setNotifications] = useState({
    course: true,
    exam: true,
    scene: true,
    position: false,
    system: true,
    email: true,
    sms: false,
  })

  const securityItems = [
    { label: "登录密码", status: "strong", statusText: "安全强度：高", action: "修改", icon: Lock },
    { label: "手机绑定", status: "bound", statusText: "138****8888", action: "更换", icon: Smartphone },
    { label: "邮箱绑定", status: "bound", statusText: "已绑定", action: "更换", icon: Mail },
    { label: "微信绑定", status: "unbound", statusText: "未绑定", action: "绑定", icon: Phone },
  ]

  return (
    <div className="space-y-5">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="h-9 bg-white border border-gray-100 shadow-sm mb-4 p-1">
          <TabsTrigger value="profile" className="text-sm px-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            个人资料
          </TabsTrigger>
          <TabsTrigger value="archive" className="text-sm px-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            学生档案
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
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-blue-600 text-white text-2xl font-bold">
                  {mockStudentInfo.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{mockStudentInfo.name}</h3>
                <p className="text-sm text-gray-500">
                  {mockStudentInfo.grade} · {mockStudentInfo.major}
                </p>
                <Button variant="outline" size="sm" className="mt-2 text-xs border-gray-200 text-gray-700 hover:bg-gray-50">
                  更换头像
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">姓名</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white border-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentNo" className="text-gray-700">学号</Label>
                <Input id="studentNo" value={formData.studentNo} disabled className="bg-gray-50 border-gray-100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">手机号</Label>
                <Input id="phone" value={formData.phone} className="bg-white border-gray-100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">邮箱</Label>
                <Input id="email" value={formData.email} className="bg-white border-gray-100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="major" className="text-gray-700">专业</Label>
                <Input id="major" value={formData.major} className="bg-white border-gray-100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="className" className="text-gray-700">班级</Label>
                <Input id="className" value={formData.className} className="bg-white border-gray-100" />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-1" />
                保存修改
              </Button>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="archive" className="mt-0">
          <SectionCard title="学生档案" icon={FileText} iconColor="purple">
            <div className="space-y-6">
              {/* 基本信息 */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-500" />
                  基本信息
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1"><Label className="text-xs text-gray-500">姓名</Label><p className="text-sm font-medium text-gray-900">李明</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">学号</Label><p className="text-sm font-medium text-gray-900">2024010101</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">性别</Label><p className="text-sm font-medium text-gray-900">男</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">出生年月</Label><p className="text-sm font-medium text-gray-900">2006年5月</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">民族</Label><p className="text-sm font-medium text-gray-900">汉族</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">政治面貌</Label><p className="text-sm font-medium text-gray-900">共青团员</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">籍贯</Label><p className="text-sm font-medium text-gray-900">浙江省杭州市</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">身份证号</Label><p className="text-sm font-medium text-gray-900">330106200605******</p></div>
                </div>
              </div>

              {/* 学籍信息 */}
              <div className="border-t border-gray-100 pt-5">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-500" />
                  学籍信息
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1"><Label className="text-xs text-gray-500">专业</Label><p className="text-sm font-medium text-gray-900">计算机网络技术</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">班级</Label><p className="text-sm font-medium text-gray-900">计网2401班</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">年级</Label><p className="text-sm font-medium text-gray-900">2024级</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">学制</Label><p className="text-sm font-medium text-gray-900">三年制</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">辅导员</Label><p className="text-sm font-medium text-gray-900">周老师</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">入学日期</Label><p className="text-sm font-medium text-gray-900">2024年9月1日</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">预计毕业</Label><p className="text-sm font-medium text-gray-900">2027年6月</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">培养层次</Label><p className="text-sm font-medium text-gray-900">高职（专科）</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">学籍状态</Label><p className="text-sm"><Badge className="bg-emerald-100 text-emerald-700">在读</Badge></p></div>
                </div>
              </div>

              {/* 联系方式 */}
              <div className="border-t border-gray-100 pt-5">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  联系方式
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1"><Label className="text-xs text-gray-500">手机号</Label><p className="text-sm font-medium text-gray-900">138****8888</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">邮箱</Label><p className="text-sm font-medium text-gray-900">liming@example.edu.cn</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">家庭住址</Label><p className="text-sm font-medium text-gray-900">浙江省杭州市西湖区文三路XX号</p></div>
                  <div className="space-y-1"><Label className="text-xs text-gray-500">紧急联系人</Label><p className="text-sm font-medium text-gray-900">李国强（父亲）· 139****6789</p></div>
                </div>
              </div>

              {/* 荣誉与证书 */}
              <div className="border-t border-gray-100 pt-5">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-500" />
                  荣誉与证书
                </h4>
                <div className="space-y-2">
                  {[
                    { name: "国家励志奖学金", issuer: "教育部", date: "2025-11", icon: Star },
                    { name: "三好学生", issuer: "学校教务处", date: "2025-09", icon: Star },
                    { name: "全国职业技能大赛省赛二等奖", issuer: "省教育厅", date: "2026-03", icon: Award },
                    { name: "华为HCIA-Datacom认证", issuer: "华为技术有限公司", date: "2025-12", icon: BookOpen },
                    { name: "大学英语四级证书", issuer: "教育部考试中心", date: "2025-06", icon: BookOpen },
                  ].map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white">
                        <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.issuer} · {item.date}</p>
                        </div>
                        <Badge variant="outline" className="text-[10px] border-amber-200 text-amber-600 bg-amber-50/50">已获得</Badge>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 在校经历 */}
              <div className="border-t border-gray-100 pt-5">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  在校经历
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">学生会 · 信息技术部部长</p>
                      <p className="text-xs text-gray-500">2025-2026学年 · 负责学生会信息化建设与运维</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      <Heart className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">志愿者 · 校园网义诊活动</p>
                      <p className="text-xs text-gray-500">2025-10 · 为师生提供网络故障排查与修复服务</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Save className="w-4 h-4 mr-1" />
                导出档案
              </Button>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="security" className="mt-0">
          <SectionCard title="账号安全" icon={Shield} iconColor="rose">
            <div className="space-y-3">
              {securityItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <p
                          className={`text-xs ${
                            item.status === "strong" || item.status === "bound"
                              ? "text-emerald-600"
                              : "text-gray-400"
                          }`}
                        >
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
                建议定期修改登录密码，开启二次验证，不要在公共设备上保存登录状态。
              </p>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <SectionCard title="通知偏好" icon={Bell} iconColor="amber">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">学习通知</h4>
                <div className="space-y-3">
                  {[
                    { key: "course", label: "课程任务提醒", desc: "当有新的课程任务或作业截止时通知我" },
                    { key: "exam", label: "考试测评提醒", desc: "当有新的考试安排或成绩发布时通知我" },
                    { key: "scene", label: "场景任务提醒", desc: "当有新的场景任务或评分反馈时通知我" },
                    { key: "position", label: "岗位推荐通知", desc: "当有匹配岗位或招聘活动上线时通知我" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <div>
                        <p className="text-sm text-gray-900 font-medium">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, [item.key]: checked })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">通知渠道</h4>
                <div className="space-y-3">
                  {[
                    { key: "system", label: "站内消息", desc: "在工作台消息中心接收通知" },
                    { key: "email", label: "邮件通知", desc: "发送通知到绑定邮箱" },
                    { key: "sms", label: "短信通知", desc: "发送通知到绑定手机" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                      <div>
                        <p className="text-sm text-gray-900 font-medium">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, [item.key]: checked })
                        }
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
