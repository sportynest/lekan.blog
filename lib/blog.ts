import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "posts")

type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Read all file names and filter by .md extension while excluding hidden files (files starting with a dot)
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("."))

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt,
    }
  })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

type BlogPostWithContent = BlogPost & {
  content: string
}

export async function getBlogPost(slug: string): Promise<BlogPostWithContent> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const matterResult = matter(fileContents)

  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    content: contentHtml,
    excerpt: matterResult.data.excerpt,
  }
}

