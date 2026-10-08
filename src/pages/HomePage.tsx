import { CommunityBand } from '../components/CommunityBand'
import { ComplianceMap } from '../components/ComplianceMap'
import { ExploreMore } from '../components/ExploreMore'
import { FaqList } from '../components/FaqList'
import { FeatureExplorer } from '../components/FeatureExplorer'
import { GetStarted } from '../components/GetStarted'
import { HomeHero } from '../components/HomeHero'
import { OpenSource } from '../components/OpenSource'
import { ProofStrip } from '../components/ProofStrip'
import { CalendarProvider } from '../lib/calendar'

export default function HomePage() {
  return (
    <CalendarProvider>
      <HomeHero />
      <ProofStrip />
      <FeatureExplorer />
      <ComplianceMap />
      <OpenSource />
      <GetStarted />
      <FaqList />
      <ExploreMore />
      <CommunityBand />
    </CalendarProvider>
  )
}
