import "./globals.css";
import ScrollReveal from "../../components/scroll-reveal";

export const viewport = { colorScheme: "light" };

export const metadata = {
  "title": "매쓰킴 | 메인 시안 2026.09.08",
  "description": "문제를 바라보고 시작하는 기준을 배우는 김성민 수학",
  "robots": {
    "index": false,
    "follow": false
  }
};

export default function RootLayout({ children }) {
  return <html lang="ko"><body className="mathskim">{children}<ScrollReveal /></body></html>;
}
