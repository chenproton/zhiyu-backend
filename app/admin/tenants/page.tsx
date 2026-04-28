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
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Power,
  Trash2,
  Search,
  Filter,
  Shield,
  Settings,
} from "lucide-react"

interface Tenant {
  id: string
  code: string
  name: string
  admin: string
  region: string
  status: "active" | "inactive"
  createdAt: string
}

// 机构码配置
const INSTITUTION_CODE = "QHDX"
let tenantCounter = 5

const mockTenants: Tenant[] = [
  {
    id: "1",
    code: "QHDX0001",
    name: "清华大学",
    admin: "张三",
    region: "北京市",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    code: "QHDX0002",
    name: "北京大学",
    admin: "李四",
    region: "北京市",
    status: "active",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    code: "QHDX0003",
    name: "复旦大学",
    admin: "王五",
    region: "上海市",
    status: "inactive",
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    code: "QHDX0004",
    name: "浙江大学",
    admin: "赵六",
    region: "浙江省",
    status: "active",
    createdAt: "2024-04-05",
  },
  {
    id: "5",
    code: "QHDX0005",
    name: "南京大学",
    admin: "钱七",
    region: "江苏省",
    status: "active",
    createdAt: "2024-05-12",
  },
]

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants)
  const [institutionCode, setInstitutionCode] = useState(INSTITUTION_CODE)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTenants = tenants.filter(
    (tenant) =>
      tenant.name.includes(searchTerm) ||
      tenant.code.includes(searchTerm) ||
      tenant.admin.includes(searchTerm)
  )

  const generateTenantCode = () => {
    tenantCounter++
    return `${institutionCode}${String(tenantCounter).padStart(4, "0")}`
  }

  const toggleStatus = (id: string) => {
    setTenants((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === "active" ? "inactive" : "active" } : t
      )
    )
  }

  const deleteTenant = (id: string) => {
    setTenants((prev) => prev.filter((t) => t.id !== id))
  }

  const handleCreateTenant = () => {
    setSelectedTenant(null)
    setIsCreateDialogOpen(true)
  }

  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "租户管理" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">租户管理</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              管理平台租户，配置租户权限和资源
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsSettingsDialogOpen(true)}
              className="gap-2"
            >
              <Settings className="h-4 w-4" />
              机构码设置
            </Button>
            <Button onClick={handleCreateTenant} className="gap-2">
              <Plus className="h-4 w-4" />
              新增租户
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索租户名称、标识或管理员..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            筛选
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>当前机构码:</span>
            <Badge variant="outline" className="font-mono">
              {institutionCode}
            </Badge>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">租户标识</TableHead>
                <TableHead className="text-muted-foreground">租户名称</TableHead>
                <TableHead className="text-muted-foreground">管理员</TableHead>
                <TableHead className="text-muted-foreground">地区</TableHead>
                <TableHead className="text-muted-foreground">状态</TableHead>
                <TableHead className="text-muted-foreground">创建时间</TableHead>
                <TableHead className="text-muted-foreground text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow key={tenant.id} className="border-border">
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {tenant.code}
                  </TableCell>
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>{tenant.admin}</TableCell>
                  <TableCell>{tenant.region}</TableCell>
                  <TableCell>
                    <Badge
                      variant={tenant.status === "active" ? "default" : "secondary"}
                      className={
                        tenant.status === "active"
                          ? "bg-primary/20 text-primary hover:bg-primary/30"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {tenant.status === "active" ? "启用" : "停用"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tenant.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedTenant(tenant)
                            setIsCreateDialogOpen(true)
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedTenant(tenant)
                            setIsPermissionDialogOpen(true)
                          }}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          权限资源管理
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleStatus(tenant.id)}>
                          <Power className="mr-2 h-4 w-4" />
                          {tenant.status === "active" ? "停用" : "启用"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteTenant(tenant.id)}
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

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>共 {filteredTenants.length} 条记录</span>
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

      {/* 机构码设置对话框 */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>机构码设置</DialogTitle>
            <DialogDescription>
              设置机构码后，新创建的租户标识将自动生成为"机构码+递增序号"
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="institutionCode">机构码</Label>
              <Input
                id="institutionCode"
                placeholder="如：QHDX"
                value={institutionCode}
                onChange={(e) => setInstitutionCode(e.target.value.toUpperCase())}
                className="uppercase"
              />
              <p className="text-xs text-muted-foreground">
                建议使用2-6位大写字母，设置后后续租户标识将自动生成
              </p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/50 p-3">
              <p className="text-sm text-muted-foreground">
                示例租户标识：
                <span className="ml-2 font-mono text-foreground">
                  {institutionCode}{String(tenantCounter + 1).padStart(4, "0")}
                </span>
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsSettingsDialogOpen(false)}>保存设置</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 新增/编辑租户对话框 */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedTenant ? "编辑租户" : "新增租户"}</DialogTitle>
            <DialogDescription>
              {selectedTenant
                ? "修改租户信息，租户标识创建后不可修改"
                : "创建新的租户，租户标识将自动生成"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">租户唯一标识</Label>
              <Input
                id="code"
                value={selectedTenant?.code || generateTenantCode()}
                disabled
                className="bg-muted font-mono"
              />
              <p className="text-xs text-muted-foreground">
                系统自动生成，由"机构码+递增序号"组成，创建后不可修改
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">租户名称</Label>
              <Input
                id="name"
                placeholder="如：清华大学"
                defaultValue={selectedTenant?.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="admin">租户管理员</Label>
              <Input
                id="admin"
                placeholder="选择或输入管理员"
                defaultValue={selectedTenant?.admin}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="region">租户地区</Label>
              <Select defaultValue={selectedTenant?.region}>
                <SelectTrigger>
                  <SelectValue placeholder="选择地区" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="北京市">北京市</SelectItem>
                  <SelectItem value="上海市">上海市</SelectItem>
                  <SelectItem value="广东省">广东省</SelectItem>
                  <SelectItem value="浙江省">浙江省</SelectItem>
                  <SelectItem value="江苏省">江苏省</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(false)}>
              {selectedTenant ? "保存" : "创建"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 权限资源管理对话框 */}
      <Dialog open={isPermissionDialogOpen} onOpenChange={setIsPermissionDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>租户权限资源管理</DialogTitle>
            <DialogDescription>
              为 {selectedTenant?.name} 配置可访问的系统资源和权限
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <h4 className="mb-3 font-medium">系统模块权限</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "基础数据管理",
                    "组织架构管理",
                    "用户管理",
                    "职位管理",
                    "角色权限",
                    "系统设置",
                  ].map((module) => (
                    <label key={module} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 rounded border-border"
                      />
                      <span className="text-sm">{module}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="mb-3 font-medium">数据容量限制</h4>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">最大用户数</span>
                    <Input className="w-32" type="number" defaultValue="1000" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">存储空间 (GB)</span>
                    <Input className="w-32" type="number" defaultValue="100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPermissionDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsPermissionDialogOpen(false)}>保存配置</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
