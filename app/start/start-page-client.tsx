'use client'

import { useState } from 'react'
// Adjusted import for broader compatibility by replacing next/navigation with
// standard JavaScript methods for redirection.
// import { useRouter } from 'next/navigation' // Removed due to build error
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

export default function StartPageClient() {
  // const router = useRouter() // Removed
  
  // Assessment type is now fixed to 'adaptive' (dynamic)
  const assessmentType = 'adaptive' 
  
  const [formData, setFormData] = useState({
    company_name: '',
    industry: '',
    size: '',
    location: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Function to handle simple navigation/redirection
  const handleNavigation = (path: string) => {
    // Fallback to standard window location change for simplicity/compatibility
    window.location.href = path;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Store data (assessmentType is implicitly 'adaptive' now)
    localStorage.setItem('assessmentData', JSON.stringify(formData))
    
    // No need to store assessmentType or check conditions, as it is always adaptive
    setTimeout(() => {
      // Always clear conversation state and navigate to the dynamic/adaptive path
      localStorage.removeItem('conversationState')
      localStorage.removeItem('conversationAnswers')
      
      handleNavigation('/conversation')
    }, 500)
  }

  const isFormValid = formData.company_name && formData.industry && formData.size && formData.location

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 px-4">
      <div className="mx-auto">
        {/* Back Button - Using history API fallback */}
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-8"
        >
          ← Back
        </Button>

        <Card className="border-slate-200 shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-8 py-8 sm:py-12 rounded-t-lg">
            <Badge className="mb-4 bg-white/20 text-white border-0">Step 1 of 2</Badge>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Company Information</h1>
            <p className="text-blue-100">Help us personalize your dynamic digital maturity assessment</p>
          </div>

          {/* ASSESSMENT TYPE DISPLAY (Restored original selector styling) */}
          <div className="bg-slate-50 px-4 sm:px-8 py-6 border-b border-slate-200">
            
            <div className="flex gap-4">
              {/* Only showing the Adaptive option, styled as selected */}
              <div className="flex items-center gap-2">
                {/* Visual representation of a selected radio button */}
                <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-inner"></div> 
                <span className="text-slate-900 font-medium">Adaptive (Fast & Smart)</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-8">
            <div className="space-y-6">
              {/* Company Name */}
              <div>
                <Label htmlFor="company_name" className="text-slate-700 font-semibold mb-2">Company Name</Label>
                <Input
                  id="company_name"
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Acme Digital Solutions"
                  className="h-auto text-base sm:text-lg py-3 px-4 border-slate-300"
                />
              </div>

              {/* Industry */}
              <div>
                <Label htmlFor="industry" className="text-slate-700 font-semibold mb-2">Industry</Label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full text-base sm:text-lg px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900"
                >
                  <option value="">Select your industry...</option>
                  <option value="finance">Finance & Banking</option>
                  <option value="retail">Retail & E-commerce</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="technology">Technology</option>
                  <option value="energy">Energy & Utilities</option>
                  <option value="telecommunications">Telecommunications</option>
                  <option value="government">Government</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Company Size */}
              <div>
                <Label htmlFor="size" className="text-slate-700 font-semibold mb-2">Company Size</Label>
                <select
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                  className="w-full text-base sm:text-lg px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900"
                >
                  <option value="">Select company size...</option>
                  <option value="startup">Startup (1-50 employees)</option>
                  <option value="small">Small Business (51-250)</option>
                  <option value="medium">Mid-Market (251-5,000)</option>
                  <option value="enterprise">Enterprise (5,000+)</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className="text-slate-700 font-semibold mb-2">Primary Location</Label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full text-base sm:text-lg px-4 py-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900"
                >
                  <option value="">Select location...</option>
                  <option value="north_america">North America</option>
                  <option value="europe">Europe</option>
                  <option value="asia_pacific">Asia Pacific</option>
                  <option value="latin_america">Latin America</option>
                  <option value="middle_east">Middle East</option>
                  <option value="africa"> Africa</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleNavigation('/')}
                className="flex-1 py-2 text-xs sm:text-sm font-medium border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="flex-1 py-2 text-xs sm:text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                variant="outline"
              >
                {isSubmitting ? 'Starting Assessment...' : 'Begin Dynamic Assessment'}
              </Button>
            </div>
          </form>

          {/* Info Box */}
          <div className="bg-slate-50 px-4 sm:px-8 py-6 rounded-b-lg border-t border-slate-200">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">Expected time:</span> 10-15 minutes to complete the adaptive assessment.
            </p>
          </div>
        </Card>
      </div>
    </main>
  )
}
