"use client"

import { useEffect, useState, type AnchorHTMLAttributes } from "react"
import { useTheme } from "next-themes"

const THEMES = ["light", "dark", "system"]

type ThemeLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/**
 * A link to the sister site (lekan.ca <-> lekan.blog) that carries the visitor's
 * theme choice as ?theme=, since the two domains can't share storage.
 */
export default function ThemeLink({ href, ...rest }: ThemeLinkProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  let target = href
  if (mounted && theme && THEMES.includes(theme)) {
    const url = new URL(href)
    url.searchParams.set("theme", theme)
    target = url.toString()
  }

  return <a href={target} {...rest} />
}
