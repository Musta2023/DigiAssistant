export interface AdaptiveQuestion {
  id: string
  text: string
  type: 'binary' | 'choice' | 'multiselect'
  options?: Array<{ value: string; score: number; label: string }>
  impact: 'low' | 'medium' | 'high'
  nextQuestion?: string | { yes: string; no: string }
  scoring?: { yes: number; no: number }
}

export interface BranchPath {
  dimension: string
  branchId: string
  questions: AdaptiveQuestion[]
  currentQuestionIndex: number
  answers: Record<string, number | number[]>
}

export class AdaptiveAssessmentEngine {
  private questionMap: Map<string, AdaptiveQuestion> = new Map()
  // NEW: map each question id to its dimension id
  private questionDimensionMap: Map<string, string> = new Map()

  constructor(questionsData: any) {
    this.buildQuestionMap(questionsData)
  }

  private buildQuestionMap(data: any) {
    data.dimensions.forEach((dim: any) => {
      dim.branches.forEach((branch: any) => {
        branch.questions.forEach((q: AdaptiveQuestion) => {
          this.questionMap.set(q.id, q)
          this.questionDimensionMap.set(q.id, dim.id) // <── important
        })
      })
    })
  }

  getNextQuestion(currentQuestion: AdaptiveQuestion, answer: any): string | null {
    if (!currentQuestion.nextQuestion) return null

    if (typeof currentQuestion.nextQuestion === 'string') {
      return currentQuestion.nextQuestion
    }

    if (typeof currentQuestion.nextQuestion === 'object') {
      const key = answer === true || answer === 'yes' ? 'yes' : 'no'
      return currentQuestion.nextQuestion[key]
    }

    return null
  }

  calculateScore(
    dimensionId: string,
    answers: Record<string, number | number[]>
  ): number {
    let totalScore = 0
    let count = 0

    for (const [questionId, answer] of Object.entries(answers)) {
      // use the dimension map instead of questionId.startsWith(...)
      const dimForQuestion = this.questionDimensionMap.get(questionId)
      if (dimForQuestion !== dimensionId) continue

      if (Array.isArray(answer)) {
        // multiselect: answers is an array of numeric scores
        totalScore += answer.reduce((a, b) => a + b, 0)
      } else {
        totalScore += answer
      }
      count++
    }

    return count > 0 ? Math.round((totalScore / (count * 3)) * 100) : 0
  }

  getQuestion(questionId: string): AdaptiveQuestion | undefined {
    return this.questionMap.get(questionId)
  }
}
