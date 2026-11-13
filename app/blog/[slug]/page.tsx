import { getBlogPost, getBlogPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import Image from "next/image"
import type { Metadata } from "next"
import "../../blog-post.css"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: "Lekan (Paul) Soyewo", url: "https://lekan.ca" }],
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${params.slug}`,
      siteName: "Lekan's Blog",
      publishedTime: post.date,
      authors: ["https://lekan.ca"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="blog-post-container">
      {post.cover && (
        <div className="blog-post-cover">
          <Image
            src={post.cover}
            alt={post.coverAlt ?? ""}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 900px"
          />
        </div>
      )}
      <h1 className="blog-post-title">{post.title}</h1>
      <p className="blog-post-date">{post.date}</p>
      <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            ...(post.cover ? { image: `https://lekan.blog${post.cover}` } : {}),
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Person",
              name: "Lekan Soyewo",
              alternateName: "Paul Soyewo",
              url: "https://lekan.ca",
            },
            publisher: {
              "@type": "Person",
              name: "Lekan Soyewo",
              url: "https://lekan.ca",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://lekan.blog/blog/${post.slug}`,
            },
            url: `https://lekan.blog/blog/${post.slug}`,
          }),
        }}
      />
    </div>
  )
}

