import Logo from '../Header/Logo'
import LogoImage from '@/assets/logo.png'
const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <Logo src={LogoImage.src} alt="Logo" className="size-10" height={40} width={40} />
          <span className="text-sm font-medium tracking-tight">Mitesh</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-gray-200">
          <a href="#" className="hover:text-white transition">
            About
          </a>
          <a href="#" className="hover:text-white transition">
            Work
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
        </div>

        {/* Credit */}
        <div className="text-xs text-gray-200 text-center md:text-right">
          <p>© {new Date().getFullYear()} Mitesh</p>
          <p className="mt-1">
            Made with <span className="text-white">♥</span> in India
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
