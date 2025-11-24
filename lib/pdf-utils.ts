export async function downloadPDF(element: HTMLElement, filename: string) {
  if (!element) {
    throw new Error('No element provided for PDF generation')
  }

  if (typeof window === 'undefined') {
    console.warn('downloadPDF was called on the server. This function can only run in the browser.')
    return
  }

  // Dynamically import browser-only libraries on the client side
  const html2canvasModule = await import('html2canvas')
  const html2canvas = (html2canvasModule as any).default || html2canvasModule

  const jsPDFModule = await import('jspdf')
  const jsPDF = (jsPDFModule as any).jsPDF || jsPDFModule.default || jsPDFModule

  // Render the DOM element to a canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    // Strip styles in the cloned document to minimise Tailwind/global CSS interference
    // and avoid unsupported color() / lab() declarations.
    onclone: (doc: Document) => {
      // remove all external styles from the cloned document so only inline styles remain
      doc.querySelectorAll('style,link[rel="stylesheet"]').forEach(node => {
        node.parentNode?.removeChild(node)
      })

      // drop class attributes to detach from Tailwind utility selectors
      doc.querySelectorAll('[class]').forEach(node => {
        if (node instanceof HTMLElement) {
          node.removeAttribute('class')
        }
      })

      // reset html/body background to a simple white surface
      const htmlEl = doc.documentElement as HTMLElement | null
      if (htmlEl) {
        htmlEl.style.backgroundColor = '#ffffff'
      }

      const bodyEl = doc.body as HTMLElement | null
      if (bodyEl) {
        bodyEl.style.margin = '0'
        bodyEl.style.padding = '0'
        bodyEl.style.backgroundColor = '#ffffff'
        bodyEl.style.color = '#0f172a'
      }

      // force a simple background on the cloned root element as well
      const cloned = element.id ? doc.getElementById(element.id) : doc.body
      if (cloned && cloned instanceof HTMLElement) {
        cloned.style.backgroundColor = '#ffffff'
        cloned.style.color = '#0f172a'
      }
    },
  })

  // Debugging aid: log canvas dimensions in case of unexpected blank output
  console.debug('downloadPDF canvas size:', canvas.width, canvas.height)

  const imgData = canvas.toDataURL('image/png')

  // A4 size in mm
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = 210
  const pageHeight = 297

  const imgWidth = pageWidth
  const imgHeight = (canvas.height * imgWidth) / canvas.width

  let heightLeft = imgHeight
  let position = 0

  // First page
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight

  // Additional pages if content overflows
  while (heightLeft > 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  pdf.save(filename)
}

export function formatCompanyName(name: string): string {
  return name.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')
}
