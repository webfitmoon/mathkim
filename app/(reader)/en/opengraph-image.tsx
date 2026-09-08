import { ImageResponse } from "next/og";

export const alt = "mathskim — See the structure before the formula";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f8faf8", color: "#1c302c", padding: "64px 72px" }}>
    <div style={{ display: "flex", fontSize: 30, letterSpacing: 5 }}>MATHSKIM</div>
    <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.12 }}>
      <span>See the structure</span><span>before the formula.</span>
    </div>
    <div style={{ display: "flex", fontSize: 25, color: "#576962" }}>Sungmin Kim · Read, explore, ask.</div>
  </div>, size);
}
