// ConversationPDFContent.tsx - UPDATED VERSION
import React from "react"


// [Keep all your type definitions and helper functions as they are]
type Tier = 1 | 2 | 3 | 4
interface ConversationDimensionScore {
  id: string
  name: string
  score: number
  icon?: string
  tier: Tier
  targetTier: Tier
  gap: number
  priority: "High" | "Medium" | "Low"
  status: "Above target" | "On target" | "Below target"
}
type ConversationProfile = "Beginner" | "Emerging" | "Challenger" | "Leader"
interface ConversationPDFData {
  company_name: string
  industry: string
  size: string
  globalScore: number
  profile: ConversationProfile
  timeToComplete: string
  dimensionScores: ConversationDimensionScore[]
  keyStrengths?: string[]
  criticalGaps?: string[]
  quickWins?: string[]
  strategicInitiatives?: string[]
  timestamp: string
  currentYear: number
}

function getProfileBandText(profile: ConversationProfile, companyName: string): string {
  switch (profile) {
    case "Beginner": return `Digital capabilities are emerging and mostly opportunistic. ${companyName} is starting to structure initiatives but still needs to clarify priorities and governance to build a consistent foundation.`
    case "Emerging": case "Challenger": return `Digital is well structured and integrated into key operations. ${companyName} has solid processes and tools, but can still progress on industrialisation, data and innovation to catch up with leaders in its sector.`
    case "Leader": return `Digital is embedded in the business model and innovation agenda. ${companyName} must continue to invest in data, AI and ecosystem partnerships to sustain and extend its leadership.`
    default: return `Digital capabilities are progressing, with further work required to reach the target profile.`
  }
}
function getProfileTier(profile: ConversationProfile): Tier {
  switch (profile) {
    case "Beginner": return 2
    case "Emerging": return 3
    case "Challenger": return 4
    case "Leader": return 4
    default: return 2
  }
}
function describeDimensionPalier(dimensionId: string, palier: Tier): string {
    const dimName = dimensionId.replace(/([A-Z])/g, ' $1').trim();
    return `The current maturity of ${dimName} is Tier L${palier}.`
}
function getDimensionNarrative(dimensionId: string, palier: Tier, targetTier: Tier, companyName: string): string {
  const baseDescription = describeDimensionPalier(dimensionId, palier)
  const nextTier: Tier = (palier < 4 ? palier + 1 : 4) as Tier
  const implicationByTier: Record<Tier, string> = {
    1: "This level provides only a limited foundation for scaling digital practices and requires structured investment to reduce operational risk.",
    2: "This level provides an initial foundation for pilot initiatives, but remains fragile for large-scale transformation.",
    3: "This level provides a solid base to support cross-functional transformation and data-driven decision-making.",
    4: "This level provides an advanced foundation to drive continuous innovation and differentiation.",
  }
  const implicationSentence = implicationByTier[palier]
  const progressionTarget: Tier = palier < 4 ? nextTier : targetTier
  const nextStepSentence =
    palier < progressionTarget
      ? `To progress towards Tier L${progressionTarget}, ${companyName} should formalise and execute a focused roadmap for this dimension, with clear milestones and ownership.`
      : `${companyName} should maintain this level by regularly reviewing the roadmap for this dimension and aligning it with evolving strategic priorities.`
  return `${baseDescription} ${implicationSentence} ${nextStepSentence}`
}

// CRITICAL: These inline styles ensure each page is exactly A4 height
const pageContainerStyle: React.CSSProperties = {
  width: '210mm',
  minHeight: '297mm',
  maxHeight: '297mm',
  padding: '15mm 12mm',
  backgroundColor: '#ffffff',
  boxSizing: 'border-box',
  overflow: 'hidden', // Prevent content overflow
  position: 'relative',
  pageBreakAfter: 'always',
  pageBreakInside: 'avoid',
}

// [Keep all your sub-components but ensure they don't have excessive spacing]

