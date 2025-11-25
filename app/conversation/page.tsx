'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import adaptiveQuestions from '@/data/adaptive-questions.json'
import { AdaptiveAssessmentEngine, type AdaptiveQuestion } from '@/lib/adaptive-engine'

interface ConversationState {
  currentQuestionId: string
  currentDimensionId: string
  answers: Record<string, number | number[]>
  visitedQuestions: string[]
  dimensionsCompleted: Set<string>
  startTime: number
}

export default function ConversationPage() {
  const router = useRouter()
  const [state, setState] = useState<ConversationState | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<AdaptiveQuestion | null>(null)
  const [engine, setEngine] = useState<AdaptiveAssessmentEngine | null>(null)
  const [loading, setLoading] = useState(true)
  const [answering, setAnswering] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null)
  const [companyData, setCompanyData] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem('assessmentData')
    if (data) setCompanyData(JSON.parse(data))

    const newEngine = new AdaptiveAssessmentEngine(adaptiveQuestions)
    setEngine(newEngine)

    const savedState = localStorage.getItem('conversationState')
    if (savedState) {
      const parsed = JSON.parse(savedState)
      setState(parsed)
      const q = newEngine.getQuestion(parsed.currentQuestionId)
      setCurrentQuestion(q || null)
    } else {
      const initialState: ConversationState = {
        currentQuestionId: 'strat_q1',
        currentDimensionId: 'strategie',
        answers: {},
        visitedQuestions: [],
        dimensionsCompleted: new Set(),
        startTime: Date.now()
      }
      setState(initialState)
      const q = newEngine.getQuestion('strat_q1')
      setCurrentQuestion(q || null)
    }

    setLoading(false)
  }, [])

  if (loading || !state || !engine || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-12 w-48 bg-slate-200 rounded mx-auto"></div>
            <div className="h-4 w-64 bg-slate-200 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  const handleAnswer = async (answer: any) => {
    setAnswering(true)

    const scoreValue = currentQuestion.type === 'multiselect' && Array.isArray(answer)
      ? (answer as string[]).map(v => {
          const opt = currentQuestion.options?.find(o => o.value === v)
          return opt?.score || 0
        })
      : currentQuestion.options?.find(o => o.value === answer)?.score ||
        (currentQuestion.scoring ? currentQuestion.scoring[answer === true ? 'yes' : 'no'] : 0)

    const newAnswers = { ...state.answers, [currentQuestion.id]: scoreValue }
    const newVisited = [...state.visitedQuestions, currentQuestion.id]

    const nextQuestionId = engine.getNextQuestion(currentQuestion, answer)

    if (!nextQuestionId) {
      const allDimensions = adaptiveQuestions.dimensions.map(d => d.id)
      const newCompleted = new Set(state.dimensionsCompleted)
      newCompleted.add(state.currentDimensionId)

      if (newCompleted.size === allDimensions.length) {
        const finalState: ConversationState = {
          ...state,
          answers: newAnswers,
          visitedQuestions: newVisited,
          dimensionsCompleted: newCompleted
        }
        localStorage.setItem('conversationAnswers', JSON.stringify(newAnswers))
        localStorage.setItem('conversationState', JSON.stringify(finalState))

        setTimeout(() => router.push('/conversation-results'), 500)
      } else {
        const nextDim = allDimensions.find(d => !newCompleted.has(d))
        if (nextDim) {
          const nextDimData = adaptiveQuestions.dimensions.find(d => d.id === nextDim)
          const firstQ = nextDimData?.branches[0]?.questions[0]?.id
          if (firstQ) {
            const updatedState: ConversationState = {
              ...state,
              currentQuestionId: firstQ,
              currentDimensionId: nextDim,
              answers: newAnswers,
              visitedQuestions: newVisited,
              dimensionsCompleted: newCompleted
            }
            setState(updatedState)
            localStorage.setItem('conversationState', JSON.stringify(updatedState))
            setCurrentQuestion(engine.getQuestion(firstQ) || null)
            setSelectedAnswer(null)
          }
        }
      }
    } else {
      const nextQ = engine.getQuestion(nextQuestionId)
      const updatedState: ConversationState = {
        ...state,
        currentQuestionId: nextQuestionId,
        answers: newAnswers,
        visitedQuestions: newVisited
      }
      setState(updatedState)
      localStorage.setItem('conversationState', JSON.stringify(updatedState))
      setCurrentQuestion(nextQ || null)
      setSelectedAnswer(null)
    }

    setAnswering(false)
  }

  const progress = (state.visitedQuestions.length / 72) * 100
  const dimensionLabel = adaptiveQuestions.dimensions.find(d => d.id === state.currentDimensionId)
  const timeElapsed = Math.round((Date.now() - state.startTime) / 1000)

  const renderAnswerOptions = () => {
    if (currentQuestion.type === 'binary') {
      return (
        <div className="flex gap-4">
          <Button
            onClick={() => handleAnswer(true)}
            disabled={answering}
            size="lg"
            className="flex-1"
            variant={selectedAnswer === true ? 'default' : 'outline'}
          >
            Yes
          </Button>
          <Button
            onClick={() => handleAnswer(false)}
            disabled={answering}
            size="lg"
            className="flex-1"
            variant={selectedAnswer === false ? 'default' : 'outline'}
          >
            No
          </Button>
        </div>
      )
    }

    if (currentQuestion.type === 'choice') {
      return (
        <div className="grid gap-3">
          {currentQuestion.options?.map(opt => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              disabled={answering}
              className={`p-4 text-left rounded-lg border-2 transition-all ${
                selectedAnswer === opt.value
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className="font-semibold text-slate-900">{opt.label}</div>
            </button>
          ))}
        </div>
      )
    }

    if (currentQuestion.type === 'multiselect') {
      const selected = Array.isArray(selectedAnswer) ? selectedAnswer : []
      return (
        <div>
          <div className="grid gap-3 mb-6">
            {currentQuestion.options?.map(opt => (
              <button
                key={opt.value}
                onClick={() => {
                  const newSelected = selected.includes(opt.value)
                    ? selected.filter(v => v !== opt.value)
                    : [...selected, opt.value]
                  setSelectedAnswer(newSelected)
                }}
                className={`p-4 text-left rounded-lg border-2 transition-all ${
                  selected.includes(opt.value)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="font-semibold text-slate-900">{opt.label}</div>
              </button>
            ))}
          </div>
          <Button
            onClick={() => handleAnswer(selected)}
            disabled={answering || selected.length === 0}
            size="lg"
            className="w-full"
          >
            Continue
          </Button>
        </div>
      )
    }

    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Badge className="mb-2 bg-blue-100 text-blue-700 border-0">Adaptive Assessment</Badge>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Digital Maturity Diagnostic</h1>
              <p className="text-slate-600 mt-2">{dimensionLabel?.name}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-600">Question {state.visitedQuestions.length + 1}/72</div>
              <div className="text-sm text-slate-600 mt-1">{Math.floor(timeElapsed / 60)}:{String(timeElapsed % 60).padStart(2, '0')}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Question */}
        <Card className="mb-8 p-8 border-slate-200">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8">{currentQuestion.text}</h2>
          <div className="space-y-4">
            {renderAnswerOptions()}
          </div>
        </Card>

        {/* Insight Note */}
        {currentQuestion.impact === 'high' && (
          <Card className="p-4 bg-amber-50 border-amber-200 border-l-4 border-l-amber-500">
            <p className="text-sm text-amber-900">
              💡 This is a key indicator of your digital maturity. Your answer will significantly impact the recommendations.
            </p>
          </Card>
        )}

        {/* Company Info */}
        {companyData && (
          <div className="mt-8 text-center text-sm text-slate-600">
            <p>Assessment for <strong>{companyData.company_name}</strong></p>
          </div>
        )}
      </div>
    </main>
  )
}
