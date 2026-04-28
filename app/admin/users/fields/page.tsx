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
import { Switch } from "@/components/ui/switch"
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
import { Pencil } from "lucide-react"

interface UserField {
  id: string
  fieldName: string
  fieldKey: string
  fieldType: string
  isEnabled: boolean
  isRequired: boolean
}

const mockFields: UserField[] = [
  { id: "1", fieldName: "扩展字段1", fieldKey: "ext_field_1", fieldType: "文本", isEnabled: true, isRequired: false },
  { id: "2", fieldName: "扩展字段2", fieldKey: "ext_field_2", fieldType: "文本", isEnabled: true, isRequired: false },
  { id: "3", fieldName: "扩展字段3", fieldKey: "ext_field_3", fieldType: "数字", isEnabled: false, isRequired: false },
  { id: "4", fieldName: "扩展字段4", fieldKey: "ext_field_4", fieldType: "日期", isEnabled: false, isRequired: false },
  { id: "5", fieldName: "扩展字段5", fieldKey: "ext_field_5", fieldType: "下拉选择", isEnabled: true, isRequired: true },
  { id: "6", fieldName: "扩展字段6", fieldKey: "ext_field_6", fieldType: "文本", isEnabled: false, isRequired: false },
  { id: "7", fieldName: "扩展字段7", fieldKey: "ext_field_7", fieldType: "文本", isEnabled: false, isRequired: false },
  { id: "8", fieldName: "扩展字段8", fieldKey: "ext_field_8", fieldType: "文本", isEnabled: false, isRequired: false },
  { id: "9", fieldName: "扩展字段9", fieldKey: "ext_field_9", fieldType: "文本", isEnabled: false, isRequired: false },
  { id: "10", fieldName: "扩展字段10", fieldKey: "ext_field_10", fieldType: "文本", isEnabled: false, isRequired: false },
]

export default function UserFieldsPage() {
  const [fields, setFields] = useState<UserField[]>(mockFields)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingField, setEditingField] = useState<UserField | null>(null)

  const toggleEnabled = (id: string) => {
    setFields((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, isEnabled: !f.isEnabled } : f
      )
    )
  }

  const handleEdit = (field: UserField) => {
    setEditingField(field)
    setIsDialogOpen(true)
  }

  return (
    <>
      <Header
        breadcrumb={[
          { label: "控制台", href: "/admin" },
          { label: "用户与账户管理", href: "/admin/users" },
          { label: "用户字段扩展" },
        ]}
      />

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">用户字段扩展</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            配置用户自定义扩展字段（预留20个）
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">字段标识</TableHead>
                <TableHead className="text-muted-foreground">字段名称</TableHead>
                <TableHead className="text-muted-foreground">字段类型</TableHead>
                <TableHead className="text-muted-foreground">是否必填</TableHead>
                <TableHead className="text-muted-foreground">是否启用</TableHead>
                <TableHead className="text-muted-foreground text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field) => (
                <TableRow key={field.id} className="border-border">
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {field.fieldKey}
                  </TableCell>
                  <TableCell className="font-medium">{field.fieldName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{field.fieldType}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={field.isRequired ? "default" : "secondary"}
                      className={
                        field.isRequired
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {field.isRequired ? "必填" : "可选"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={field.isEnabled}
                      onCheckedChange={() => toggleEnabled(field.id)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(field)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>共 {fields.length} / 20 个扩展字段</span>
          <span>已启用 {fields.filter((f) => f.isEnabled).length} 个</span>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>编辑扩展字段</DialogTitle>
            <DialogDescription>
              配置扩展字段属性
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="fieldKey">字段标识</Label>
              <Input
                id="fieldKey"
                defaultValue={editingField?.fieldKey}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fieldName">字段名称</Label>
              <Input
                id="fieldName"
                placeholder="如：紧急联系人"
                defaultValue={editingField?.fieldName}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fieldType">字段类型</Label>
              <select
                id="fieldType"
                defaultValue={editingField?.fieldType}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="文本">文本</option>
                <option value="数字">数字</option>
                <option value="日期">日期</option>
                <option value="下拉选择">下拉选择</option>
                <option value="多选">多选</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isRequired">是否必填</Label>
              <Switch id="isRequired" defaultChecked={editingField?.isRequired} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isEnabled">是否启用</Label>
              <Switch id="isEnabled" defaultChecked={editingField?.isEnabled} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
