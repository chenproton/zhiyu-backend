"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, MoreHorizontal, ChevronRight, ChevronDown, Pencil, Trash2, Users, Upload, Download, ArrowUp, GraduationCap, FolderTree } from "lucide-react"
import { cn } from "@/lib/utils"

interface OrgNode {
  id: string
  name: string
  type: string
  order: number
  memberCount: number
  children?: OrgNode[]
  expanded?: boolean
}

const mockOrgData: OrgNode[] = [
  {
    id: "1",
    name: "清华大学",
    type: "学校",
    order: 1,
    memberCount: 0,
    expanded: true,
    children: [
      {
        id: "1-1",
        name: "信息学院",
        type: "二级学院",
        order: 1,
        memberCount: 120,
        expanded: true,
        children: [
          { id: "1-1-1", name: "计算机系", type: "专业系", order: 1, memberCount: 45 },
          { id: "1-1-2", name: "软件工程系", type: "专业系", order: 2, memberCount: 38 },
          {
            id: "1-1-3",
            name: "2024级软件班",
            type: "班级",
            order: 3,
            memberCount: 35,
            children: [],
          },
        ],
      },
      {
        id: "1-2",
        name: "经济管理学院",
        type: "二级学院",
        order: 2,
        memberCount: 95,
        children: [
          { id: "1-2-1", name: "会计系", type: "专业系", order: 1, memberCount: 32 },
          { id: "1-2-2", name: "金融系", type: "专业系", order: 2, memberCount: 28 },
        ],
      },
      { id: "1-3", name: "教务处", type: "行政部门", order: 3, memberCount: 15 },
      { id: "1-4", name: "学生处", type: "行政部门", order: 4, memberCount: 12 },
    ],
  },
]

function TreeNode({
  node,
  level = 0,
  onToggle,
  onAction,
}: {
  node: OrgNode
  level?: number
  onToggle: (id: string) => void
  onAction: (action: string, node: OrgNode) => void
}) {
  const hasChildren = node.children && node.children.length > 0

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-2 py-2 px-3 hover:bg-muted rounded-lg group",
          level > 0 && "ml-6"
        )}
      >
        <button
          onClick={() => onToggle(node.id)}
          className="w-5 h-5 flex items-center justify-center"
        >
          {hasChildren ? (
            node.expanded ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )
          ) : (
            <span className="w-4" />
          )}
        </button>
        <FolderTree className="w-4 h-4 text-primary" />
        <span className="flex-1 text-sm font-medium">{node.name}</span>
        <Badge variant="outline" className="text-xs">{node.type}</Badge>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="w-3 h-3" />
          {node.memberCount}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onAction("addChild", node)}>
              <Plus className="mr-2 h-4 w-4" />
              添加子节点
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("addParent", node)}>
              <ArrowUp className="mr-2 h-4 w-4" />
              添加父节点
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("edit", node)}>
              <Pencil className="mr-2 h-4 w-4" />
              编辑
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAction("members", node)}>
              <Users className="mr-2 h-4 w-4" />
              成员管理
            </DropdownMenuItem>
            {node.type === "班级" && (
              <DropdownMenuItem onClick={() => onAction("graduate", node)}>
                <GraduationCap className="mr-2 h-4 w-4" />
                批量毕业
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onAction("delete", node)} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {hasChildren && node.expanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} onToggle={onToggle} onAction={onAction} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function OrgStructurePage() {
  const [orgData, setOrgData] = useState<OrgNode[]>(mockOrgData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<"add" | "edit" | "members">("add")
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null)

  const toggleNode = (id: string) => {
    const toggle = (nodes: OrgNode[]): OrgNode[] => {
      return nodes.map((node) => {
        if (node.id === id) {
          return { ...node, expanded: !node.expanded }
        }
        if (node.children) {
          return { ...node, children: toggle(node.children) }
        }
        return node
      })
    }
    setOrgData(toggle(orgData))
  }

  const handleAction = (action: string, node: OrgNode) => {
    setSelectedNode(node)
    if (action === "addChild" || action === "addParent") {
      setDialogType("add")
      setIsDialogOpen(true)
    } else if (action === "edit") {
      setDialogType("edit")
      setIsDialogOpen(true)
    } else if (action === "members") {
      setDialogType("members")
      setIsDialogOpen(true)
    }
  }

  return (
    <div className="p-6 bg-[#f5f7fa] min-h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">组织架构管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">管理组织架构树，配置组织成员归属</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-1" />
            批量导入
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            批量导出
          </Button>
          <Button size="sm" onClick={() => { setSelectedNode(null); setDialogType("add"); setIsDialogOpen(true) }}>
            <Plus className="h-4 w-4 mr-1" />
            新增节点
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-4">
        <ScrollArea className="h-[600px]">
          {orgData.map((node) => (
            <TreeNode key={node.id} node={node} onToggle={toggleNode} onAction={handleAction} />
          ))}
        </ScrollArea>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {dialogType === "add" ? "新增节点" : dialogType === "edit" ? "编辑节点" : "成员管理"}
            </DialogTitle>
            <DialogDescription>
              {dialogType === "members"
                ? `管理 ${selectedNode?.name} 的组织成员`
                : "配置组织节点信息"}
            </DialogDescription>
          </DialogHeader>
          {dialogType !== "members" ? (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>节点名称</Label>
                <Input placeholder="如：信息学院" defaultValue={dialogType === "edit" ? selectedNode?.name : ""} />
              </div>
              <div className="grid gap-2">
                <Label>节点类型</Label>
                <Select defaultValue={dialogType === "edit" ? selectedNode?.type : undefined}>
                  <SelectTrigger><SelectValue placeholder="选择类型" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="二级学院">二级学院</SelectItem>
                    <SelectItem value="专业系">专业系</SelectItem>
                    <SelectItem value="班级">班级</SelectItem>
                    <SelectItem value="行政部门">行政部门</SelectItem>
                    <SelectItem value="教研室">教研室</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>排序序号</Label>
                <Input type="number" placeholder="1" defaultValue={dialogType === "edit" ? selectedNode?.order : 1} />
              </div>
            </div>
          ) : (
            <div className="py-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">主归属成员</span>
                  <Badge>{selectedNode?.memberCount || 0} 人</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">兼职归属成员</span>
                  <Badge variant="outline">5 人</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">教学归属成员</span>
                  <Badge variant="outline">8 人</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Users className="h-4 w-4 mr-1" />
                管理成员
              </Button>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>取消</Button>
            <Button onClick={() => setIsDialogOpen(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
