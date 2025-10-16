import { getBlogPost, getBlogPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
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
    title: `${post.title} - Lekan Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://lekan.blog/blog/${params.slug}`,
      siteName: "Lekan Blog",
      publishedTime: post.date,
      images: [
        {
          url: "https://cdn.cognora.ca/Lekan.blog/lekan-blog-og-image-1200x630.png",
          width: 1200,
          height: 630,
          alt: `${post.title} - Lekan Blog`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@lekan',
      images: [
        {
          url: "https://cdn.cognora.ca/Lekan.blog/lekan-blog-og-image-1200x630.png",
          width: 1200,
          height: 630,
          alt: `${post.title} - Lekan Blog`,
        },
      ],
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
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Person",
              name: "Lekan",
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