const CoverPageHeader = ({ data }: { data: ConversationPDFData }) => {
  const targetTier = getProfileTier(data.profile)
  const profileBandText = getProfileBandText(data.profile, data.company_name)
  return (
    <div style={{ marginBottom: "30px" }}>
      <div style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "3px solid #0f172a", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={{ fontSize: "9px", fontWeight: "700", color: "#64748b", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>DigiAssistant</div>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.5px" }}>Digital Maturity</div>
          <div style={{ fontSize: "16px", fontWeight: "600", color: "#475569", marginTop: "2px" }}>Assessment Report</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "10px", color: "#64748b", fontWeight: "500" }}>Assessment Date</div>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#0f172a" }}>{data.timestamp}</div>
        </div>
        
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "14px" }}>
        <div style={{ padding: "10px 12px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #0f172a", borderRadius: "6px" }}>
          <div style={{ fontSize: "8px", color: "#64748b", fontWeight: "700", marginBottom: "6px", textTransform: "uppercase" }}>Organisation</div>
          <div style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "2px" }}>{data.company_name}</div>
          <div style={{ fontSize: "10px", color: "#475569" }}>{data.industry} • {data.size}</div>
        </div>
        <div style={{ padding: "10px 12px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderLeft: "4px solid #0f172a", borderRadius: "6px" }}>
          <div style={{ fontSize: "8px", color: "#64748b", fontWeight: "700", marginBottom: "6px", textTransform: "uppercase" }}>Completion Time</div>
          <div style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", marginBottom: "2px" }}>{data.timeToComplete}</div>
          <div style={{ fontSize: "10px", color: "#475569" }}>Conversational Diagnostic</div>
        </div>
      </div>
      <div style={{ padding: "18px", borderRadius: "12px", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", textAlign: "center", marginBottom: "14px" }}>
        <div style={{ fontSize: "40px", fontWeight: "900", color: "#ffffff", marginBottom: "10px", letterSpacing: "-2px", lineHeight: 1 }}>
          {data.globalScore}<span style={{ fontSize: "28px", opacity: 0.9 }}>%</span>
        </div>
        <div style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff", marginBottom: "12px" }}>{data.profile} Profile • Target Tier L{targetTier}</div>
        <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.9)", lineHeight: 1.5, maxWidth: "500px", margin: "0 auto" }}>{profileBandText}</div>
      </div>
    </div>
  )
}

const ExecutiveSummary = ({ data, summaryAboveTarget, summaryPriorityDimensions, targetTier }: { data: ConversationPDFData; summaryAboveTarget: string; summaryPriorityDimensions: string; targetTier: Tier }) => (
  <div>
    <h2 style={{ fontSize: "16px", fontWeight: "800", marginBottom: "12px", marginTop: 0, color: "#0f172a", borderLeft: "5px solid #0f172a", paddingLeft: "10px" }}>Executive Summary</h2>
    <div style={{ padding: "12px 14px", backgroundColor: "#f0fdf4", border: "1px solid #86efac", borderLeft: "4px solid #22c55e", borderRadius: "8px", color: "#14532d" }}>
      <div style={{ marginBottom: "6px" }}>
        <span style={{ display: "inline-block", padding: "3px 8px", backgroundColor: "#dcfce7", borderRadius: "4px", fontSize: "8px", fontWeight: "800", color: "#166534", marginBottom: "4px", textTransform: "uppercase" }}>Context</span>
        <p style={{ margin: 0, fontSize: "10px", lineHeight: 1.4 }}>This conversational assessment estimates the digital maturity of <strong>{data.company_name}</strong> across six key dimensions based on adaptive diagnostic questioning.</p>
      </div>
      <div style={{ marginBottom: "6px" }}>
        <span style={{ display: "inline-block", padding: "3px 8px", backgroundColor: "#dcfce7", borderRadius: "4px", fontSize: "8px", fontWeight: "800", color: "#166534", marginBottom: "4px", textTransform: "uppercase" }}>Diagnosis</span>
        <p style={{ margin: 0, fontSize: "10px", lineHeight: 1.4 }}>With an overall score of <strong>{data.globalScore}%</strong>, the organisation is positioned at the <strong>{data.profile}</strong> profile (target tier: L{targetTier}). Strengths include: <strong>{summaryAboveTarget}</strong>. Key improvement areas: <strong>{summaryPriorityDimensions}</strong>.</p>
      </div>
      <div>
        <span style={{ display: "inline-block", padding: "3px 8px", backgroundColor: "#dcfce7", borderRadius: "4px", fontSize: "8px", fontWeight: "800", color: "#166534", marginBottom: "4px", textTransform: "uppercase" }}>Recommendation</span>
        <p style={{ margin: 0, fontSize: "10px", lineHeight: 1.4 }}>Prioritise closing the maturity gap on {summaryPriorityDimensions} while leveraging existing strengths to accelerate transformation.</p>
      </div>
    </div>
  </div>
)

const DimensionScoreBar = ({ dim }: { dim: ConversationDimensionScore & { percentage: number } }) => {
  const statusColor = dim.status === "Above target" ? "#22c55e" : dim.status === "On target" ? "#3b82f6" : "#f59e0b";
  return (
    <div style={{ marginBottom: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "14px" }}>{dim.icon || "📊"}</span>
          <span style={{ fontSize: "11px", fontWeight: "700", color: "#0f172a" }}>{dim.name}</span>
          <span style={{ fontSize: "8px", fontWeight: "700", color: statusColor, backgroundColor: `${statusColor}15`, padding: "2px 6px", borderRadius: "4px", textTransform: "uppercase" }}>{dim.status}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "9px", color: "#64748b", fontWeight: "600" }}>L{dim.tier} / L{dim.targetTier}</span>
          <span style={{ fontSize: "14px", fontWeight: "900", color: "#0f172a", backgroundColor: "#f1f5f9", padding: "3px 10px", borderRadius: "6px" }}>{dim.percentage}%</span>
        </div>
      </div>
      <div style={{ width: "100%", height: "8px", backgroundColor: "#f1f5f9", borderRadius: "6px", overflow: "hidden" }}>
        <div style={{ width: `${Math.max(0, Math.min(100, dim.percentage))}%`, height: "100%", background: `linear-gradient(90deg, ${statusColor} 0%, ${statusColor}dd 100%)`, borderRadius: "6px" }} />
      </div>
    </div>
  )
}

