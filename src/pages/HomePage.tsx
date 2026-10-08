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
import { FeatureTabProvider } from '../lib/featureTab'
import { useStrings } from '../lib/i18n'

export default function HomePage() {
  const { t } = useStrings()
  const tabs = t.features.tabs.map((tab) => tab.value)
  return (
    <CalendarProvider>
      <FeatureTabProvider initial={tabs[0]} tabs={tabs}>
        <HomeHero />
        <ProofStrip />
        <FeatureExplorer />
        <ComplianceMap />
        <OpenSource />
        <GetStarted />
        <FaqList />
        <ExploreMore />
        <CommunityBand />
      </FeatureTabProvider>
    </CalendarProvider>
  )
}
