import type { Media } from '@/payload-types'

export function getMediaUrl(media?: Media | string | null): string | null {
  if (!media || typeof media === 'string') return null

  if (typeof media.cloudinary?.secure_url === 'string' && media.cloudinary.secure_url.length > 0) {
    return media.cloudinary.secure_url
  }

  if (typeof media.url === 'string' && media.url.length > 0) {
    return media.url
  }

  return null
}
