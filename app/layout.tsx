import "./app.css"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { themeFromUrlScript } from "./components/themeFromUrl"
import Header from "./components/Header"
import Footer from "./components/Footer"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://lekan.blog"),
  title: {
    default: "Lekan's Blog",
    template: "%s | Lekan's Blog",
  },
  description:
    "Personal blog sharing insights on software development, technology, and philosophy.",
  applicationName: "Lekan's Blog",
  keywords: [
    "software development",
    "technology",
    "ai",
    "programming",
    "web development",
    "engineering",
  ],
  authors: [{ name: "Lekan (Paul) Soyewo", url: "https://lekan.ca" }],
  creator: "Lekan (Paul) Soyewo",
  publisher: "Lekan (Paul) Soyewo",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Lekan's Blog",
    url: "https://lekan.blog",
    title: "Lekan's Blog",
    description:
      "Personal blog sharing insights on software development, technology, and philosophy.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lekan's Blog",
    description:
      "Personal blog sharing insights on software development, technology, and philosophy.",
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
  },
  manifest: "/manifest.json",
  appleWebApp: {
    title: "Lekan's Blog",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeFromUrlScript }} />
      </head>
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

