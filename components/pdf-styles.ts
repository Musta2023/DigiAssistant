/**
 * ===================================================================================
 * CSS FOR PRODUCTION-READY PDF GENERATION
 *
 * This stylesheet provides robust rules to control page breaks and font sizes
 * when generating PDFs from HTML. It is designed to work with the jsPDF.html()
 * renderer.
 * ===================================================================================
 */
export const printStyles = `
  @media print {
    /* Page layout: A4 with standard margins */
    @page {
      size: A4;
      margin: 1.5cm;
    }

    /* Set a stable base font size for the entire document using 'pt' units. */
    html, body, #conversation-pdf-content {
      font-family: "Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
      font-size: 8pt !important;
      line-height: 1.4 !important;
      background: white;
      color: #333;
      margin: 0;
      padding: 0;
    }

    /* Ensure colors are printed */
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    /**
     * -----------------------------------------------------------------------------------
     * PAGE BREAK CONTROL
     * -----------------------------------------------------------------------------------
     */

    /* Primary utility class to prevent any element from splitting across pages */
    .avoid-break {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    
    /* Automatically create a page break after each major section, but not the last one. */
    #conversation-pdf-content > div:not(:last-of-type) {
      page-break-after: always !important;
    }

    /* Keep headings with the content that follows them */
    h1, h2, h3, h4, h5, h6 {
      page-break-after: avoid !important;
      break-after: avoid !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    /* Prevent paragraphs from having stranded single lines */
    p {
      orphans: 3;
      widows: 3;
    }

    /* Keep tables, lists, and their contents from splitting */
    table, thead, tbody, tr, ul, ol, li, img, svg {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    
    /**
     * -----------------------------------------------------------------------------------
     * FONT SIZE OVERRIDES FOR INLINE STYLES
     * These rules override hardcoded 'px' font sizes from React's inline style props.
     * They scale the fonts down to appropriate 'pt' sizes for the PDF.
     * -----------------------------------------------------------------------------------
     */
    [style*="font-size: 48px"], [style*="font-size:48px"] { font-size: 25pt !important; }
    [style*="font-size: 32px"], [style*="font-size:32px"] { font-size: 17pt !important; }
    [style*="font-size: 28px"], [style*="font-size:28px"] { font-size: 14pt !important; }
    [style*="font-size: 22px"], [style*="font-size:22px"] { font-size: 11.5pt !important; }
    [style*="font-size: 18px"], [style*="font-size:18px"] { font-size: 10pt !important; }
    [style*="font-size: 16px"], [style*="font-size:16px"] { font-size: 9pt !important; }
    [style*="font-size: 15px"], [style*="font-size:15px"] { font-size: 8.5pt !important; }
    [style*="font-size: 14px"], [style*="font-size:14px"] { font-size: 8pt !important; }
    [style*="font-size: 13px"], [style*="font-size:13px"] { font-size: 7.5pt !important; }
    [style*="font-size: 12px"], [style*="font-size:12px"] { font-size: 7pt !important; }
    [style*="font-size: 11.5px"], [style*="font-size:11.5px"] { font-size: 6.5pt !important; }
    [style*="font-size: 11px"], [style*="font-size:11px"] { font-size: 6.5pt !important; }
    [style*="font-size: 10.5px"], [style*="font-size:10.5px"] { font-size: 6pt !important; }
    [style*="font-size: 10px"], [style*="font-size:10px"] { font-size: 6pt !important; }

    /* Remove box shadows for cleaner printing */
    [style*="boxShadow"], [style*='boxShadow'] {
      box-shadow: none !important;
    }
  }
`;