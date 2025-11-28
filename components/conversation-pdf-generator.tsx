"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { downloadPDF, formatCompanyName } from "@/lib/pdf-utils"

export type ConversationDimensionData = {
  id: string
  name: string
  score: number
  icon: string
  [key: string]: unknown
}

interface ConversationPDFGeneratorProps {
  data: {
    timestamp: string
    company_name: string
    industry: string
    size: string
    globalScore: number
    profile: string
    timeToComplete: string
    dimensionScores: ConversationDimensionData[]
    keyStrengths: string[]
    criticalGaps: string[]
    quickWins: string[]
    strategicInitiatives: string[]
    [key: string]: unknown
  }
}

export function ConversationPDFGenerator({ data }: ConversationPDFGeneratorProps) {
  const [loading, setLoading] = useState(false)

  const generatePDF = async () => {
    if (loading) return

    try {
      setLoading(true)

      const filename = `DigiMaturity_${formatCompanyName(data.company_name)}_Conversation_Assessment.pdf`
      // Pass the ID of the element instead of the element object itself.
      await downloadPDF("conversation-pdf-content", filename)
    } catch (error) {
      console.error("Error while generating the conversation PDF report:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={generatePDF} disabled={loading} size="lg" className="px-8">
      {loading ? "Generating PDF..." : "Download Full Report (PDF)"}
    </Button>
  )
}
