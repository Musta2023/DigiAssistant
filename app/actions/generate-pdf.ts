'use server'

// NOTE: This legacy server-side PDF generator has been deprecated in favour of
// the client-side html2canvas + jsPDF implementation in `lib/pdf-utils.ts`.
// It is kept as a stub to avoid accidental usage and to prevent html2canvas
// from being imported on the server (which caused CSS color parsing issues).

interface ResultsData {
  company_name: string
  globalScore: number
  profile: string
  dimensions: Record<string, any>
  industry: string
  size: string
}

export async function generatePDF(_resultsData: ResultsData, _htmlContent: string) {
  throw new Error('Server-side generatePDF is deprecated. Use the client-side PDF download instead.')
}
