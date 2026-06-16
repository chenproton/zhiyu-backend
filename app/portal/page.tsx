"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import { usePlatformLinks } from "@/hooks/use-platform-links"

type Version = "1.0" | "2.0"

const features = [
  { label: "以产业需求为牵引", active: true },
  { label: "以学生能力为中心", active: true },
  { label: "以场景实践为载体", active: true },
  { label: "以跨专业融合为特征", active: true },
]

const categories = [
  { id: "scene", label: "场景应用生态", color: "bg-amber-400" },
  { id: "resource", label: "资源保障生态", color: "bg-emerald-400" },
  { id: "operate", label: "运营治理生态", color: "bg-rose-400" },
]

const platforms = [
  {
    category: "scene",
    items: [
      {
        id: "alliance",
        icon: "users",
        color: "bg-rose-50 text-rose-500 border border-rose-100",
        title: "产业联盟与人资品牌服务平台",
        desc: "共建校企合作生态，打造具有行业影响力的人才培养品牌。",
      },
      {
        id: "career",
        icon: "briefcase",
        color: "bg-purple-50 text-purple-500 border border-purple-100",
        title: "职业岗位学习平台",
        desc: "清晰呈现岗位能力图谱，为学生提供目标清晰、路径可视的职业生涯导航。",
      },
      {
        id: "scene",
        icon: "layers",
        color: "bg-cyan-50 text-cyan-500 border border-cyan-100",
        title: "实践场景学习平台",
        desc: "还原真实工作场景，让学生在解决实际问题中习得技能，培养做中学的实践本领。",
      },
      {
        id: "ability",
        icon: "check-circle",
        color: "bg-emerald-50 text-emerald-500 border border-emerald-100",
        title: "能力测评认证平台",
        desc: "基于统一评价量规，实现对实践过程与结果的精准量化评估与技能认证。",
      },
    ],
  },
  {
    category: "resource",
    items: [
      {
        id: "course",
        icon: "book",
        color: "bg-amber-50 text-amber-500 border border-amber-100",
        title: "数字课程服务平台",
        desc: "以颗粒化课程资源支撑场景任务，实现'按需学习'与'查漏补缺'的知识高效获取。",
      },
      {
        id: "ai",
        icon: "sparkles",
        color: "bg-indigo-50 text-indigo-500 border border-indigo-100",
        title: "AI 服务平台",
        desc: "融合前沿AI技术，为教学设计、资源建设、学习辅导、评价分析提供伴随式智能支持。",
      },
      {
        id: "resource",
        icon: "share",
        color: "bg-blue-50 text-blue-500 border border-blue-100",
        title: "教学资源共享服务平台",
        desc: "沉淀校本智力资产，构建共建共享、持续进化的场景化数智教学资源生态。",
      },
      {
        id: "mall",
        icon: "shopping-cart",
        color: "bg-pink-50 text-pink-500 border border-pink-100",
        title: "教学资源商城",
        desc: "汇聚全网精品教学要素，促进教育智力资产的跨校流转、价值互换与生态繁荣。",
      },
    ],
  },
  {
    category: "operate",
    items: [
      {
        id: "research",
        icon: "file-text",
        color: "bg-orange-50 text-orange-500 border border-orange-100",
        title: "教科研服务平台",
        desc: "助力教师开展教学研究、经验交流与课题协作，推动师资队伍专业化发展。",
      },
      {
        id: "affairs",
        icon: "calendar",
        color: "bg-teal-50 text-teal-500 border border-teal-100",
        title: "教务服务平台",
        desc: "统筹排课选岗、学分认定与学籍管理，保障教学秩序顺畅运行。",
      },
      {
        id: "decision",
        icon: "bar-chart",
        color: "bg-violet-50 text-violet-500 border border-violet-100",
        title: "决策支持平台",
        desc: "可视化呈现教学运行状态与质量数据，为学校各级管理提供科学、精准的决策依据。",
      },
      {
        id: "employment",
        icon: "graduation-cap",
        color: "bg-sky-50 text-sky-500 border border-sky-100",
        title: "就业服务平台",
        desc: "基于学生能力画像与企业岗位画像的智能匹配，助力毕业生高质量就业。",
      },
    ],
  },
]

