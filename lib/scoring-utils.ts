export type Profile = "Débutant" | "Émergent" | "Challenger" | "Leader"

// --- Core scoring types (single source of truth) ---

export interface PalierScores {
  p1: number // palier 1 score, 0–9
  p2: number // palier 2 score, 0–9
  p3: number // palier 3 score, 0–9
  p4: number // palier 4 score, 0–9
}

export interface DimensionScore {
  id: string
  name: string
  gapInfo:string
  palierScores: PalierScores
  rawScore: number // 0–36
  percentage: number // 0–100 (rounded)
  palierAtteint: 1 | 2 | 3 | 4
}

export interface AssessmentResults {
  globalScore: number
  profile: Profile
  profileLevel: 1 | 2 | 3 | 4
  dimensions: DimensionScore[]
  criticalGaps: GapInfo[] 
}

export interface GapInfo {
  id: string
  name: string
  palierAtteint: 1 | 2 | 3 | 4
  palierCible: 1 | 2 | 3 | 4
  gap: number
  priority: "High" | "Medium" | "Low"
}

// --- Conversational scoring helpers (percentage-based tiers) ---

export type Tier = 1 | 2 | 3 | 4

export type ConversationProfile = "Beginner" | "Emerging" | "Challenger" | "Leader"

export interface TierGapInfo {
  id: string
  name: string
  achievedTier: Tier
  targetTier: Tier
  gap: number
  priority: "High" | "Medium" | "Low"
}

export interface DimensionPercentageInput {
  id: string
  name: string
  percentage: number
}

export function getTierFromPercentage(percentage: number): Tier {
  const bounded = Math.max(0, Math.min(100, percentage))
  if (bounded <= 25) return 1
  if (bounded <= 50) return 2
  if (bounded <= 75) return 3
  return 4
}

export function getProfileFromGlobalScore(score: number): ConversationProfile {
  if (score <= 25) return "Beginner"
  if (score <= 50) return "Emerging"
  if (score <= 75) return "Challenger"
  return "Leader"
}

export function getProfileTier(profile: ConversationProfile): Tier {
  switch (profile) {
    case "Beginner":
      return 1
    case "Emerging":
      return 2
    case "Challenger":
      return 3
    case "Leader":
      return 4
    default:
      return 1
  }
}

export function computeGapsFromPercentages(dimensions: DimensionPercentageInput[], targetTier: Tier): TierGapInfo[] {
  return dimensions.map((dim) => {
    const achievedTier = getTierFromPercentage(dim.percentage)
    const gap = Math.max(0, targetTier - achievedTier)
    const priority = getGapPriority(gap)
    return {
      id: dim.id,
      name: dim.name,
      achievedTier,
      targetTier,
      gap,
      priority,
    }
  })
}

export function getTierStatus(achievedTier: Tier, targetTier: Tier): "Above target" | "On target" | "Below target" {
  if (achievedTier > targetTier) return "Above target"
  if (achievedTier === targetTier) return "On target"
  return "Below target"
}

// --- Profile & palier helpers ---

export function getProfile(globalScore: number): Profile {
  if (globalScore <= 25) return "Débutant"
  if (globalScore <= 50) return "Émergent"
  if (globalScore <= 75) return "Challenger"
  return "Leader"
}

export function getProfileLevel(profile: Profile): 1 | 2 | 3 | 4 {
  switch (profile) {
    case "Débutant":
      return 1
    case "Émergent":
      return 2
    case "Challenger":
      return 3
    case "Leader":
      return 4
    default:
      return 1
  }
}

export function mapProfileToLevel(profile: Profile): 1 | 2 | 3 | 4 {
  return getProfileLevel(profile)
}

export function getTargetPalier(profile: Profile): 1 | 2 | 3 | 4 {
  return getProfileLevel(profile)
}

export function getPalierFromPercentage(percentage: number): 1 | 2 | 3 | 4 {
  const bounded = Math.max(0, Math.min(100, percentage))
  const profile = getProfile(bounded)
  return getProfileLevel(profile)
}

export function computePalierFromScore(score: number): 1 | 2 | 3 | 4 {
  const bounded = Math.max(0, Math.min(36, score))
  const percentage = (bounded / 36) * 100
  return getPalierFromPercentage(percentage)
}

export function getGap(palierAtteint: number, palierCible: number): number {
  return Math.max(0, palierCible - palierAtteint)
}

export function getGapPriority(gap: number): "High" | "Medium" | "Low" {
  if (gap >= 2) return "High"
  if (gap === 1) return "Medium"
  return "Low"
}

// --- Dimension & global scoring ---

export function computeDimensionFromPaliers(id: string, name: string, palierScores: PalierScores): DimensionScore {
  const rawScore = (palierScores.p1 || 0) + (palierScores.p2 || 0) + (palierScores.p3 || 0) + (palierScores.p4 || 0)

  const percentage = Math.round((rawScore / 36) * 100)
  const palierAtteint = getPalierFromPercentage(percentage)

  return {
    id,
    name,
    palierScores,
    rawScore,
    percentage,
    palierAtteint,
    gapInfo:"",
  }
}

