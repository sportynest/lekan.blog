import "./app.css"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import Header from "./components/Header"
import Footer from "./components/Footer"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://lekan.blog"),
  title: {
    default: "Lekan Blog",
    template: "%s | Lekan Blog",
  },
  description:
    "Personal blog sharing insights on software development, technology, and philosophy.",
  applicationName: "Lekan Blog",
  keywords: [
    "software development",
    "technology",
    "ai",
    "programming",
    "web development",
    "engineering",
  ],
  authors: [{ name: "Lekan" }],
  creator: "Lekan",
  publisher: "Lekan",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Lekan Blog",
    url: "https://lekan.blog",
    title: "Lekan Blog",
    description:
      "Personal blog sharing insights on software development, technology, and philosophy.",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lekan Blog - Software Development & Technology Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lekan Blog",
    description:
      "Personal blog sharing insights on software development, technology, and philosophy.",
    creator: "@lekan",
    images: [
      {
        url: "https://cdn.cognora.ca/Lekan.blog/lekan-blog-og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Lekan Blog - Philosophy, Technology, and Software Development",
      },
    ],
  },
  icons: {
    icon: [
      { url: "https://cdn.cognora.ca/Lekan.blog/favicons/icon1.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: [
      { url: "https://cdn.cognora.ca/Lekan.blog/favicons/favicon.ico" },
    ],
    apple: [
      { url: "https://cdn.cognora.ca/Lekan.blog/favicons/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        type: "image/svg+xml",
        url: "/icon0.svg",
      },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    title: "Lekan Blog",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="app-container">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

