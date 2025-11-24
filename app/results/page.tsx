'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PDFGenerator } from '@/components/pdf-generator'
import { PDFContent } from '@/components/pdf-content'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import criteriaData from '@/data/criteria.json'
import {
  PalierScores,
  DimensionScore as CoreDimensionScore,
  GapInfo,
  computeDimensionFromPaliers,
  computeGlobalScore,
  getProfile,
  getProfileLevel,
  computeGaps,
  Profile,
} from '@/lib/scoring-utils'

interface DimensionScoreUI extends CoreDimensionScore {
  // alias for existing UI usage
  score: number // equals rawScore
}

interface Results {
  globalScore: number
  profile: Profile
  profileLevel: 1 | 2 | 3 | 4
  profileColor: string
  dimensions: DimensionScoreUI[]
  gaps: GapInfo[]
}

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<Results | null>(null)
  const [companyData, setCompanyData] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const assessmentData = localStorage.getItem('assessmentData')
    const answersData = localStorage.getItem('assessmentAnswers')

    if (assessmentData) {
      setCompanyData(JSON.parse(assessmentData))
    }

    if (answersData) {
      const answers = JSON.parse(answersData)
      calculateResults(answers)
    }
  }, [])

  const calculateResults = (answers: Record<string, unknown>) => {
    const coreDimensions: CoreDimensionScore[] = []
    const uiDimensions: DimensionScoreUI[] = []

    criteriaData.dimensions.forEach((dim: any) => {
      const palierScores: PalierScores = { p1: 0, p2: 0, p3: 0, p4: 0 }

      dim.paliers.forEach((palier: any) => {
        let palierTotal = 0

        palier.criteria.forEach((criterion: any) => {
          // force numeric conversion & safe fallback
          const raw = answers[criterion.id]
          const score = raw === undefined ? 0 : Number(raw)

          if (!Number.isNaN(score)) {
            palierTotal += score
          }
        })

        // each palier level is 1..4
        if (palier.level === 1) palierScores.p1 = palierTotal
        if (palier.level === 2) palierScores.p2 = palierTotal
        if (palier.level === 3) palierScores.p3 = palierTotal
        if (palier.level === 4) palierScores.p4 = palierTotal
      })

      const coreDim = computeDimensionFromPaliers(dim.id, dim.name, palierScores)
      coreDimensions.push(coreDim)

      uiDimensions.push({
        ...coreDim,
        score: coreDim.rawScore, // alias for existing UI
      })
    })

    const globalScore = computeGlobalScore(coreDimensions)
    const profile = getProfile(globalScore)
    const profileLevel = getProfileLevel(profile)

    const gaps = computeGaps(coreDimensions, profileLevel)

    const getProfileColor = (p: Profile) => {
      if (p === 'Débutant') return 'text-yellow-600'
      if (p === 'Émergent') return 'text-blue-600'
      if (p === 'Challenger') return 'text-purple-600'
      return 'text-green-600'
    }

    setResults({
      globalScore,
      profile,
      profileLevel,
      profileColor: getProfileColor(profile),
      dimensions: uiDimensions,
      gaps,
    })
  }

  if (!mounted || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your results...</p>
        </div>
      </div>
    )
  }

  const COLORS = ['#2563eb', '#7c3aed', '#ec4899', '#10b981', '#f97316', '#ef4444']

  // data for the bar chart
  const dimensionChartData = results.dimensions.map(d => ({
    name: d.name,
    percentage: d.percentage,
  }))

  // helpers for strongest / weakest dimensions
  const strongestDimension = results.dimensions.reduce((max, d) =>
    d.percentage > max.percentage ? d : max
  )
  const weakestDimension = results.dimensions.reduce((min, d) =>
    d.percentage < min.percentage ? d : min
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-block mb-6">
            <Button variant="outline">← Back to Home</Button>
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Your Digital Maturity Assessment Results
          </h1>
          <p className="text-slate-600">
            {companyData?.company_name} • {companyData?.industry}
          </p>
        </div>

        {/* Global Score Card */}
        <Card className="mb-12 border-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl">
          <div className="p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-white/20 text-white border-0">
                  Overall Assessment
                </Badge>
                <div className="text-7xl font-bold mb-4">
                  {results.globalScore}%
                </div>
                <p className={`text-4xl font-bold mb-4 ${results.profileColor}`}>
                  {results.profile}
                </p>
                <p className="text-blue-100 text-lg">
                  {results.profile === 'Débutant' &&
                    'Your organization is beginning its digital transformation journey. Focus on building awareness and initial capabilities.'}
                  {results.profile === 'Émergent' &&
                    'Your organization has established foundational digital initiatives. Ready to accelerate and scale digital transformation.'}
                  {results.profile === 'Challenger' &&
                    'Your organization demonstrates advanced digital capabilities. Focus on innovation and strategic optimization.'}
                  {results.profile === 'Leader' &&
                    'Your organization is a digital leader. Continue advancing and innovating in emerging technologies.'}
                </p>
              </div>
              <div className="flex justify-center">
                <PieChart width={300} height={300}>
                  <Pie
                    data={[
                      { value: results.globalScore },
                      { value: 100 - results.globalScore },
                    ]}
                    cx={150}
                    cy={150}
                    innerRadius={80}
                    outerRadius={120}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Cell fill="#ffffff" />
                    <Cell fill="rgba(255,255,255,0.2)" />
                  </Pie>
                </PieChart>
              </div>
            </div>
          </div>
        </Card>

        {/* Dimension Scores */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Chart */}
          <Card className="p-6 border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Dimension Scores
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dimensionChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#ffffff' }}
                />
                <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                  {dimensionChartData.map((_, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Detailed Scores */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Detailed Breakdown
            </h2>
            {results.dimensions.map(dim => (
              <Card key={dim.id} className="p-4 border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">{dim.name}</h3>
                  <span className="text-2xl font-bold text-blue-600">
                    {dim.percentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${dim.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Score: {dim.score}/36
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <Card className="mb-12 p-8 border-slate-200 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-l-amber-500">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Key Insights</h2>
          <div className="space-y-3 text-slate-700">
            <p>
              • Your strongest dimension is{' '}
              <strong>{strongestDimension.name}</strong> with a score of{' '}
              {strongestDimension.percentage}%.
            </p>
            <p>
              • Your primary focus area is{' '}
              <strong>{weakestDimension.name}</strong> with a score of{' '}
              {weakestDimension.percentage}%.
            </p>
            <p>
              • Based on your profile as a <strong>{results.profile}</strong>, we
              recommend prioritizing quick wins while building foundational
              capabilities for long-term transformation.
            </p>
          </div>
        </Card>

        {/* Action Items */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 border-slate-200">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-slate-900 mb-2">
              Immediate Actions (0-30 days)
            </h3>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>• Establish digital steering committee</li>
              <li>• Create digital transformation roadmap</li>
              <li>• Initiate stakeholder engagement</li>
            </ul>
          </Card>
          <Card className="p-6 border-slate-200">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="font-bold text-slate-900 mb-2">
              Short-term Plan (3-6 months)
            </h3>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>• Focus on identified gap areas</li>
              <li>• Implement quick wins</li>
              <li>• Build organizational capability</li>
            </ul>
          </Card>
          <Card className="p-6 border-slate-200">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-bold text-slate-900 mb-2">
              Long-term Vision (6-12 months)
            </h3>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>• Scale transformation initiatives</li>
              <li>• Advance to next maturity level</li>
              <li>• Establish continuous improvement</li>
            </ul>
          </Card>
        </div>

        {/* PDF generation section */}
        <div className="flex gap-4 justify-center mb-8 flex-wrap">
          {results && companyData && (
            <PDFGenerator
              data={{
                globalScore: results.globalScore,
                profile: results.profile,
                company_name: companyData?.company_name ?? '',
                // Cast to match PDFGenerator's expected DimensionData[] shape
                dimensions: results.dimensions as any,
                industry: companyData?.industry ?? '',
                size: companyData?.size ?? '',
              }}
            />
          )}
          <Link href="/">
            <Button variant="outline" size="lg" className="px-8">
              New Assessment
            </Button>
          </Link>
        </div>

        {/* Hidden PDF Content for generation (kept off-screen but rendered) */}
        {results && companyData && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-9999px',
              top: 0,
              // Give the PDF content a real layout size while keeping it off-screen
              width: '800px',
              maxWidth: '100%',
              overflow: 'visible',
              pointerEvents: 'none',
            }}
          >
            <PDFContent
              data={{
                globalScore: results.globalScore,
                profile: results.profile,
                profileLevel: results.profileLevel,
                company_name: companyData?.company_name ?? '',
                industry: companyData?.industry ?? '',
                size: companyData?.size ?? '',
                dimensions: results.dimensions,
                gaps: results.gaps,
              }}
              timestamp={new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            />
          </div>
        )}
      </div>
    </main>
  )
}
