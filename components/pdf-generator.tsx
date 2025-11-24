'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { downloadPDF, formatCompanyName } from '@/lib/pdf-utils'

interface DimensionData {
  id: string
  name: string
  percentage: number
  score: number
  // allow additional properties without breaking typing
  [key: string]: unknown
}

interface PDFGeneratorProps {
  data: {
    globalScore: number
    profile: string
    company_name: string
    dimensions: DimensionData[]
    industry: string
    size: string
  }
}

export function PDFGenerator({ data }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownloadPDF = async () => {
    if (isGenerating) return

    try {
      setIsGenerating(true)

      const element = document.getElementById('pdf-content')
      if (!element) {
        console.error('PDF content element with id "pdf-content" was not found in the DOM.')
        return
      }

      const filename = `DigiMaturity_${formatCompanyName(data.company_name)}_Assessment.pdf`
      await downloadPDF(element, filename)
    } catch (error) {
      console.error('Error while generating the PDF report:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button 
      onClick={handleDownloadPDF} 
      disabled={isGenerating}
      size="lg"
      className="px-8"
    >
      {isGenerating ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating Report...
        </>
      ) : (
        <>
          <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Report PDF
        </>
      )}
    </Button>
  )
}