export function computeGlobalScore(dimensions: DimensionScore[]): number {
  if (!dimensions.length) return 0
  const avg = dimensions.reduce((sum, d) => sum + d.percentage, 0) / dimensions.length
  return Math.round(avg)
}

export function computeGaps(dimensions: DimensionScore[], profileLevel: number): GapInfo[] {
  return dimensions.map((dim) => {
    const palierAtteint = dim.palierAtteint
    const palierCible = 4
    const gap = getGap(palierAtteint, palierCible)
    const priority = getGapPriority(gap)
    return {
      id: dim.id,
      name: dim.name,
      palierAtteint,
      palierCible,
      gap,
      priority,
    }
  })
}

// --- Narrative helpers (unchanged) ---

export function describeProfile(profile: Profile): string {
  switch (profile) {
    case "Débutant":
      return "Your organisation is just discovering digital. Initiatives are occasional and not yet structured, so the impact on the business model remains limited. The main challenge is to establish a shared digital vision and the first operational foundations."
    case "Émergent":
      return "Your organisation is experimenting with digital through visible tools and projects. Practices are still fragmented between departments. The challenge is to structure, prioritise and better coordinate initiatives to gain coherence and impact."
    case "Challenger":
      return "Your organisation is already well structured and integrated into key operations. Your organisation has solid processes and tools, but can still progress on industrialisation, data and innovation to catch up with leaders in your sector."
    case "Leader":
      return "Digital is at the heart of the business model, driven by a culture of innovation and data. Your organisation is seen as a reference in its market and must maintain this advantage through anticipation, continuous experimentation and operational excellence."
    default:
      return ""
  }
}

export function describeConversationProfile(profile: ConversationProfile): string {
  switch (profile) {
    case "Beginner":
      return "Your organisation is just discovering digital. Initiatives are occasional and not yet structured, so the impact on the business model remains limited. The main challenge is to establish a shared digital vision and the first operational foundations."
    case "Emerging":
      return "Your organisation is experimenting with digital through visible tools and projects. Practices are still fragmented between departments. The challenge is to structure, prioritise and better coordinate initiatives to gain coherence and impact."
    case "Challenger":
      return "Your organisation is already well structured and integrated into key operations. Your organisation has solid processes and tools, but can still progress on industrialisation, data and innovation to catch up with leaders in your sector."
    case "Leader":
      return "Digital is at the heart of the business model, driven by a culture of innovation and data. Your organisation is seen as a reference in its market and must maintain this advantage through anticipation, continuous experimentation and operational excellence."
    default:
      return ""
  }
}

export function getPalierLabel(palier: number): string {
  switch (palier) {
    case 1:
      return "Initiation"
    case 2:
      return "Experimentation"
    case 3:
      return "Structuring"
    case 4:
      return "Steering & Innovation"
    default:
      return ""
  }
}

