import { Suspense } from 'react'
import StartPageClient from './start-page-client'

export default function StartPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StartPageClient />
    </Suspense>
  )
}