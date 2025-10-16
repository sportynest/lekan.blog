"use client"

import Link from "next/link"
import "../header.css"
import { Home01Icon, News01Icon } from "hugeicons-react"

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <div className="header-left">
        </div>
        <div className="header-nav-links">
          <a
            href="https://lekan.ca"
            className="header-nav-link first-child"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Home01Icon size={16} />
            Home
          </a>
          <Link href="/blog" className="header-nav-link last-child">
            <News01Icon size={16} />
            All Posts
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header

