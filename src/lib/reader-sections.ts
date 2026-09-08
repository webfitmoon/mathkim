/** Display-only anchors for trusted, repository-owned HTML. Never used on user input. */
export type ReaderSection = { id: string; level: number; titleKo: string; titleEn: string };
const HEADING = /<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/g;

function text(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&(?:amp|lt|gt|quot|apos|nbsp);/g,
    entity => ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'", "&nbsp;": " " })[entity]!)
    .replace(/\s+/g, " ").trim();
}

export function readerSections(htmlKo: string, htmlEn?: string) {
  const ko = [...htmlKo.matchAll(HEADING)];
  const en = [...(htmlEn ?? "").matchAll(HEADING)];
  if (htmlEn && (ko.length !== en.length || ko.some((h, i) => h[1] !== en[i][1]))) {
    throw new Error("Reader headings must align across languages");
  }
  const used = new Set<string>();
  const sections: ReaderSection[] = ko.map((heading, i) => {
    // Korean title hash is independent of position and English copy editing.
    let hash = 2166136261;
    for (const character of text(heading[3])) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619);
    const base = `section-${(hash >>> 0).toString(36)}`;
    let id = base, suffix = 2;
    while (used.has(id)) id = `${base}-${suffix++}`;
    used.add(id);
    return { id, level: Number(heading[1]), titleKo: text(heading[3]), titleEn: text(en[i]?.[3] ?? heading[3]) };
  });
  function decorate(html: string, locale: "ko" | "en") {
    let index = 0;
    return html.replace(HEADING, (_, level, attributes, body) => {
      const section = sections[index++];
      // This source format has no heading IDs; fail rather than breaking future authored IDs.
      if (/\bid\s*=/.test(attributes)) throw new Error("Authored heading ID needs an explicit anchor migration");
      return `<h${level}${attributes} id="${section.id}-${locale}" tabindex="-1">${body}</h${level}>`;
    });
  }
  return { sections, htmlKo: decorate(htmlKo, "ko"), htmlEn: htmlEn ? decorate(htmlEn, "en") : undefined };
}
