import { ImageResponse } from "next/og";
import { BOOK } from "@/lib/book";

export const alt = `${BOOK.title.ko} — ${BOOK.author.ko} · 무료 전자책`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function BookOpenGraphImage() {
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
        <span style={{ color: "#28705a", letterSpacing: 4 }}>FREE E-BOOK · 무료 전문 공개</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#153f73",
            letterSpacing: -2,
          }}
        >
          <span>수학,</span>
          <span>머리로 풀지 마라</span>
        </div>
        <span style={{ fontSize: 30, color: "#1c1e22" }}>{BOOK.subtitle.ko}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
        <span style={{ fontWeight: 700 }}>{BOOK.author.ko} 지음</span>
        <span style={{ color: "#5f636b" }}>mathskim.com/book</span>
      </div>
    </div>,
    size,
  );
}
