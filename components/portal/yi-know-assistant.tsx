"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  BookOpen,
  Bot,
  ChevronRight,
  Clock,
  ExternalLink,
  Heart,
  LayoutGrid,
  Loader2,
  MessageCircle,
  Plus,
  Search,
  Send,
  Sparkles,
  Star,
  X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useAppModules, type AppModule } from "@/hooks/use-platform-links"

type ResourceCategory = "knowledge" | "agent" | "platform"

interface Resource {
  id: string
  category: ResourceCategory
  title: string
  desc: string
  tags?: string[]
  icon: string
  color: string
  platformId?: string
}

interface QuickAction {
  id: string
  label: string
  icon: string
  href: string
  color: string
}

const RESOURCES: Resource[] = [
  {
    id: "finance-kb",
    category: "knowledge",
    title: "金融专业知识库",
    desc: "覆盖银行、证券、保险等金融岗位核心知识与案例。",
    tags: ["金融", "专业"],
    icon: "book",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    id: "logistics-kb",
    category: "knowledge",
    title: "物流专业知识库",
    desc: "仓储、运输、供应链管理等物流领域知识沉淀。",
    tags: ["物流", "专业"],
    icon: "book",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
  {
    id: "cnc-kb",
    category: "knowledge",
    title: "数控实训知识库",
    desc: "数控加工、设备操作与维护等实训资源汇总。",
    tags: ["数控", "实训"],
    icon: "book",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    id: "hotel-kb",
    category: "knowledge",
    title: "酒店管理案例库",
    desc: "前厅、客房、餐饮等酒店服务真实教学案例。",
    tags: ["酒店", "案例"],
    icon: "book",
    color: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    id: "position-agent",
    category: "agent",
    title: "岗位批量创建助手",
    desc: "根据专业方向快速生成岗位能力模型与任务。",
    tags: ["岗位", "创建"],
    icon: "bot",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    id: "scene-agent",
    category: "agent",
    title: "场景批量创建助手",
    desc: "智能拆解岗位任务，生成配套实践场景。",
    tags: ["场景", "创建"],
    icon: "bot",
    color: "bg-cyan-50 text-cyan-600 border-cyan-100",
  },
  {
    id: "qa-robot",
    category: "agent",
    title: "课程答疑机器人",
    desc: "7×24 小时解答课程知识点与学习路径问题。",
    tags: ["答疑", "课程"],
    icon: "bot",
    color: "bg-violet-50 text-violet-600 border-violet-100",
  },
  {
    id: "custom-robot",
    category: "agent",
    title: "师生自建机器人",
    desc: "支持师生自定义知识库，打造专属智能体。",
    tags: ["自建", "自定义"],
    icon: "bot",
    color: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100",
  },
  {
    id: "brand-platform",
    category: "platform",
    title: "产业联盟与品牌运营平台",
    desc: "校企合作单位、重点项目与专家资源统一展示。",
    tags: ["校企", "品牌"],
    icon: "external",
    color: "bg-rose-50 text-rose-600 border-rose-100",
    platformId: "alliance",
  },
  {
    id: "career-platform",
    category: "platform",
    title: "职业岗位学习平台",
    desc: "岗位能力模型、典型任务与证书要求一站呈现。",
    tags: ["岗位", "学习"],
    icon: "external",
    color: "bg-purple-50 text-purple-600 border-purple-100",
    platformId: "career",
  },
  {
    id: "scene-platform",
    category: "platform",
    title: "实践场景学习平台",
    desc: "按专业浏览已发布实践场景，一键进入详情。",
    tags: ["场景", "实训"],
    icon: "external",
    color: "bg-cyan-50 text-cyan-600 border-cyan-100",
    platformId: "scene",
  },
  {
    id: "eval-platform",
    category: "platform",
    title: "能力测评认证平台",
    desc: "能力画像对比认证标准，推荐测评与练习资源。",
    tags: ["测评", "认证"],
    icon: "external",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    platformId: "ability",
  },
]

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "create-position",
    label: "我要建岗位",
    icon: "plus",
    href: "http://111.170.170.202:3002/positions",
    color: "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100",
  },
  {
    id: "create-scene",
    label: "我要建场景",
    icon: "plus",
    href: "http://111.170.170.202:3003/",
    color: "bg-cyan-50 text-cyan-600 border-cyan-100 hover:bg-cyan-100",
  },
  {
    id: "ai-create-position",
    label: "我要 AI 帮我建岗位",
    icon: "sparkles",
    href: "http://111.170.170.202:5000/",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100",
  },
]

