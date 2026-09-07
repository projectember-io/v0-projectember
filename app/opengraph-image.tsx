import { ImageResponse } from "next/og"

export const alt = "Project Ember: an engineering journal about AI agents and life admin"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#0a0a0a", color: "#f0f0f0", borderLeft: "18px solid #c06236" }}>
      <div style={{ color: "#e49a73", fontSize: 28, marginBottom: 30 }}>Jamie Everett&apos;s engineering journal</div>
      <div style={{ fontSize: 88, fontWeight: 700 }}>Project Ember</div>
      <div style={{ fontSize: 36, marginTop: 30, maxWidth: 950 }}>Building specialised AI agents to get time back.</div>
    </div>, size,
  )
}
