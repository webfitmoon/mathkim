"use client";

import { LocaleLink as Link } from "@/components/locale-navigation";
import { useSyncExternalStore } from "react";
import { READER_PROGRESS_KEY, parseProgress } from "@/lib/reader-prefs";
import styles from "@/app/book/book.module.css";

export type ContinueChapter = {
  slug: string;
  labelKo: string;
  labelEn: string;
  titleKo: string;
  titleEn: string;
};

type ContinueReadingProps = {
  chapters: ContinueChapter[];
  /** localStorage key the matching ReadingProgress writes to. */
  storageKey?: string;
  /** Route prefix the slugs live under, e.g. "/book" or "/story". */
  basePath?: string;
};

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getRawProgress(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

const getServerRawProgress = (): string | null => null;

/** "Continue reading" link on a reader cover, fed by the progress its chapter pages save. */
export function ContinueReading({
  chapters,
  storageKey = READER_PROGRESS_KEY,
  basePath = "/book",
}: ContinueReadingProps) {
  const raw = useSyncExternalStore(
    subscribe,
    () => getRawProgress(storageKey),
    getServerRawProgress,
  );
  const progress = parseProgress(raw);

  if (!progress) return null;
  const chapter = chapters.find((item) => item.slug === progress.slug);
  if (!chapter) return null;

  const percent = Math.round(progress.ratio * 100);

  return (
    <Link className={styles.continueLink} href={`${basePath}/${chapter.slug}`}>
      <small>
        <span className="lang-ko">이어 읽기 · {chapter.labelKo} · {percent}%</span>
        <span className="lang-en">Continue · {chapter.labelEn} · {percent}%</span>
      </small>
      <strong>
        <span className="lang-ko">{chapter.titleKo}</span>
        <span className="lang-en">{chapter.titleEn}</span>
      </strong>
    </Link>
  );
}
