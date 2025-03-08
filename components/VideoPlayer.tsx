"use client"

import { useState } from "react"
import { Play } from "lucide-react"

interface VideoPlayerProps {
  videoId: string
  title: string
  thumbnail?: string
}

export default function VideoPlayer({ videoId, title, thumbnail }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className="player-container">
      <div className="player-wrapper">
        {isPlaying ? (
          <iframe
            className="player-iframe"
            src={`https://m.dodc.pro/${videoId}`}
            title={title}
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <div
              style={{
                backgroundImage: `url(${thumbnail || "/placeholder.svg"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
              }}
            />
            <button onClick={handlePlay} className="play-button" aria-label={`Play ${title}`}>
              <Play size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

