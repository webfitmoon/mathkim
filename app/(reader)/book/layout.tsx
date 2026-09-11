import type { Metadata, Viewport } from "next";
import { LocaleLink as Link } from "@/components/locale-navigation";
import { LanguageToggle } from "@/components/language-toggle";
import { ReaderControls } from "@/components/reader-controls";
import { BOOK, BOOK_URL } from "@/lib/book";
import { READER_BOOT_SCRIPT } from "@/lib/reader-prefs";
import "./reader.css";
import styles from "./book.module.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#fffaf7",
  colorScheme: "light dark",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: `${BOOK.title.ko} | mathskim`,
    template: `%s | ${BOOK.title.ko}`,
  },
  description: `${BOOK.subtitle.ko}. 김성민이 쓴 책의 전문을 무료로 읽을 수 있습니다.`,
  openGraph: {
    type: "book",
    siteName: "mathskim",
    locale: "ko_KR",
    url: BOOK_URL,
    title: BOOK.title.ko,
    description: BOOK.subtitle.ko,
    authors: [BOOK.author.ko],
  },
  twitter: {
    card: "summary_large_image",
    title: BOOK.title.ko,
    description: BOOK.subtitle.ko,
  },
};

export default function BookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.readerRoot}>
      <script
        // Restores the stored theme / font size before the reader paints.
        dangerouslySetInnerHTML={{ __html: READER_BOOT_SCRIPT }}
      />
      <a className={styles.skipLink} href="#reader-main">
        <span className="lang-ko">본문으로 건너뛰기</span>
        <span className="lang-en">Skip to content</span>
      </a>

      <header className={styles.bar}>
        <Link className={styles.barHome} href="/" aria-label="mathskim home">
          <span aria-hidden="true">∫</span>
          <strong>MATHSKIM</strong>
        </Link>
        <Link className={styles.barBook} href="/book">
          <span className="lang-ko">{BOOK.title.ko}</span>
          <span className="lang-en">{BOOK.title.en}</span>
        </Link>
        <div className={styles.barTools}>
          <ReaderControls />
          <LanguageToggle />
        </div>
      </header>

      <main className={styles.main} id="reader-main" tabIndex={-1}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p>
          <span className="lang-ko">
            © 2026 김성민 · 전문 무료 공개 · 무단 전재·재배포·상업적 이용 금지
          </span>
          <span className="lang-en">
            © 2026 Sungmin Kim · Free to read here · No reproduction, redistribution, or
            commercial use
          </span>
        </p>
        <p className={styles.footerLinks}>
          <Link href="/book">
            <span className="lang-ko">목차</span>
            <span className="lang-en">Contents</span>
          </Link>
          <Link href="/">mathskim</Link>
        </p>
      </footer>
    </div>
  );
}
