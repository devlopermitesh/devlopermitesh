import AboutSection from '@/components/About'
import Footer from '@/components/Footer'
import HeroView from '@/components/HeroSection'
import LetsTalk from '@/components/LetsTalk'
import ProjectSection from '@/components/Projects'
import SkillSection from '@/components/SkillSection'
import { getPortfolioGlobal } from '@/utils/portfolio'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const Page = async () => {
  const portfolio = await getPortfolioGlobal()

  return (
    <div className="flex flex-col w-full min-h-screen">
      <HeroView hero={portfolio?.hero} socialLinks={portfolio?.footer?.socialLinks} />
      <SkillSection />
      <AboutSection about={portfolio?.aboutMe} />
      <ProjectSection
        title={portfolio?.myWork?.title}
        description={portfolio?.myWork?.description}
      />
      <LetsTalk socialLinks={portfolio?.footer?.socialLinks} />
      <Footer footer={portfolio?.footer} />
    </div>
  )
}

export default Page
