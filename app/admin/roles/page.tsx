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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Power,
  Trash2,
  Search,
  Upload,
  Download,
  Users,
  Eye,
  Shield,
  Database,
  ChevronRight,
  ChevronDown,
  Folder,
  FileText,
  MousePointer,
  Building2,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface Role {
  id: string
  name: string
  code: string
  userCount: number
  status: "active" | "inactive"
  description: string
}

const mockRoles: Role[] = [
  { id: "1", name: "超级管理员", code: "ROLE001", userCount: 2, status: "active", description: "系统最高权限" },
  { id: "2", name: "租户管理员", code: "ROLE002", userCount: 10, status: "active", description: "租户级别管理员" },
  { id: "3", name: "院系管理员", code: "ROLE003", userCount: 28, status: "active", description: "院系级别管理员" },
  { id: "4", name: "普通教师", code: "ROLE004", userCount: 450, status: "active", description: "普通教师角色" },
  { id: "5", name: "学生", code: "ROLE005", userCount: 3200, status: "active", description: "学生角色" },
  { id: "6", name: "企业用户", code: "ROLE006", userCount: 120, status: "active", description: "企业合作人员" },
  { id: "7", name: "访客", code: "ROLE007", userCount: 50, status: "inactive", description: "访客角色" },
]

// 三级权限结构：模块 -> 页面 -> 按钮
interface PermissionButton {
  id: string
  name: string
}

interface PermissionPage {
  id: string
  name: string
  buttons: PermissionButton[]
}

interface PermissionModule {
  id: string
  name: string
  pages: PermissionPage[]
}

