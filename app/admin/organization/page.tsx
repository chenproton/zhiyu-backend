"use client"

import { useState } from "react"
import { Header } from "@/components/admin/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  Pencil,
  Trash2,
  ChevronRight,
  ChevronDown,
  Users,
  GraduationCap,
  FolderTree,
  MoreHorizontal,
  Upload,
  Download,
  ArrowUp,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface OrgNode {
  id: string
  name: string
  type: string
  order: number
  memberCount: number
  children?: OrgNode[]
}

const mockOrgTree: OrgNode[] = [
  {
    id: "1",
    name: "信息工程学院",
    type: "二级学院",
    order: 1,
    memberCount: 156,
    children: [
      {
        id: "1-1",
        name: "计算机系",
        type: "专业系",
        order: 1,
        memberCount: 45,
        children: [
          { id: "1-1-1", name: "软件工程教研室", type: "教研室", order: 1, memberCount: 12 },
          { id: "1-1-2", name: "网络工程教研室", type: "教研室", order: 2, memberCount: 10 },
          { id: "1-1-3", name: "2024级软件1班", type: "班级", order: 1, memberCount: 45 },
          { id: "1-1-4", name: "2024级软件2班", type: "班级", order: 2, memberCount: 43 },
        ],
      },
      {
        id: "1-2",
        name: "人工智能系",
        type: "专业系",
        order: 2,
        memberCount: 38,
        children: [
          { id: "1-2-1", name: "AI教研室", type: "教研室", order: 1, memberCount: 8 },
          { id: "1-2-2", name: "2024级AI班", type: "班级", order: 1, memberCount: 40 },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "商学院",
    type: "二级学院",
    order: 2,
    memberCount: 120,
    children: [
      {
        id: "2-1",
        name: "会计系",
        type: "专业系",
        order: 1,
        memberCount: 60,
        children: [
          { id: "2-1-1", name: "2024级会计班", type: "班级", order: 1, memberCount: 48 },
        ],
      },
      {
        id: "2-2",
        name: "电子商务系",
        type: "专业系",
        order: 2,
        memberCount: 55,
      },
    ],
  },
  {
    id: "3",
    name: "华为产业学院",
    type: "产业学院",
    order: 3,
    memberCount: 80,
    children: [
      { id: "3-1", name: "华为订单班", type: "订单班", order: 1, memberCount: 40 },
    ],
  },
]

interface TreeNodeProps {
  node: OrgNode
  level: number
  onEdit: (node: OrgNode) => void
  onDelete: (id: string) => void
  onAddChild: (parentId: string) => void
  onAddParent: (childId: string) => void
  onManageMembers: (node: OrgNode) => void
  onGraduate: (node: OrgNode) => void
}

function TreeNode({
  node,
  level,
  onEdit,
  onDelete,
  onAddChild,
  onAddParent,
  onManageMembers,
  onGraduate,
}: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2)
  const hasChildren = node.children && node.children.length > 0

  const typeColors: Record<string, string> = {
    二级学院: "bg-blue-500/20 text-blue-400",
    专业系: "bg-primary/20 text-primary",
    教研室: "bg-amber-500/20 text-amber-400",
    班级: "bg-pink-500/20 text-pink-400",
    产业学院: "bg-cyan-500/20 text-cyan-400",
    订单班: "bg-orange-500/20 text-orange-400",
  }

  return (
    <div>
      <div
        className={cn(
          "group flex items-center gap-2 rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary",
          level > 0 && "ml-6"
        )}
        style={{ marginLeft: level * 24 }}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground",
            !hasChildren && "invisible"
          )}
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        <div className="flex flex-1 items-center gap-3">
          <span className="font-medium">{node.name}</span>
          <Badge className={cn("text-xs", typeColors[node.type] || "bg-muted text-muted-foreground")}>
            {node.type}
          </Badge>
          <span className="text-sm text-muted-foreground">#{node.order}</span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            {node.memberCount}
          </span>
        </div>

        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onAddChild(node.id)}>
                <Plus className="mr-2 h-4 w-4" />
                添加子节点
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddParent(node.id)}>
                <ArrowUp className="mr-2 h-4 w-4" />
                添加父节点
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(node)}>
                <Pencil className="mr-2 h-4 w-4" />
                编辑
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onManageMembers(node)}>
                <Users className="mr-2 h-4 w-4" />
                成员管理
              </DropdownMenuItem>
              {node.type === "班级" && (
                <DropdownMenuItem onClick={() => onGraduate(node)}>
                  <GraduationCap className="mr-2 h-4 w-4" />
                  批量毕业
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(node.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                删除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
              onAddParent={onAddParent}
              onManageMembers={onManageMembers}
              onGraduate={onGraduate}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function OrganizationPage() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false)
  const [isGraduateDialogOpen, setIsGraduateDialogOpen] = useState(false)
  const [isAddParentDialogOpen, setIsAddParentDialogOpen] = useState(false)
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null)
  const [parentId, setParentId] = useState<string | null>(null)
  const [childId, setChildId] = useState<string | null>(null)

  const handleEdit = (node: OrgNode) => {
    setSelectedNode(node)
    setParentId(null)
    setIsEditDialogOpen(true)
  }

  const handleAddChild = (pId: string) => {
    setSelectedNode(null)
    setParentId(pId)
    setIsEditDialogOpen(true)
  }

  const handleAddParent = (cId: string) => {
    setChildId(cId)
    setIsAddParentDialogOpen(true)
  }

  const handleManageMembers = (node: OrgNode) => {
    setSelectedNode(node)
    setIsMemberDialogOpen(true)
  }

  const handleGraduate = (node: OrgNode) => {
    setSelectedNode(node)
    setIsGraduateDialogOpen(true)
  }

  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "组织架构管理" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">组织架构管理</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              管理组织树状结构，配置成员归属关系
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              批量导入
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              批量导出
            </Button>
            <Button
              onClick={() => {
                setSelectedNode(null)
                setParentId(null)
                setIsEditDialogOpen(true)
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              新增根节点
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FolderTree className="h-4 w-4" />
            <span>组织树</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-500/20 text-blue-400">二级学院</Badge>
            <Badge className="bg-primary/20 text-primary">专业系</Badge>
            <Badge className="bg-amber-500/20 text-amber-400">教研室</Badge>
            <Badge className="bg-pink-500/20 text-pink-400">班级</Badge>
            <Badge className="bg-cyan-500/20 text-cyan-400">产业学院</Badge>
            <Badge className="bg-orange-500/20 text-orange-400">订单班</Badge>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          {mockOrgTree.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              level={0}
              onEdit={handleEdit}
              onDelete={(id) => console.log("Delete:", id)}
              onAddChild={handleAddChild}
              onAddParent={handleAddParent}
              onManageMembers={handleManageMembers}
              onGraduate={handleGraduate}
            />
          ))}
        </div>
      </div>

      {/* 编辑/新增节点对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>
              {selectedNode ? "编辑节点" : parentId ? "添加子节点" : "新增根节点"}
            </DialogTitle>
            <DialogDescription>
              配置组织节点信息
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">节点名称</Label>
              <Input
                id="name"
                placeholder="如：信息工程学院"
                defaultValue={selectedNode?.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">节点类型</Label>
              <Select defaultValue={selectedNode?.type || "二级学院"}>
                <SelectTrigger>
                  <SelectValue placeholder="选择类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="二级学院">二级学院</SelectItem>
                  <SelectItem value="专业系">专业系</SelectItem>
                  <SelectItem value="教研室">教研室</SelectItem>
                  <SelectItem value="班级">班级</SelectItem>
                  <SelectItem value="产业学院">产业学院</SelectItem>
                  <SelectItem value="订单班">订单班</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="order">节点顺序</Label>
              <Input
                id="order"
                type="number"
                placeholder="1"
                defaultValue={selectedNode?.order || 1}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>
              {selectedNode ? "保存" : "创建"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 添加父节点对话框 */}
      <Dialog open={isAddParentDialogOpen} onOpenChange={setIsAddParentDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>添加父节点</DialogTitle>
            <DialogDescription>
              在当前节点上方插入一个新的父节点
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="parentName">父节点名称</Label>
              <Input
                id="parentName"
                placeholder="如：新建学院"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parentType">父节点类型</Label>
              <Select defaultValue="二级学院">
                <SelectTrigger>
                  <SelectValue placeholder="选择类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="二级学院">二级学院</SelectItem>
                  <SelectItem value="专业系">专业系</SelectItem>
                  <SelectItem value="教研室">教研室</SelectItem>
                  <SelectItem value="产业学院">产业学院</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg border border-border bg-secondary/50 p-3">
              <p className="text-sm text-muted-foreground">
                添加父节点后，当前节点将成为新父节点的子节点
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddParentDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsAddParentDialogOpen(false)}>创建</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 成员管理对话框 */}
      <Dialog open={isMemberDialogOpen} onOpenChange={setIsMemberDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>成员管理 - {selectedNode?.name}</DialogTitle>
            <DialogDescription>
              管理组织成员的归属关系
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4 flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                添加成员
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>当前成员：{selectedNode?.memberCount} 人</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-border p-3">
                <h4 className="mb-2 font-medium">主归属成员</h4>
                <p className="text-sm text-muted-foreground">该组织作为用户的主要归属组织</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">张三</Badge>
                  <Badge variant="secondary">李四</Badge>
                  <Badge variant="secondary">王五</Badge>
                  <span className="text-sm text-muted-foreground">等 {selectedNode?.memberCount || 0} 人</span>
                </div>
              </div>
              <div className="rounded-lg border border-border p-3">
                <h4 className="mb-2 font-medium">兼职归属成员</h4>
                <p className="text-sm text-muted-foreground">用户在该组织有兼职关系</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">赵六</Badge>
                  <Badge variant="secondary">钱七</Badge>
                </div>
              </div>
              <div className="rounded-lg border border-border p-3">
                <h4 className="mb-2 font-medium">教学归属成员</h4>
                <p className="text-sm text-muted-foreground">用户在该组织有教学关系</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">孙八</Badge>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsMemberDialogOpen(false)}>关闭</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 批量毕业对话框 */}
      <Dialog open={isGraduateDialogOpen} onOpenChange={setIsGraduateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>批量毕业学生</DialogTitle>
            <DialogDescription>
              将 {selectedNode?.name} 的所有学生标记为毕业状态
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
              <p className="text-sm text-amber-400">
                此操作将把该班级下的 {selectedNode?.memberCount} 名学生全部标记为毕业状态，
                毕业后学生将转移至毕业学生管理模块。此操作不可撤销，请确认后操作。
              </p>
            </div>
            <div className="mt-4 grid gap-2">
              <Label htmlFor="graduateYear">毕业年份</Label>
              <Input id="graduateYear" defaultValue="2024" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGraduateDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsGraduateDialogOpen(false)}>
              确认毕业
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
