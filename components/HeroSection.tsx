'use client'

import Image from 'next/image'
import BannerImage from '@/assets/Banner.png'
import SocialLinks from './common/SocialLinks'
const HeroView = () => {
  return (
    <section className="w-full min-h-auto  max-w-7xl flex items-start justify-center py-20 mx-auto ">
      <div className="flex flex-col md:flex-row items-center  w-full max-w-6xl gap-10 ">
        {/* Content */}
        <main className="flex flex-col gap-4 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl  text-gray-800">
            Hello I&apos;am <b className="text-black">Mitesh Gehlot</b>
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            <b>Fullstack</b>{' '}
            <span className="text-white [-webkit-text-stroke:1px_black]">Developer</span>
          </h2>
          <h3 className="text-lg md:text-3xl text-gray-800">
            Based In <b className="text-black">India.</b>
          </h3>
          <p className="text-sm md:text-md text-gray-700 max-w-xl">
            passionate about learning new technologies and solving real-world problems through
            software. I enjoy turning ideas into reality and strive to learn something new and
            improve myself every single day.
          </p>
          <div className="mx-auto md:mx-0">
            <SocialLinks />
          </div>
          <div className="flex flex-wrap gap-4 mt-6 mx-auto md:mx-0">
            <button className="flex items-center justify-center rounded-3xl border border-black/10 bg-white px-4 py-2 text-sm md:px-6 md:py-3 md:text-base text-black shadow-sm transition hover:-translate-y-1 hover:border-black/30 hover:bg-black hover:text-white">
              Contact Me
            </button>
            <button className="flex items-center justify-center rounded-3xl border border-black/10 bg-white px-4 py-2 text-sm md:px-6 md:py-3 md:text-base text-black shadow-sm transition hover:-translate-y-1 hover:border-black/30 hover:bg-black hover:text-white">
              Download Resume
            </button>
          </div>
        </main>
        {/* Images */}
        <aside className="order-first md:order-last flex self-starts mb-auto ">
          <Image
            src={BannerImage}
            alt="Hero Banner"
            className="w-[550px] md:w-[600px] object-contain"
            priority
          />
        </aside>
      </div>
    </section>
  )
}
export default HeroView
