import bookJson from "@/content/book/book.json";

/**
 * 『수학, 머리로 풀지 마라』 web edition.
 *
 * `src/content/book/book.json` is generated from the book's Typst source
 * (`trinity-mathslab/math-book-project`, `typeset/export_web.py`). The Korean
 * base is preserved in source attribution; author-approved web copy edits in
 * `editorial-ko.json` are applied by `npm run book:en`. Every English field here and in
 * `web-meta.json` is authored in English first and is the canonical wording
 * for the web edition's chrome.
 */

export type LocalizedText = { en: string; ko: string };

export type BookChapter = {
  slug: string;
  order: number;
  labelKo: string;
  labelEn: string;
  titleKo: string;
  titleHtml: string;
  titleEn: string;
  summaryKo: string;
  summaryEn: string;
  chars: number;
  readingMinutes: number;
  mathCount: number;
  html: string;
  htmlEn?: string;
  wordsEn?: number;
  readingMinutesEn?: number;
};

export type BookData = {
  generatedAt: string;
  /** Latest authorised web copy revision, separate from typeset-source generation. */
  webRevision?: string;
  source: { repo: string; commit: string; typst: string; file: string };
  title: LocalizedText;
  subtitle: LocalizedText;
  author: LocalizedText;
  bioHtml: string;
  totalChars: number;
  totalMinutes: number;
  mathCount: number;
  chapters: BookChapter[];
};

export const BOOK: BookData = bookJson;

export const BOOK_PATH = "/book";
export const BOOK_URL = "https://mathkim-zeta.vercel.app/book";

export function hasEnglish(
  chapter: BookChapter,
): chapter is BookChapter & Required<Pick<BookChapter, "htmlEn" | "wordsEn" | "readingMinutesEn">> {
  return (
    Boolean(chapter.htmlEn) &&
    chapter.wordsEn !== undefined &&
    chapter.readingMinutesEn !== undefined
  );
}

export const ENGLISH_CHAPTER_COUNT = BOOK.chapters.filter(hasEnglish).length;

export function chapterPath(slug: string): string {
  return `${BOOK_PATH}/${slug}`;
}

export function getChapter(slug: string): BookChapter | undefined {
  return BOOK.chapters.find((chapter) => chapter.slug === slug);
}

export function getAdjacentChapters(slug: string): {
  prev: BookChapter | null;
  next: BookChapter | null;
} {
  const index = BOOK.chapters.findIndex((chapter) => chapter.slug === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? BOOK.chapters[index - 1] : null,
    next: index < BOOK.chapters.length - 1 ? BOOK.chapters[index + 1] : null,
  };
}

/**
 * English author bio (canonical English wording). Facts mirror the Korean bio
 * printed in the book; nothing here goes beyond what the book itself states.
 */
export const AUTHOR_BIO_EN: readonly string[] = [
  "Sungmin Kim read Mathematics at Trinity College, Cambridge, completing the Mathematical Tripos (BA and MA, Cantab). A First in Part IA led to election as a College Scholar at Trinity, followed by a 99th-percentile score on the GRE Mathematics Subject Test.",
  "Studying alongside people from around the world who were said to be born for mathematics brought an unexpected conclusion: what separated the very top was not natural talent but the way a problem was approached. To test whether that one principle also holds in Korea's university entrance system, Kim, already teaching by then, sat the exams again as a candidate and was admitted to Yonsei University's dentistry programme through its 2022 essay-based admission and to its pharmacy programme through the 2024 essay-based admission.",
  "Kim sat Calculus, Probability and Statistics, and Geometry on the CSAT and on the KICE mock examinations, scoring a full raw 100 in each.",
  "Kim placed at the first MathKorea open selection contest for mathematics instructors, co-hosted by Daesung MyMac and Daesung Academy, and has taught many students at Gangnam Daesung Boarding Academy's medical-track division and in Daesung MyMac's live classes. Teaching of grade 10–11 school and CSAT mathematics on Daesung MyMac begins in December 2026.",
  "“Mathematics is method, not talent.” This book is the first place that sentence, proven in classrooms and exam halls, has been written down in full.",
];
