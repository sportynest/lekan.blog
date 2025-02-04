import Link from "next/link"
import { getBlogPosts } from "@/lib/blog"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Blog - Lekan Blog',
  description: 'Articles and thoughts on software development, technology, and more.',
  openGraph: {
    title: 'Blog - Lekan Blog',
    description: 'Articles and thoughts on software development, technology, and more.',
    type: 'website',
  },
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Posts</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
            <div className="bg-card text-card-foreground p-6 rounded-lg transition-transform hover:scale-105">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <span className="text-sm text-accent-foreground">{post.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

