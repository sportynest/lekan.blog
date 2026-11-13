import fs from "fs/promises"
import path from "path"
import { ogSize, renderPreview } from "@/lib/og"

export const alt = "Lekan's Blog"
export const size = ogSize
export const contentType = "image/png"

export default async function OpengraphImage() {
  const cover = await fs.readFile(path.join(process.cwd(), "public", "covers", "main.jpg"))
  return renderPreview({
    eyebrow: "Lekan's Blog",
    title: "Thoughts on software, technology and philosophy",
    footerLeft: "By Lekan (Paul) Soyewo",
    background: `data:image/jpeg;base64,${cover.toString("base64")}`,
  })
}
