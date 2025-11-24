import {
  Profile,
  DimensionScore,
  GapInfo,
  describeProfile,
  getPalierLabel,
  describeDimensionPalier,
  suggestActionsForDimension,
} from '@/lib/scoring-utils'

interface PDFContentData {
  globalScore: number
  profile: Profile
  profileLevel: 1 | 2 | 3 | 4
  company_name: string
  industry: string
  size: string
  dimensions: DimensionScore[]
  gaps: GapInfo[]
}

interface PDFContentProps {
  data: PDFContentData
  timestamp?: string
}

export function PDFContent({ data, timestamp }: PDFContentProps) {
  const dimensionsArray = data.dimensions
  const gapMap = new Map<string, GapInfo>(data.gaps.map(g => [g.id, g]))
  const targetPalier = data.profileLevel

  // Dimensions above the global target tier
  const aboveTargetDimensions = dimensionsArray
    .filter(d => d.palierAtteint > targetPalier)
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3)

  // Dimensions with a positive maturity gap (below target tier)
  const priorityDimensions = dimensionsArray
    .filter(d => (gapMap.get(d.id)?.gap ?? 0) > 0)
    .sort((a, b) => {
      const ga = gapMap.get(a.id)?.gap ?? 0
      const gb = gapMap.get(b.id)?.gap ?? 0
      return gb - ga || a.percentage - b.percentage
    })

  const summaryAboveTarget =
    aboveTargetDimensions.length > 0
      ? aboveTargetDimensions.map(d => d.name).join(', ')
      : 'none identified'

  const summaryPriorityDimensions =
    priorityDimensions.length > 0
      ? priorityDimensions.map(d => d.name).join(', ')
      : 'none identified'

  // Build action plan suggestions from top-gap dimensions
  const topGapDimensions = dimensionsArray
    .map(dim => ({ dim, gapInfo: gapMap.get(dim.id) }))
    .filter(x => (x.gapInfo?.gap ?? 0) > 0)
    .sort((a, b) => {
      const ga = a.gapInfo?.gap ?? 0
      const gb = b.gapInfo?.gap ?? 0
      return gb - ga || a.dim.percentage - b.dim.percentage
    })
    .slice(0, 3)

  const quickWins: string[] = []
  const strategic: string[] = []

  topGapDimensions.forEach(({ dim, gapInfo }) => {
    const gap = gapInfo?.gap ?? 0
    const actions = suggestActionsForDimension(dim.id, gap)
    actions.quickWins.forEach(a => {
      quickWins.push(`${dim.name} : ${a}`)
    })
    actions.strategic.forEach(a => {
      strategic.push(`${dim.name} : ${a}`)
    })
  })

  const uniqueQuickWins = Array.from(new Set(quickWins))
  const uniqueStrategic = Array.from(new Set(strategic))

  return (
    <div
      id="pdf-content"
      style={{
        all: 'unset',
        display: 'block',
        boxSizing: 'border-box',
        // Approximate A4 width at 96 DPI (~794px) to give html2canvas a stable layout
        width: '794px',
        maxWidth: '100%',
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        fontSize: '12px',
        backgroundColor: '#ffffff',
        color: '#0f172a',
        padding: '32px',
      }}
    >
      {/* 1. Header & Company Information */}
      <div style={{ pageBreakAfter: 'always', marginBottom: '40px', textAlign: 'center' }}>
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>
            Digital Maturity Assessment
          </h1>
          <h2 style={{ fontSize: '24px', color: '#64748b', marginBottom: '32px' }}>
            {data.company_name}
          </h2>
        </div>

        <div
          style={{
            padding: '32px',
            backgroundColor: '#f0f4ff',
            borderRadius: '8px',
            border: '1px solid #e0e7ff',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#2563eb',
              marginBottom: '16px',
            }}
          >
            {data.globalScore}%
          </div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
            {data.profile} (Niv {targetPalier})
          </div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 16px',
              borderRadius: '9999px',
              backgroundColor: '#ffffff',
              color: '#1E3A8A',
              fontSize: '10px',
              fontWeight: 500,
              marginTop: '4px',
              marginBottom: '16px',
              boxShadow: '0 1px 2px rgba(15,23,42,0.12)',
              whiteSpace: 'nowrap',
            }}
          >
            {data.profile} · Target tier: L{targetPalier}
          </span>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>
            {describeProfile(data.profile)}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '24px',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Industry</div>
              <div style={{ fontWeight: 'bold' }}>{data.industry}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Organisation size</div>
              <div style={{ fontWeight: 'bold' }}>{data.size}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Assessment date</div>
              <div style={{ fontWeight: 'bold' }}>
                {timestamp || new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Executive Summary */}
      <div style={{ pageBreakAfter: 'always', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
          Executive summary
        </h2>
        <div
          style={{
            padding: '16px',
            backgroundColor: '#f1f5f9',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
          }}
        >
          <div style={{ lineHeight: '1.6', color: '#475569' }}>
            <p style={{ marginBottom: '10px' }}>
              <strong>Context.</strong> This assessment estimates the digital maturity of{' '}
              <strong>{data.company_name}</strong> across six key dimensions.
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Diagnosis.</strong> With an overall score of <strong>{data.globalScore}%</strong>, the
              organisation is positioned at the <strong>{data.profile}</strong> profile (target tier: L
              {targetPalier}). The most advanced dimensions, already above the target tier, are:
              {' '}<strong>{summaryAboveTarget}</strong>. The main areas for improvement are:
              {' '}<strong>{summaryPriorityDimensions}</strong>.
            </p>
            <p style={{ marginBottom: '0' }}>
              <strong>Priorities.</strong> Priority is to close the maturity gap on the weakest dimensions
              while leveraging strong capabilities to support change – in particular:
              {' '}<strong>{summaryPriorityDimensions}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Dimension Scores + Simple Visual */}
      <div style={{ pageBreakAfter: 'always', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
          Dimension Scores
        </h2>

        {/* Simple horizontal bar chart */}
        <div
          style={{
            marginBottom: '24px',
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
          }}
        >
          {dimensionsArray.map(dim => (
            <div key={dim.id} style={{ marginBottom: '8px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  marginBottom: '4px',
                }}
              >
                <span>{dim.name}</span>
                <span>{dim.percentage}%</span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${Math.max(0, Math.min(100, dim.percentage))}%`,
                    height: '100%',
                    backgroundColor: '#2563eb',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Detailed dimension cards (reuse) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {dimensionsArray.map(dim => (
            <div
              key={dim.id}
              style={{
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <span style={{ fontWeight: 'bold' }}>{dim.name}</span>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#2563eb',
                  }}
                >
                  {dim.percentage}%
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#cbd5e1',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginBottom: '8px',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    backgroundColor: '#2563eb',
                    width: `${dim.percentage}%`,
                  }}
                />
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                Score: {dim.rawScore} / 36 points (12 critères)
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Palier & Gap Table + Heatmap */}
      <div style={{ pageBreakAfter: 'always', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
          Maturity tiers & gaps
        </h2>

        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '11px',
            marginBottom: '20px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #cbd5e1' }}>
                Dimension
              </th>
              <th style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #cbd5e1' }}>
                Achieved tier
              </th>
              <th style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #cbd5e1' }}>
                Target tier
              </th>
              <th style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #cbd5e1' }}>
                Gap
              </th>
              <th style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #cbd5e1' }}>
                Priority
              </th>
              <th style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #cbd5e1' }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {dimensionsArray.map(dim => {
              const gapInfo = gapMap.get(dim.id)
              const gap = gapInfo?.gap ?? 0
              const gapColor =
                gap >= 2 ? '#fee2e2' : gap === 1 ? '#ffedd5' : '#dcfce7'
              const textColor = gap >= 2 ? '#b91c1c' : gap === 1 ? '#c05621' : '#15803d'

              const priorityLabel =
                gap >= 2 ? 'High' : gap === 1 ? 'Medium' : 'Low'

              const achievedTier = dim.palierAtteint
              const targetTier = data.profileLevel
              const status =
                achievedTier > targetTier
                  ? 'Above target'
                  : achievedTier === targetTier
                  ? 'On target'
                  : 'Below target'
              const statusColor =
                status === 'Above target'
                  ? '#047857'
                  : status === 'On target'
                  ? '#334155'
                  : '#b45309'
              const statusFontWeight = status === 'On target' ? 'normal' : '600'

              return (
                <tr key={dim.id}>
                  <td
                    style={{
                      padding: '8px',
                      borderBottom: '1px solid #e5e7eb',
                    }}
                  >
                    {dim.name}
                  </td>
                  <td
                    style={{
                      textAlign: 'center',
                      padding: '8px',
                      borderBottom: '1px solid #e5e7eb',
                    }}
                  >
                    L{dim.palierAtteint} ({getPalierLabel(dim.palierAtteint)})
                  </td>
                  <td
                    style={{
                      textAlign: 'center',
                      padding: '8px',
                      borderBottom: '1px solid #e5e7eb',
                    }}
                  >
                    L{data.profileLevel} ({getPalierLabel(data.profileLevel)})
                  </td>
                  <td
                    style={{
                      textAlign: 'center',
                      padding: '8px',
                      borderBottom: '1px solid #e5e7eb',
                    }}
                  >
                    {gap}
                  </td>
                  <td
                    style={{
                      textAlign: 'center',
                      padding: '8px',
                      borderBottom: '1px solid #e5e7eb',
                      backgroundColor: gapColor,
                      color: textColor,
                      fontWeight: 'bold',
                    }}
                  >
                    {priorityLabel}
                  </td>
                  <td
                    style={{
                      textAlign: 'center',
                      padding: '8px',
                      borderBottom: '1px solid #e5e7eb',
                      color: statusColor,
                      fontWeight: statusFontWeight,
                    }}
                  >
                    {status}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <p style={{ fontSize: '11px', color: '#4b5563', marginBottom: '10px' }}>
          Dimensions marked as "Above target" are more mature than the global profile and can be leveraged to
          accelerate transformation in weaker areas.
        </p>

        {/* Digital Gap Heatmap */}
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
          Digital gap heatmap
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {dimensionsArray.map(dim => {
            const gapInfo = gapMap.get(dim.id)
            const maxGap = 3
            const gapValue = Math.max(0, Math.min(maxGap, gapInfo?.gap ?? 0))
            const widthPercent = (gapValue / maxGap) * 100
            const baseColor = gapValue === 0 ? '#dcfce7' : gapValue === 1 ? '#fef3c7' : '#fee2e2'

            return (
              <div key={dim.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '160px', fontSize: '11px' }}>{dim.name}</div>
                <div
                  style={{
                    flexGrow: 1,
                    height: '8px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${widthPercent}%`,
                      height: '100%',
                      backgroundColor: baseColor,
                    }}
                  />
                </div>
                <div style={{ width: '40px', textAlign: 'right', fontSize: '11px' }}>{gapValue}</div>
              </div>
            )
          })}
        </div>
        <p style={{ fontSize: '10px', color: '#64748b', marginTop: '6px' }}>
          The bars show the size of the maturity gap in tiers (0–3). 0 = aligned with target, 1 = one tier
          below, 2–3 = major gap. Dimensions with the largest gap are prioritised in the recommended action
          plan.
        </p>
      </div>

      {/* 5. Dimension Narratives */}
      <div style={{ pageBreakAfter: 'always', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
          Dimension analysis
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {dimensionsArray.map(dim => (
            <div
              key={dim.id}
              style={{
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#f9fafb',
              }}
            >
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '6px',
                }}
              >
                {dim.name} — Tier L{dim.palierAtteint} ({getPalierLabel(dim.palierAtteint)})
              </h3>
              <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.6 }}>
                {describeDimensionPalier(dim.id, dim.palierAtteint)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Recommended Action Plan */}
      <div style={{ pageBreakAfter: 'always', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
          Recommended action plan
        </h2>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
            Quick wins (0–90 days)
          </h3>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#fef3c7',
              borderRadius: '6px',
              border: '1px solid #fcd34d',
            }}
          >
            <ul style={{ marginLeft: '20px', color: '#475569', lineHeight: 1.6 }}>
              {uniqueQuickWins.length > 0 ? (
                uniqueQuickWins.map((item, idx) => <li key={idx}>{item}</li>)
              ) : (
                <li>
                  Consolidate the fundamentals on one or two key dimensions (governance, skills,
                  security) before launching more ambitious initiatives.
                </li>
              )}
            </ul>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
            Strategic initiatives (6–12 months)
          </h3>
          <div
            style={{
              padding: '12px',
              backgroundColor: '#dbeafe',
              borderRadius: '6px',
              border: '1px solid #bfdbfe',
            }}
          >
            <ul style={{ marginLeft: '20px', color: '#475569', lineHeight: 1.6 }}>
              {uniqueStrategic.length > 0 ? (
                uniqueStrategic.map((item, idx) => <li key={idx}>{item}</li>)
              ) : (
                <li>
                  Define an integrated digital roadmap that prioritises the dimensions with the largest
                  maturity gaps and the expected business benefits.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* 7. Methodology Annex */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
          Methodology
        </h2>

        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
          The 6 dimensions assessed
        </h3>
        <ul style={{ marginLeft: '20px', marginBottom: '12px', color: '#475569' }}>
          <li>
            <strong>Strategy</strong>: digital vision, alignment with business strategy and investment
            governance.
          </li>
          <li>
            <strong>Culture & People</strong>: digital skills, employee engagement and leadership.
          </li>
          <li>
            <strong>Customer Relationship</strong>: customer experience, omnichannel presence and
            exploitation of customer data.
          </li>
          <li>
            <strong>Processes</strong>: level of formalisation, automation and continuous improvement.
          </li>
          <li>
            <strong>Technology</strong>: IT architecture, cloud, data and DevOps practices.
          </li>
          <li>
            <strong>Security</strong>: data protection, compliance and resilience.
          </li>
        </ul>

        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
          The 4 maturity tiers
        </h3>
        <ul style={{ marginLeft: '20px', marginBottom: '12px', color: '#475569' }}>
          <li>
            <strong>Tier 1 — Initiation</strong>: awareness, isolated initiatives, limited structuring.
          </li>
          <li>
            <strong>Tier 2 — Experimentation</strong>: visible digital projects, first structures and
            plans.
          </li>
          <li>
            <strong>Tier 3 — Structuring</strong>: integrated approach, governance in place, robust
            processes and tools.
          </li>
          <li>
            <strong>Tier 4 — Steering & Innovation</strong>: digital at the heart of the business model,
            advanced data-driven steering and innovation.
          </li>
        </ul>

        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
          Scoring rules
        </h3>
        <p style={{ marginBottom: '10px', color: '#475569' }}>
          Each criterion is scored from 0 to 3. Three criteria form one tier (0–9 points), i.e. four tiers
          per dimension (0–36 points). The dimension score is then converted into a percentage:
          (score / 36) × 100. The global score is the average of the six dimensions.
        </p>

        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
          The notion of "digital gap"
        </h3>
        <p style={{ marginBottom: 0, color: '#475569' }}>
          The global profile (Beginner, Emerging, Challenger, Leader) is associated with a target tier (1
          to 4). For each dimension, the achieved tier is estimated from the score out of 36 points. The
          "digital gap" corresponds to the difference between target tier and achieved tier. A large gap
          signals a priority area for investment to align the dimension with the overall vision.
        </p>
      </div>
    </div>
  )
}
