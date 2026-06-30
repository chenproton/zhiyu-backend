"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionCard } from "./section-card"
import {
  mockPortraitStudentInfo,
  mockPortraitHonors,
  mockPortraitAcademicSummaries,
  mockPortraitRadarData,
  mockPortraitJobTabs,
  mockPortraitRecommendedJobs,
  mockPortraitRecommendedCompanies,
  mockPortraitCourseScores,
  mockPortraitGraduationDesigns,
  type PortraitJobTab,
} from "../_data/mock-student-data"

const jobTabs = ["前端开发工程师", "后端开发工程师", "产品经理", "UI设计师"] as const

const summaryColorMap: Record<number, string> = {
  0: "border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100",
  1: "border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100",
  2: "border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100",
  3: "border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100",
  4: "border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100",
  5: "border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100",
}

const summaryNumColorMap: Record<number, string> = {
  0: "text-blue-700",
  1: "text-amber-700",
  2: "text-emerald-700",
  3: "text-purple-700",
  4: "text-blue-700",
  5: "text-emerald-700",
}

const scoreOverviewColorMap: Record<string, { bg: string; border: string; text: string }> = {
  green: { bg: "bg-gradient-to-br from-green-50 to-green-100", border: "border-green-200", text: "text-emerald-700" },
  purple: { bg: "bg-gradient-to-br from-purple-50 to-purple-100", border: "border-purple-200", text: "text-purple-700" },
  blue: { bg: "bg-gradient-to-br from-blue-50 to-blue-100", border: "border-blue-200", text: "text-blue-700" },
  amber: { bg: "bg-gradient-to-br from-amber-50 to-amber-100", border: "border-amber-200", text: "text-amber-700" },
}