function getIcon(name: string): ReactNode {
  const icons: Record<string, ReactNode> = {
    users: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    briefcase: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    layers: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    "check-circle": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    book: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    sparkles: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    share: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    "shopping-cart": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    "file-text": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    calendar: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    "bar-chart": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    "graduation-cap": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
  }
  return icons[name] || icons.book
}

function PlatformCard({
  item,
  url,
  enabled,
}: {
  item: (typeof platforms)[0]["items"][0]
  url: string
  enabled: boolean
}) {
  const cardContent = (
    <>
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
          {getIcon(item.icon)}
        </div>
        <h3 className="font-medium text-foreground text-sm leading-tight pt-1">
          {item.title}
        </h3>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{item.desc}</p>
    </>
  )

  if (url && enabled) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-card rounded-xl p-4 border border-border cursor-pointer hover:shadow-md hover:border-primary/30 transition-all block"
      >
        {cardContent}
      </a>
    )
  }

  return (
    <div className="bg-card rounded-xl p-4 border border-border cursor-default opacity-70">
      {cardContent}
    </div>
  )
}

/* ===== 2.0 Data ===== */
const v2Categories = [
  { id: "scene", label: "场景应用生态", color: "bg-amber-400" },
  { id: "resource", label: "资源保障生态", color: "bg-emerald-400" },
]

const v2Platforms = [
  {
    category: "scene",
    items: [
      {
        id: "alliance",
        icon: "users",
        color: "bg-rose-50 text-rose-500 border border-rose-100",
        title: "产业联盟与人才品牌运营平台",
        desc: "共建校企合作生态，打造具有行业影响力的人才培养品牌。",
      },
      {
        id: "career",
        icon: "briefcase",
        color: "bg-purple-50 text-purple-500 border border-purple-100",
        title: "职业岗位学习平台",
        desc: "清晰呈现岗位能力图谱，为学生提供目标清晰、路径可视的职业生涯导航。",
      },
      {
        id: "scene",
        icon: "layers",
        color: "bg-cyan-50 text-cyan-500 border border-cyan-100",
        title: "实践场景学习平台",
        desc: "还原真实工作场景，让学生在解决实际问题中习得技能，培养做中学的实践本领。",
      },
      {
        id: "ability",
        icon: "check-circle",
        color: "bg-emerald-50 text-emerald-500 border border-emerald-100",
        title: "能力测评认证平台",
        desc: "基于统一评价量规，实现对实践过程与结果的精准量化评估与技能认证。",
      },
    ],
  },
  {
    category: "resource",
    items: [
      {
        id: "course",
        icon: "book",
        color: "bg-amber-50 text-amber-500 border border-amber-100",
        title: "数字课程服务平台",
        desc: "以颗粒化课程资源支撑场景任务，实现\"按需学习\"与\"查漏补缺\"的知识高效获取。",
      },
      {
        id: "ai",
        icon: "sparkles",
        color: "bg-indigo-50 text-indigo-500 border border-indigo-100",
        title: "AI 服务平台",
        desc: "融合前沿AI技术，为教学设计、资源建设、学习辅导、评价分析提供伴随式智能服务。",
      },
      {
        id: "resource",
        icon: "share",
        color: "bg-blue-50 text-blue-500 border border-blue-100",
        title: "教学资源共享服务平台",
        desc: "沉淀校本智力资产，构建共建共享、持续进化的场景化数智教学资源生态。",
      },
      {
        id: "affairs",
        icon: "calendar",
        color: "bg-teal-50 text-teal-500 border border-teal-100",
        title: "教务服务平台",
        desc: "统筹排课选班、学分认定与学籍管理，保障教学秩序顺畅运行。",
      },
    ],
  },
]

const v2Mall = {
  id: "mall",
  icon: "shopping-cart" as const,
  title: "教学资源商城",
  desc: "汇聚精品教学资源，链接企业与院校，促进教育智力资产流转共享",
}

/* ===== Version Tag ===== */
function VersionTag({
  version,
  onChange,
}: {
  version: Version
  onChange: (v: Version) => void
}) {
  const nextVersion = version === "1.0" ? "2.0" : "1.0"
  return (
    <button
      onClick={() => onChange(nextVersion)}
      className="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer"
      title={`切换到 ${nextVersion}`}
    >
      {version}
    </button>
  )
}

