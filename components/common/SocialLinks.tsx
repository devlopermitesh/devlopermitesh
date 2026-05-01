import { links } from '@/constant'
import type { Portfolio } from '@/payload-types'
import Image from 'next/image'
import { getMediaUrl } from '@/utils/media'
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { Globe, Mail } from 'lucide-react'

type PortfolioSocialLinks = Portfolio['footer']['socialLinks']

type SocialLinksProps = {
  links?: PortfolioSocialLinks
  itemClassName?: string
  iconClassName?: string
}

const DefaultIcon = ({ platform, className }: { platform: string; className: string }) => {
  switch (platform) {
    case 'github':
      return <FaGithub className={className} />
    case 'linkedin':
      return <FaLinkedinIn className={className} />
    case 'twitter':
      return <FaTwitter className={className} />
    case 'email':
      return <Mail className={className} />
    case 'website':
      return <Globe className={className} />
    default:
      return <Globe className={className} />
  }
}

const SocialLinks = ({
  links: portfolioLinks,
  itemClassName = 'flex h-14 w-14 items-center justify-center rounded-3xl border border-black/10 bg-white text-black shadow-sm transition hover:-translate-y-1 hover:border-black/30 hover:bg-black hover:text-white',
  iconClassName = 'h-6 w-6',
}: SocialLinksProps) => {
  return (
    <div className="flex flex-wrap gap-4 ">
      {Array.isArray(portfolioLinks) && portfolioLinks.length > 0
        ? portfolioLinks.map((link) => {
            const iconUrl = getMediaUrl(link.icon)

            return (
              <a
                key={`${link.platform}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={link.platform}
                className={itemClassName}
              >
                {iconUrl ? (
                  <Image src={iconUrl} alt={link.platform} width={24} height={24} />
                ) : (
                  <DefaultIcon platform={link.platform} className={iconClassName} />
                )}
              </a>
            )
          })
        : links.map(({ icon: Icon, url, site_name }) => (
            <a
              key={site_name}
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={site_name}
              className={itemClassName}
            >
              <Icon className={iconClassName} />
            </a>
          ))}
    </div>
  )
}

export default SocialLinks
