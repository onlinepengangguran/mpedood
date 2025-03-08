"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"

interface SearchModalProps {
  onClose: () => void
  onSearch: (query: string) => void
}

export default function SearchModal({ onClose, onSearch }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus the input when modal opens
    inputRef.current?.focus()

    // Close modal on escape key
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        <h2 className="modal-title">Search</h2>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            placeholder="Search for music..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button type="submit" className="search-button">
            <Search size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}

