import Logo from './Logo'
import source from '@/assets/darklogo.png'

const LogoSection = () => {
  return (
    <div className="flex p-1 items-center justify-center">
      <Logo src={source.src} size={40} />
      <h3 className="text-center text-xl font-bold text-white dark:text-black ml-2">MITESH</h3>
    </div>
  )
}

export default LogoSection