const permissionTree: PermissionModule[] = [
  {
    id: "tenant",
    name: "租户管理",
    pages: [
      {
        id: "tenant_list",
        name: "租户列表",
        buttons: [
          { id: "tenant_list_view", name: "查看" },
          { id: "tenant_list_add", name: "新增" },
          { id: "tenant_list_edit", name: "编辑" },
          { id: "tenant_list_delete", name: "删除" },
          { id: "tenant_list_enable", name: "启用/停用" },
        ],
      },
      {
        id: "tenant_permission",
        name: "租户权限配置",
        buttons: [
          { id: "tenant_permission_view", name: "查看" },
          { id: "tenant_permission_edit", name: "配置" },
        ],
      },
    ],
  },
  {
    id: "basic_data",
    name: "基础数据管理",
    pages: [
      {
        id: "industry",
        name: "行业管理",
        buttons: [
          { id: "industry_view", name: "查看" },
          { id: "industry_add", name: "新增" },
          { id: "industry_edit", name: "编辑" },
          { id: "industry_delete", name: "删除" },
          { id: "industry_import", name: "导入" },
          { id: "industry_export", name: "导出" },
        ],
      },
      {
        id: "enterprise",
        name: "企业管理",
        buttons: [
          { id: "enterprise_view", name: "查看" },
          { id: "enterprise_add", name: "新增" },
          { id: "enterprise_edit", name: "编辑" },
          { id: "enterprise_delete", name: "删除" },
          { id: "enterprise_enable", name: "启用/停用" },
        ],
      },
      {
        id: "resource_code",
        name: "资源类型编码",
        buttons: [
          { id: "resource_code_view", name: "查看" },
          { id: "resource_code_add", name: "新增" },
          { id: "resource_code_edit", name: "编辑" },
          { id: "resource_code_delete", name: "删除" },
          { id: "resource_code_import", name: "导入" },
          { id: "resource_code_export", name: "导出" },
        ],
      },
      {
        id: "org_type",
        name: "组织类型管理",
        buttons: [
          { id: "org_type_view", name: "查看" },
          { id: "org_type_add", name: "新增" },
          { id: "org_type_edit", name: "编辑" },
          { id: "org_type_delete", name: "删除" },
          { id: "org_type_import", name: "导入" },
          { id: "org_type_export", name: "导出" },
        ],
      },
    ],
  },
  {
    id: "organization",
    name: "组织架构管理",
    pages: [
      {
        id: "org_tree",
        name: "组织架构树",
        buttons: [
          { id: "org_tree_view", name: "查看" },
          { id: "org_tree_add", name: "新增节点" },
          { id: "org_tree_add_parent", name: "添加父节点" },
          { id: "org_tree_edit", name: "编辑节点" },
          { id: "org_tree_delete", name: "删除节点" },
          { id: "org_tree_import", name: "导入" },
          { id: "org_tree_export", name: "导出" },
        ],
      },
      {
        id: "org_member",
        name: "成员管理",
        buttons: [
          { id: "org_member_view", name: "查看" },
          { id: "org_member_bindmain", name: "设为主归属" },
          { id: "org_member_bindpart", name: "设为兼职归属" },
          { id: "org_member_bindteach", name: "设为教学归属" },
          { id: "org_member_unbind", name: "解除关联" },
        ],
      },
      {
        id: "org_graduate",
        name: "批量毕业",
        buttons: [
          { id: "org_graduate_view", name: "查看" },
          { id: "org_graduate_batch", name: "批量毕业" },
        ],
      },
    ],
  },
  {
    id: "user",
    name: "用户与账户管理",
    pages: [
      {
        id: "user_list",
        name: "用户列表",
        buttons: [
          { id: "user_list_view", name: "查看" },
          { id: "user_list_add", name: "新增" },
          { id: "user_list_edit", name: "编辑" },
          { id: "user_list_delete", name: "删除" },
          { id: "user_list_enable", name: "启用/停用" },
          { id: "user_list_import", name: "导入" },
          { id: "user_list_export", name: "导出" },
        ],
      },
      {
        id: "account_list",
        name: "账户列表",
        buttons: [
          { id: "account_list_view", name: "查看" },
          { id: "account_list_reset", name: "重置密码" },
        ],
      },
      {
        id: "identity_type",
        name: "身份类型管理",
        buttons: [
          { id: "identity_type_view", name: "查看" },
          { id: "identity_type_add", name: "新增" },
          { id: "identity_type_edit", name: "编辑" },
          { id: "identity_type_delete", name: "删除" },
        ],
      },
      {
        id: "user_field",
        name: "用户字段扩展",
        buttons: [
          { id: "user_field_view", name: "查看" },
          { id: "user_field_edit", name: "编辑" },
          { id: "user_field_enable", name: "启用/禁用" },
        ],
      },
      {
        id: "relation_type",
        name: "关系类型管理",
        buttons: [
          { id: "relation_type_view", name: "查看" },
          { id: "relation_type_add", name: "新增" },
          { id: "relation_type_edit", name: "编辑" },
          { id: "relation_type_delete", name: "删除" },
        ],
      },
      {
        id: "graduate_list",
        name: "毕业学生管理",
        buttons: [
          { id: "graduate_list_view", name: "查看" },
          { id: "graduate_list_export", name: "导出" },
        ],
      },
    ],
  },
  {
    id: "position",
    name: "职位管理",
    pages: [
      {
        id: "position_list",
        name: "职位列表",
        buttons: [
          { id: "position_list_view", name: "查看" },
          { id: "position_list_add", name: "新增" },
          { id: "position_list_edit", name: "编辑" },
          { id: "position_list_delete", name: "删除" },
          { id: "position_list_enable", name: "启用/停用" },
          { id: "position_list_import", name: "导入" },
          { id: "position_list_export", name: "导出" },
        ],
      },
    ],
  },
  {
    id: "role",
    name: "角色权限管理",
    pages: [
      {
        id: "role_list",
        name: "角色列表",
        buttons: [
          { id: "role_list_view", name: "查看" },
          { id: "role_list_add", name: "新增" },
          { id: "role_list_edit", name: "编辑" },
          { id: "role_list_delete", name: "删除" },
          { id: "role_list_enable", name: "启用/禁用" },
          { id: "role_list_import", name: "导入" },
          { id: "role_list_export", name: "导出" },
        ],
      },
      {
        id: "role_permission",
        name: "权限配置",
        buttons: [
          { id: "role_permission_view", name: "查看" },
          { id: "role_permission_edit", name: "配置" },
        ],
      },
    ],
  },
]

// 组织架构树数据（用于数据权限选择）
interface OrgNode {
  id: string
  name: string
  type: string
  children?: OrgNode[]
}

