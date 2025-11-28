"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

import adaptiveQuestions from "@/data/adaptive-questions.json"
import { AdaptiveAssessmentEngine } from "@/lib/adaptive-engine"
import { ConversationPDFGenerator } from "@/components/conversation-pdf-generator"
import { ConversationPDFContent } from "@/components/conversation-pdf-content"
import {
  type ConversationProfile,
  type Tier,
  type TierGapInfo,
  type DimensionPercentageInput,
  getProfileFromGlobalScore,
  getProfileTier,
  computeGapsFromPercentages,
  getTierStatus,
  suggestActionsForDimension,
  describeConversationProfile,
} from "@/lib/scoring-utils"


export interface EnrichedDimensionScore {
  [key: string]: unknown
  id: string
  name: string
  score: number
  icon: string
  tier: Tier
  targetTier: Tier
  gap: number
  priority: "High" | "Medium" | "Low"
  status: "Above target" | "On target" | "Below target"
}

export interface PersonalizedResults {
  globalScore: number
  profile: ConversationProfile
  profileColor: string
  dimensionScores: EnrichedDimensionScore[]
  timeToComplete: string
  keyStrengths: string[]
  criticalGaps: string[]
  quickWins: string[]
  strategicInitiatives: string[]
  profileDescription: string
}

interface BaseDimensionScore {
  id: string
  name: string
  score: number
  icon: string
}

