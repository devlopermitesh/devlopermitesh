import Logo from '../Header/Logo'
import LogoImage from '@/assets/logo.png'
import type { Portfolio } from '@/payload-types'

type FooterProps = {
  footer?: Portfolio['footer']
}

const defaultQuickLinks = [
  { label: 'About', url: '#about' },
  { label: 'Work', url: '#project' },
  { label: 'Contact', url: '#contact-me' },
]

const Footer = ({ footer }: FooterProps) => {
  const quickLinks =
    footer?.quickLinks && footer.quickLinks.length > 0 ? footer.quickLinks : defaultQuickLinks
  const backgroundColor = footer?.style?.backgroundColor ?? '#000000'
  const textColor = footer?.style?.textColor ?? '#ffffff'

  return (
    <footer
      className="w-full border-t border-gray-200"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <Logo src={LogoImage.src} alt="Logo" className="size-10" height={40} width={40} />
          <span className="text-sm font-medium tracking-tight">Mitesh</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-gray-200">
          {quickLinks.map((link) => {
            const isExternal = /^https?:\/\//.test(link.url)

            return (
              <a
                key={`${link.label}-${link.url}`}
                href={link.url}
                className="hover:text-white transition"
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer noopener' : undefined}
              >
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Credit */}
        <div className="text-xs text-gray-200 text-center md:text-right">
          <p>
            © {new Date().getFullYear()} {footer?.copyright ?? 'Mitesh'}
          </p>
          <p className="mt-1">
            Made with <span className="text-white">♥</span> in India
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
