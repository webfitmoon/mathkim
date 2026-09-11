import type { Metadata, Viewport } from "next";
import { LocaleLink as Link } from "@/components/locale-navigation";
import { LanguageToggle } from "@/components/language-toggle";
import { ReaderControls } from "@/components/reader-controls";
import { READER_BOOT_SCRIPT } from "@/lib/reader-prefs";
import { STORY, STORY_DESCRIPTION, STORY_URL } from "@/lib/story";
import "../book/reader.css";
import styles from "../book/book.module.css";

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
    default: `${STORY.title.ko} | mathskim`,
    template: `%s | ${STORY.title.ko}`,
  },
  description: STORY_DESCRIPTION.ko,
  openGraph: {
    type: "website",
    siteName: "mathskim",
    locale: "ko_KR",
    url: STORY_URL,
    title: STORY.title.ko,
    description: STORY_DESCRIPTION.ko,
  },
  twitter: {
    card: "summary_large_image",
    title: STORY.title.ko,
    description: STORY_DESCRIPTION.ko,
  },
};

/**
 * /story shares the /book reader shell: same tokens, top bar, reader
 * controls, and body styles (reader.css), so the two read as one product.
 */
import LegalLinks from "../../../components/legal-links";

export default function StoryLayout({
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
        <Link className={styles.barBook} href="/story">
          <span className="lang-ko">{STORY.title.ko}</span>
          <span className="lang-en">{STORY.title.en}</span>
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
            © 2026 김성민 · 무단 전재·재배포·상업적 이용 금지
          </span>
          <span className="lang-en">
            © 2026 Sungmin Kim · No reproduction, redistribution, or commercial use
          </span>
        </p>
        <p className={styles.footerLinks}>
          <Link href="/story">
            <span className="lang-ko">목차</span>
            <span className="lang-en">Contents</span>
          </Link>
          <Link href="/book">
            <span className="lang-ko">책</span>
            <span className="lang-en">The book</span>
          </Link>
          <Link href="/">mathskim</Link>
        </p>
        <LegalLinks />
      </footer>
    </div>
  );
}