const DimensionPerformancePage = ({ enrichedDimensions }: { enrichedDimensions: (ConversationDimensionScore & { percentage: number })[] }) => (
  <>
    <h2 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "12px", marginTop: 0, color: "#0f172a", borderLeft: "5px solid #0f172a", paddingLeft: "10px" }}>Dimension Performance Overview</h2>
    <div style={{ marginBottom: "12px" }}>
      <p style={{ fontSize: "10px", color: "#64748b", marginBottom: "10px", marginTop: 0 }}>Individual dimension scores compared against the target tier.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {enrichedDimensions.map((dim) => <DimensionScoreBar key={dim.id} dim={dim} />)}
      </div>
    </div>
    <div>
      <h3 style={{ fontSize: "14px", fontWeight: "800", marginBottom: "8px", marginTop: 0, color: "#0f172a", display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "16px" }}>🔥</span>
        Digital Gap Priority Heatmap
      </h3>
      <div style={{ padding: "10px", backgroundColor: "#fafafa", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {enrichedDimensions.sort((a, b) => b.gap - a.gap).map((dim) => {
              const maxGap = 3
              const gapValue = Math.max(0, Math.min(maxGap, dim.gap))
              const widthPercent = (gapValue / maxGap) * 100
              const gapColors = ["#94a3b8", "#fbbf24", "#f97316", "#ef4444"]
              const baseColor = gapColors[gapValue] || "#94a3b8"
              return (
                <div key={dim.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "140px", fontSize: "10px", fontWeight: "700", color: "#0f172a" }}>{dim.name}</div>
                  <div style={{ flexGrow: 1, height: "7px", backgroundColor: "#e5e7eb", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${widthPercent}%`, height: "100%", backgroundColor: baseColor }} />
                  </div>
                  <div style={{ width: "28px", textAlign: "center", fontSize: "12px", fontWeight: "900", color: baseColor, backgroundColor: `${baseColor}15`, padding: "2px 6px", borderRadius: "4px" }}>{gapValue}</div>
                </div>
              )
            })}
        </div>
        <p style={{ fontSize: "8px", color: "#64748b", marginTop: "8px", marginBottom: 0 }}>
          <strong>Gap scale:</strong> 0 = aligned with target • 1 = one tier below • 2–3 = major gap.
        </p>
      </div>
    </div>
  </>
)

const DimensionMaturityNarrativePage = ({ data, enrichedDimensions }: { data: ConversationPDFData; enrichedDimensions: (ConversationDimensionScore & { percentage: number })[] }) => (
  <>
    <h2 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "12px", marginTop: 0, color: "#0f172a", borderLeft: "5px solid #0f172a", paddingLeft: "10px" }}>Detailed Maturity Tier Analysis</h2>
    <p style={{ fontSize: "10px", color: "#64748b", marginBottom: "12px", marginTop: 0 }}>A breakdown of the current tier and the required narrative to progress in each dimension.</p>
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {enrichedDimensions.map((dim) => {
        const narrative = getDimensionNarrative(dim.id, dim.tier, dim.targetTier, data.company_name);
        const isPriority = dim.gap > 0;
        const borderColor = isPriority ? "#ef4444" : "#22c55e";
        return (
          <div key={dim.id} style={{ padding: "10px", border: "1px solid #e5e7eb", borderRadius: "8px", borderLeft: `5px solid ${borderColor}`, backgroundColor: isPriority ? "#fef2f2" : "#f0fdf4" }}>
            <h3 style={{ fontSize: "12px", fontWeight: "800", color: "#0f172a", marginBottom: "6px", marginTop: 0 }}>{dim.name} (Current: L{dim.tier} / Target: L{dim.targetTier})</h3>
            <p style={{ margin: 0, fontSize: "9px", lineHeight: 1.4 }}>{narrative}</p>
            {isPriority && <p style={{ marginTop: "5px", marginBottom: 0, fontSize: "9px", fontWeight: "700", color: "#ef4444" }}>🎯 PRIORITY GAP: {dim.gap} tier(s) to close.</p>}
          </div>
        )
      })}
    </div>
  </>
)

const KeyInitiativesPage = ({ data }: { data: ConversationPDFData }) => {
  const quickWins = Array.from(new Set(data.quickWins ?? []));
  const strategicInitiatives = Array.from(new Set(data.strategicInitiatives ?? []));
  const hasContent = quickWins.length > 0 || strategicInitiatives.length > 0;
  return (
    <>
      <h2 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "12px", marginTop: 0, color: "#0f172a", borderLeft: "5px solid #0f172a", paddingLeft: "10px" }}>Actionable Insights & Roadmap</h2>
      {!hasContent ? (
        <div style={{ padding: "10px", border: "1px solid #e5e7eb", borderRadius: "8px", backgroundColor: "#f9fafb" }}>
          <p style={{ fontSize: "10px", color: "#64748b", margin: 0 }}>No specific Quick Wins or Strategic Initiatives were generated.</p>
        </div>
      ) : (
        <>
          {quickWins.length > 0 && (
            <div style={{ marginBottom: "14px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "800", marginBottom: "8px", marginTop: 0, color: "#16a34a" }}><span style={{ marginRight: "6px" }}>⚡</span>Quick Wins (0-6 Months Impact)</h3>
              <ul style={{ paddingLeft: "18px", fontSize: "10px", color: "#15803d", margin: 0 }}>
                {quickWins.map((win, index) => <li key={index} style={{ marginBottom: "3px" }}>{win}</li>)}
              </ul>
            </div>
          )}
          {strategicInitiatives.length > 0 && (
            <div>
              <h3 style={{ fontSize: "14px", fontWeight: "800", marginBottom: "8px", marginTop: 0, color: "#0f172a" }}><span style={{ marginRight: "6px" }}>🗺️</span>Strategic Initiatives (6-18 Months)</h3>
              <ul style={{ paddingLeft: "18px", fontSize: "10px", color: "#0f172a", margin: 0 }}>
                {strategicInitiatives.map((init, index) => <li key={index} style={{ marginBottom: "3px" }}>{init}</li>)}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

// MAIN COMPONENT with FIXED PAGE STRUCTURE
// MAIN COMPONENT with FIXED PAGE STRUCTURE
// MAIN COMPONENT with FIXED PAGE STRUCTURE
export function ConversationPDFContent({ data }: { data: ConversationPDFData }) {
  const targetTier = getProfileTier(data.profile)
  const enrichedDimensions = data.dimensionScores.map((dim) => ({ ...dim, percentage: dim.score }));

  // 1. Get Top 3 Strengths (Score > 75%)
  const topStrengthsDimensions = enrichedDimensions
    .filter((d) => d.percentage > 75) // Only include strong scores
    .sort((a, b) => b.percentage - a.percentage) // Sort highest to lowest
    .slice(0, 3); // Take top 3

  const summaryAboveTarget = topStrengthsDimensions.length > 0 
    ? topStrengthsDimensions.map((d) => d.name).join(", ") 
    : "no dimensions above 75%";

  // 2. Get Priority Gaps (Largest Gaps)
  const priorityDimensions = enrichedDimensions
    .filter((d) => d.gap > 0)
    .sort((a, b) => b.gap - a.gap || a.percentage - b.percentage);

  const summaryPriorityDimensions = priorityDimensions.length > 0 
    ? priorityDimensions.map((d) => d.name).join(", ") 
    : "none identified";

  return (
    <div id="conversation-pdf-content" style={{ fontFamily: '"Inter", "Segoe UI", sans-serif', backgroundColor: "#ffffff" }}>
      {/* PAGE 1: Cover & Executive Summary */}
      <div style={pageContainerStyle}>
        <CoverPageHeader data={data} />
        <ExecutiveSummary 
          data={data} 
          summaryAboveTarget={summaryAboveTarget} 
          summaryPriorityDimensions={summaryPriorityDimensions} 
          targetTier={targetTier} 
        />
      </div>

      {/* PAGE 2: Dimension Scores & Heatmap */}
      <div style={pageContainerStyle}>
        <DimensionPerformancePage enrichedDimensions={enrichedDimensions} />
      </div>

      {/* PAGE 3: Maturity Tiers & Gap Narrative */}
      <div style={pageContainerStyle}>
        <DimensionMaturityNarrativePage data={data} enrichedDimensions={enrichedDimensions} />
      </div>

      {/* PAGE 4: Actionable Initiatives */}
      <div style={pageContainerStyle}>
        <KeyInitiativesPage data={data} />
      </div>
    </div>
  )
}
