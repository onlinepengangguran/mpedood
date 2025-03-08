"use client"

import { useEffect, useState } from "react"
import { Facebook, Twitter, Linkedin } from "lucide-react"

interface ShareButtonsProps {
  title?: string
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState("")
  const [pageTitle, setPageTitle] = useState("")

  useEffect(() => {
    setCurrentUrl(window.location.href)
    setPageTitle(title || document.title)
  }, [title])

  const shareContent = (platform: string) => {
    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(pageTitle)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  return (
    <div className="share-buttons">
      <button className="share-button facebook" onClick={() => shareContent("facebook")} aria-label="Share on Facebook">
        <Facebook size={20} />
      </button>
      <button className="share-button twitter" onClick={() => shareContent("twitter")} aria-label="Share on Twitter">
        <Twitter size={20} />
      </button>
      <button className="share-button linkedin" onClick={() => shareContent("linkedin")} aria-label="Share on LinkedIn">
        <Linkedin size={20} />
      </button>
    </div>
  )
}