const CATEGORY_META: Record<
  ResourceCategory,
  { label: string; icon: string; color: string }
> = {
  knowledge: { label: "学校知识库", icon: "book", color: "text-amber-600" },
  agent: { label: "智能体助手", icon: "bot", color: "text-indigo-600" },
  platform: { label: "外部教学平台", icon: "external", color: "text-cyan-600" },
}

const RECENTLY_USED: Resource[] = [
  RESOURCES.find((r) => r.id === "finance-kb")!,
  RESOURCES.find((r) => r.id === "position-agent")!,
  RESOURCES.find((r) => r.id === "career-platform")!,
]

const FAVORITES: Resource[] = [
  RESOURCES.find((r) => r.id === "scene-platform")!,
  RESOURCES.find((r) => r.id === "qa-robot")!,
]

interface PromptTag {
  label: string
  value: string
}

const PROMPT_TAGS: PromptTag[] = [
  { label: "网络安全", value: "我想做网络安全工程师，需要学什么？" },
  { label: "实训场景", value: "信息安全专业有哪些实训场景？" },
  { label: "岗位认证", value: "我距离岗位认证还差哪些能力？" },
  { label: "校企合作", value: "我们学校有哪些校企合作单位？" },
  { label: "建岗位", value: "我要建岗位" },
  { label: "建场景", value: "我要建场景" },
  { label: "AI建岗", value: "我要AI帮我建岗位" },
]

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  recommendations?: Resource[]
  quickActions?: QuickAction[]
}

function getIcon(name: string) {
  const className = "w-4 h-4"
  switch (name) {
    case "book":
      return <BookOpen className={className} />
    case "bot":
      return <Bot className={className} />
    case "external":
      return <ExternalLink className={className} />
    case "sparkles":
      return <Sparkles className={className} />
    case "plus":
      return <Plus className={className} />
    default:
      return <LayoutGrid className={className} />
  }
}

function ModuleItem({ module }: { module: AppModule }) {
  if (!module.href) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground opacity-60 bg-muted/50">
        <LayoutGrid className="w-3 h-3" />
        <span>{module.title}</span>
      </div>
    )
  }

  return (
    <a
      href={module.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-foreground hover:bg-primary/5 hover:text-primary transition-colors group"
    >
      <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
      <span className="line-clamp-1">{module.title}</span>
    </a>
  )
}

