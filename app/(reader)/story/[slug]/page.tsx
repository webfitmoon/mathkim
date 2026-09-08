import type { Metadata, ResolvingMetadata } from "next";
import { LocaleLink as Link } from "@/components/locale-navigation";
import { languageAlternates } from "@/lib/public-metadata";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/reading-progress";
import { ReaderContents } from "@/components/reader-contents";
import { readerSections } from "@/lib/reader-sections";
import { STORY_PROGRESS_KEY } from "@/lib/reader-prefs";
import {
  STORY,
  STORY_URL,
  episodePath,
  getAdjacentEpisodes,
  getEpisode,
  hasEnglish,
} from "@/lib/story";
import styles from "../../book/book.module.css";

type EpisodePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return STORY.episodes.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata(
  { params }: EpisodePageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisode(slug);
  if (!episode) return {};

  const title = `${episode.labelKo}. ${episode.title}`;
  const url = `${STORY_URL}/${slug}`;
  const parentImages = (await parent).openGraph?.images ?? [];

  return {
    title,
    description: episode.excerpt,
    alternates: languageAlternates(`/story/${slug}`),
    openGraph: {
      type: "article",
      url,
      title: `${title} — ${STORY.title.ko}`,
      description: episode.excerpt,
      images: parentImages,
      authors: [STORY.author.ko],
    },
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = getEpisode(slug);
  if (!episode) notFound();

  const { prev, next } = getAdjacentEpisodes(slug);
  const hasEnglishBody = hasEnglish(episode);
  const reading = readerSections(episode.html, episode.htmlEn);

  return (
    <>
      <ReadingProgress slug={slug} storageKey={STORY_PROGRESS_KEY} />
      <article className={styles.chapter}>
        <header className={styles.chapterHead}>
          <p className={styles.chapterLabel}>
            <span>
              <span className="lang-ko">{episode.labelKo}</span>
              <span className="lang-en">{episode.labelEn}</span>
            </span>
            <span className={styles.chapterCount}>
              {episode.order + 1} / {STORY.episodes.length}
            </span>
          </p>
          <h1 className={styles.chapterTitle}>
            <span className="lang-ko" lang="ko">
              {episode.title}
            </span>
            <span className="lang-en" lang="en">
              {episode.titleEn}
            </span>
          </h1>
          <p className={styles.chapterTitleEn}>
            <span className="lang-ko" lang="en">
              {episode.titleEn}
            </span>
            <span className="lang-en" lang="ko">
              {episode.title}
            </span>
          </p>
          <p className={styles.chapterMeta}>
            <span className="lang-ko">
              약 {episode.readingMinutes}분 · {episode.chars.toLocaleString("ko-KR")}자
            </span>
            <span className="lang-en">
              {hasEnglishBody
                ? `~${episode.readingMinutesEn} min · ${episode.wordsEn.toLocaleString("en-GB")} words`
                : `~${episode.readingMinutes} min · Korean text`}
            </span>
          </p>
        </header>

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
          <>
            {/* No English edition for this episode: EN readers get the summary, then the Korean text. */}
            <div className="lang-en">
              <p className={styles.lede} lang="en">
                {episode.summaryEn}
              </p>
            </div>
            <div
              className="reader-body"
              lang="ko"
              dangerouslySetInnerHTML={{ __html: reading.htmlKo }}
            />
          </>
        )}

        <nav className={styles.pager} aria-label="Episode navigation">
          {prev ? (
            <Link className={styles.pagerLink} href={episodePath(prev.slug)}>
              <small>
                ← <span className="lang-ko">이전 · {prev.labelKo}</span>
                <span className="lang-en">Previous · {prev.labelEn}</span>
              </small>
              <strong>
                <span className="lang-ko" lang="ko">
                  {prev.title}
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
              href={episodePath(next.slug)}
            >
              <small>
                <span className="lang-ko">다음 · {next.labelKo}</span>
                <span className="lang-en">Next · {next.labelEn}</span> →
              </small>
              <strong>
                <span className="lang-ko" lang="ko">
                  {next.title}
                </span>
                <span className="lang-en" lang="en">
                  {next.titleEn}
                </span>
              </strong>
            </Link>
          ) : (
            <span />
          )}
          <Link className={styles.pagerToc} href="/story">
            <span className="lang-ko">목차로</span>
            <span className="lang-en">Contents</span>
          </Link>
        </nav>
      </article>
      <aside className={styles.readerQuestion}>
        <p><span className="lang-ko">읽다가 떠오른 수학 공부 고민이 있나요?</span><span className="lang-en">Did this essay raise a question about studying maths?</span></p>
        <Link href={`/ask?from=mathskim&ref=chapter:story.${slug}`}><span className="lang-ko">내가 막힌 지점 질문하기</span><span className="lang-en">Tell us where you are stuck</span> →</Link>
      </aside>
    </>
  );
}
