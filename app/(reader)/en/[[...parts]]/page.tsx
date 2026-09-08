import { notFound } from "next/navigation";
import BookPage from "@/app/book/page";
import BookLayout, { viewport as readerViewport } from "@/app/book/layout";
import ChapterPage from "@/app/book/[slug]/page";
import StoryPage from "@/app/story/page";
import StoryLayout from "@/app/story/layout";
import EpisodePage from "@/app/story/[slug]/page";
import { BOOK, getChapter } from "@/lib/book";
import { STORY, getEpisode } from "@/lib/story";
import { englishMetadata } from "@/lib/public-metadata";

type Props = { params: Promise<{ parts?: string[] }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return [["book"], ["story"],
    ...BOOK.chapters.map(c => ["book", c.slug]),
    ...STORY.episodes.map(e => ["story", e.slug]),
  ].map(parts => ({ parts }));
}

export async function generateMetadata({ params }: Props) {
  return englishMetadata(`/${((await params).parts ?? []).join("/")}`);
}

export async function generateViewport({ params }: Props) {
  const [section] = (await params).parts ?? [];
  return section === "book" || section === "story" ? readerViewport : readerViewport;
}

/** Static aliases reuse the approved server pages and reader shells, not copied content. */
export default async function EnglishPage({ params }: Props) {
  const parts = (await params).parts ?? [];
  const [section, slug] = parts;
  if (section === "book" && parts.length <= 2) {
    if (slug && !getChapter(slug)) notFound();
    return <BookLayout>{slug ? <ChapterPage params={Promise.resolve({ slug })} /> : <BookPage />}</BookLayout>;
  }
  if (section === "story" && parts.length <= 2) {
    if (slug && !getEpisode(slug)) notFound();
    return <StoryLayout>{slug ? <EpisodePage params={Promise.resolve({ slug })} /> : <StoryPage />}</StoryLayout>;
  }
  notFound();
}