function ResourceItem({
  resource,
  expanded,
  onToggle,
  modules,
  modulesLoading,
}: {
  resource: Resource
  expanded: boolean
  onToggle: () => void
  modules: AppModule[]
  modulesLoading: boolean
}) {
  const isExpandable = resource.category === "platform"

  return (
    <div
      className={cn(
        "rounded-xl border transition-all overflow-hidden",
        resource.color.replace(/text-\w+-600/g, "").trim(),
        isExpandable ? "hover:shadow-sm hover:border-primary/40" : "opacity-80"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-3 group"
        disabled={!isExpandable}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "w-9 h-9 rounded-lg border flex items-center justify-center shrink-0",
              resource.color
            )}
          >
            {getIcon(resource.icon)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-sm text-foreground truncate">
                {resource.title}
              </h4>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {resource.desc}
            </p>
            {resource.tags && (
              <div className="flex flex-wrap gap-1 mt-2">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </button>

      {isExpandable && expanded && (
        <div className="border-t bg-muted/30 px-2 py-2">
          {modulesLoading ? (
            <div className="flex items-center justify-center py-3 text-muted-foreground">
              <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
              <span className="text-xs">加载模块中…</span>
            </div>
          ) : modules.length > 0 ? (
            <div className="grid grid-cols-2 gap-1">
              {modules.map((m) => (
                <ModuleItem key={m.id} module={m} />
              ))}
            </div>
          ) : (
            <div className="text-center py-3 text-xs text-muted-foreground">
              暂无模块配置
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function PromptTagItem({ tag, onClick }: { tag: PromptTag; onClick: (v: string) => void }) {
  return (
    <button
      onClick={() => onClick(tag.value)}
      className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-background text-foreground border border-border hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors shadow-sm"
    >
      {tag.label}
    </button>
  )
}

function QuickActionItem({ action }: { action: QuickAction }) {
  return (
    <a
      href={action.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-colors group",
        action.color
      )}
    >
      {getIcon(action.icon)}
      <span>{action.label}</span>
      <ExternalLink className="w-3 h-3 ml-auto opacity-60 group-hover:opacity-100" />
    </a>
  )
}

export function YiKnowAssistant() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<ResourceCategory | "all">("all")
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { getModules, loading: modulesLoading } = useAppModules()

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatMessages, isTyping])

  const filteredResources = useMemo(() => {
    const query = inputValue.trim().toLowerCase()
    return RESOURCES.filter((resource) => {
      const matchesCategory = activeTab === "all" || resource.category === activeTab
      const matchesQuery =
        !query ||
        resource.title.toLowerCase().includes(query) ||
        resource.desc.toLowerCase().includes(query) ||
        resource.tags?.some((t) => t.toLowerCase().includes(query))
      return matchesCategory && matchesQuery
    })
  }, [activeTab, inputValue])

  const isChatMode = chatMessages.length > 0 || isTyping

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  function generateReply(question: string): {
    reply: string
    recommendations: Resource[]
    quickActions?: QuickAction[]
  } {
    let reply = ""
    let recommendations: Resource[] = []
    let quickActions: QuickAction[] | undefined

    const q = question.toLowerCase()

    if (q.includes("我要建岗位")) {
      reply = "已为你找到岗位管理入口，点击即可进入岗位新建页面。"
      quickActions = QUICK_ACTIONS.filter((a) => a.id === "create-position")
    } else if (q.includes("我要建场景")) {
      reply = "已为你找到新建场景入口，点击即可进入场景新建页面。"
      quickActions = QUICK_ACTIONS.filter((a) => a.id === "create-scene")
    } else if (q.includes("我要ai帮我建岗位")) {
      reply = "已为你唤起 AI 智能体，点击即可使用 AI 辅助创建岗位。"
      quickActions = QUICK_ACTIONS.filter((a) => a.id === "ai-create-position")
    } else if (q.includes("网络安全工程师") || q.includes("岗位")) {
      reply =
        "推荐你进入【职业岗位学习平台】的网络安全工程师岗位页面。该岗位需要掌握网络协议分析、安全设备配置、渗透测试与日志审计等能力，涉及 NISP、CISP 等证书。建议先学习《网络协议与安全基础》，再完成对应实训场景。"
      recommendations = RESOURCES.filter((r) =>
        ["career-platform", "finance-kb", "position-agent"].includes(r.id)
      )
    } else if (q.includes("实训场景") || q.includes("信息安全")) {
      reply =
        "信息安全专业已发布 12 个实践场景，包括 Web 渗透测试、内网安全加固、日志审计分析等。每个场景已标注关联岗位、能力点和任务数，你可以直接进入【实践场景学习平台】查看详情。"
      recommendations = RESOURCES.filter((r) =>
        ["scene-platform", "cnc-kb", "scene-agent"].includes(r.id)
      )
    } else if (q.includes("岗位认证") || q.includes("能力")) {
      reply =
        "根据你的能力画像对比网络安全工程师岗位认证标准：已达成网络基础、系统配置；待提升渗透测试、安全报告撰写。已为你推荐对应测评任务和 3 个练习资源。"
      recommendations = RESOURCES.filter((r) =>
        ["eval-platform", "qa-robot", "custom-robot"].includes(r.id)
      )
    } else if (q.includes("校企合作") || q.includes("合作单位")) {
      reply =
        "学校现有 8 家深度合作企业，包括金融科技、智能制造、现代服务等领域。你可以在【产业联盟与品牌运营平台】查看合作类型、重点项目成果及专家资源。"
      recommendations = RESOURCES.filter((r) =>
        ["brand-platform", "hotel-kb", "logistics-kb"].includes(r.id)
      )
    } else {
      reply =
        "我帮你找到了一些相关资源，你可以点击卡片快速查看。如需更精准的推荐，可以补充专业、年级或目标岗位。"
      recommendations = RESOURCES.filter((r) => {
        return (
          r.title.toLowerCase().includes(q) ||
          r.desc.toLowerCase().includes(q) ||
          r.tags?.some((t) => t.toLowerCase().includes(q))
        )
      }).slice(0, 4)
      if (recommendations.length === 0) {
        recommendations = RESOURCES.slice(0, 3)
      }
    }

    return { reply, recommendations, quickActions }
  }

  const handleSend = () => {
    const question = inputValue.trim()
    if (!question || isTyping) return

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: question,
    }
    setChatMessages((prev) => [...prev, userMsg])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const { reply, recommendations, quickActions } = generateReply(question)

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        recommendations,
        quickActions,
      }
      setChatMessages((prev) => [...prev, assistantMsg])
      setIsTyping(false)
    }, 800)
  }

  const handleCloseChat = () => {
    setChatMessages([])
    setInputValue("")
    setIsTyping(false)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      setInputValue("")
      setChatMessages([])
      setExpandedIds(new Set())
      setActiveTab("all")
    }
  }

  const handleFillPrompt = (value: string) => {
    setInputValue(value)
  }

  const resourceList = (
    <div className="space-y-2">
      {filteredResources.map((r) => (
        <ResourceItem
          key={r.id}
          resource={r}
          expanded={expandedIds.has(r.id)}
          onToggle={() => toggleExpand(r.id)}
          modules={r.platformId ? getModules(r.platformId) : []}
          modulesLoading={modulesLoading}
        />
      ))}
      {filteredResources.length === 0 && (
        <div className="text-center py-8 text-sm text-muted-foreground">
          未找到相关资源
        </div>
      )}
    </div>
  )

  const groupedResourceList = (
    <div className="space-y-4">
      {(Object.keys(CATEGORY_META) as ResourceCategory[]).map((cat) => {
        const items = filteredResources.filter((r) => r.category === cat)
        if (items.length === 0) return null
        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-2">
              {getIcon(CATEGORY_META[cat].icon)}
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {CATEGORY_META[cat].label}
              </h4>
            </div>
            <div className="space-y-2">
              {items.map((r) => (
                <ResourceItem
                  key={r.id}
                  resource={r}
                  expanded={expandedIds.has(r.id)}
                  onToggle={() => toggleExpand(r.id)}
                  modules={r.platformId ? getModules(r.platformId) : []}
                  modulesLoading={modulesLoading}
                />
              ))}
            </div>
          </div>
        )
      })}
      {filteredResources.length === 0 && (
        <div className="text-center py-8 text-sm text-muted-foreground">
          未找到相关资源，换个关键词试试
        </div>
      )}
    </div>
  )

  const chatView = (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 border-b bg-background shrink-0">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium">AI 引导对话（演示）</span>
        </div>
        <button
          onClick={handleCloseChat}
          className="w-6 h-6 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
          title="返回导航面板"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex-1 h-full overflow-y-auto px-3 py-2" ref={scrollRef}>
        <div className="space-y-3">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-2",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "assistant" && (
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3 h-3" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[90%] rounded-2xl px-3 py-2 text-xs leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-background border rounded-bl-none shadow-sm"
                )}
              >
                {msg.content}
                {msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {msg.quickActions.map((action) => (
                      <QuickActionItem key={action.id} action={action} />
                    ))}
                  </div>
                )}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-[10px] text-muted-foreground">为你推荐：</p>
                    {msg.recommendations.map((r) => (
                      <div
                        key={r.id}
                        className="flex items-center gap-2 p-1.5 rounded-md bg-muted/60 hover:bg-muted cursor-pointer"
                        onClick={() => {
                          if (r.platformId) {
                            setActiveTab("platform")
                            setExpandedIds((prev) => new Set(prev).add(r.id))
                          } else {
                            setActiveTab(r.category)
                          }
                        }}
                      >
                        <span className={CATEGORY_META[r.category].color}>
                          {getIcon(r.icon)}
                        </span>
                        <span className="text-[10px] truncate flex-1">{r.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2 justify-start">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3 h-3" />
              </div>
              <div className="bg-background border rounded-2xl rounded-bl-none px-3 py-2 text-xs text-muted-foreground shadow-sm">
                正在思考…
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => handleOpenChange(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-[100] flex items-center gap-2 rounded-full pl-4 pr-3 py-3 shadow-xl transition-all hover:scale-105 active:scale-95",
          open
            ? "bg-foreground text-background"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
        aria-label="YI KNOW 教学智能助理"
      >
        <Sparkles className="w-5 h-5" />
        <span className="text-sm font-medium whitespace-nowrap">YI KNOW 教学智能助理</span>
        {open ? <X className="w-4 h-4 ml-1" /> : <ChevronRight className="w-4 h-4 ml-1" />}
      </button>

      {/* Assistant panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[100] w-[420px] max-w-[calc(100vw-3rem)] h-[720px] max-h-[calc(100vh-8rem)] bg-background border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">YI KNOW</h3>
                <p className="text-[10px] text-muted-foreground">职业教育场景化教学智能助理</p>
              </div>
            </div>
            <button
              onClick={() => handleOpenChange(false)}
              className="w-7 h-7 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => {
              setActiveTab(v as ResourceCategory | "all")
              setInputValue("")
            }}
            className="px-4 pt-3 pb-2 shrink-0"
          >
            <TabsList className="w-full grid grid-cols-4 h-9">
              <TabsTrigger value="all" className="text-xs">
                全部
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="text-xs">
                知识库
              </TabsTrigger>
              <TabsTrigger value="agent" className="text-xs">
                智能体
              </TabsTrigger>
              <TabsTrigger value="platform" className="text-xs">
                教学平台
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Content area */}
          <div className="flex-1 min-h-0 px-4 pb-3 overflow-hidden">
            {isChatMode ? (
              chatView
            ) : activeTab === "all" ? (
              <div className="h-full overflow-y-auto pr-2">
                {groupedResourceList}
              </div>
            ) : (
              <div className="h-full overflow-y-auto pr-2">
                {resourceList}
              </div>
            )}
          </div>
          <Separator />

          {/* Bottom unified input area */}
          <div className="shrink-0 bg-muted/30">
            {!isChatMode && (
              <div className="px-3 pt-2">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-[11px] font-medium text-muted-foreground">示例问题：</span>
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap"003e
                  {PROMPT_TAGS.map((tag) => (
                    <PromptTagItem key={tag.label} tag={tag} onClick={handleFillPrompt} />
                  ))}
                </div>
              </div>
            )}
            <div className="p-2 bg-background border-t flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="输入问题或搜索资源，例如：金融专业岗位标准"
                  className="pl-9 h-9 text-sm"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                />
              </div>
              <Button
                size="icon"
                className="h-9 w-9 shrink-0"
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
