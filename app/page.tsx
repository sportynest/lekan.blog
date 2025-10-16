import { getBlogPosts } from "@/lib/blog"
import Link from "next/link"
import type { Metadata } from "next"
import "./home.css"

export const metadata: Metadata = {
  description:
    "A personal blog about software development, technology, and philosophy.",
  openGraph: {
    title: "Lekan Blog",
    description:
      "A personal blog about software development, technology, and philosophy.",
    type: "website",
    url: "https://lekan.blog",
    images: [
      {
        url: "https://cdn.cognora.ca/Lekan.blog/lekan-blog-og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "Lekan Blog - Philosophy, Technology, and Software Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lekan Blog",
    description:
      "A personal blog about software development, technology, and philosophy.",
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
}

export default async function Home() {
  const posts = await getBlogPosts()
  return (
    <div className="home-container">
      <section className="blog-section">
        <div className="blog-grid">
          {posts.map((post) => (
            <div key={post.slug} className="blog-card">
              <Link href={`/blog/${post.slug}`}>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <span className="blog-card-date">{post.date}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
      {/* Structured data for the website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Lekan Blog",
            url: "https://lekan.blog",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://lekan.blog/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </div>
  )
}

