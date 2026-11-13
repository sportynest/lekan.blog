import fs from "fs/promises"
import path from "path"
import { getBlogPost, getBlogPosts } from "@/lib/blog"
import { ogSize, renderPreview } from "@/lib/og"

export const alt = "Lekan's Blog post"
export const size = ogSize
export const contentType = "image/png"

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

function formatDate(date: string) {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
}

async function loadCover(cover?: string) {
  if (!cover) return undefined
  try {
    const file = await fs.readFile(path.join(process.cwd(), "public", cover))
    return `data:image/jpeg;base64,${file.toString("base64")}`
  } catch {
    return undefined
  }
}

export default async function PostOpengraphImage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  const background = await loadCover(post?.cover)
  return renderPreview({
    background,
    eyebrow: "Lekan's Blog",
    title: post?.title ?? "Lekan's Blog",
    subtitle: post?.excerpt,
    footerLeft: post ? `Lekan (Paul) Soyewo · ${formatDate(post.date)}` : "By Lekan (Paul) Soyewo",
  })
}
