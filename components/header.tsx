"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, Menu, X, ArrowLeft } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import config from "@/config/default/config.json"

export default function Header() {
  const [query, setQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/${config.search_permalink.replace("%query%", encodeURIComponent(query))}`)
      setSearchExpanded(false)
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded)
    // Focus the search input when expanded
    if (!searchExpanded) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false)
    setSearchExpanded(false)
  }, [pathname])

  return (
    <header className={`header ${scrolled ? "scrolled" : ""} ${searchExpanded ? "search-expanded" : ""}`}>
      <div className="header-content">
        {!searchExpanded && (
          <Link href="/" className="logo">
            {config.site_name}
          </Link>
        )}

        {searchExpanded && (
          <button className="mobile-search-toggle" onClick={toggleSearch} aria-label="Close search">
            <ArrowLeft size={24} />
          </button>
        )}

        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for songs..."
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-button" aria-label="Search">
              <Search size={20} />
            </button>
          </form>
        </div>

        {!searchExpanded && (
          <button className="mobile-search-toggle" onClick={toggleSearch} aria-label="Open search">
            <Search size={24} />
          </button>
        )}

        <button
          className="menu-toggle"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/page/about" className={`nav-link ${pathname === "/page/about" ? "active" : ""}`}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/page/contact" className={`nav-link ${pathname === "/page/contact" ? "active" : ""}`}>
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/page/dmca" className={`nav-link ${pathname === "/page/dmca" ? "active" : ""}`}>
                DMCA
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