export default function ConversationResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<PersonalizedResults | null>(null)
  const [companyData, setCompanyData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const answers = localStorage.getItem("conversationAnswers")
    const company = localStorage.getItem("assessmentData")
    const state = localStorage.getItem("conversationState")

    if (!answers) {
      router.push("/conversation")
      return
    }

    const parsedAnswers = JSON.parse(answers)
    const parsedCompany = company ? JSON.parse(company) : null
    const parsedState = state ? JSON.parse(state) : null

    setCompanyData(parsedCompany)

    const engine = new AdaptiveAssessmentEngine(adaptiveQuestions)

    const baseDimensionScores: BaseDimensionScore[] = adaptiveQuestions.dimensions.map((dim: any) => ({
      id: dim.id,
      name: dim.name,
      score: engine.calculateScore(dim.id, parsedAnswers),
      icon: dim.icon,
    }))

    const globalScore = Math.round(
      baseDimensionScores.reduce((sum: number, d: BaseDimensionScore) => sum + d.score, 0) / baseDimensionScores.length,
    )

    const profile = getProfileFromGlobalScore(globalScore)
    const targetTier = 4

    const dimensionPercentages: DimensionPercentageInput[] = baseDimensionScores.map((d) => ({
      id: d.id,
      name: d.name,
      percentage: d.score,
    }))
    
    const gapInfos: TierGapInfo[] = computeGapsFromPercentages(dimensionPercentages, targetTier)

    const gapMap = new Map<string, TierGapInfo>(gapInfos.map((g) => [g.id, g]))

    const dimensionScores: EnrichedDimensionScore[] = baseDimensionScores.map((dim) => {
      const gapInfo = gapMap.get(dim.id)
      if (!gapInfo) {
        throw new Error(`Missing gap info for dimension ${dim.id}`)
      }
      const status = getTierStatus(gapInfo.achievedTier, gapInfo.targetTier)

      return {
        id: dim.id,
        name: dim.name,
        score: dim.score,
        icon: dim.icon,
        tier: gapInfo.achievedTier,
        targetTier: gapInfo.targetTier,
        gap: gapInfo.gap,
        priority: gapInfo.priority,
        status,
      }
    })

    const getProfileColor = (profile: ConversationProfile) => {
      const colors: Record<ConversationProfile, string> = {
        Beginner: "from-yellow-600 to-yellow-700",
        Emerging: "from-blue-600 to-blue-700",
        Challenger: "from-purple-600 to-purple-700",
        Leader: "from-green-600 to-green-700",
      }

      return colors[profile] || "from-blue-600 to-blue-700"
    }

    const timeElapsed = parsedState?.startTime ? Math.round((Date.now() - parsedState.startTime) / 1000) : 0

    const timeToComplete = `${Math.floor(timeElapsed / 60)}:${String(timeElapsed % 60).padStart(2, "0")}`

    const strengthDimensions = dimensionScores
      .filter((d) => d.gap === 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)

    const gapDimensions = dimensionScores.filter((d) => d.gap > 0).sort((a, b) => b.gap - a.gap || a.score - b.score)

    const keyStrengths = strengthDimensions.map((d) => d.name)
    const criticalGaps = gapDimensions.slice(0,3).map((d) => d.name)

    const quickWins: string[] = []
    const strategicInitiatives: string[] = []

    gapDimensions.forEach((dim) => {
      const actions = suggestActionsForDimension(dim.id, dim.gap)
      actions.quickWins.forEach((a) => quickWins.push(`${dim.name} – ${a}`))
      actions.strategic.forEach((a) => strategicInitiatives.push(`${dim.name} – ${a}`))
    })

    setResults({
      globalScore,
      profile,
      profileColor: getProfileColor(profile),
      dimensionScores,
      timeToComplete,
      keyStrengths,
      criticalGaps,
      quickWins: quickWins.length
        ? Array.from(new Set(quickWins))
        : ["Consolidate fundamentals on 1–2 key dimensions before launching more ambitious initiatives."],
      strategicInitiatives: strategicInitiatives.length
        ? Array.from(new Set(strategicInitiatives))
        : ["Define an integrated digital roadmap that prioritises the dimensions with the largest maturity gaps."],
      profileDescription: describeConversationProfile(profile),
    })

    setLoading(false)
  }, [router])

  if (loading || !results || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Analyzing your responses...</p>
        </div>
      </div>
    )
  }

  const radarData = results.dimensionScores.map((d) => ({
    name: d.icon,
    score: d.score,
    fullName: d.name,
  }));

  // These are now safe because they only run on the client after the loading state
  const timestamp = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-block mb-6">
            <Button variant="outline">← Back to Home</Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Your Personalized Assessment Results</h1>
          <p className="text-slate-600">
            {companyData?.company_name} • Completed in {results.timeToComplete}
          </p>
        </div>

        {/* Profile Card */}
        <Card className={`mb-12 border-0 bg-gradient-to-br ${results.profileColor} text-white shadow-xl`}>
          <div className="p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-white/20 text-white border-0">Your Digital Maturity Profile</Badge>
                <div className="text-5xl sm:text-7xl font-bold mb-4">{results.globalScore}%</div>
                <p className="text-3xl sm:text-4xl font-bold mb-6">{results.profile}</p>
                <p className="text-white/90 text-lg leading-relaxed">{results.profileDescription}</p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full h-auto" style={{ minHeight: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#ffffff" strokeOpacity={0.3} />
                      <PolarAngleAxis dataKey="name" stroke="#ffffff" />
                      <PolarRadiusAxis stroke="#ffffff" strokeOpacity={0.3} domain={[0, 100]} />
                      <Radar name="Score" dataKey="score" stroke="#ffffff" fill="#ffffff" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Dimension Scores Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Chart */}
          <Card className="p-6 border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Dimension Performance</h2>
            <div className="w-full h-auto" style={{ minHeight: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={results.dimensionScores}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="icon" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                    }}
                    labelStyle={{ color: "#ffffff" }}
                    formatter={(value: any) => [`${value}%`, "Score"]}
                  />
                  <Bar dataKey="score" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Scores Breakdown */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Detailed Breakdown</h2>
            {results.dimensionScores.map((dim) => (
              <Card key={dim.id} className="p-4 border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{dim.icon}</span>
                    <h3 className="font-semibold text-slate-900">{dim.name}</h3>
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-blue-600">{dim.score}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full"
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
                <div className="text-xs text-slate-600 mt-2">
                  {dim.status} • Gap: {dim.gap} levels
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Findings */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Strengths */}
          <Card className="p-6 border-green-200 bg-green-50">
            <h3 className="font-bold text-slate-900 mb-4">Your Strengths</h3>
            <ul className="space-y-3">
              {results && results.keyStrengths.length > 0 ? (
                results.keyStrengths.map((strength, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-slate-700">{strength}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-600">No identified strengths yet</li>
              )}
            </ul>
          </Card>

          {/* Critical Gaps */}
          <Card className="p-6 border-amber-200 bg-amber-50">
            <h3 className="font-bold text-slate-900 mb-4">Priority Focus Areas</h3>
            <ul className="space-y-3">
              {results && results.criticalGaps.length > 0 ? (
                results.criticalGaps.map((gap, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-amber-600 font-bold">!</span>
                    <span className="text-slate-700">{gap}</span>
                  </li>
                ))
              ) : (
                <li className="text-slate-600">All dimensions are well-aligned</li>
              )}
            </ul>
          </Card>
        </div>

        {/* Action Plan */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Quick Wins */}
          <Card className="p-6 border-slate-200">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-slate-900 mb-4">Quick Wins (0-90 days)</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              {results.quickWins.map((win, i) => (
                <li key={i} className="flex gap-2">
                  <span>•</span>
                  <span>{win}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Strategic Initiatives */}
          <Card className="p-6 border-slate-200">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-bold text-slate-900 mb-4">Strategic Initiatives (6-12 months)</h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              {results.strategicInitiatives.map((init, i) => (
                <li key={i} className="flex gap-2">
                  <span>•</span>
                  <span>{init}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* CTA */}
        <div className="flex gap-4 justify-center flex-wrap mb-8">
          {results && companyData && (
            <ConversationPDFGenerator
              data={{
                ...results,
                company_name: companyData?.company_name,
                industry: companyData?.industry,
                size: companyData?.size,
                timestamp,
                currentYear,
              }}
            />
          )}
          <Link href="/">
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Start New Assessment
            </Button>
          </Link>
        </div>

        {/* Hidden PDF Content for generation (kept off-screen but rendered) */}
        {results && companyData && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "800px",
              maxWidth: "100%",
              opacity: 0,
              pointerEvents: "none",
              zIndex: -1,
            }}
          >
            <ConversationPDFContent
              data={{
                ...results,
                company_name: companyData?.company_name,
                industry: companyData?.industry,
                size: companyData?.size,
                timestamp,
                currentYear,
                
              }}
             
            />
          </div>
        )}
      </div>
    </main>
  )
}
