'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import criteriaData from '@/data/criteria.json'

interface Criterion {
  id: string
  label: string
  description: string
}

interface Palier {
  level: number
  name: string
  criteria: Criterion[]
}

interface Dimension {
  id: string
  name: string
  description: string
  paliers: Palier[]
}

export default function AssessmentPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [companyData, setCompanyData] = useState<any>(null)

  const dimensions: Dimension[] = criteriaData.dimensions

  useEffect(() => {
    const data = localStorage.getItem('assessmentData')
    if (data) {
      setCompanyData(JSON.parse(data))
    }
  }, [])

  const currentDimension = dimensions[currentDimensionIndex]
  const progress = ((currentDimensionIndex + 1) / dimensions.length) * 100

  const handleAnswer = (criterionId: string, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [criterionId]: score
    }))
  }

  const isCurrentDimensionComplete = currentDimension?.paliers.every(palier =>
    palier.criteria.every(criterion => answers[criterion.id] !== undefined)
  )

  const handleNext = () => {
    if (isCurrentDimensionComplete) {
      if (currentDimensionIndex < dimensions.length - 1) {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentDimensionIndex(currentDimensionIndex + 1)
          setIsTransitioning(false)
          window.scrollTo(0, 0)
        }, 300)
      } else {
        localStorage.setItem('assessmentAnswers', JSON.stringify(answers))
        router.push('/results')
      }
    }
  }

  const handlePrevious = () => {
    if (currentDimensionIndex > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentDimensionIndex(currentDimensionIndex - 1)
        setIsTransitioning(false)
        window.scrollTo(0, 0)
      }, 300)
    }
  }

  if (!companyData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const getScoreColor = (score: number) => {
    if (score === 0) return 'bg-slate-200 text-slate-900'
    if (score === 1) return 'bg-yellow-100 text-yellow-900'
    if (score === 2) return 'bg-blue-100 text-blue-900'
    return 'bg-green-100 text-green-900'
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Badge className="mb-2">Assessment in Progress</Badge>
              <h1 className="text-3xl font-bold text-slate-900">{currentDimension?.name}</h1>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-600 mb-1">Progress</div>
              <div className="text-2xl font-bold text-blue-600">{currentDimensionIndex + 1}/{dimensions.length}</div>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Dimension Description */}
        <Card className="mb-8 p-6 border-slate-200 bg-gradient-to-r from-blue-50 to-slate-50">
          <p className="text-slate-700">{currentDimension?.description}</p>
        </Card>

        {/* Questions */}
        <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
          {currentDimension?.paliers.map((palier: Palier) => (
            <Card key={palier.level} className="mb-6 border-slate-200">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-lg">
                <h3 className="font-semibold text-lg">Level {palier.level}: {palier.name}</h3>
              </div>

              <div className="p-6 space-y-6">
                {palier.criteria.map((criterion: Criterion) => (
                  <div key={criterion.id} className="border-b border-slate-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-900 text-base mb-1">{criterion.label}</h4>
                      <p className="text-slate-600 text-sm">{criterion.description}</p>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {[0, 1, 2, 3].map((score) => (
                        <button
                          key={score}
                          onClick={() => handleAnswer(criterion.id, score)}
                          className={`px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                            answers[criterion.id] === score
                              ? 'ring-2 ring-blue-600 ' + getScoreColor(score)
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <div className="text-lg font-bold">{score}</div>
                          <div className="text-xs mt-1">
                            {score === 0 && 'None'}
                            {score === 1 && 'Basic'}
                            {score === 2 && 'Good'}
                            {score === 3 && 'Excellent'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-12">
          <Button
            onClick={handlePrevious}
            variant="outline"
            disabled={currentDimensionIndex === 0}
            className="flex-1 h-12"
          >
            Previous Dimension
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isCurrentDimensionComplete}
            className="flex-1 h-12"
          >
            {currentDimensionIndex === dimensions.length - 1 ? 'Complete Assessment' : 'Next Dimension'}
          </Button>
        </div>

        {/* Completion Status */}
        {isCurrentDimensionComplete && (
          <div className="mt-6 text-center text-green-600 text-sm font-semibold">
            ✓ This dimension is complete
          </div>
        )}
      </div>
    </main>
  )
}
