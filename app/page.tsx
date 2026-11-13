import { getBlogPosts } from "@/lib/blog"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import "./home.css"

export const metadata: Metadata = {
  description:
    "A personal blog about software development, technology, and philosophy.",
  alternates: { canonical: "/" },
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
                {post.cover && (
                  <div className="blog-card-cover">
                    <Image src={post.cover} alt="" fill sizes="300px" />
                  </div>
                )}
                <div className={`blog-card-body${post.cover ? " has-cover" : ""}`}>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <span className="blog-card-date">{post.date}</span>
                </div>
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
            name: "Lekan's Blog",
            url: "https://lekan.blog",
            author: {
              "@type": "Person",
              name: "Lekan Soyewo",
              alternateName: "Paul Soyewo",
              url: "https://www.lekan.ca",
            },
          }),
        }}
      />
    </div>
  )
}

