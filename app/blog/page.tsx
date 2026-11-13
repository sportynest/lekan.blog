import Link from "next/link"
import Image from "next/image"
import { getBlogPosts } from "@/lib/blog"
import type { Metadata } from "next"
import "../home.css"

export const metadata: Metadata = {
  title: "All Posts",
  description: "Articles and thoughts on software development, technology, and more.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "All Posts | Lekan's Blog",
    description: "Articles and thoughts on software development, technology, and more.",
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Posts | Lekan's Blog",
    description: "Articles and thoughts on software development, technology, and more.",
  },
}

export default async function BlogPage() {
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
    </div>
  )
}

