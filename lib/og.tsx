import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }

// Load just the glyphs we need from Google Fonts so previews use Inter, like the site
async function loadInter(weight: number, text: string) {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(text)}`)
  ).text()
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
  if (!src) throw new Error("Could not load Inter")
  return (await fetch(src[1])).arrayBuffer()
}

type PreviewProps = {
  eyebrow: string
  title: string
  subtitle?: string
  footerLeft: string
  /** Optional cover painting (data URL) shown full-bleed behind the text */
  background?: string
}

/** Shared 1200x630 link preview, matching lekan.ca's preview style. */
export async function renderPreview({ eyebrow, title, subtitle, footerLeft, background }: PreviewProps) {
  const footerRight = "lekan.blog"
  const text = [eyebrow, title, subtitle ?? "", footerLeft, footerRight].join("")
  const titleSize = title.length > 70 ? 56 : title.length > 40 ? 64 : 76

  // With a cover painting: the artwork, a soft fade, the title and the site name only
  if (background) {
    const mark = "lekan.blog"
    const [titleFont, markFont] = await Promise.all([loadInter(700, title + mark), loadInter(700, mark)])
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "80px 88px 44px",
            position: "relative",
            fontFamily: "Inter",
            color: "#ffffff",
          }}
        >
          <img
            src={background}
            width={1200}
            height={630}
            style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 1200,
              height: 630,
              backgroundImage:
                "linear-gradient(90deg, rgba(8,14,12,0.82) 0%, rgba(8,14,12,0.55) 50%, rgba(8,14,12,0.08) 100%)",
            }}
          />
          <div
            style={{
              display: "flex",
              maxWidth: 900,
              fontSize: titleSize,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: 28,
              fontWeight: 700,
              textShadow: "0 1px 12px rgba(0,0,0,0.45)",
            }}
          >
            {mark}
          </div>
        </div>
      ),
      { ...ogSize, fonts: [{ name: "Inter", data: titleFont, weight: 700, style: "normal" }] }
    )
  }

  const [regular, bold] = await Promise.all([loadInter(400, text), loadInter(700, text)])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 88px",
          backgroundColor: "#ffffff",
          color: "#0c0a09",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#737373" }}>{eyebrow}</div>
          <div
            style={{
              marginTop: 24,
              fontSize: titleSize,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div style={{ marginTop: 24, fontSize: 32, color: "#737373", lineHeight: 1.35 }}>{subtitle}</div>
          ) : null}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#737373" }}>
          <span>{footerLeft}</span>
          <span style={{ color: "#0c0a09", fontWeight: 700 }}>{footerRight}</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
      ],
    }
  )
}
