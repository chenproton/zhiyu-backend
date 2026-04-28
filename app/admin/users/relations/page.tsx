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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Plus, Pencil, Trash2, ArrowRight, Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

// 模拟用户数据
const mockUsers = [
  { id: "U001", name: "张三", identityType: "教职工", identifier: "T001" },
  { id: "U002", name: "李四", identityType: "教职工", identifier: "T002" },
  { id: "U003", name: "王五", identityType: "学生", identifier: "S2024001" },
  { id: "U004", name: "赵六", identityType: "学生", identifier: "S2024002" },
  { id: "U005", name: "钱七", identityType: "教职工", identifier: "T003" },
  { id: "U006", name: "孙八", identityType: "学生", identifier: "S2024003" },
  { id: "U007", name: "周九", identityType: "企业", identifier: "13800138001" },
  { id: "U008", name: "吴十", identityType: "系统管理员", identifier: "admin" },
  { id: "U009", name: "郑十一", identityType: "学生", identifier: "S2024004" },
  { id: "U010", name: "陈十二", identityType: "教职工", identifier: "T004" },
]

interface RelationType {
  id: string
  initiatorId: string
  initiatorName: string
  targetId: string
  targetName: string
  relationType: string
  description: string
}

const mockRelations: RelationType[] = [
  {
    id: "1",
    initiatorId: "U001",
    initiatorName: "张三",
    targetId: "U003",
    targetName: "王五",
    relationType: "上下级",
    description: "班主任与学生的管理关系",
  },
  {
    id: "2",
    initiatorId: "U001",
    initiatorName: "张三",
    targetId: "U002",
    targetName: "李四",
    relationType: "业务协同",
    description: "同事间的协作关系",
  },
  {
    id: "3",
    initiatorId: "U005",
    initiatorName: "钱七",
    targetId: "U004",
    targetName: "赵六",
    relationType: "管理关系",
    description: "教学管理关系",
  },
  {
    id: "4",
    initiatorId: "U007",
    initiatorName: "周九",
    targetId: "U006",
    targetName: "孙八",
    relationType: "服务关系",
    description: "企业导师与学生的指导关系",
  },
  {
    id: "5",
    initiatorId: "U003",
    initiatorName: "王五",
    targetId: "U004",
    targetName: "赵六",
    relationType: "项目参与",
    description: "项目组成员关系",
  },
  {
    id: "6",
    initiatorId: "U007",
    initiatorName: "周九",
    targetId: "U001",
    targetName: "张三",
    relationType: "外部合作",
    description: "校企合作关系",
  },
]

const relationTypeColors: Record<string, string> = {
  上下级: "bg-blue-500/20 text-blue-400",
  业务协同: "bg-primary/20 text-primary",
  管理关系: "bg-amber-500/20 text-amber-400",
  服务关系: "bg-pink-500/20 text-pink-400",
  项目参与: "bg-cyan-500/20 text-cyan-400",
  外部合作: "bg-orange-500/20 text-orange-400",
}

