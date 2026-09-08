import type { Metadata } from "next";
import { BOOK, getChapter } from "@/lib/book";
import { STORY, STORY_DESCRIPTION, getEpisode } from "@/lib/story";
import type { Locale } from "@/lib/locale";

const ORIGIN = "https://mathkim-zeta.vercel.app";
export function languageAlternates(path: string, locale: Locale = "ko") {
  const ko = `${ORIGIN}${path === "/" ? "" : path}`;
  const en = `${ORIGIN}/en${path === "/" ? "" : path}`;
  return { canonical: locale === "en" ? en : ko, languages: { ko, en, "x-default": ko } };
}

/** Used only by server routes; never import this content-bearing module into an island. */
export function englishMetadata(path: string): Metadata {
  const chapter = path.startsWith("/book/") ? getChapter(path.slice(6)) : undefined;
  const episode = path.startsWith("/story/") ? getEpisode(path.slice(7)) : undefined;
  let title = "mathskim | Sungmin Kim — Maths through structure";
  let description = "See the structure before memorising the formula. Read two free books by Sungmin Kim, explore a worked idea, and ask where your thinking got stuck.";
  if (path === "/book") {
    title = `${BOOK.title.en} — ${BOOK.author.en} | mathskim`;
    description = `${BOOK.subtitle.en}. Read all ${BOOK.chapters.length} sections free, in English or Korean.`;
  } else if (path === "/story") {
    title = `${STORY.title.en} — ${STORY.author.en} | mathskim`;
    description = STORY_DESCRIPTION.en;
  } else if (path === "/ask") {
    title = "Ask a maths question | mathskim";
    description = "Share the maths problem and what you tried. Receive a teacher-reviewed answer, starting with structure and hints. Free, with no sign-up.";
  } else if (chapter) {
    title = `${chapter.labelEn}. ${chapter.titleEn} | ${BOOK.title.en}`;
    description = chapter.summaryEn;
  } else if (episode) {
    title = `${episode.labelEn}. ${episode.titleEn} | ${STORY.title.en}`;
    description = episode.summaryEn;
  }
  const alternates = languageAlternates(path, "en");
  return {
    title: { absolute: title }, description, alternates,
    openGraph: { type: chapter || episode ? "article" : "website", siteName: "mathskim",
      locale: "en_GB", alternateLocale: "ko_KR", url: alternates.canonical, title, description,
      images: [{ url: "/en/opengraph-image", width: 1200, height: 630, alt: "mathskim — See the structure before the formula" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/en/opengraph-image"] },
  };
}
