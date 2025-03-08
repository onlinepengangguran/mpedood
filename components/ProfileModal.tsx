"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

interface ProfileModalProps {
  onClose: () => void
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  useEffect(() => {
    // Close modal on escape key
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [onClose])

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        <h2 className="modal-title">User Profile</h2>
        <p className="mb-4">Sign in to access your personalized content and settings.</p>
        <div className="flex justify-center">
          <button className="btn btn-primary">Sign In</button>
        </div>
      </div>
    </div>
  )
}

