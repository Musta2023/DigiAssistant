"use client"

import {
  type ConversationProfile,
  type Tier,
  getProfileTier,
  getPalierLabel,
  describeDimensionPalier,
  getTierStatus,
} from "@/lib/scoring-utils"

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
}

function getProfileBandText(profile: ConversationProfile, companyName: string): string {
  switch (profile) {
    case "Beginner":
      return `Digital capabilities are emerging and remain mostly opportunistic. ${companyName} is starting to structure initiatives but still needs to clarify priorities and governance to build a consistent foundation.`
    case "Emerging":
      return `Digital is visible through projects and tools, but remains uneven across the organisation. ${companyName} now needs to standardise practices, formalise governance and focus investments on the most value-creating use cases.`
    case "Challenger":
      return `Digital is well structured and integrated into key operations. ${companyName} has solid processes and tools, but can still progress on industrialisation, data and innovation to catch up with leaders in its sector.`
    case "Leader":
      return `Digital is embedded in the business model and innovation agenda. ${companyName} must continue to invest in data, AI and ecosystem partnerships to sustain and extend its leadership.`
    default:
      return `Digital capabilities are progressing, with further work required to reach the target profile.`
  }
}

function getDimensionNarrative(dimensionId: string, palier: Tier, targetTier: Tier, companyName: string): string {
  const baseDescription = describeDimensionPalier(dimensionId, palier)
  const nextTier: Tier = palier < 4 ? ((palier + 1) as Tier) : 4

  const implicationByTier: Record<Tier, string> = {
    1: "This level provides only a limited foundation for scaling digital practices and requires structured investment to reduce operational risk.",
    2: "This level provides an initial foundation to support pilot initiatives, but remains fragile for large-scale transformation.",
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

export function ConversationPDFContent({
  data,
}: {
  data: ConversationPDFData
}) {
  const targetTier = getProfileTier(data.profile)

  const enrichedDimensions = data.dimensionScores.map((dim) => ({
    ...dim,
    percentage: dim.score,
  }))

  const priorityDimensions = enrichedDimensions
    .filter((d) => d.gap > 0)
    .sort((a, b) => b.gap - a.gap || a.percentage - b.percentage)

  const aboveTargetDimensions = enrichedDimensions
    .filter((d) => d.tier > d.targetTier)
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3)

  const summaryAboveTarget =
    aboveTargetDimensions.length > 0 ? aboveTargetDimensions.map((d) => d.name).join(", ") : "none identified"

  const summaryPriorityDimensions =
    priorityDimensions.length > 0 ? priorityDimensions.map((d) => d.name).join(", ") : "none identified"

  const uniqueQuickWins = Array.from(new Set(data.quickWins ?? []))
  const uniqueStrategic = Array.from(new Set(data.strategicInitiatives ?? []))

  const topPriorityDimension = priorityDimensions[0]
  const topPriorityDimensionName = topPriorityDimension ? topPriorityDimension.name : "the most critical dimensions"
  const now = Date.now();
// Convert the timestamp to a formatted date string
const assessmentDate = new Date(now).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
});
  return (
    <div
      id="conversation-pdf-content"
      style={{
        all: "unset",
        display: "block",
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "100%",
        padding: "0",
        fontFamily: '"Inter", "Segoe UI", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
        color: "#1e293b",
        backgroundColor: "#ffffff",
        fontSize: "11px",
        lineHeight: 1.6,
      }}
    >
      {/* PAGE 1: Cover & Executive Summary */}
      <div style={{ padding: "48px 56px" }}>
        {/* Premium Header Bar */}
        <div
          style={{
            marginBottom: "48px",
            paddingBottom: "20px",
            borderBottom: "3px solid #0f172a",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "9px",
                fontWeight: "700",
                color: "#64748b",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Confidential Report
            </div>
            <div style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.5px" }}>
              Digital Maturity
            </div>
            <div style={{ fontSize: "18px", fontWeight: "600", color: "#475569", marginTop: "2px" }}>
              Assessment Report
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "10px", color: "#64748b", fontWeight: "500" }}>Assessment Date</div>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>{assessmentDate}</div>
          </div>
        </div>

        {/* Company Info Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "40px" }}>
          <div
            style={{
              padding: "20px 24px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderLeft: "4px solid #0f172a",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                color: "#64748b",
                fontWeight: "700",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Organisation
            </div>
            <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "4px" }}>
              {data.company_name}
            </div>
            <div style={{ fontSize: "12px", color: "#475569" }}>
              {data.industry} • {data.size}
            </div>
          </div>
          <div
            style={{
              padding: "20px 24px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderLeft: "4px solid #0f172a",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                color: "#64748b",
                fontWeight: "700",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Completion Time
            </div>
            <div style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "4px" }}>
              {data.timeToComplete}
            </div>
            <div style={{ fontSize: "12px", color: "#475569" }}>Conversational Diagnostic</div>
          </div>
        </div>

        {/* Overall Score - Premium Card */}
        <div
          style={{
            padding: "36px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            textAlign: "center",
            marginBottom: "40px",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.2)",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: "900",
              color: "#ffffff",
              marginBottom: "12px",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            {data.globalScore}
            <span style={{ fontSize: "32px", opacity: 0.9 }}>%</span>
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "700",
              color: "#ffffff",
              marginBottom: "16px",
            }}
          >
            {data.profile} Profile • Target Tier L{targetTier}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: 1.7,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {getProfileBandText(data.profile, data.company_name)}
          </div>
        </div>

        {/* Executive Summary */}
        <div>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "800",
              marginBottom: "20px",
              color: "#0f172a",
              borderLeft: "5px solid #0f172a",
              paddingLeft: "16px",
            }}
          >
            Executive Summary
          </h2>
          <div
            style={{
              padding: "24px 28px",
              backgroundColor: "#f0fdf4",
              border: "1px solid #86efac",
              borderLeft: "4px solid #22c55e",
              borderRadius: "8px",
              color: "#14532d",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  backgroundColor: "#dcfce7",
                  borderRadius: "4px",
                  fontSize: "9px",
                  fontWeight: "800",
                  color: "#166534",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Context
              </span>
              <p style={{ margin: 0, lineHeight: 1.8, fontSize: "11.5px" }}>
                This conversational assessment estimates the digital maturity of{" "}
                <strong style={{ fontWeight: "700" }}>{data.company_name}</strong> across six key dimensions based on
                adaptive diagnostic questioning.
              </p>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  backgroundColor: "#dcfce7",
                  borderRadius: "4px",
                  fontSize: "9px",
                  fontWeight: "800",
                  color: "#166534",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Diagnosis
              </span>
              <p style={{ margin: 0, lineHeight: 1.8, fontSize: "11.5px" }}>
                With an overall score of <strong style={{ fontWeight: "700" }}>{data.globalScore}%</strong>, the
                organisation is positioned at the <strong style={{ fontWeight: "700" }}>{data.profile}</strong> profile
                (target tier: L{targetTier}). Strengths include:{" "}
                <strong style={{ fontWeight: "700" }}>{summaryAboveTarget}</strong>. Key improvement areas:{" "}
                <strong style={{ fontWeight: "700" }}>{summaryPriorityDimensions}</strong>.
              </p>
            </div>
            <div>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 10px",
                  backgroundColor: "#dcfce7",
                  borderRadius: "4px",
                  fontSize: "9px",
                  fontWeight: "800",
                  color: "#166534",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Recommendation
              </span>
              <p style={{ margin: 0, lineHeight: 1.8, fontSize: "11.5px" }}>
                Prioritise closing the maturity gap on {summaryPriorityDimensions} while leveraging existing strengths
                to accelerate transformation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 2: Dimension Scores */}
      <div style={{ padding: "48px 56px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "800",
            marginBottom: "24px",
            color: "#0f172a",
            borderLeft: "5px solid #0f172a",
            paddingLeft: "16px",
          }}
        >
          Dimension Performance
        </h2>

        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "11px", color: "#64748b", marginBottom: "20px", lineHeight: 1.7 }}>
            Individual dimension scores compared against the target tier defined by your overall maturity profile.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {enrichedDimensions.map((dim) => {
              const statusColor =
                dim.status === "Above target" ? "#22c55e" : dim.status === "On target" ? "#3b82f6" : "#f59e0b"
              const barColor =
                dim.status === "Above target" ? "#22c55e" : dim.status === "On target" ? "#3b82f6" : "#f59e0b"
              return (
                <div key={dim.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "16px" }}>{dim.icon || "📊"}</span>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>{dim.name}</span>
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: "700",
                          color: statusColor,
                          backgroundColor: `${statusColor}15`,
                          padding: "3px 8px",
                          borderRadius: "4px",
                          textTransform: "uppercase",
                          letterSpacing: "0.3px",
                        }}
                      >
                        {dim.status}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "10px", color: "#64748b", fontWeight: "600" }}>
                        L{dim.tier} / L{dim.targetTier}
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "900",
                          color: "#0f172a",
                          backgroundColor: "#f1f5f9",
                          padding: "4px 12px",
                          borderRadius: "6px",
                          minWidth: "50px",
                          textAlign: "center",
                        }}
                      >
                        {dim.percentage}%
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "12px",
                      backgroundColor: "#f1f5f9",
                      borderRadius: "6px",
                      overflow: "hidden",
                      position: "relative",
                      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.max(0, Math.min(100, dim.percentage))}%`,
                        height: "100%",
                        background: `linear-gradient(90deg, ${barColor} 0%, ${barColor}dd 100%)`,
                        borderRadius: "6px",
                        boxShadow: `0 0 8px ${barColor}40`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Digital Gap Heatmap */}
        <div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "800",
              marginBottom: "16px",
              color: "#0f172a",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "18px" }}>🔥</span>
            Digital Gap Priority Heatmap
          </h3>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#fafafa",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {enrichedDimensions
                .sort((a, b) => b.gap - a.gap)
                .map((dim) => {
                  const maxGap = 3
                  const gapValue = Math.max(0, Math.min(maxGap, dim.gap))
                  const widthPercent = (gapValue / maxGap) * 100
                  const gapColors = ["#94a3b8", "#fbbf24", "#fb923c", "#ef4444"]
                  const baseColor = gapColors[gapValue] || "#94a3b8"

                  return (
                    <div key={dim.id} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ width: "160px", fontSize: "11.5px", fontWeight: "700", color: "#0f172a" }}>
                        {dim.name}
                      </div>
                      <div
                        style={{
                          flexGrow: 1,
                          height: "10px",
                          backgroundColor: "#e5e7eb",
                          borderRadius: "5px",
                          overflow: "hidden",
                          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
                        }}
                      >
                        <div
                          style={{
                            width: `${widthPercent}%`,
                            height: "100%",
                            backgroundColor: baseColor,
                            boxShadow: `0 0 6px ${baseColor}60`,
                            transition: "width 0.3s ease",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          width: "40px",
                          textAlign: "center",
                          fontSize: "14px",
                          fontWeight: "900",
                          color: baseColor,
                          backgroundColor: `${baseColor}15`,
                          padding: "4px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        {gapValue}
                      </div>
                    </div>
                  )
                })}
            </div>
            <p style={{ fontSize: "9px", color: "#64748b", marginTop: "16px", lineHeight: 1.6 }}>
              <strong>Gap scale:</strong> 0 = aligned with target • 1 = one tier below • 2–3 = major gap. Larger gaps
              indicate priority focus areas requiring immediate strategic attention.
            </p>
          </div>
        </div>
      </div>

      {/* PAGE 3: Maturity Tiers & Gaps Table */}
      <div style={{ padding: "48px 56px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "800",
            marginBottom: "24px",
            color: "#0f172a",
            borderLeft: "5px solid #0f172a",
            paddingLeft: "16px",
          }}
        >
          Maturity Tier Analysis
        </h2>

        <p style={{ fontSize: "11px", color: "#64748b", marginBottom: "20px", lineHeight: 1.7 }}>
          Detailed comparison of achieved maturity tier against target tier defined by the overall profile, with
          priority assignment based on gap analysis.
        </p>

        <div style={{ overflowX: "auto", "-webkit-overflow-scrolling": "touch" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
              fontSize: "10.5px",
              marginBottom: "24px",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                }}
              >
                <th
                  style={{
                    textAlign: "left",
                    padding: "14px 16px",
                    fontWeight: "800",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Dimension
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "14px 16px",
                    fontWeight: "800",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Achieved
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "14px 16px",
                    fontWeight: "800",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Target
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "14px 16px",
                    fontWeight: "800",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Gap
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "14px 16px",
                    fontWeight: "800",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Priority
                </th>
                <th
                  style={{
                    textAlign: "center",
                    padding: "14px 16px",
                    fontWeight: "800",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {enrichedDimensions.map((dim, idx) => {
                const gapBgColor =
                  dim.gap >= 2 ? "#fee2e2" : dim.gap === 1 ? "#fef3c7" : dim.gap === 0 ? "#d1fae5" : "#f3f4f6"
                const gapTextColor = dim.gap >= 2 ? "#991b1b" : dim.gap === 1 ? "#92400e" : "#065f46"
                const priorityLabel = dim.gap >= 2 ? "High" : dim.gap === 1 ? "Medium" : "Low"
                const achievedLabel = `L${dim.tier} (${getPalierLabel(dim.tier)})`
                const targetLabel = `L${dim.targetTier} (${getPalierLabel(dim.targetTier)})`
                const status = getTierStatus(dim.tier, dim.targetTier)
                const statusColor =
                  status === "Above target" ? "#047857" : status === "On target" ? "#0f172a" : "#ea580c"

                return (
                  <tr
                    key={dim.id}
                    style={{
                      borderBottom: idx < enrichedDimensions.length - 1 ? "1px solid #f1f5f9" : "none",
                      backgroundColor: idx % 2 === 0 ? "#ffffff" : "#fafafa",
                    }}
                  >
                    <td style={{ padding: "14px 16px", color: "#0f172a", fontWeight: "700", fontSize: "11px" }}>
                      {dim.icon ? `${dim.icon} ` : ""}
                      {dim.name}
                    </td>
                    <td style={{ textAlign: "center", padding: "14px 16px", color: "#475569", fontSize: "10.5px" }}>
                      {achievedLabel}
                    </td>
                    <td style={{ textAlign: "center", padding: "14px 16px", color: "#475569", fontSize: "10.5px" }}>
                      {targetLabel}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "14px 16px",
                        color: "#0f172a",
                        fontWeight: "900",
                        fontSize: "13px",
                      }}
                    >
                      {dim.gap}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "8px",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          padding: "6px 14px",
                          backgroundColor: gapBgColor,
                          color: gapTextColor,
                          fontWeight: "800",
                          borderRadius: "6px",
                          fontSize: "9.5px",
                          textTransform: "uppercase",
                          letterSpacing: "0.3px",
                        }}
                      >
                        {priorityLabel}
                      </span>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "14px 16px",
                        color: statusColor,
                        fontWeight: "700",
                        fontSize: "10.5px",
                      }}
                    >
                      {status}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div
          style={{
            padding: "16px 20px",
            backgroundColor: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderLeft: "4px solid #3b82f6",
            borderRadius: "6px",
            fontSize: "10px",
            color: "#1e3a8a",
            lineHeight: 1.7,
          }}
        >
          <strong style={{ fontWeight: "800" }}>Note:</strong> Dimensions marked "Above target" exceed the global
          profile expectations and represent competitive strengths that can be leveraged to accelerate transformation
          in other areas. Dimensions "Below target" require focused investment and strategic initiatives.
        </div>
      </div>

      {/* PAGE 4: Detailed Dimension Analysis */}
      <div style={{ padding: "48px 56px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "800",
            marginBottom: "24px",
            color: "#0f172a",
            borderLeft: "5px solid #0f172a",
            paddingLeft: "16px",
          }}
        >
          Detailed Dimension Analysis
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {enrichedDimensions.map((dim) => {
            const tierLabel = getPalierLabel(dim.tier as Tier)
            const statusColor =
              dim.status === "Above target" ? "#22c55e" : dim.status === "On target" ? "#3b82f6" : "#f59e0b"

            return (
              <div
                key={dim.id}
                style={{
              padding: "20px 24px",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              backgroundColor: "#fafafa",
              boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
              pageBreakInside: "avoid",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: "800", margin: 0, color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "18px" }}>{dim.icon || "📊"}</span>
                    {dim.name}
                  </h3>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "800",
                      color: statusColor,
                      backgroundColor: `${statusColor}15`,
                      padding: "5px 12px",
                      borderRadius: "5px",
                      textTransform: "uppercase",
                      letterSpacing: "0.3px",
                    }}
                  >
                    Tier L{dim.tier} • {tierLabel}
                  </span>
                </div>
                <p style={{ fontSize: "11px", color: "#475569", lineHeight: 1.8, margin: 0 }}>
                  {getDimensionNarrative(dim.id, dim.tier as Tier, dim.targetTier, data.company_name)}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* PAGE 5: Action Plan */}
      <div style={{ padding: "48px 56px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "800",
            marginBottom: "24px",
            color: "#0f172a",
            borderLeft: "5px solid #0f172a",
            paddingLeft: "16px",
          }}
        >
          Recommended Action Plan
        </h2>

        <p
          style={{
            fontSize: "11.5px",
            color: "#475569",
            marginBottom: "28px",
            lineHeight: 1.8,
            padding: "16px 20px",
            backgroundColor: "#f8fafc",
            borderLeft: "3px solid #0f172a",
            borderRadius: "6px",
          }}
        >
          <strong style={{ fontWeight: "800", color: "#0f172a" }}>Strategic Focus:</strong> Concentrate efforts on{" "}
          <strong style={{ fontWeight: "700" }}>{topPriorityDimensionName}</strong> where the maturity gap is most
          significant, while executing quick wins across other dimensions to build momentum and demonstrate value.
        </p>

        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#fef3c7",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
              }}
            >
              ⚡
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "800", margin: 0, color: "#0f172a" }}>Quick Wins</h3>
              <p style={{ fontSize: "10px", color: "#64748b", margin: 0 }}>0–90 days • Immediate impact</p>
            </div>
          </div>
          <div
            style={{
              padding: "20px 24px",
              backgroundColor: "#fffbeb",
              border: "1px solid #fde047",
              borderLeft: "4px solid #eab308",
              borderRadius: "8px",
              pageBreakInside: "avoid",
            }}
          >
            <ul style={{ margin: 0, paddingLeft: "20px", color: "#713f12", lineHeight: 1.8, fontSize: "11.5px" }}>
              {uniqueQuickWins.length > 0 ? (
                uniqueQuickWins.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: idx < uniqueQuickWins.length - 1 ? "10px" : 0 }}>
                    <strong style={{ fontWeight: "700" }}>{item}</strong>
                  </li>
                ))
              ) : (
                <li>
                  <strong style={{ fontWeight: "700" }}>
                    Consolidate fundamentals on key dimensions before launching ambitious initiatives.
                  </strong>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#dbeafe",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
              }}
            >
              🎯
            </div>
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "800", margin: 0, color: "#0f172a" }}>
                Strategic Initiatives
              </h3>
              <p style={{ fontSize: "10px", color: "#64748b", margin: 0 }}>6–12 months • Transformational impact</p>
            </div>
          </div>
          <div
            style={{
              padding: "20px 24px",
              backgroundColor: "#eff6ff",
              border: "1px solid #93c5fd",
              borderLeft: "4px solid #3b82f6",
              borderRadius: "8px",
              pageBreakInside: "avoid",
            }}
          >
            <ul style={{ margin: 0, paddingLeft: "20px", color: "#1e3a8a", lineHeight: 1.8, fontSize: "11.5px" }}>
              {uniqueStrategic.length > 0 ? (
                uniqueStrategic.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: idx < uniqueStrategic.length - 1 ? "10px" : 0 }}>
                    <strong style={{ fontWeight: "700" }}>{item}</strong>
                  </li>
                ))
              ) : (
                <li>
                  <strong style={{ fontWeight: "700" }}>
                    Define an integrated digital roadmap prioritising dimensions with largest maturity gaps.
                  </strong>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: "32px",
            padding: "20px 24px",
            backgroundColor: "#f1f5f9",
            border: "1px solid #cbd5e0",
            borderRadius: "8px",
            pageBreakInside: "avoid",
          }}
        >
          <h4 style={{ fontSize: "13px", fontWeight: "800", marginBottom: "12px", color: "#0f172a" }}>
            Implementation Roadmap
          </h4>
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 1, padding: "12px", backgroundColor: "#ffffff", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: "10px", fontWeight: "800", color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Phase 1
              </div>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#0f172a" }}>Foundation (Q1)</div>
            </div>
            <div style={{ flex: 1, padding: "12px", backgroundColor: "#ffffff", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: "10px", fontWeight: "800", color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Phase 2
              </div>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#0f172a" }}>Acceleration (Q2-Q3)</div>
            </div>
            <div style={{ flex: 1, padding: "12px", backgroundColor: "#ffffff", borderRadius: "6px", border: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: "10px", fontWeight: "800", color: "#64748b", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Phase 3
              </div>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#0f172a" }}>Scaling (Q4+)</div>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 6: Methodology Annex */}
      <div style={{ padding: "48px 56px", minHeight: "1050px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "800",
            marginBottom: "24px",
            color: "#0f172a",
            borderLeft: "5px solid #0f172a",
            paddingLeft: "16px",
          }}
        >
          Appendix – Assessment Methodology
        </h2>

        <div style={{ marginBottom: "28px", pageBreakInside: "avoid" }}>
          <h3
            style={{
              fontSize: "15px",
              fontWeight: "800",
              marginBottom: "14px",
              color: "#0f172a",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "16px" }}>📊</span>
            The 6 Dimensions Assessed
          </h3>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#fafafa",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              pageBreakInside: "avoid",
            }}
          >
            <ul style={{ margin: 0, paddingLeft: "20px", color: "#475569", fontSize: "11px", lineHeight: 1.8 }}>
              <li style={{ marginBottom: "10px" }}>
                <strong style={{ fontWeight: "800", color: "#0f172a" }}>Strategy:</strong> Digital vision, business
                model alignment, investment governance, and strategic roadmap clarity.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong style={{ fontWeight: "800", color: "#0f172a" }}>Culture & People:</strong> Digital skills
                development, employee engagement, change management, and leadership commitment.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong style={{ fontWeight: "800", color: "#0f172a" }}>Customer Relationship:</strong> Experience
                design, omnichannel presence, personalisation, and customer data exploitation.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong style={{ fontWeight: "800", color: "#0f172a" }}>Processes:</strong> Workflow formalisation,
                automation maturity, agile practices, and continuous improvement culture.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong style={{ fontWeight: "800", color: "#0f172a" }}>Technology:</strong> IT architecture
                modernisation, cloud adoption, data management capabilities, and DevOps practices.
              </li>
              <li>
                <strong style={{ fontWeight: "800", color: "#0f172a" }}>Security:</strong> Data protection frameworks,
                regulatory compliance, cyber resilience, and risk management.
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginBottom: "28px", pageBreakInside: "avoid" }}>
          <h3
            style={{
              fontSize: "15px",
              fontWeight: "800",
              marginBottom: "14px",
              color: "#0f172a",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "16px" }}>📈</span>
            The 4 Maturity Tiers
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", pageBreakInside: "avoid" }}>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                borderLeft: "4px solid #ef4444",
                borderRadius: "6px",
                pageBreakInside: "avoid",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: "900", color: "#991b1b", marginBottom: "6px" }}>
                Tier 1 (0–25%)
              </div>
              <div style={{ fontSize: "10.5px", color: "#7f1d1d", lineHeight: 1.7 }}>
                <strong>Initiation</strong> – Digital awareness emerging, isolated initiatives, limited structure and
                governance.
              </div>
            </div>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#fef3c7",
                border: "1px solid #fde047",
                borderLeft: "4px solid #eab308",
                borderRadius: "6px",
                pageBreakInside: "avoid",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: "900", color: "#854d0e", marginBottom: "6px" }}>
                Tier 2 (26–50%)
              </div>
              <div style={{ fontSize: "10.5px", color: "#713f12", lineHeight: 1.7 }}>
                <strong>Experimentation</strong> – Visible projects underway, emerging structures, initial digital
                tooling.
              </div>
            </div>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#dbeafe",
                border: "1px solid #93c5fd",
                borderLeft: "4px solid #3b82f6",
                borderRadius: "6px",
                pageBreakInside: "avoid",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: "900", color: "#1e3a8a", marginBottom: "6px" }}>
                Tier 3 (51–75%)
              </div>
              <div style={{ fontSize: "10.5px", color: "#1e40af", lineHeight: 1.7 }}>
                <strong>Structuring</strong> – Integrated digital approach, robust processes, cross-functional
                coordination.
              </div>
            </div>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#d1fae5",
                border: "1px solid #86efac",
                borderLeft: "4px solid #22c55e",
                borderRadius: "6px",
                pageBreakInside: "avoid",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: "900", color: "#14532d", marginBottom: "6px" }}>
                Tier 4 (76–100%)
              </div>
              <div style={{ fontSize: "10.5px", color: "#15803d", lineHeight: 1.7 }}>
                <strong>Innovation</strong> – Digital-centric business model, advanced analytics, continuous innovation
                culture.
              </div>
            </div>
          </div>
        </div>

        <div style={{ pageBreakInside: "avoid" }}>
          <h3
            style={{
              fontSize: "15px",
              fontWeight: "800",
              marginBottom: "14px",
              color: "#0f172a",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "16px" }}>🔬</span>
            Scoring & Gap Analysis Methodology
          </h3>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f8fafc",
              border: "1px solid #cbd5e0",
              borderRadius: "8px",
              pageBreakInside: "avoid",
            }}
          >
            <p style={{ margin: "0 0 12px 0", color: "#475569", fontSize: "11px", lineHeight: 1.8 }}>
              <strong style={{ fontWeight: "800", color: "#0f172a" }}>Conversational Assessment:</strong> Scores are
              generated through adaptive diagnostic questioning, expressed as percentages (0–100%) and mapped to
              maturity tiers for structured analysis.
            </p>
            <p style={{ margin: "0 0 12px 0", color: "#475569", fontSize: "11px", lineHeight: 1.8 }}>
              <strong style={{ fontWeight: "800", color: "#0f172a" }}>Global Profile Definition:</strong> The overall
              profile (Beginner, Emerging, Challenger, Leader) defines a target tier expectation for each dimension,
              providing a benchmark for gap analysis.
            </p>
            <p style={{ margin: 0, color: "#475569", fontSize: "11px", lineHeight: 1.8 }}>
              <strong style={{ fontWeight: "800", color: "#0f172a" }}>Digital Gap Calculation:</strong> The maturity
              gap is the numerical difference between the target tier (set by profile) and the achieved tier for each
              dimension. Recommendations prioritise dimensions with the largest gaps and highest strategic impact.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "2px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "9px", color: "#94a3b8" }}>
            © {new Date().getFullYear()} Digital Maturity Assessment • Confidential Report
          </div>
          <div style={{ fontSize: "9px", color: "#94a3b8" }}>Generated: {assessmentDate}</div>
        </div>
      </div>
    </div>
  )
}
