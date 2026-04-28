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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, MoreHorizontal, Pencil, Power, Trash2, Search, Filter, Store } from "lucide-react"

interface Enterprise {
  id: string
  name: string
  creditCode: string
  location: string
  industry: string
  status: "active" | "inactive"
  showInBrandHall: boolean
}

const mockEnterprises: Enterprise[] = [
  {
    id: "1",
    name: "华为技术有限公司",
    creditCode: "91440300100299999Q",
    location: "广东省深圳市",
    industry: "信息技术",
    status: "active",
    showInBrandHall: true,
  },
  {
    id: "2",
    name: "阿里巴巴集团",
    creditCode: "91330100599385888X",
    location: "浙江省杭州市",
    industry: "电子商务",
    status: "active",
    showInBrandHall: true,
  },
  {
    id: "3",
    name: "腾讯科技",
    creditCode: "91440300708461136T",
    location: "广东省深圳市",
    industry: "信息技术",
    status: "active",
    showInBrandHall: true,
  },
  {
    id: "4",
    name: "字节跳动",
    creditCode: "91110105MA001GPD1G",
    location: "北京市",
    industry: "信息技术",
    status: "inactive",
    showInBrandHall: false,
  },
  {
    id: "5",
    name: "京东集团",
    creditCode: "91110000802100433B",
    location: "北京市",
    industry: "电子商务",
    status: "active",
    showInBrandHall: false,
  },
]

export default function EnterprisesPage() {
  const [enterprises, setEnterprises] = useState<Enterprise[]>(mockEnterprises)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEnterprise, setEditingEnterprise] = useState<Enterprise | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showInBrandHall, setShowInBrandHall] = useState<string>("no")

  const filteredEnterprises = enterprises.filter(
    (ent) =>
      ent.name.includes(searchTerm) ||
      ent.creditCode.includes(searchTerm) ||
      ent.location.includes(searchTerm)
  )

  const toggleStatus = (id: string) => {
    setEnterprises((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: e.status === "active" ? "inactive" : "active" } : e
      )
    )
  }

  const handleDelete = (id: string) => {
    setEnterprises((prev) => prev.filter((e) => e.id !== id))
  }

  const handleEdit = (enterprise: Enterprise) => {
    setEditingEnterprise(enterprise)
    setShowInBrandHall(enterprise.showInBrandHall ? "yes" : "no")
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    setEditingEnterprise(null)
    setShowInBrandHall("no")
    setIsDialogOpen(true)
  }

  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "企业管理" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">企业管理</h1>
            <p className="mt-1 text-sm text-muted-foreground">管理合作企业信息</p>
          </div>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            新增企业
          </Button>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索企业名称、信用代码或地点..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            筛选
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">企业名称</TableHead>
                <TableHead className="text-muted-foreground">统一社会信用代码</TableHead>
                <TableHead className="text-muted-foreground">地点</TableHead>
                <TableHead className="text-muted-foreground">行业</TableHead>
                <TableHead className="text-muted-foreground">品牌馆展示</TableHead>
                <TableHead className="text-muted-foreground">状态</TableHead>
                <TableHead className="text-muted-foreground text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnterprises.map((enterprise) => (
                <TableRow key={enterprise.id} className="border-border">
                  <TableCell className="font-medium">{enterprise.name}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {enterprise.creditCode}
                  </TableCell>
                  <TableCell>{enterprise.location}</TableCell>
                  <TableCell>{enterprise.industry}</TableCell>
                  <TableCell>
                    {enterprise.showInBrandHall ? (
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 gap-1">
                        <Store className="h-3 w-3" />
                        是
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-muted text-muted-foreground">
                        否
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={enterprise.status === "active" ? "default" : "secondary"}
                      className={
                        enterprise.status === "active"
                          ? "bg-primary/20 text-primary hover:bg-primary/30"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {enterprise.status === "active" ? "启用" : "停用"}
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
                        <DropdownMenuItem onClick={() => handleEdit(enterprise)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleStatus(enterprise.id)}>
                          <Power className="mr-2 h-4 w-4" />
                          {enterprise.status === "active" ? "停用" : "启用"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(enterprise.id)}
                          className="text-destructive"
                        >
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

        <div className="mt-4 text-sm text-muted-foreground">
          共 {filteredEnterprises.length} 条记录
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingEnterprise ? "编辑企业" : "新增企业"}</DialogTitle>
            <DialogDescription>
              {editingEnterprise ? "修改企业信息" : "创建新的合作企业"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">企业名称</Label>
              <Input
                id="name"
                placeholder="如：华为技术有限公司"
                defaultValue={editingEnterprise?.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="creditCode">统一社会信用代码</Label>
              <Input
                id="creditCode"
                placeholder="18位统一社会信用代码"
                defaultValue={editingEnterprise?.creditCode}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">地点</Label>
              <Input
                id="location"
                placeholder="如：广东省深圳市"
                defaultValue={editingEnterprise?.location}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="industry">行业</Label>
              <Select defaultValue={editingEnterprise?.industry}>
                <SelectTrigger>
                  <SelectValue placeholder="选择行业" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="信息技术">信息技术</SelectItem>
                  <SelectItem value="电子商务">电子商务</SelectItem>
                  <SelectItem value="金融服务">金融服务</SelectItem>
                  <SelectItem value="制造业">制造业</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>是否品牌馆展示</Label>
              <RadioGroup
                value={showInBrandHall}
                onValueChange={setShowInBrandHall}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="brandHall-yes" />
                  <label htmlFor="brandHall-yes" className="text-sm cursor-pointer">
                    是
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="brandHall-no" />
                  <label htmlFor="brandHall-no" className="text-sm cursor-pointer">
                    否
                  </label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground">
                选择"是"后，该企业将在品牌馆页面展示
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {editingEnterprise ? "保存" : "创建"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