export function describeDimensionPalier(dimensionId: string, palier: number): string {
  const palierLabel = getPalierLabel(palier)

  const baseByDimension: Record<
    string,
    { title: string; initiation: string; experimentation: string; structuration: string; pilotage: string }
  > = {
    strategie: {
      title: "Strategy",
      initiation:
        "At the Initiation tier, digital transformation is seen as an opportunity but there is no formalised vision. A few pilot projects may exist but they are not yet connected to a global strategic trajectory.",
      experimentation:
        "At the Experimentation tier, an initial digital strategy begins to take shape: priority axes are identified, investments are planned, but governance and follow-up are still limited.",
      structuration:
        "At the Structuring tier, the digital strategy is clearly defined, shared and aligned with the business strategy. Priorities are arbitrated, roadmaps are managed and digital performance indicators are monitored regularly.",
      pilotage:
        "At the Steering & Innovation tier, the digital strategy is anticipatory and relies on monitoring, data and innovation to create new growth levers. Digital becomes a structural differentiation factor in the market.",
    },
    culture: {
      title: "Culture & People",
      initiation:
        "At the Initiation tier, the digital culture is still emerging. Staff awareness is occasional and upskilling needs are not yet structured.",
      experimentation:
        "At the Experimentation tier, an initial training plan and key digital roles appear. Awareness is increasing but collaborative practices remain uneven.",
      structuration:
        "At the Structuring tier, capability pathways are organised, cross-functional collaboration is strengthened and cultural transformation is monitored with indicators.",
      pilotage:
        "At the Steering & Innovation tier, the organisation attracts digital talent, encourages autonomy and initiative, and has leadership strongly engaged in digital transformation.",
    },
    relation_client: {
      title: "Customer Relationship",
      initiation:
        "At the Initiation tier, the digital presence towards customers remains basic (showcase website, email) and the experience is poorly structured across channels.",
      experimentation:
        "At the Experimentation tier, the first e-commerce or online service capabilities emerge, with an initial CRM and simple segmentation.",
      structuration:
        "At the Structuring tier, the experience becomes omnichannel, personalised and powered by more advanced customer analytics.",
      pilotage:
        "At the Steering & Innovation tier, the organisation anticipates customer needs, leverages data and AI, and orchestrates an ecosystem of partners to enrich the experience.",
    },
    processus: {
      title: "Processes",
      initiation:
        "At the Initiation tier, processes are only partially documented and automation is occasional. Improvements are mainly informal.",
      experimentation:
        "At the Experimentation tier, key processes are mapped, a workflow platform begins to structure flows and performance KPIs are introduced.",
      structuration:
        "At the Structuring tier, advanced automation, RPA and continuous improvement help secure and optimise operations.",
      pilotage:
        "At the Steering & Innovation tier, processes become intelligent, adaptive and centred on a frictionless experience, supported by a culture of continuous innovation.",
    },
    technologies: {
      title: "Technology",
      initiation:
        "At the Initiation tier, the IT infrastructure is basic and technology management remains largely opportunistic and reactive.",
      experimentation:
        "At the Experimentation tier, the technology architecture is formalised, initial cloud migrations are underway and interoperability is improving.",
      structuration:
        "At the Structuring tier, the architecture is API- and microservices-oriented, data is centralised and DevOps practices support deployments.",
      pilotage:
        "At the Steering & Innovation tier, the organisation has a cloud-native architecture, an advanced data platform and integrates AI at the core of its solutions.",
    },
    securite: {
      title: "Security",
      initiation:
        "At the Initiation tier, security is mainly addressed through awareness and basic technical protection (antivirus, simple backups).",
      experimentation:
        "At the Experimentation tier, security policies are formalised, access management is structured and regulatory compliance is taken into account.",
      structuration:
        "At the Structuring tier, encryption, security monitoring and continuity plans are in place and regularly tested.",
      pilotage:
        "At the Steering & Innovation tier, security is designed in by default, relies on zero-trust architectures and an advanced capability to detect and respond to threats.",
    },
  }

  const dim = baseByDimension[dimensionId] || baseByDimension["strategie"]

  switch (palier) {
    case 1:
      return dim.initiation
    case 2:
      return dim.experimentation
    case 3:
      return dim.structuration
    case 4:
      return dim.pilotage
    default:
      return ""
  }
}

export function suggestActionsForDimension(
  dimensionId: string,
  gap: number,
): { quickWins: string[]; strategic: string[] } {
  if (gap <= 0) {
    return { quickWins: [], strategic: [] }
  }

  const quickWins: string[] = []
  const strategic: string[] = []

  switch (dimensionId) {
    case "strategie":
      quickWins.push(
        "Formalise a one-page digital strategy brief with 3 key priorities.",
        "Clarify ongoing digital projects and link them to explicit business objectives.",
      )
      strategic.push(
        "Build a 12–24 month digital roadmap with investment estimates and associated KPIs.",
        "Set up a digital transformation steering committee with quarterly reviews.",
      )
      break
    case "culture":
      quickWins.push(
        "Launch a digital awareness campaign (workshops, webinars, internal talks).",
        "Identify priority teams for an initial digital upskilling programme.",
      )
      strategic.push(
        "Structure a digital skills development plan by role or job family.",
        "Define and deploy digital champion roles in key business units.",
      )
      break
    case "relation_client":
      quickWins.push(
        "Map key customer journeys and identify 2–3 major digital pain points.",
        "Set up a simple mechanism for continuous customer feedback collection.",
      )
      strategic.push(
        "Strengthen omnichannel experience (consistency across physical and digital channels).",
        "Implement a personalisation approach based on customer data.",
      )
      break
    case "processus":
      quickWins.push(
        "Identify the 2–3 most critical processes and document their key steps.",
        "Implement an initial targeted automation on a low-risk repetitive task.",
      )
      strategic.push(
        "Deploy an automation/workflow platform on a priority perimeter.",
        "Structure a continuous improvement approach (process reviews and KPIs).",
      )
      break
    case "technologies":
      quickWins.push(
        "Perform an inventory of the IT architecture and core applications.",
        "Prioritise 1–2 short-term rationalisation or modernisation initiatives.",
      )
      strategic.push(
        "Build an IT master plan including cloud migration and data management.",
        "Gradually introduce DevOps practices on a pilot application perimeter.",
      )
      break
    case "securite":
      quickWins.push(
        "Remind staff of security best practices (passwords, phishing, etc.).",
        "Check the existence and effectiveness of backups on critical systems.",
      )
      strategic.push(
        "Formalise and roll out a security and access management policy.",
        "Implement a structured security monitoring and audit capability.",
      )
      break
    default:
      quickWins.push(
        "Clarify the current maturity level and main pain points observed.",
        "Organise a scoping workshop to define 2–3 quick and realistic actions.",
      )
      strategic.push(
        "Build a structured roadmap for the dimension concerned.",
        "Define indicators to track progress over the next 6–12 months.",
      )
  }

  if (gap >= 2) {
    strategic.push("Make this dimension an explicit executive committee priority with a dedicated sponsor.")
  }

  return { quickWins, strategic }
}
