'use client'

import AboutSection from '@/components/About'
import Footer from '@/components/Footer'
import HeroView from '@/components/HeroSection'
import LetsTalk from '@/components/LetsTalk'
import ProjectSection from '@/components/Projects'
import SkillSection from '@/components/SkillSection'

const Page = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <HeroView />
      <SkillSection />
      <AboutSection />
      <ProjectSection />
      <LetsTalk />
      <Footer />
    </div>
  )
}

export default Page
