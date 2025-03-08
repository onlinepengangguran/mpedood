"use client"

import { useState, useCallback } from "react"
import { Menu, Home, User, Search, ArrowRight, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import SearchModal from "./SearchModal"
import ProfileModal from "./ProfileModal"

export default function FloatingMenu() {
  const [showMenu, setShowMenu] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const openSearchModal = () => {
    setSearchModalOpen(true)
    setShowMenu(false)
  }

  const closeSearchModal = useCallback(() => {
    setSearchModalOpen(false)
  }, [])

  const openProfileModal = () => {
    setProfileModalOpen(true)
    setShowMenu(false)
  }

  const closeProfileModal = useCallback(() => {
    setProfileModalOpen(false)
  }, [])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/f/${encodeURIComponent(query)}`)
      closeSearchModal()
    }
  }

  return (
    <>
      <div className="fab" onClick={toggleMenu}>
        {showMenu ? <X size={24} /> : <Menu size={24} />}
      </div>

      {showMenu && (
        <div className="fab-menu">
          <Link href="/" className="fab-item" style={{ backgroundColor: "#0072f5" }}>
            <Home size={24} />
          </Link>
          <button className="fab-item" style={{ backgroundColor: "#4338ca" }} onClick={openProfileModal}>
            <User size={24} />
          </button>
          <button className="fab-item" style={{ backgroundColor: "#16a34a" }} onClick={openSearchModal}>
            <Search size={24} />
          </button>
          <Link href="/page/about" className="fab-item" style={{ backgroundColor: "#38bdf8" }}>
            <ArrowRight size={24} />
          </Link>
        </div>
      )}

      {searchModalOpen && <SearchModal onClose={closeSearchModal} onSearch={handleSearch} />}

      {profileModalOpen && <ProfileModal onClose={closeProfileModal} />}
    </>
  )
}

