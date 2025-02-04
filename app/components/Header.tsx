"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-background text-foreground border-b border-border">
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Lekan Blog
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="hover:text-accent-foreground transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-accent-foreground transition-colors">
              All Posts
            </Link>
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            <Menu size={24} />
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link href="/" className="block hover:text-accent-foreground transition-colors">
              Home
            </Link>
            <Link href="/blog" className="block hover:text-accent-foreground transition-colors">
              All Posts
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

