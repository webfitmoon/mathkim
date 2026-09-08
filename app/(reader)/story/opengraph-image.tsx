import { ImageResponse } from "next/og";
import { STORY } from "@/lib/story";

export const alt = `${STORY.title.ko} — ${STORY.author.ko} · 자전 에세이`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function StoryOpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        color: "#1c1e22",
        background: "#f6f3ea",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "#153f73", fontSize: 44 }}>∫</span>
          <span style={{ letterSpacing: 5, color: "#5f636b" }}>MATHSKIM</span>
        </div>
        <span style={{ color: "#28705a", letterSpacing: 4 }}>ESSAY · 자전 에세이 6편</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#153f73",
            letterSpacing: -2,
          }}
        >
          {STORY.title.ko}
        </div>
        <span style={{ fontSize: 34, color: "#1c1e22" }}>{STORY.title.en}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
        <span style={{ fontWeight: 700 }}>{STORY.author.ko} 지음</span>
        <span style={{ color: "#5f636b" }}>mathskim.com/story</span>
      </div>
    </div>,
    size,
  );
}
