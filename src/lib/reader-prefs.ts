export type ReaderTheme = "paper" | "dark";
export type ReaderFont = "s" | "m" | "l";

export const READER_THEME_KEY = "mathskim-reader-theme";
export const READER_FONT_KEY = "mathskim-reader-font";
export const READER_PROGRESS_KEY = "mathskim-book-progress";
export const STORY_PROGRESS_KEY = "mathskim-story-progress";
export const READER_PREFS_EVENT = "mathskim-reader-prefs-change";

export const READER_FONTS: readonly ReaderFont[] = ["s", "m", "l"];

type ReaderPrefs = { theme: ReaderTheme; font: ReaderFont };
const DEFAULT_READER_PREFS: ReaderPrefs = { theme: "paper", font: "m" };
let currentPrefs = DEFAULT_READER_PREFS;
let storageWriteFailed = false;

export function isReaderTheme(value: unknown): value is ReaderTheme {
  return value === "paper" || value === "dark";
}

export function isReaderFont(value: unknown): value is ReaderFont {
  return value === "s" || value === "m" || value === "l";
}

export function applyReaderPrefs(theme: ReaderTheme, font: ReaderFont) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.readerTheme = theme;
  document.documentElement.dataset.readerFont = font;
}

export function readReaderPrefs(): ReaderPrefs {
  if (typeof window === "undefined") return DEFAULT_READER_PREFS;
  // A failed write must not let old persisted values undo the user's choice.
  if (storageWriteFailed) return currentPrefs;
  let theme: ReaderTheme = "paper";
  let font: ReaderFont = "m";
  try {
    const storedTheme = window.localStorage.getItem(READER_THEME_KEY);
    if (isReaderTheme(storedTheme)) theme = storedTheme;
    const storedFont = window.localStorage.getItem(READER_FONT_KEY);
    if (isReaderFont(storedFont)) font = storedFont;
  } catch {
    return currentPrefs;
  }
  currentPrefs = { theme, font };
  return currentPrefs;
}

/** A relevant storage event from another tab supersedes local unsaved values. */
export function refreshReaderPrefs() {
  storageWriteFailed = false;
}

export function persistReaderPrefs(theme: ReaderTheme, font: ReaderFont) {
  currentPrefs = { theme, font };
  applyReaderPrefs(theme, font);
  try {
    window.localStorage.setItem(READER_THEME_KEY, theme);
    window.localStorage.setItem(READER_FONT_KEY, font);
    storageWriteFailed = false;
  } catch {
    storageWriteFailed = true;
  }
  window.dispatchEvent(new Event(READER_PREFS_EVENT));
}

export type ReadingProgress = { slug: string; ratio: number; at: number };

export function parseProgress(raw: string | null): ReadingProgress | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof (parsed as ReadingProgress).slug === "string" &&
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test((parsed as ReadingProgress).slug) &&
      Number.isFinite((parsed as ReadingProgress).ratio) &&
      (parsed as ReadingProgress).ratio >= 0 && (parsed as ReadingProgress).ratio <= 1 &&
      Number.isFinite((parsed as ReadingProgress).at) && (parsed as ReadingProgress).at > 0
    ) {
      return parsed as ReadingProgress;
    }
  } catch {
    // Corrupt value.
  }
  return null;
}

export function readProgress(key: string = READER_PROGRESS_KEY): ReadingProgress | null {
  try {
    return parseProgress(window.localStorage.getItem(key));
  } catch {
    return null;
  }
}

export function writeProgress(progress: ReadingProgress, key: string = READER_PROGRESS_KEY) {
  try {
    window.localStorage.setItem(key, JSON.stringify(progress));
  } catch {
    // Ignore storage failures.
  }
}

/**
 * Inline script for the /book layout — sets the stored theme and font size on
 * <html> before the reader paints, so a returning reader never sees a flash of
 * the default paper theme.
 */
export const READER_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem("${READER_THEME_KEY}");if(t==="paper"||t==="dark"){document.documentElement.dataset.readerTheme=t;}var f=localStorage.getItem("${READER_FONT_KEY}");if(f==="s"||f==="m"||f==="l"){document.documentElement.dataset.readerFont=f;}}catch(e){}})();`;
