import { links } from '@/constant'

const SocialLinks = () => {
  return (
    <div className="flex flex-wrap gap-4 ">
      {links.map(({ icon: Icon, url, site_name }) => (
        <a
          key={site_name}
          href={url}
          target="_blank"
          rel="noreferrer"
          aria-label={site_name}
          className="flex h-14 w-14 items-center justify-center rounded-3xl border border-black/10 bg-white text-black shadow-sm transition hover:-translate-y-1 hover:border-black/30 hover:bg-black hover:text-white"
        >
          <Icon className="h-6 w-6" />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
