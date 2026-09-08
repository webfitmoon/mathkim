"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  READER_FONTS,
  READER_FONT_KEY,
  READER_PREFS_EVENT,
  READER_THEME_KEY,
  applyReaderPrefs,
  persistReaderPrefs,
  readReaderPrefs,
  refreshReaderPrefs,
  type ReaderFont,
  type ReaderTheme,
} from "@/lib/reader-prefs";
import styles from "@/app/book/book.module.css";

function subscribe(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== READER_THEME_KEY && event.key !== READER_FONT_KEY) return;
    refreshReaderPrefs();
    onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(READER_PREFS_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(READER_PREFS_EVENT, onStoreChange);
  };
}

const getTheme = (): ReaderTheme => readReaderPrefs().theme;
const getFont = (): ReaderFont => readReaderPrefs().font;
const getServerTheme = (): ReaderTheme => "paper";
const getServerFont = (): ReaderFont => "m";

/**
 * Font-size stepper and paper/dark toggle for the book reader.
 * The preference lives in localStorage and is mirrored onto
 * <html data-reader-theme data-reader-font>, which the CSS tokens read; the
 * boot script in the /book layout restores the attributes before first paint
 * on full loads, and the effect below covers client-side navigations.
 */
export function ReaderControls() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const font = useSyncExternalStore(subscribe, getFont, getServerFont);

  useEffect(() => {
    applyReaderPrefs(theme, font);
  }, [theme, font]);

  function stepFont(direction: 1 | -1) {
    const index = READER_FONTS.indexOf(font);
    const next = READER_FONTS[Math.min(READER_FONTS.length - 1, Math.max(0, index + direction))];
    persistReaderPrefs(theme, next);
  }

  function toggleTheme() {
    persistReaderPrefs(theme === "paper" ? "dark" : "paper", font);
  }

  return (
    <div className={styles.controls} role="group" aria-label="Reader settings">
      <button
        type="button"
        onClick={() => stepFont(-1)}
        disabled={font === "s"}
        aria-label="글자 작게 · Smaller text"
      >
        A−
      </button>
      <button
        type="button"
        onClick={() => stepFont(1)}
        disabled={font === "l"}
        aria-label="글자 크게 · Larger text"
      >
        A+
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        aria-pressed={theme === "dark"}
        aria-label="어두운 배경 · Dark background"
      >
        <span className="lang-ko">어둡게</span>
        <span className="lang-en">Dark</span>
      </button>
    </div>
  );
}
