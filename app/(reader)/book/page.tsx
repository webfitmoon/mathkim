import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/locale-navigation";
import { languageAlternates } from "@/lib/public-metadata";
import { ContinueReading } from "@/components/continue-reading";
import { BookDownloads } from "@/components/book-downloads";
import { CONTACT } from "@/lib/contact";
import {
  AUTHOR_BIO_EN,
  BOOK,
  ENGLISH_CHAPTER_COUNT,
  chapterPath,
  hasEnglish,
} from "@/lib/book";
import styles from "./book.module.css";

export const metadata: Metadata = {
  title: { absolute: `${BOOK.title.ko} — ${BOOK.author.ko} | mathskim` },
  description: `${BOOK.subtitle.ko}. ${BOOK.chapters.length}편 전문 무료 공개.`,
  alternates: languageAlternates("/book"),
};

const firstChapter = BOOK.chapters[0];

export default function BookPage() {
  const continueChapters = BOOK.chapters.map(
    ({ slug, labelKo, labelEn, titleKo, titleEn }) => ({
      slug,
      labelKo,
      labelEn,
      titleKo,
      titleEn,
    }),
  );
  const tenThousands = (BOOK.totalChars / 10000).toFixed(1);
  const hasFullEnglish = ENGLISH_CHAPTER_COUNT === BOOK.chapters.length;
  const englishMinutes = BOOK.chapters.reduce(
    (total, chapter) => total + (hasEnglish(chapter) ? chapter.readingMinutesEn : 0),
    0,
  );

  return (
    <div className={styles.cover}>
      <section className={styles.coverHero} aria-labelledby="book-title">
        <p className={styles.kicker}>
          <span className="lang-ko">무료 전자책 · 전문 공개</span>
          <span className="lang-en">Free e-book · Full text</span>
        </p>
        <h1 className={styles.coverTitle} id="book-title">
          <span className="lang-ko">
            수학,
            <br />
            머리로 풀지 마라
          </span>
          <span className="lang-en">{BOOK.title.en}</span>
        </h1>
        <p className={styles.coverSubtitle}>
          <span className="lang-ko">{BOOK.subtitle.ko}</span>
          <span className="lang-en">
            {BOOK.subtitle.en}. Korean original: 『{BOOK.title.ko}』.
          </span>
        </p>
        <p className={styles.byline}>
          <span className="lang-ko">{BOOK.author.ko} 지음</span>
          <span className="lang-en">by {BOOK.author.en}</span>
        </p>
        <p className={styles.coverStats}>
          <span className="lang-ko">
            {BOOK.chapters.length}편 · 약 {tenThousands}만 자 · 약 {BOOK.totalMinutes}분
          </span>
          <span className="lang-en">
            {hasFullEnglish
              ? `${BOOK.chapters.length} sections · about ${englishMinutes} minutes · English and Korean`
              : `${BOOK.chapters.length} sections · English edition: ${ENGLISH_CHAPTER_COUNT} of ${BOOK.chapters.length} sections`}
          </span>
        </p>
        <div className={styles.coverActions}>
          <Link className={styles.primaryAction} href={chapterPath(firstChapter.slug)}>
            <span className="lang-ko">처음부터 읽기</span>
            <span className="lang-en">Start reading</span>
            <span aria-hidden="true">→</span>
          </Link>
          <ContinueReading chapters={continueChapters} />
          <a
            className={styles.chatLink}
            href={CONTACT.kakaoOpenChatUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <small>
              <span className="lang-ko">카카오톡 오픈채팅</span>
              <span className="lang-en">KakaoTalk open chat</span>
            </small>
            <strong>
              <span className="lang-ko">읽다 궁금한 건 여기에</span>
              <span className="lang-en">Questions while reading? Ask here</span>
            </strong>
          </a>
        </div>
        <BookDownloads book="book" />
      </section>

      <section className={styles.why}>
        <p>
          <span className="lang-ko">
            이 책은 팔려고 쓴 책이 아닙니다. 수학에서 조용히 미끄러지고 있는 고1 학생
            하나, 그리고 문밖에서 지켜보는 부모님이 붙잡을 &lsquo;방법&rsquo; 하나를
            갖게 하려고 썼습니다. 전문을 여기에서 무료로, 가입 없이, 어떤 휴대전화에서든
            읽을 수 있습니다.
          </span>
          <span className="lang-en">
            This book was not written to be sold. It was written so that a first-year
            student who is quietly slipping in mathematics, and the parent watching from
            the doorway, would have one clear method to hold on to. The full text is free
            here, on any phone, with nothing to sign up for.
          </span>
        </p>
        <p>
          <span className="lang-ko">
            책의 조판 원본을 바탕으로 문장을 다듬은 웹 교정판이며, 전문을 제공합니다. {hasFullEnglish
              ? "본문은 한국어와 영어로 읽을 수 있습니다. 상단 KO/EN으로 전환합니다."
              : `영어판은 전체 ${BOOK.chapters.length}편 중 ${ENGLISH_CHAPTER_COUNT}편까지 제공됩니다.`}
          </span>
          <span className="lang-en">
            This full web edition is based on the book&rsquo;s typeset source,
            with copy edits for this edition. {hasFullEnglish
              ? "The full text can be read in English or Korean; switch with KO/EN at the top."
              : `English edition: ${ENGLISH_CHAPTER_COUNT} of ${BOOK.chapters.length} sections.`}
          </span>
        </p>
      </section>

      <nav className={styles.toc} aria-labelledby="toc-title">
        <h2 className={styles.sectionTitle} id="toc-title">
          <span className="lang-ko">목차</span>
          <span className="lang-en">Contents</span>
        </h2>
        <ol className={styles.tocList}>
          {BOOK.chapters.map((chapter) => (
            <li key={chapter.slug}>
              <Link className={styles.tocItem} href={chapterPath(chapter.slug)}>
                <span className={styles.tocLabel}>
                  <span className="lang-ko">{chapter.labelKo}</span>
                  <span className="lang-en">{chapter.labelEn}</span>
                </span>
                <span className={styles.tocTitle}>
                  <span
                    className={styles.tocTitleKo}
                    lang="ko"
                    dangerouslySetInnerHTML={{ __html: chapter.titleHtml }}
                  />
                  <span className={styles.tocTitleEn} lang="en">
                    {chapter.titleEn}
                  </span>
                </span>
                <span className={styles.tocMeta}>
                  <span className="lang-ko">약 {chapter.readingMinutes}분</span>
                  <span className="lang-en">
                    ~{hasEnglish(chapter) ? chapter.readingMinutesEn : chapter.readingMinutes} min
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <section className={styles.author} aria-labelledby="author-title">
        <h2 className={styles.sectionTitle} id="author-title">
          <span className="lang-ko">저자 소개</span>
          <span className="lang-en">About the author</span>
        </h2>
        <div
          className={`${styles.prose} lang-ko`}
          lang="ko"
          dangerouslySetInnerHTML={{ __html: BOOK.bioHtml }}
        />
        <div className={`${styles.prose} lang-en`} lang="en">
          {AUTHOR_BIO_EN.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={styles.colophon}>
        <p>
          <span className="lang-ko">
            © 2026 김성민. 이 책의 전문은 여기에서 무료로 읽을 수 있습니다. 무단 전재,
            재배포, 상업적 이용은 허용하지 않습니다.
          </span>
          <span className="lang-en">
            © 2026 Sungmin Kim. The full text is free to read here. Reproduction,
            redistribution, and commercial use are not permitted.
          </span>
        </p>
        <p className={styles.colophonMeta}>
          <span className="lang-ko">
            조판 원본 생성 · {BOOK.generatedAt.slice(0, 10)}
            {BOOK.webRevision && <> · 웹 교정 · {BOOK.webRevision}</>}
          </span>
          <span className="lang-en">
            Typeset source generated · {BOOK.generatedAt.slice(0, 10)}
            {BOOK.webRevision && <> · Web revision · {BOOK.webRevision}</>}
          </span>
        </p>
      </section>
    </div>
  );
}