function AbilityTable({ data }: { data: PortraitJobTab }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[11px] border-collapse">
        <thead>
          <tr>
            <th className="bg-gray-50 p-2 text-center text-gray-600 font-semibold border border-gray-200 w-[110px]">能力域</th>
            <th className="bg-gray-50 p-2 text-center text-gray-600 font-semibold border border-gray-200">能力点</th>
            <th className="bg-gray-50 p-2 text-center text-gray-600 font-semibold border border-gray-200 w-[120px]">岗位能力认定得分</th>
            <th className="bg-gray-50 p-2 text-center text-gray-600 font-semibold border border-gray-200 w-[90px]">学生能力掌握度</th>
            <th className="bg-gray-50 p-2 text-center text-gray-600 font-semibold border border-gray-200 w-[110px]">岗位所需掌握度</th>
            <th className="bg-gray-50 p-2 text-center text-gray-600 font-semibold border border-gray-200 w-[80px]">认定结果</th>
          </tr>
        </thead>
        <tbody>
          {data.abilities.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {row.rowspan > 0 && (
                <td
                  className="bg-blue-50 text-blue-800 font-semibold text-center border border-gray-200 p-2 text-[11px]"
                  rowSpan={row.rowspan}
                >
                  {row.domain}
                </td>
              )}
              <td className="text-left p-2 border border-gray-200 text-gray-800">{row.abilityPoint}</td>
              <td className="text-center p-2 border border-gray-200">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full font-semibold text-[11px] ${
                    row.score >= 75 ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {row.score}
                </span>
              </td>
              <td className="text-center p-2 border border-gray-200">
                <span
                  className={`inline-block px-1.5 py-0.5 rounded-full text-[10px] ${
                    row.studentLevelLabel === "L5"
                      ? "bg-pink-50 text-pink-700"
                      : "bg-indigo-50 text-indigo-700"
                  }`}
                >
                  {row.studentLevel} {row.studentLevelLabel}
                </span>
              </td>
              <td className="text-center p-2 border border-gray-200">
                <span
                  className={`inline-block px-1.5 py-0.5 rounded-full text-[10px] ${
                    row.requiredLevelLabel === "L5"
                      ? "bg-pink-50 text-pink-700"
                      : "bg-indigo-50 text-indigo-700"
                  }`}
                >
                  {row.requiredLevel} {row.requiredLevelLabel}
                </span>
              </td>
              <td className="text-center p-2 border border-gray-200">
                {row.passed ? (
                  <span className="text-emerald-600 font-semibold">&#10003; 通过</span>
                ) : (
                  <span className="text-red-600 font-semibold">&#10007; 不通过</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function PortraitTab() {
  const [activeJob, setActiveJob] = useState<string>("前端开发工程师")
  const currentJob = mockPortraitJobTabs[activeJob]

  return (
    <div className="p-3">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_320px] gap-3">
          {/* ===== 左侧列 ===== */}
          <div>
            {/* 学生卡片 */}
            <div className="rounded-md p-3.5 text-white text-center mb-3 shadow-md"
              style={{ background: "linear-gradient(160deg, #1e40af 0%, #3b82f6 60%, #60a5fa 100%)" }}>
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 mx-auto mb-2 flex items-center justify-center text-[32px] backdrop-blur-sm">
                {mockPortraitStudentInfo.avatar}
              </div>
              <div className="text-base font-bold mb-0.5">{mockPortraitStudentInfo.name}</div>
              <div className="text-[11px] opacity-90 mb-2.5">
                学号：{mockPortraitStudentInfo.studentNo} | {mockPortraitStudentInfo.gender}
              </div>
              <div className="flex gap-1.5 justify-center flex-wrap">
                <span className="bg-white/25 px-2 py-0.5 rounded-full text-[10px] backdrop-blur-sm">
                  {mockPortraitStudentInfo.college}
                </span>
                <span className="bg-white/25 px-2 py-0.5 rounded-full text-[10px] backdrop-blur-sm">
                  {mockPortraitStudentInfo.major}
                </span>
              </div>
            </div>

            {/* 基础信息 */}
            <div className="bg-white rounded-md p-3 shadow-sm mb-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 mb-2.5">
                <span className="text-[13px] font-semibold text-gray-800 flex items-center gap-1.5">
                  <span className="w-[3px] h-3 bg-blue-500 rounded-sm" />
                  基础信息
                </span>
              </div>
              <div className="space-y-0">
                {[
                  { label: "所属院系", value: mockPortraitStudentInfo.college },
                  { label: "所属专业", value: mockPortraitStudentInfo.major },
                  { label: "所属班级", value: mockPortraitStudentInfo.className },
                  { label: "所属年级", value: mockPortraitStudentInfo.grade },
                  { label: "专业排名", value: `第 ${mockPortraitStudentInfo.rank} 名`, color: "text-red-600 font-bold" },
                  { label: "违纪记录", value: mockPortraitStudentInfo.violation, color: "text-emerald-600" },
                  { label: "体测情况", value: mockPortraitStudentInfo.physicalTest, color: "text-emerald-600" },
                  { label: "党员身份", value: mockPortraitStudentInfo.partyStatus, color: "text-amber-600" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-[7px] border-b border-dashed border-gray-100 last:border-b-0 text-xs">
                    <span className="text-gray-500">{item.label}</span>
                    <span className={`text-gray-800 font-medium ${item.color ?? ""}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 学业概况 */}
            <div className="bg-white rounded-md p-3 shadow-sm mb-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 mb-2.5">
                <span className="text-[13px] font-semibold text-gray-800 flex items-center gap-1.5">
                  <span className="w-[3px] h-3 bg-blue-500 rounded-sm" />
                  学业概况
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {mockPortraitAcademicSummaries.map((item, i) => (
                  <div
                    key={item.label}
                    className={`rounded-md p-2.5 text-center border ${summaryColorMap[i % 6]}`}
                  >
                    <div className={`text-lg font-bold leading-tight ${summaryNumColorMap[i % 6]}`}>
                      {item.value}{item.unit}
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 获得荣誉 */}
            <div className="bg-white rounded-md p-3 shadow-sm mb-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 mb-2.5">
                <span className="text-[13px] font-semibold text-gray-800 flex items-center gap-1.5">
                  <span className="w-[3px] h-3 bg-blue-500 rounded-sm" />
                  获得荣誉
                </span>
                <span className="text-[11px] text-gray-500">{mockPortraitHonors.length} 项</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {mockPortraitHonors.map((honor) => (
                  <div
                    key={honor.name}
                    className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 p-2 rounded-md text-center text-[11px] text-amber-800 font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all"
                  >
                    <span className="text-lg block mb-0.5">{honor.icon}</span>
                    {honor.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== 中间列 ===== */}
          <div>
            <div className="bg-white rounded-md p-3 shadow-sm">
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 mb-2.5">
                <span className="text-[13px] font-semibold text-gray-800 flex items-center gap-1.5">
                  <span className="w-[3px] h-3 bg-blue-500 rounded-sm" />
                  🎯 目标岗位能力画像
                </span>
              </div>

              {/* 岗位 Tab */}
              <div className="flex gap-1 mb-2.5 border-b border-gray-100">
                {jobTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveJob(tab)}
                    className={`px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap relative ${
                      activeJob === tab
                        ? "text-blue-600 font-semibold after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {currentJob && (
                <div className="space-y-4">
                  {/* 雷达图 + 指标 */}
                  <div className="grid grid-cols-[1fr_320px] gap-3.5 items-center">
                    <div className="h-[240px]">
                      <RadarChartView data={mockPortraitRadarData[activeJob]} />
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {currentJob.scoreOverview.map((item) => {
                        const colors = scoreOverviewColorMap[item.color]
                        return (
                          <div
                            key={item.label}
                            className={`rounded-lg p-3.5 text-center border ${colors.bg} ${colors.border} shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all`}
                          >
                            <div className={`text-xl font-bold leading-tight ${colors.text}`}>
                              {item.value}
                            </div>
                            <div className="text-[11px] text-gray-500 mt-1 font-medium">{item.label}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* 能力画像表 */}
                  <AbilityTable data={currentJob} />
                </div>
              )}
            </div>
          </div>

          {/* ===== 右侧列 ===== */}
          <div>
            {/* 推荐就业方向 */}
            <div className="bg-white rounded-md p-3 shadow-sm mb-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 mb-2.5">
                <span className="text-[13px] font-semibold text-gray-800 flex items-center gap-1.5">
                  <span className="w-[3px] h-3 bg-blue-500 rounded-sm" />
                  💼 推荐就业方向
                </span>
              </div>

              {/* 推荐岗位 */}
              <div className="mb-3.5">
                <div className="text-xs font-semibold text-gray-700 mb-2">推荐岗位</div>
                <div className="space-y-2">
                  {mockPortraitRecommendedJobs.map((job) => (
                    <div
                      key={job.name}
                      className="p-2.5 rounded-md bg-gradient-to-br from-blue-50 to-indigo-50 border-l-[3px] border-l-blue-500"
                      style={job.matchColor ? { borderLeftColor: job.matchColor, background: "linear-gradient(135deg, #f5f3ff, #ede9fe)" } : undefined}
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-semibold text-gray-800">{job.name}</span>
                        <span
                          className="text-white px-2 py-0.5 rounded-full text-[10px] font-semibold"
                          style={{ background: job.matchColor ? `linear-gradient(135deg, ${job.matchColor}, #a78bfa)` : "linear-gradient(135deg, #3b82f6, #6366f1)" }}
                        >
                          匹配 {job.match}%
                        </span>
                      </div>
                      <div className="h-[5px] bg-gray-200 rounded-full overflow-hidden mb-1.5">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${job.match}%`,
                            background: job.matchColor
                              ? `linear-gradient(90deg, ${job.matchColor}, #a78bfa)`
                              : "linear-gradient(90deg, #3b82f6, #6366f1)",
                          }}
                        />
                      </div>
                      <div className="text-[11px] text-gray-500">{job.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 推荐企业 */}
              <div>
                <div className="text-xs font-semibold text-gray-700 mb-2">推荐企业</div>
                <div className="space-y-2">
                  {mockPortraitRecommendedCompanies.map((company) => (
                    <div
                      key={company.name}
                      className="p-2.5 rounded-md bg-gradient-to-br from-blue-50 to-indigo-50 border-l-[3px]"
                      style={{
                        borderLeftColor: company.matchColor,
                        background:
                          company.matchColor === "#10b981"
                            ? "linear-gradient(135deg, #ecfdf5, #d1fae5)"
                            : company.matchColor === "#f59e0b"
                            ? "linear-gradient(135deg, #fffbeb, #fef3c7)"
                            : "linear-gradient(135deg, #eff6ff, #dbeafe)",
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold text-gray-800">{company.name}</span>
                        <span
                          className="text-white px-2 py-0.5 rounded-full text-[10px] font-semibold"
                          style={{ background: `linear-gradient(135deg, ${company.matchColor}, ${company.matchColor})` }}
                        >
                          匹配 {company.match}%
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {company.positions.map((pos) => (
                          <span
                            key={pos}
                            className="px-1.5 py-0.5 rounded text-[10px]"
                            style={{
                              background:
                                company.matchColor === "#10b981"
                                  ? "#d1fae5"
                                  : company.matchColor === "#f59e0b"
                                  ? "#fef3c7"
                                  : "#dbeafe",
                              color:
                                company.matchColor === "#10b981"
                                  ? "#065f46"
                                  : company.matchColor === "#f59e0b"
                                  ? "#92400e"
                                  : "#1e40af",
                            }}
                          >
                            {pos}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 课程成绩 */}
            <div className="bg-white rounded-md p-3 shadow-sm mb-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 mb-2.5">
                <span className="text-[13px] font-semibold text-gray-800 flex items-center gap-1.5">
                  <span className="w-[3px] h-3 bg-blue-500 rounded-sm" />
                  📚 课程成绩
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr>
                      <th className="bg-gray-50 p-1.5 text-left text-gray-600 font-semibold border-b border-gray-200">课程名称</th>
                      <th className="bg-gray-50 p-1.5 text-center text-gray-600 font-semibold border-b border-gray-200 w-[50px]">分数</th>
                      <th className="bg-gray-50 p-1.5 text-center text-gray-600 font-semibold border-b border-gray-200 w-[50px]">等级</th>
                      <th className="bg-gray-50 p-1.5 text-center text-gray-600 font-semibold border-b border-gray-200 w-[60px]">班级排名</th>
                      <th className="bg-gray-50 p-1.5 text-center text-gray-600 font-semibold border-b border-gray-200 w-[60px]">到课率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPortraitCourseScores.map((course) => (
                      <tr key={course.name} className="hover:bg-gray-50">
                        <td className="p-2 border-b border-gray-100 text-gray-800">{course.name}</td>
                        <td className="p-2 text-center border-b border-gray-100">
                          <span className="text-blue-600 font-bold">{course.score}</span>
                        </td>
                        <td className="p-2 text-center border-b border-gray-100">
                          <span className="inline-block px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-green-100 text-green-700">
                            {course.level}
                          </span>
                        </td>
                        <td className="p-2 text-center border-b border-gray-100 text-gray-600">{course.classRank}</td>
                        <td className="p-2 text-center border-b border-gray-100 text-gray-600">{course.attendance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 毕业设计 */}
            <div className="bg-white rounded-md p-3 shadow-sm mb-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 mb-2.5">
                <span className="text-[13px] font-semibold text-gray-800 flex items-center gap-1.5">
                  <span className="w-[3px] h-3 bg-blue-500 rounded-sm" />
                  🎓 毕业设计
                </span>
              </div>
              <div className="space-y-2">
                {mockPortraitGraduationDesigns.map((design) => (
                  <div
                    key={design.title}
                    className="flex justify-between items-center py-2 px-2.5 bg-gray-50 rounded-md"
                  >
                    <span className="font-medium text-gray-800 text-xs">{design.title}</span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{
                        background: design.statusColor,
                        color: design.status === "已通过" ? "#15803d" : "#b45309",
                      }}
                    >
                      {design.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RadarChartView({ data }: { data: number[] }) {
  const {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Tooltip,
    ResponsiveContainer,
  } = require("recharts")

  const radarData = [
    { name: "岗位认知", value: data[0] },
    { name: "专业技能", value: data[1] },
    { name: "软技能", value: data[2] },
    { name: "项目经验", value: data[3] },
    { name: "工具应用", value: data[4] },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={radarData}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="name" tick={{ fontSize: 11, fill: "#475569", fontWeight: 500 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          name="当前能力"
          dataKey="value"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  )
}
