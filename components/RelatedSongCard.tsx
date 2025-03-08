"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

interface RelatedSongCardProps {
  song: {
    id: string
    title: string
    image?: string
    duration?: string
    views?: string
    uploaded?: string
  }
  downloadPermalink: string
}

export default function RelatedSongCard({ song, downloadPermalink }: RelatedSongCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [])

  return (
    <div className="video-card">
      <Link href={`/${downloadPermalink.replace("%id%", song.id)}`} className="video-link">
        <div className="video-thumbnail">
          <img
            ref={imgRef}
            className={`transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
            src={
              isVisible
                ? song.image || "/placeholder.svg"
                : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3C/svg%3E"
            }
            alt={song.title}
          />
          {song.duration && <div className="video-duration">{song.duration}</div>}
        </div>
        <div className="video-info">
          <h3 className="video-title">{song.title}</h3>
          <div className="video-meta">
            {song.views && <span className="video-views">{song.views} views</span>}
            {song.uploaded && <span className="video-date">{song.uploaded}</span>}
          </div>
        </div>
      </Link>
    </div>
  )
}