/* ===== 2.0 Mall Bar ===== */
function MallBar({
  url,
  enabled,
}: {
  url: string
  enabled: boolean
}) {
  return (
    <div className="mt-2 bg-card rounded-xl px-5 py-2 border border-border flex items-center justify-between gap-4 hover:shadow-md hover:border-primary/30 transition-all">
      <div className="flex items-center gap-3.5 flex-wrap">
        <div className="w-9 h-9 rounded-lg bg-pink-50 text-pink-500 border border-pink-100 flex items-center justify-center shrink-0">
          {getIcon(v2Mall.icon)}
        </div>
        <h3 className="font-medium text-sm text-foreground">{v2Mall.title}</h3>
        <div className="w-px h-3.5 bg-border hidden sm:block" />
        <p className="text-xs text-muted-foreground">{v2Mall.desc}</p>
      </div>
      {url && enabled ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:text-primary/80 transition-colors shrink-0"
        >
          进入商城 →
        </a>
      ) : (
        <span className="text-sm text-muted-foreground shrink-0">进入商城 →</span>
      )}
    </div>
  )
}

export default function PortalHomePage() {
  const [version, setVersion] = useState<Version>("1.0")
  const { getUrl, isEnabled } = usePlatformLinks()

  const currentCategories = version === "1.0" ? categories : v2Categories
  const currentPlatforms = version === "1.0" ? platforms : v2Platforms

  return (
    <div className="relative min-h-screen bg-[#f5f7fa] pt-14 pb-12">
      {/* Main Content */}
      <div className="px-8 py-5 min-h-[calc(100vh-3.5rem-48px)]">
        {/* Title Section */}
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h1 className="text-2xl font-bold text-foreground">
              场景化数智教学服务体系
            </h1>
            <VersionTag version={version} onChange={setVersion} />
          </div>
          <div className="w-16 h-1 bg-primary mx-auto mb-3 rounded-full" />
          <div className="flex items-center justify-center gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className={`w-2 h-2 rounded-full ${feature.active ? "bg-primary" : "bg-muted"}`} />
                {feature.label}
              </div>
            ))}
          </div>
        </div>

        {/* Platform Cards */}
        <div className="max-w-6xl mx-auto">
          {currentCategories.map((cat) => {
            const platform = currentPlatforms.find((p) => p.category === cat.id)
            if (!platform) return null

            return (
              <div key={cat.id} className="flex items-stretch gap-5 mb-3">
                {/* Left Category Label */}
                <div className="w-7 flex flex-col items-center justify-center py-4">
                  <div className={`w-1 flex-1 rounded-full ${cat.color} max-h-20`} />
                  <span
                    className="text-xs text-muted-foreground mt-2 whitespace-nowrap"
                    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                  >
                    {cat.label}
                  </span>
                </div>

                {/* Cards Row */}
                <div className="flex-1 grid grid-cols-4 gap-4">
                  {platform.items.map((item, index) => (
                    <PlatformCard
                      key={index}
                      item={item}
                      url={getUrl(item.id)}
                      enabled={isEnabled(item.id)}
                    />
                  ))}
                </div>
              </div>
            )
          })}

          {/* 2.0 Mall Bar */}
          <div className={`mt-2 ${version !== "2.0" ? "opacity-0 pointer-events-none" : ""}`}>
            <MallBar url={getUrl(v2Mall.id)} enabled={isEnabled(v2Mall.id)} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ position: "fixed", bottom: 0, left: 0, right: 0, borderTop: "1px solid #d7d7d7", background: "#fff", height: "48px", zIndex: 40 }}>
        <div style={{ maxWidth: "1280px", height: "100%", margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px", color: "#636363" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <span style={{ cursor: "pointer" }}>关于平台</span>
            <span style={{ cursor: "pointer" }}>使用帮助</span>
            <span style={{ cursor: "pointer" }}>留言反馈</span>
          </div>
          <div>杭州知与未来科技有限公司 · 浙ICP xxxxxxxx</div>
        </div>
      </footer>
    </div>
  )
}
