
export async function downloadPDF(elementId: string, filename: string) {
  // Dynamic imports to ensure client-side only execution
  const jsPDF = (await import('jspdf')).default;
  const html2canvas = (await import('html2canvas')).default;
  const container = document.getElementById(elementId);
  if (!container) {
    throw new Error(`Element with id "${elementId}" not found for PDF generation.`);
  }

  if (typeof window === 'undefined') {
    console.warn('downloadPDF was called on the server.');
    return;
  }

  try {
    // Get all page sections as direct children
    const pages = Array.from(container.children) as HTMLElement[];
    
    if (pages.length === 0) {
      throw new Error('No page sections found in the PDF content.');
    }

    console.log(`Found ${pages.length} pages to render`);

    // Create PDF instance
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm

    // Process each page individually
    for (let i = 0; i < pages.length; i++) {
      const pageElement = pages[i];
      
      console.log(`Rendering page ${i + 1}/${pages.length}`);
      
      // Add new page only when we're past the first page
      if (i > 0) {
        pdf.addPage();
      }

      // Render this page to canvas with high quality
      const canvas = await html2canvas(pageElement, {
        scale: 2.5, // Good balance of quality and performance
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200, // Fixed viewport for consistency
      });

      // Convert canvas to image
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dimensions to fit A4 exactly
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      // Add image to PDF - fit to page height if needed
      const finalHeight = Math.min(imgHeight, pageHeight);
      
      pdf.addImage(
        imgData, 
        'PNG', 
        0, // No left margin
        0, // No top margin
        imgWidth, 
        finalHeight
      );
    }

    console.log('PDF generation complete');

    // Save the PDF
    pdf.save(filename);
    
  } catch (error) {
    console.error("Error during PDF generation:", error);
    throw error;
  }
}

export function formatCompanyName(name: string): string {
  return name.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
}