// 用户搜索选择组件
function UserSearchSelect({
  value,
  onValueChange,
  placeholder = "搜索并选择用户...",
}: {
  value: string
  onValueChange: (userId: string, userName: string) => void
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const selectedUser = mockUsers.find((u) => u.id === value)

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.includes(searchQuery) ||
      user.identifier.includes(searchQuery) ||
      user.identityType.includes(searchQuery)
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedUser ? (
            <span className="flex items-center gap-2">
              <span>{selectedUser.name}</span>
              <span className="text-xs text-muted-foreground">
                ({selectedUser.identityType})
              </span>
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="输入姓名、工号或学号搜索..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>未找到匹配的用户</CommandEmpty>
            <CommandGroup>
              {filteredUsers.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.id}
                  onSelect={() => {
                    onValueChange(user.id, user.name)
                    setOpen(false)
                    setSearchQuery("")
                  }}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === user.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-1 items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.identifier}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {user.identityType}
                    </Badge>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default function RelationsPage() {
  const [relations, setRelations] = useState<RelationType[]>(mockRelations)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRelation, setEditingRelation] = useState<RelationType | null>(null)

  // 表单状态
  const [formData, setFormData] = useState({
    initiatorId: "",
    initiatorName: "",
    targetId: "",
    targetName: "",
    relationType: "上下级",
    description: "",
  })

  const handleEdit = (relation: RelationType) => {
    setEditingRelation(relation)
    setFormData({
      initiatorId: relation.initiatorId,
      initiatorName: relation.initiatorName,
      targetId: relation.targetId,
      targetName: relation.targetName,
      relationType: relation.relationType,
      description: relation.description,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setRelations((prev) => prev.filter((r) => r.id !== id))
  }

  const handleOpenCreate = () => {
    setEditingRelation(null)
    setFormData({
      initiatorId: "",
      initiatorName: "",
      targetId: "",
      targetName: "",
      relationType: "上下级",
      description: "",
    })
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.initiatorId || !formData.targetId) {
      return
    }

    if (editingRelation) {
      setRelations((prev) =>
        prev.map((r) =>
          r.id === editingRelation.id
            ? {
                ...r,
                initiatorId: formData.initiatorId,
                initiatorName: formData.initiatorName,
                targetId: formData.targetId,
                targetName: formData.targetName,
                relationType: formData.relationType,
                description: formData.description,
              }
            : r
        )
      )
    } else {
      const newRelation: RelationType = {
        id: String(Date.now()),
        initiatorId: formData.initiatorId,
        initiatorName: formData.initiatorName,
        targetId: formData.targetId,
        targetName: formData.targetName,
        relationType: formData.relationType,
        description: formData.description,
      }
      setRelations((prev) => [...prev, newRelation])
    }
    setIsDialogOpen(false)
  }

  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "用户与账户管理", href: "/admin/users" },
          { label: "关系类型" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">关系类型列表</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              管理用户间的关系类型定义
            </p>
          </div>
          <Button onClick={handleOpenCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            新增关系
          </Button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(relationTypeColors).map(([type, color]) => (
            <Badge key={type} className={color}>
              {type}
            </Badge>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">关系发起人</TableHead>
                <TableHead className="text-muted-foreground w-[60px]"></TableHead>
                <TableHead className="text-muted-foreground">关系目标人</TableHead>
                <TableHead className="text-muted-foreground">关系类型</TableHead>
                <TableHead className="text-muted-foreground">描述</TableHead>
                <TableHead className="text-muted-foreground text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relations.map((relation) => (
                <TableRow key={relation.id} className="border-border">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{relation.initiatorName}</span>
                      <span className="text-xs text-muted-foreground">
                        {mockUsers.find((u) => u.id === relation.initiatorId)?.identityType} |{" "}
                        {mockUsers.find((u) => u.id === relation.initiatorId)?.identifier}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{relation.targetName}</span>
                      <span className="text-xs text-muted-foreground">
                        {mockUsers.find((u) => u.id === relation.targetId)?.identityType} |{" "}
                        {mockUsers.find((u) => u.id === relation.targetId)?.identifier}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={relationTypeColors[relation.relationType] || "bg-muted"}>
                      {relation.relationType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-[200px] truncate">
                    {relation.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(relation)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(relation.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          共 {relations.length} 条记录
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{editingRelation ? "编辑关系" : "新增关系"}</DialogTitle>
            <DialogDescription>
              {editingRelation ? "修改用户间的关系信息" : "创建用户之间的新关系"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>关系发起人</Label>
              <UserSearchSelect
                value={formData.initiatorId}
                onValueChange={(id, name) =>
                  setFormData((prev) => ({ ...prev, initiatorId: id, initiatorName: name }))
                }
                placeholder="搜索并选择关系发起人..."
              />
            </div>
            <div className="grid gap-2">
              <Label>关系目标人</Label>
              <UserSearchSelect
                value={formData.targetId}
                onValueChange={(id, name) =>
                  setFormData((prev) => ({ ...prev, targetId: id, targetName: name }))
                }
                placeholder="搜索并选择关系目标人..."
              />
            </div>
            <div className="grid gap-2">
              <Label>关系类型</Label>
              <Select
                value={formData.relationType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, relationType: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择关系类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="上下级">上下级</SelectItem>
                  <SelectItem value="业务协同">业务协同</SelectItem>
                  <SelectItem value="管理关系">管理关系</SelectItem>
                  <SelectItem value="服务关系">服务关系</SelectItem>
                  <SelectItem value="项目参与">项目参与</SelectItem>
                  <SelectItem value="外部合作">外部合作</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>描述</Label>
              <Input
                placeholder="如：班主任与学生的管理关系"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSave} disabled={!formData.initiatorId || !formData.targetId}>
              {editingRelation ? "保存" : "创建"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
