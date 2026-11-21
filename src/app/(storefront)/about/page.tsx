import AboutHero from '@/components/about/AboutHero'
import AboutStoryTimeline from '@/components/about/AboutStoryTimeline'
import AboutTeamSection from '@/components/about/AboutTeamSection'
import AboutValuesSection from '@/components/about/AboutValuesSection'
import DoughSteps from '@/components/about/DoughSteps'
import SourcingSection from '@/components/about/SourcingSection'

export default function page() {
  return (
    <div>
      <AboutHero />
      <AboutStoryTimeline />
      <DoughSteps />
      <SourcingSection />
      <AboutTeamSection />
      <AboutValuesSection />
    </div>
  )
}
