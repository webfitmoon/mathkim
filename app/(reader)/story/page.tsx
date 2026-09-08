import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/locale-navigation";
import { languageAlternates } from "@/lib/public-metadata";
import { ContinueReading } from "@/components/continue-reading";
import { BookDownloads } from "@/components/book-downloads";
import { BOOK } from "@/lib/book";
import { STORY_PROGRESS_KEY } from "@/lib/reader-prefs";
import {
  ENGLISH_EPISODE_COUNT,
  STORY,
  STORY_DESCRIPTION,
  STORY_PATH,
  STORY_SUBTITLE,
  episodePath,
  hasEnglish,
} from "@/lib/story";
import styles from "../book/book.module.css";

export const metadata: Metadata = {
  title: { absolute: `${STORY.title.ko} — ${STORY.author.ko} | mathskim` },
  description: STORY_DESCRIPTION.ko,
  alternates: languageAlternates("/story"),
};

const firstEpisode = STORY.episodes[0];

export default function StoryPage() {
  const continueEpisodes = STORY.episodes.map(
    ({ slug, labelKo, labelEn, title, titleEn }) => ({
      slug,
      labelKo,
      labelEn,
      titleKo: title,
      titleEn,
    }),
  );
  const hasFullEnglish = ENGLISH_EPISODE_COUNT === STORY.episodes.length;

  return (
    <div className={styles.cover}>
      <section className={styles.coverHero} aria-labelledby="story-title">
        <p className={styles.kicker}>
          <span className="lang-ko">자전 에세이 · {STORY.episodes.length}편 연재</span>
          <span className="lang-en">Autobiographical essay · Six episodes</span>
        </p>
        <h1 className={styles.coverTitle} id="story-title">
          <span className="lang-ko">{STORY.title.ko}</span>
          <span className="lang-en">{STORY.title.en}</span>
        </h1>
        <p className={styles.coverSubtitle}>
          <span className="lang-ko">{STORY_SUBTITLE.ko}</span>
          <span className="lang-en">
            {STORY_SUBTITLE.en} Korean original: 『{STORY.title.ko}』.
          </span>
        </p>
        <p className={styles.byline}>
          <span className="lang-ko">{STORY.author.ko} 지음</span>
          <span className="lang-en">by {STORY.author.en}</span>
        </p>
        <p className={styles.coverStats}>
          <span className="lang-ko">
            {STORY.episodes.length}편 · {STORY.totalChars.toLocaleString("ko-KR")}자 · 약{" "}
            {STORY.totalMinutes}분
          </span>
          <span className="lang-en">
            {hasFullEnglish
              ? `${STORY.episodes.length} episodes · about ${STORY.totalMinutesEn} minutes · English and Korean`
              : `${STORY.episodes.length} episodes · English edition: ${ENGLISH_EPISODE_COUNT} of ${STORY.episodes.length} episodes`}
          </span>
        </p>
        <div className={styles.coverActions}>
          <Link className={styles.primaryAction} href={episodePath(firstEpisode.slug)}>
            <span className="lang-ko">처음부터 읽기</span>
            <span className="lang-en">Start reading</span>
            <span aria-hidden="true">→</span>
          </Link>
          <ContinueReading
            chapters={continueEpisodes}
            storageKey={STORY_PROGRESS_KEY}
            basePath={STORY_PATH}
          />
        </div>
        <BookDownloads book="story" />
      </section>

      <nav className={styles.toc} aria-labelledby="toc-title">
        <h2 className={styles.sectionTitle} id="toc-title">
          <span className="lang-ko">목차</span>
          <span className="lang-en">Contents</span>
        </h2>
        <ol className={styles.tocList}>
          {STORY.episodes.map((episode) => (
            <li key={episode.slug}>
              <Link className={styles.tocItem} href={episodePath(episode.slug)}>
                <span className={styles.tocLabel}>
                  <span className="lang-ko">{episode.labelKo}</span>
                  <span className="lang-en">{episode.labelEn}</span>
                </span>
                <span className={styles.tocTitle}>
                  <span className={styles.tocTitleKo} lang="ko">
                    {episode.title}
                  </span>
                  <span className={styles.tocTitleEn} lang="en">
                    {episode.titleEn}
                  </span>
                </span>
                <span className={styles.tocMeta}>
                  <span className="lang-ko">약 {episode.readingMinutes}분</span>
                  <span className="lang-en">
                    ~{hasEnglish(episode) ? episode.readingMinutesEn : episode.readingMinutes} min
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>

      <section className={styles.author} aria-labelledby="book-link-title">
        <h2 className={styles.sectionTitle} id="book-link-title">
          <span className="lang-ko">저자의 책</span>
          <span className="lang-en">The author&rsquo;s book</span>
        </h2>
        <p className={styles.prose}>
          <span className="lang-ko">
            <Link href="/book">『{BOOK.title.ko}』</Link> — {BOOK.chapters.length}편 전문을
            무료로 읽을 수 있습니다.
          </span>
          <span className="lang-en" lang="en">
            <Link href="/book">{BOOK.title.en}</Link> — all {BOOK.chapters.length} sections,
            free to read.
          </span>
        </p>
      </section>

      <section className={styles.colophon}>
        <p>
          <span className="lang-ko">
            © 2026 김성민. 무단 전재, 재배포, 상업적 이용은 허용하지 않습니다. 실명이
            나오는 분께는 허락을 받았고, 학생 이야기는 여러 학생을 합쳐 만든 것입니다.
          </span>
          <span className="lang-en">
            © 2026 Sungmin Kim. Reproduction, redistribution, and commercial use are not
            permitted. People named here gave their permission; student stories are
            composites.
          </span>
        </p>
        <p className={styles.colophonMeta}>
          <span className="lang-ko">갱신 {STORY.generatedAt.slice(0, 10)}</span>
          <span className="lang-en">Updated {STORY.generatedAt.slice(0, 10)}</span>
        </p>
      </section>
    </div>
  );
}
