import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageGate } from "@/components/language-gate";
import { LocaleScope } from "@/components/locale-navigation";
import { LOCALE_BOOT_SCRIPT } from "@/lib/locale";
import { languageAlternates } from "@/lib/public-metadata";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  // Keep text stable on slow connections instead of swapping fonts after paint.
  display: "optional",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
  // Mono is used in the reader, not the homepage's first viewport.
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fffaf7",
  colorScheme: "light",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  metadataBase: new URL("https://mathkim-zeta.vercel.app"),
  title: {
    default: "mathskim | 김성민 수학",
    template: "%s | mathskim",
  },
  description:
    "공식 암기보다 수학의 구조와 직관을 먼저. 김성민의 두 권의 무료 책, 풀이의 첫 질문, 강좌 안내를 만나보세요.",
  keywords: [
    "김성민 수학",
    "mathskim",
    "대성마이맥",
    "수능 수학",
    "AI Q&A",
    "Lecture Coach",
    "명함",
    "연락처",
    "수학 머리로 풀지 마라",
    "무료 전자책",
  ],
  applicationName: "mathskim",
  appleWebApp: {
    capable: true,
    title: "mathskim",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    alternateLocale: "en_GB",
    url: "https://mathkim-zeta.vercel.app",
    siteName: "mathskim",
    title: "공식보다 먼저, 수학의 구조가 보이게.",
    description:
      "두 권의 무료 책에서 한 장을 읽고, 내 풀이에서 막힌 지점을 질문해 보세요. 김성민 수학 · mathskim.",
  },
  twitter: {
    card: "summary_large_image",
    title: "mathskim | 김성민 수학",
    description: "공식보다 먼저, 수학의 구조가 보이게.",
  },
  alternates: languageAlternates("/"),
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      data-locale="ko"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // Runs before paint so QR return visits keep language without flash.
          dangerouslySetInnerHTML={{ __html: LOCALE_BOOT_SCRIPT }}
        />
      </head>
      <body>
        <LocaleScope>
          {children}
          <LanguageGate />
        </LocaleScope>
      </body>
    </html>
  );
}
