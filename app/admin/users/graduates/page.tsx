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
import { Input } from "@/components/ui/input"
import { Search, Filter, Download } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Graduate {
  id: string
  name: string
  studentId: string
  idCard: string
  graduateYear: string
  originalClass: string
  oauth: string[]
}

const mockGraduates: Graduate[] = [
  {
    id: "1",
    name: "陈一",
    studentId: "S2020001",
    idCard: "110***********1111",
    graduateYear: "2024",
    originalClass: "2020级软件1班",
    oauth: ["微信"],
  },
  {
    id: "2",
    name: "周二",
    studentId: "S2020002",
    idCard: "310***********2222",
    graduateYear: "2024",
    originalClass: "2020级软件1班",
    oauth: ["微信", "钉钉"],
  },
  {
    id: "3",
    name: "吴三",
    studentId: "S2020003",
    idCard: "440***********3333",
    graduateYear: "2024",
    originalClass: "2020级软件2班",
    oauth: [],
  },
  {
    id: "4",
    name: "郑四",
    studentId: "S2019001",
    idCard: "330***********4444",
    graduateYear: "2023",
    originalClass: "2019级会计班",
    oauth: ["飞书"],
  },
  {
    id: "5",
    name: "王五",
    studentId: "S2019002",
    idCard: "320***********5555",
    graduateYear: "2023",
    originalClass: "2019级会计班",
    oauth: ["微信"],
  },
]

export default function GraduatesPage() {
  const [graduates] = useState<Graduate[]>(mockGraduates)
  const [searchTerm, setSearchTerm] = useState("")
  const [yearFilter, setYearFilter] = useState<string>("all")

  const filteredGraduates = graduates.filter((graduate) => {
    const matchesSearch =
      graduate.name.includes(searchTerm) ||
      graduate.studentId.includes(searchTerm) ||
      graduate.originalClass.includes(searchTerm)
    const matchesYear = yearFilter === "all" || graduate.graduateYear === yearFilter
    return matchesSearch && matchesYear
  })

  const years = [...new Set(graduates.map((g) => g.graduateYear))].sort().reverse()

  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "用户与账户管理", href: "/admin/users" },
          { label: "毕业学生管理" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">毕业学生管理</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              管理已毕业学生的数据归档
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            导出
          </Button>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索姓名、学号或班级..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="毕业年份" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部年份</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}届
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            更多筛选
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">姓名</TableHead>
                <TableHead className="text-muted-foreground">学号</TableHead>
                <TableHead className="text-muted-foreground">身份证号</TableHead>
                <TableHead className="text-muted-foreground">毕业年份</TableHead>
                <TableHead className="text-muted-foreground">原班级</TableHead>
                <TableHead className="text-muted-foreground">OAuth对接</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGraduates.map((graduate) => (
                <TableRow key={graduate.id} className="border-border">
                  <TableCell className="font-medium">{graduate.name}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {graduate.studentId}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {graduate.idCard}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{graduate.graduateYear}届</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {graduate.originalClass}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {graduate.oauth.length > 0 ? (
                        graduate.oauth.map((o) => (
                          <Badge key={o} variant="outline" className="text-xs">
                            {o}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>共 {filteredGraduates.length} 条记录</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              上一页
            </Button>
            <span className="px-2">1 / 1</span>
            <Button variant="outline" size="sm" disabled>
              下一页
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