const orgTree: OrgNode[] = [
  {
    id: "org_root",
    name: "青海大学",
    type: "学校",
    children: [
      {
        id: "org_1",
        name: "信息工程学院",
        type: "二级学院",
        children: [
          {
            id: "org_1_1",
            name: "计算机系",
            type: "专业系",
            children: [
              { id: "org_1_1_1", name: "软件工程专业", type: "专业" },
              { id: "org_1_1_2", name: "计算机科学与技术专业", type: "专业" },
            ],
          },
          {
            id: "org_1_2",
            name: "电子工程系",
            type: "专业系",
            children: [
              { id: "org_1_2_1", name: "电子信息工程专业", type: "专业" },
            ],
          },
          {
            id: "org_1_3",
            name: "2024级软件1班",
            type: "班级",
          },
          {
            id: "org_1_4",
            name: "2024级软件2班",
            type: "班级",
          },
        ],
      },
      {
        id: "org_2",
        name: "商学院",
        type: "二级学院",
        children: [
          {
            id: "org_2_1",
            name: "工商管理系",
            type: "专业系",
            children: [
              { id: "org_2_1_1", name: "工商管理专业", type: "专业" },
              { id: "org_2_1_2", name: "市场营销专业", type: "专业" },
            ],
          },
          {
            id: "org_2_2",
            name: "会计系",
            type: "专业系",
            children: [
              { id: "org_2_2_1", name: "会计学专业", type: "专业" },
            ],
          },
        ],
      },
      {
        id: "org_3",
        name: "行政办公室",
        type: "行政部门",
      },
      {
        id: "org_4",
        name: "教务处",
        type: "行政部门",
      },
      {
        id: "org_5",
        name: "产业学院A",
        type: "产业学院",
        children: [
          { id: "org_5_1", name: "订单班A1", type: "订单班" },
          { id: "org_5_2", name: "订单班A2", type: "订单班" },
        ],
      },
    ],
  },
]

