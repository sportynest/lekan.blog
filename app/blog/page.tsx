import Link from "next/link"
import { getBlogPosts } from "@/lib/blog"
import type { Metadata } from "next"
import "../home.css"

export const metadata: Metadata = {
  title: 'Blog - Lekan Blog',
  description: 'Articles and thoughts on software development, technology, and more.',
  openGraph: {
    title: 'Blog - Lekan Blog',
    description: 'Articles and thoughts on software development, technology, and more.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Lekan Blog',
    description: 'Articles and thoughts on software development, technology, and more.',
    creator: '@lekan',
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
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <span className="blog-card-date">{post.date}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

