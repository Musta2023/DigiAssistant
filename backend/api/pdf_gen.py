from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak, Image
from reportlab.lib.colors import HexColor, black, white, lightgrey
from datetime import datetime
import json
import os

router = APIRouter()

class PDFReportRequest(BaseModel):
    company_name: str
    industry: str
    dimension_scores: dict | None = None
    global_score: float
    profile: str
    digital_gaps: list | None = None


def load_criteria():
    with open('data/criteria.json', 'r', encoding='utf-8') as f:
        return json.load(f)


@router.post("/report/generate")
async def generate_pdf_report(payload: PDFReportRequest):
    company_name = payload.company_name
    industry = payload.industry
    dimension_scores = payload.dimension_scores or {}
    global_score = payload.global_score
    profile = payload.profile
    digital_gaps = payload.digital_gaps or []
    """Generate PDF report from scores"""
    
    filename = f"report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    filepath = f"/tmp/{filename}"
    
    # Create PDF
    doc = SimpleDocTemplate(filepath, pagesize=A4)
    story = []
    
    # Styles
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=HexColor('#1E3A8A'),
        spaceAfter=30,
        alignment=1
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=HexColor('#1E3A8A'),
        spaceAfter=12,
        spaceBefore=12
    )
    
    # Title Page
    story.append(Paragraph("RAPPORT DE MATURITÉ NUMÉRIQUE", title_style))
    story.append(Spacer(1, 0.3*inch))
    
    story.append(Paragraph(f"Entreprise: {company_name}", styles['Normal']))
    story.append(Paragraph(f"Secteur: {industry}", styles['Normal']))
    story.append(Paragraph(f"Date: {datetime.now().strftime('%d/%m/%Y')}", styles['Normal']))
    story.append(Spacer(1, 0.3*inch))
    
    # Global Score
    story.append(Paragraph("SCORE GLOBAL", heading_style))
    story.append(Paragraph(f"<b>Profil: {profile}</b> - {global_score}%", styles['Normal']))
    story.append(Spacer(1, 0.3*inch))
    
    # Dimension Scores Table
    story.append(Paragraph("SCORES PAR DIMENSION", heading_style))
    
    table_data = [["Dimension", "Score", "%"]]
    for dim_id, scores in dimension_scores.items():
        table_data.append([
            scores['name'],
            str(scores['score']),
            f"{scores['percentage']}%"
        ])
    
    table = Table(table_data)
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), HexColor('#1E3A8A')),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), lightgrey),
        ('GRID', (0, 0), (-1, -1), 1, black)
    ]))
    
    story.append(table)
    story.append(Spacer(1, 0.3*inch))
    
    # Digital Gaps
    if digital_gaps:
        story.append(PageBreak())
        story.append(Paragraph("AXES D'AMÉLIORATION", heading_style))
        for gap in digital_gaps:
            story.append(Paragraph(f"• {gap}", styles['Normal']))
        story.append(Spacer(1, 0.3*inch))
    
    # Recommendations
    story.append(Paragraph("RECOMMANDATIONS", heading_style))
    recommendations = {
        "Débutant": "Commencer par établir une stratégie numérique claire et engager la direction",
        "Émergent": "Accélérer l'adoption des technologies et renforcer les compétences",
        "Challenger": "Optimiser l'intégration des systèmes et innover continuellement",
        "Leader": "Maintenir l'avantage compétitif et explorer de nouvelles frontières technologiques"
    }
    story.append(Paragraph(recommendations.get(profile, ""), styles['Normal']))
    
    # Build PDF
    doc.build(story)
    
    return {"message": "PDF generated", "filename": filename, "path": filepath}

@router.get("/report/download/{filename}")
async def download_report(filename: str):
    """Download generated PDF"""
    filepath = f"/tmp/{filename}"
    if not os.path.exists(filepath):
        raise HTTPException(status_code=404, detail="Report not found")
    
    return FileResponse(
        filepath,
        media_type="application/pdf",
        filename=filename
    )