// 权限树组件
function PermissionTree({
  selectedPermissions,
  onToggle,
}: {
  selectedPermissions: string[]
  onToggle: (id: string, type: "module" | "page" | "button") => void
}) {
  const [expandedModules, setExpandedModules] = useState<string[]>(permissionTree.map((m) => m.id))
  const [expandedPages, setExpandedPages] = useState<string[]>([])

  const toggleModule = (id: string) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  const togglePage = (id: string) => {
    setExpandedPages((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const isModuleChecked = (module: PermissionModule) => {
    const allIds = module.pages.flatMap((p) => [p.id, ...p.buttons.map((b) => b.id)])
    return allIds.every((id) => selectedPermissions.includes(id))
  }

  const isModuleIndeterminate = (module: PermissionModule) => {
    const allIds = module.pages.flatMap((p) => [p.id, ...p.buttons.map((b) => b.id)])
    const hasChecked = allIds.some((id) => selectedPermissions.includes(id))
    const allChecked = allIds.every((id) => selectedPermissions.includes(id))
    return hasChecked && !allChecked
  }

  const isPageChecked = (page: PermissionPage) => {
    return [page.id, ...page.buttons.map((b) => b.id)].every((id) =>
      selectedPermissions.includes(id)
    )
  }

  const isPageIndeterminate = (page: PermissionPage) => {
    const allIds = [page.id, ...page.buttons.map((b) => b.id)]
    const hasChecked = allIds.some((id) => selectedPermissions.includes(id))
    const allChecked = allIds.every((id) => selectedPermissions.includes(id))
    return hasChecked && !allChecked
  }

  return (
    <div className="space-y-2 max-h-[400px] overflow-auto pr-2">
      {permissionTree.map((module) => (
        <div key={module.id} className="rounded-lg border border-border">
          <div
            className="flex items-center gap-2 p-3 cursor-pointer hover:bg-secondary/50"
            onClick={() => toggleModule(module.id)}
          >
            {expandedModules.includes(module.id) ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
            <Checkbox
              checked={isModuleChecked(module)}
              ref={(el) => {
                if (el) {
                  ;(el as HTMLButtonElement & { indeterminate: boolean }).indeterminate =
                    isModuleIndeterminate(module)
                }
              }}
              onCheckedChange={() => onToggle(module.id, "module")}
              onClick={(e) => e.stopPropagation()}
            />
            <Folder className="h-4 w-4 text-primary" />
            <span className="font-medium">{module.name}</span>
            <Badge variant="outline" className="ml-auto text-xs">
              模块
            </Badge>
          </div>

          {expandedModules.includes(module.id) && (
            <div className="border-t border-border">
              {module.pages.map((page) => (
                <div key={page.id}>
                  <div
                    className="flex items-center gap-2 p-3 pl-8 cursor-pointer hover:bg-secondary/50"
                    onClick={() => togglePage(page.id)}
                  >
                    {page.buttons.length > 0 ? (
                      expandedPages.includes(page.id) ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )
                    ) : (
                      <span className="w-4" />
                    )}
                    <Checkbox
                      checked={isPageChecked(page)}
                      ref={(el) => {
                        if (el) {
                          ;(el as HTMLButtonElement & { indeterminate: boolean }).indeterminate =
                            isPageIndeterminate(page)
                        }
                      }}
                      onCheckedChange={() => onToggle(page.id, "page")}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <FileText className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">{page.name}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      页面
                    </Badge>
                  </div>

                  {expandedPages.includes(page.id) && page.buttons.length > 0 && (
                    <div className="py-2 pl-16 pr-4 bg-secondary/30 grid grid-cols-4 gap-2">
                      {page.buttons.map((button) => (
                        <div key={button.id} className="flex items-center gap-2">
                          <Checkbox
                            id={button.id}
                            checked={selectedPermissions.includes(button.id)}
                            onCheckedChange={() => onToggle(button.id, "button")}
                          />
                          <MousePointer className="h-3 w-3 text-muted-foreground" />
                          <label
                            htmlFor={button.id}
                            className="text-xs text-muted-foreground cursor-pointer"
                          >
                            {button.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// 组织架构树组件（用于数据权限选择）
function OrgTreeSelector({
  selectedOrgs,
  onToggle,
}: {
  selectedOrgs: string[]
  onToggle: (id: string) => void
}) {
  const [expandedNodes, setExpandedNodes] = useState<string[]>(["org_root", "org_1", "org_2"])

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    )
  }

  const getAllChildIds = (node: OrgNode): string[] => {
    const ids = [node.id]
    if (node.children) {
      node.children.forEach((child) => {
        ids.push(...getAllChildIds(child))
      })
    }
    return ids
  }

  const isNodeChecked = (node: OrgNode): boolean => {
    return selectedOrgs.includes(node.id)
  }

  const isNodeIndeterminate = (node: OrgNode): boolean => {
    if (!node.children) return false
    const allChildIds = getAllChildIds(node).filter((id) => id !== node.id)
    const hasChecked = allChildIds.some((id) => selectedOrgs.includes(id))
    const allChecked = allChildIds.every((id) => selectedOrgs.includes(id))
    return hasChecked && !allChecked && !selectedOrgs.includes(node.id)
  }

  const renderNode = (node: OrgNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedNodes.includes(node.id)

    return (
      <div key={node.id}>
        <div
          className={cn(
            "flex items-center gap-2 py-2 px-3 cursor-pointer hover:bg-secondary/50 rounded",
            level > 0 && "ml-6"
          )}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
        >
          {hasChildren ? (
            <button onClick={() => toggleNode(node.id)} className="p-0.5">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          ) : (
            <span className="w-5" />
          )}
          <Checkbox
            checked={isNodeChecked(node)}
            ref={(el) => {
              if (el) {
                ;(el as HTMLButtonElement & { indeterminate: boolean }).indeterminate =
                  isNodeIndeterminate(node)
              }
            }}
            onCheckedChange={() => onToggle(node.id)}
          />
          <Building2 className="h-4 w-4 text-primary" />
          <span className="text-sm">{node.name}</span>
          <Badge variant="outline" className="text-xs ml-auto">
            {node.type}
          </Badge>
        </div>
        {hasChildren && isExpanded && (
          <div>{node.children!.map((child) => renderNode(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border max-h-[400px] overflow-auto">
      <div className="p-2 bg-secondary/30 border-b border-border">
        <p className="text-xs text-muted-foreground">
          勾选组织节点，即可授权该节点下的所有数据访问权限
        </p>
      </div>
      <div className="p-2">{orgTree.map((node) => renderNode(node))}</div>
    </div>
  )
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [selectedOrgs, setSelectedOrgs] = useState<string[]>([])
  const [nextRoleNumber, setNextRoleNumber] = useState(8)

  // 新建角色表单
  const [newRoleName, setNewRoleName] = useState("")
  const [newRoleDescription, setNewRoleDescription] = useState("")

  const filteredRoles = roles.filter(
    (role) =>
      role.name.includes(searchTerm) ||
      role.code.includes(searchTerm) ||
      role.description.includes(searchTerm)
  )

  const toggleStatus = (id: string) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: r.status === "active" ? "inactive" : "active" } : r
      )
    )
  }

  const handleDelete = (id: string) => {
    setRoles((prev) => prev.filter((r) => r.id !== id))
  }

  const handleViewDetail = (role: Role) => {
    setSelectedRole(role)
    setIsDetailDialogOpen(true)
  }

  const handlePermission = (role: Role) => {
    setSelectedRole(role)
    setSelectedPermissions(["tenant_list_view", "industry_view", "org_tree_view", "user_list_view"])
    setSelectedOrgs(["org_1", "org_1_1"])
    setIsPermissionDialogOpen(true)
  }

  const handleTogglePermission = (id: string, type: "module" | "page" | "button") => {
    if (type === "module") {
      const module = permissionTree.find((m) => m.id === id)
      if (module) {
        const allIds = module.pages.flatMap((p) => [p.id, ...p.buttons.map((b) => b.id)])
        const allSelected = allIds.every((pid) => selectedPermissions.includes(pid))
        if (allSelected) {
          setSelectedPermissions((prev) => prev.filter((p) => !allIds.includes(p)))
        } else {
          setSelectedPermissions((prev) => [...new Set([...prev, ...allIds])])
        }
      }
    } else if (type === "page") {
      const page = permissionTree
        .flatMap((m) => m.pages)
        .find((p) => p.id === id)
      if (page) {
        const allIds = [page.id, ...page.buttons.map((b) => b.id)]
        const allSelected = allIds.every((pid) => selectedPermissions.includes(pid))
        if (allSelected) {
          setSelectedPermissions((prev) => prev.filter((p) => !allIds.includes(p)))
        } else {
          setSelectedPermissions((prev) => [...new Set([...prev, ...allIds])])
        }
      }
    } else {
      setSelectedPermissions((prev) =>
        prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
      )
    }
  }

  const handleToggleOrg = (id: string) => {
    setSelectedOrgs((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    )
  }

  const handleCreateRole = () => {
    if (!newRoleName.trim()) return

    const newRole: Role = {
      id: String(Date.now()),
      name: newRoleName,
      code: `ROLE${String(nextRoleNumber).padStart(3, "0")}`,
      userCount: 0,
      status: "active",
      description: newRoleDescription,
    }

    setRoles((prev) => [...prev, newRole])
    setNextRoleNumber((prev) => prev + 1)
    setNewRoleName("")
    setNewRoleDescription("")
    setIsDialogOpen(false)
  }

  const handleEditRole = () => {
    if (!editingRole || !newRoleName.trim()) return

    setRoles((prev) =>
      prev.map((r) =>
        r.id === editingRole.id
          ? { ...r, name: newRoleName, description: newRoleDescription }
          : r
      )
    )
    setNewRoleName("")
    setNewRoleDescription("")
    setEditingRole(null)
    setIsDialogOpen(false)
  }

  const openEditDialog = (role: Role) => {
    setEditingRole(role)
    setNewRoleName(role.name)
    setNewRoleDescription(role.description)
    setIsDialogOpen(true)
  }

  const openCreateDialog = () => {
    setEditingRole(null)
    setNewRoleName("")
    setNewRoleDescription("")
    setIsDialogOpen(true)
  }

  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "角色权限管理" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">角色权限管理</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              管理系统角色，配置角色权限
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              导入
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              导出
            </Button>
            <Button onClick={openCreateDialog} className="gap-2">
              <Plus className="h-4 w-4" />
              新增角色
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索角色名称、编码或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">角色编码</TableHead>
                <TableHead className="text-muted-foreground">角色名称</TableHead>
                <TableHead className="text-muted-foreground">描述</TableHead>
                <TableHead className="text-muted-foreground">关联用户数</TableHead>
                <TableHead className="text-muted-foreground">状态</TableHead>
                <TableHead className="text-muted-foreground text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id} className="border-border">
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {role.code}
                  </TableCell>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="text-muted-foreground">{role.description}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleViewDetail(role)}
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <Users className="h-4 w-4" />
                      {role.userCount}
                    </button>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={role.status === "active" ? "default" : "secondary"}
                      className={
                        role.status === "active"
                          ? "bg-primary/20 text-primary hover:bg-primary/30"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {role.status === "active" ? "启用" : "禁用"}
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
                        <DropdownMenuItem onClick={() => handleViewDetail(role)}>
                          <Eye className="mr-2 h-4 w-4" />
                          查看详情
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(role)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePermission(role)}>
                          <Shield className="mr-2 h-4 w-4" />
                          权限配置
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleStatus(role.id)}>
                          <Power className="mr-2 h-4 w-4" />
                          {role.status === "active" ? "禁用" : "启用"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(role.id)}
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
          <span>共 {filteredRoles.length} 条记录</span>
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

      {/* 新增/编辑角色对话框 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{editingRole ? "编辑角色" : "新增角色"}</DialogTitle>
            <DialogDescription>
              {editingRole ? "修改角色信息" : "创建新的角色，角色编码将自动生成"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>角色编码</Label>
              <Input
                value={editingRole ? editingRole.code : `ROLE${String(nextRoleNumber).padStart(3, "0")}`}
                disabled
                className="bg-secondary/50"
              />
              <p className="text-xs text-muted-foreground">角色编码由系统自动生成，无法修改</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">角色名称</Label>
              <Input
                id="name"
                placeholder="如：管理员"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">描述</Label>
              <Input
                id="description"
                placeholder="如：系统管理员角色"
                value={newRoleDescription}
                onChange={(e) => setNewRoleDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={editingRole ? handleEditRole : handleCreateRole}>
              {editingRole ? "保存" : "创建"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 关联用户详情对话框 */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>关联用户 - {selectedRole?.name}</DialogTitle>
            <DialogDescription>
              查看该角色下的所有关联用户
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                共 {selectedRole?.userCount} 位用户
              </span>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                添加用户
              </Button>
            </div>
            <div className="max-h-64 overflow-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">姓名</TableHead>
                    <TableHead className="text-muted-foreground">工号/学号</TableHead>
                    <TableHead className="text-muted-foreground">部门</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "张三", id: "T2024001", dept: "信息工程学院" },
                    { name: "李四", id: "T2024002", dept: "商学院" },
                    { name: "王五", id: "S2024001", dept: "2024级软件班" },
                  ].map((user, index) => (
                    <TableRow key={index} className="border-border">
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="text-muted-foreground">{user.id}</TableCell>
                      <TableCell className="text-muted-foreground">{user.dept}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDetailDialogOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 权限配置对话框 */}
      <Dialog open={isPermissionDialogOpen} onOpenChange={setIsPermissionDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>权限配置 - {selectedRole?.name}</DialogTitle>
            <DialogDescription>
              配置角色的系统权限和数据权限
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="menu" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="menu" className="gap-2">
                <Shield className="h-4 w-4" />
                系统权限绑定
              </TabsTrigger>
              <TabsTrigger value="data" className="gap-2">
                <Database className="h-4 w-4" />
                数据权限设置
              </TabsTrigger>
            </TabsList>
            <TabsContent value="menu" className="mt-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  选择该角色可访问的模块、页面和按钮
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Folder className="h-3 w-3 text-primary" /> 模块
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3 text-blue-400" /> 页面
                  </span>
                  <span className="flex items-center gap-1">
                    <MousePointer className="h-3 w-3" /> 按钮
                  </span>
                </div>
              </div>
              <PermissionTree
                selectedPermissions={selectedPermissions}
                onToggle={handleTogglePermission}
              />
            </TabsContent>
            <TabsContent value="data" className="mt-4">
              <div className="mb-3">
                <p className="text-sm text-muted-foreground">
                  选择该角色可访问数据的组织范围，勾选的节点将授权该节点下所有数据的访问权限
                </p>
              </div>
              <OrgTreeSelector selectedOrgs={selectedOrgs} onToggle={handleToggleOrg} />
              <div className="mt-3 p-3 rounded-lg bg-secondary/50">
                <p className="text-sm font-medium mb-2">已选择的数据权限范围：</p>
                <div className="flex flex-wrap gap-2">
                  {selectedOrgs.length === 0 ? (
                    <span className="text-sm text-muted-foreground">暂未选择任何组织节点</span>
                  ) : (
                    selectedOrgs.map((id) => (
                      <Badge key={id} variant="secondary">
                        {id === "org_root" && "青海大学"}
                        {id === "org_1" && "信息工程学院"}
                        {id === "org_1_1" && "计算机系"}
                        {id === "org_1_1_1" && "软件工程专业"}
                        {id === "org_1_1_2" && "计算机科学与技术专业"}
                        {id === "org_1_2" && "电子工程系"}
                        {id === "org_1_2_1" && "电子信息工程专业"}
                        {id === "org_1_3" && "2024级软件1班"}
                        {id === "org_1_4" && "2024级软件2班"}
                        {id === "org_2" && "商学院"}
                        {id === "org_2_1" && "工商管理系"}
                        {id === "org_2_1_1" && "工商管理专业"}
                        {id === "org_2_1_2" && "市场营销专业"}
                        {id === "org_2_2" && "会计系"}
                        {id === "org_2_2_1" && "会计学专业"}
                        {id === "org_3" && "行政办公室"}
                        {id === "org_4" && "教务处"}
                        {id === "org_5" && "产业学院A"}
                        {id === "org_5_1" && "订单班A1"}
                        {id === "org_5_2" && "订单班A2"}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter className="mt-4">
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
