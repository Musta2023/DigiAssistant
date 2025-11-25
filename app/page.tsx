'use client'

import { useState } from 'react'
import Link from 'next/link'
// Import the Image component from Next.js
import Image from 'next/image' 
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

// 1. Import the specific logo image
import LogoImage from './projectImages/logoDigiassistant.png'; 
// 2. Keep the HeroImage import for the background (if it's different)
import HeroImage from './projectImages/hero.png'; 


export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  const features = [
    {
      id: 'comprehensive',
      icon: '📊',
      title: '72 Targeted Questions',
      description: 'Comprehensive assessment across all digital maturity dimensions and development levels',
      detail: '6 dimensions × 4 levels × 3 criteria each'
    },
    {
      id: 'intelligent',
      icon: '🧠',
      title: 'Intelligent Scoring',
      description: 'Sophisticated scoring engine with automatic gap detection and profile determination',
      detail: 'Débutant • Émergent • Challenger • Leader'
    },
    {
      id: 'insights',
      icon: '💡',
      title: 'Strategic Insights',
      description: 'Expert-level recommendations and actionable roadmap for digital transformation',
      detail: 'Root cause analysis and ROI potential'
    },
    {
      id: 'reports',
      icon: '📋',
      title: 'Professional Reports',
      description: 'Generate executive summaries and detailed PDF reports with visualizations',
      detail: 'Executive summary • Full audit • Roadmap'
    },
    {
      id: 'adaptive',
      icon: '🎯',
      title: 'Adaptive Assessment',
      description: 'Dynamic branching and context-aware questions for personalized evaluation',
      detail: 'Real-time assessment flow'
    },
    {
      id: 'benchmark',
      icon: '📈',
      title: 'Benchmark Comparison',
      description: 'Compare your maturity against industry standards and best practices',
      detail: 'Industry and sector insights'
    }
  ]

  const dimensions = [
    { id: 'strategie', name: 'Strategy', icon: '🎯', color: 'from-blue-600' },
    { id: 'culture', name: 'Culture & People', icon: '👥', color: 'from-purple-600' },
    { id: 'relation_client', name: 'Customer Relations', icon: '🤝', color: 'from-pink-600' },
    { id: 'processus', name: 'Processes', icon: '⚙️', color: 'from-green-600' },
    { id: 'technologies', name: 'Technologies', icon: '💻', color: 'from-orange-600' },
    { id: 'securite', name: 'Security', icon: '🔒', color: 'from-red-600' }
  ]

  const profiles = [
    { name: 'Biginner', range: '0-25%', icon: '🌱', description: 'Initial digital awareness' },
    { name: 'Emergent', range: '26-50%', icon: '🚀', description: 'Structured initiatives' },
    { name: 'Challenger', range: '51-75%', icon: '⭐', description: 'Advanced transformation' },
    { name: 'Leader', range: '76-100%', icon: '👑', description: 'Digital excellence' }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            
            {/* ⭐️ LOGO INTEGRATION using the dedicated LogoImage ⭐️ */}
            <div className="relative w-10 h-10 flex-shrink-0"> {/* Added flex-shrink-0 to prevent sizing issues */}
              <Image 
                src={LogoImage} // Using the new logo asset
                alt="DigiAssistant Pro Logo" 
                fill 
                sizes="40px" // Optional: Improves performance hint
                className="rounded-lg object-contain" // Use object-contain to ensure the full logo is visible
              />
            </div>
            {/* ⭐️ END LOGO INTEGRATION ⭐️ */}
            
            <h1 className="font-bold text-xl text-slate-900">DigiAssistant Pro</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline">v2.0 - Adaptive</Badge>
            <Link href="/start?type=adaptive">
              <Button size="sm"> Adaptive Assessment</Button>
            </Link>
            
          </div>
        </div>
      </nav>

      {/* Hero Section - Uses HeroImage (the background image) */}
      <div
        className="relative py-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HeroImage.src})` }}
      >
        {/* Optional: Add an overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">Enterprise Assessment Platform</Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
              Master Your Digital Maturity Journey
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto mb-8 text-balance">
              Experience the next generation of digital diagnostics. Choose between an adaptive conversational assessment or comprehensive traditional evaluation—both delivering actionable insights tailored to your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/start?type=adaptive">
                <Button size="lg" className="px-8 py-3 bg-blue-600 hover:bg-blue-700">
                  Try Adaptive Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <Card className="mb-20 p-4 sm:p-8 border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="bg-blue-100 text-blue-700 border-0">Comparison</Badge>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">Choose your assessment flow</h3>
            <p className="text-slate-600 max-w-2xl mx-auto mt-2">
              Adaptive conversational for a fast personalised experience, or the full assessment for a deep audit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="flex flex-col border-2 border-blue-500 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition">
              <div>
                <div className="text-5xl mb-3">🎯</div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Adaptive Conversational</h4>
                <ul className="space-y-2 text-slate-700 mb-6">
                  <li className="flex gap-2 items-start">
                    <span className="mt-0.5 text-blue-600">✓</span>
                    <span>Dynamic question branching</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="mt-0.5 text-blue-600">✓</span>
                    <span>Personalized flow (≈18 smart questions)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="mt-0.5 text-blue-600">✓</span>
                    <span>10–15 minute completion</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="mt-0.5 text-blue-600">✓</span>
                    <span>Engaging conversational UI</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="mt-0.5 text-blue-600">✓</span>
                    <span>Fast personalized insights</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto">
                <Link href="/start?type=adaptive">
                  <Button className="w-full" size="lg">Start Adaptive</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col border border-slate-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition">
              <div>
                <div className="text-5xl mb-3">📋</div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Traditional Assessment</h4>
                <ul className="space-y-2 text-slate-700 mb-6">
                  <li className="flex gap-2 items-start">
                    <span className="mt-0.5 text-red-500">•</span>
                    <span>Longer to complete (≈45–60 minutes).</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="mt-0.5 text-red-500">•</span>
                    <span>Static question flow with no personalization.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="mt-0.5 text-red-500">•</span>
                    <span>Higher fatigue and lower engagement.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="mt-0.5 text-red-500">•</span>
                    <span>Some sections may feel irrelevant to the respondent.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="mt-0.5 text-red-500">•</span>
                    <span>Insights available only after full completion.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto">

              </div>
            </div>
          </div>
        </div>
      </Card>


      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {features.map((feature) => (
          <Card
            key={feature.id}
            className="p-6 hover:shadow-lg transition-all cursor-pointer border-slate-200 hover:border-blue-300"
            onMouseEnter={() => setHoveredFeature(feature.id)}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
            <p className="text-slate-600 mb-3">{feature.description}</p>
            {hoveredFeature === feature.id && (
              <div className="text-sm text-blue-600 font-medium pt-2">{feature.detail}</div>
            )}
          </Card>
        ))}
      </div>

      {/* Dimensions Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">6 Assessment Dimensions</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">Comprehensive evaluation framework covering all critical areas of digital transformation</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {dimensions.map((dim) => (
            <Card key={dim.id} className="p-6 border-slate-200 hover:shadow-md transition-all">
              <div className={`w-12 h-12 bg-gradient-to-br ${dim.color} to-slate-900 rounded-lg flex items-center justify-center text-2xl mb-4`}>
                {dim.icon}
              </div>
              <h4 className="font-semibold text-slate-900">{dim.name}</h4>
              <p className="text-sm text-slate-600 mt-2">12 questions | 4 maturity levels</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Maturity Profiles */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Your Digital Maturity Profile</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">Automated profile determination based on comprehensive scoring</p>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {profiles.map((profile, idx) => (
            <Card key={profile.name} className="p-6 border-slate-200 text-center hover:shadow-md transition-all">
              <div className="text-5xl mb-4">{profile.icon}</div>
              <h4 className="font-bold text-slate-900 text-lg">{profile.name}</h4>
              <div className="text-sm text-blue-600 font-semibold my-2">{profile.range}</div>
              <p className="text-sm text-slate-600">{profile.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-12 text-center mb-20">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to Assess Your Digital Maturity?</h3>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Get actionable insights in just 30 minutes. Start your comprehensive digital transformation assessment now.</p>
        <Link href="/start?type=adaptive">
          <Button size="lg" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 mb-4">
            Start Adaptive Assessment
          </Button>
        </Link>

      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">72</div>
          <p className="text-slate-600">Criteria across all dimensions</p>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">30min</div>
          <p className="text-slate-600">Complete assessment time</p>
        </div>
        <div>
          <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">4</div>
          <p className="text-slate-600">Maturity levels evaluated</p>
        </div>
      </div>
    </main>
  )
}
