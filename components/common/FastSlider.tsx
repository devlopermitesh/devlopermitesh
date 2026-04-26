'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export interface SliderImage {
  src: string
  alt?: string
}

interface FastSliderProps {
  images: SliderImage[]
  intervalMs?: number
  className?: string
}

export default function FastSlider({
  images,
  intervalMs = 3000,
  className = 'relative w-full h-100 overflow-hidden',
}: FastSliderProps) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!images || images.length === 0) {
      return
    }

    images.forEach(({ src }) => {
      const img = new window.Image()
      img.src = src
    })

    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, intervalMs)

    return () => window.clearInterval(interval)
  }, [images, intervalMs])

  if (!images || images.length === 0) {
    return (
      <div className={`${className} bg-gray-900 text-gray-400 flex items-center justify-center`}>
        No images available
      </div>
    )
  }

  return (
    <div className={className}>
      {images.map((image, i) => (
        <Image
          key={`${image.src}-${i}`}
          src={image.src}
          alt={image.alt ?? `Slide ${i + 1}`}
          fill
          className={`absolute top-0 left-0 object-fill transition-opacity duration-500 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          priority={i === 0}
        />
      ))}
    </div>
  )
}
