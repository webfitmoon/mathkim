"use client";

import { useEffect, useRef } from "react";
import { READER_PROGRESS_KEY, readProgress, writeProgress } from "@/lib/reader-prefs";
import styles from "@/app/book/book.module.css";

type ReadingProgressProps = {
  slug: string;
  /** localStorage key; each reader (book, story) keeps its own position. */
  storageKey?: string;
};

/**
 * Thin progress line at the top of a chapter. Also remembers how far the
 * reader got (per device, in localStorage) so /book can offer "continue" and
 * a reopened chapter resumes near the last position.
 */
export function ReadingProgress({
  slug,
  storageKey = READER_PROGRESS_KEY,
}: ReadingProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let saveTimer = 0;
    const pathname = window.location.pathname;

    const maxScroll = () =>
      Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const ratio = () => Math.min(1, Math.max(0, window.scrollY / maxScroll()));

    const saved = readProgress(storageKey);
    if (
      saved &&
      saved.slug === slug &&
      saved.ratio > 0.03 &&
      saved.ratio < 0.97 &&
      !window.location.hash
    ) {
      window.scrollTo({ top: saved.ratio * maxScroll(), behavior: "instant" });
    }

    let latestRatio = ratio();
    let pendingSave = true;
    const save = () => {
      window.clearTimeout(saveTimer);
      if (!pendingSave) return;
      writeProgress({ slug, ratio: latestRatio, at: Date.now() }, storageKey);
      pendingSave = false;
    };

    const paint = () => {
      frame = 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${latestRatio})`;
      }
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(save, 400);
    };

    const onScroll = () => {
      // Next can reset the incoming page's scroll before this effect cleans up.
      if (window.location.pathname !== pathname) return;
      // Capture before RAF: navigation may replace the page before it paints.
      latestRatio = ratio();
      pendingSave = true;
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") save();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pagehide", save);
    document.addEventListener("visibilitychange", onVisibilityChange);
    paint();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pagehide", save);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (frame) window.cancelAnimationFrame(frame);
      // Flush the observed position, never the next page's scroll geometry.
      save();
    };
  }, [slug, storageKey]);

  return (
    <div className={styles.progress} aria-hidden="true">
      <div ref={barRef} className={styles.progressBar} />
    </div>
  );
}
