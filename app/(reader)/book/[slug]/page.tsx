import type { Metadata, ResolvingMetadata } from "next";
import { LocaleLink as Link } from "@/components/locale-navigation";
import { languageAlternates } from "@/lib/public-metadata";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/reading-progress";
import { ReaderContents } from "@/components/reader-contents";
import { readerSections } from "@/lib/reader-sections";
import {
  BOOK,
  BOOK_URL,
  chapterPath,
  getAdjacentChapters,
  getChapter,
  hasEnglish,
} from "@/lib/book";
import styles from "../book.module.css";

type ChapterPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return BOOK.chapters.map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata(
  { params }: ChapterPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) return {};

  const title = `${chapter.labelKo}. ${chapter.titleKo}`;
  const url = `${BOOK_URL}/${slug}`;
  const parentImages = (await parent).openGraph?.images ?? [];

  return {
    title,
    description: chapter.summaryKo,
    alternates: languageAlternates(`/book/${slug}`),
    openGraph: {
      type: "article",
      url,
      title: `${title} — ${BOOK.title.ko}`,
      description: chapter.summaryKo,
      images: parentImages,
      authors: [BOOK.author.ko],
    },
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const { prev, next } = getAdjacentChapters(slug);
  const hasEnglishBody = hasEnglish(chapter);
  const reading = readerSections(chapter.html, chapter.htmlEn);

  return (
    <>
      <ReadingProgress slug={slug} />
      <article className={styles.chapter}>
        <header className={styles.chapterHead}>
          <p className={styles.chapterLabel}>
            <span>
              <span className="lang-ko">{chapter.labelKo}</span>
              <span className="lang-en">{chapter.labelEn}</span>
            </span>
            <span className={styles.chapterCount}>
              {chapter.order + 1} / {BOOK.chapters.length}
            </span>
          </p>
          <h1 className={styles.chapterTitle}>
            <span
              className="lang-ko"
              lang="ko"
              dangerouslySetInnerHTML={{ __html: chapter.titleHtml }}
            />
            <span className="lang-en" lang="en">
              {chapter.titleEn}
            </span>
          </h1>
          <p className={styles.chapterTitleEn}>
            <span className="lang-ko" lang="en">
              {chapter.titleEn}
            </span>
            <span
              className="lang-en"
              lang="ko"
              dangerouslySetInnerHTML={{ __html: chapter.titleHtml }}
            />
          </p>
          <p className={styles.chapterMeta}>
            <span className="lang-ko">
              약 {chapter.readingMinutes}분 · {chapter.chars.toLocaleString("ko-KR")}자
            </span>
            <span className="lang-en">
              {hasEnglishBody
                ? `~${chapter.readingMinutesEn} min · ${chapter.wordsEn.toLocaleString("en-GB")} words`
                : `~${chapter.readingMinutes} min · Korean text`}
            </span>
          </p>
        </header>

        <p className={styles.lede}>
          <span className="lang-ko">{chapter.summaryKo}</span>
          <span className="lang-en" lang="en">
            {chapter.summaryEn}
          </span>
        </p>

        <ReaderContents sections={reading.sections} />
        {hasEnglishBody ? (
          <>
            <div
              className="reader-body lang-ko"
              lang="ko"
              dangerouslySetInnerHTML={{ __html: reading.htmlKo }}
            />
            <div
              className="reader-body lang-en"
              lang="en"
              dangerouslySetInnerHTML={{ __html: reading.htmlEn! }}
            />
          </>
        ) : (
          <div
            className="reader-body"
            lang="ko"
            dangerouslySetInnerHTML={{ __html: reading.htmlKo }}
          />
        )}

        <nav className={styles.pager} aria-label="Chapter navigation">
          {prev ? (
            <Link className={styles.pagerLink} href={chapterPath(prev.slug)}>
              <small>
                ← <span className="lang-ko">이전 · {prev.labelKo}</span>
                <span className="lang-en">Previous · {prev.labelEn}</span>
              </small>
              <strong>
                <span className="lang-ko" lang="ko">
                  {prev.titleKo}
                </span>
                <span className="lang-en" lang="en">
                  {prev.titleEn}
                </span>
              </strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              className={`${styles.pagerLink} ${styles.pagerNext}`}
              href={chapterPath(next.slug)}
            >
              <small>
                <span className="lang-ko">다음 · {next.labelKo}</span>
                <span className="lang-en">Next · {next.labelEn}</span> →
              </small>
              <strong>
                <span className="lang-ko" lang="ko">
                  {next.titleKo}
                </span>
                <span className="lang-en" lang="en">
                  {next.titleEn}
                </span>
              </strong>
            </Link>
          ) : (
            <span />
          )}
          <Link className={styles.pagerToc} href="/book">
            <span className="lang-ko">목차로</span>
            <span className="lang-en">Contents</span>
          </Link>
        </nav>
      </article>
      <aside className={styles.readerQuestion}>
        <p><span className="lang-ko">읽은 내용을 내 문제에 적용하다 막혔나요?</span><span className="lang-en">Stuck applying an idea from this chapter?</span></p>
        <Link href={`/ask?from=mathskim&ref=chapter:book.${slug}`}><span className="lang-ko">시도한 풀이와 막힌 지점 질문하기</span><span className="lang-en">Ask about what you tried and where you got stuck</span> →</Link>
      </aside>
    </>
  );
}
