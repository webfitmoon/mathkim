import type { ReaderSection } from "@/lib/reader-sections";
import styles from "@/app/book/book.module.css";

export function ReaderContents({ sections }: { sections: ReaderSection[] }) {
  if (sections.length < 2) return null;
  return <details className={styles.sectionContents}>
    <summary><span className="lang-ko">이 장에서 읽을 내용</span><span className="lang-en">In this chapter</span></summary>
    <nav aria-label="Chapter sections">
      <ol>{sections.map(section => <li key={section.id} data-level={section.level}>
        <span className="lang-ko"><a href={`#${section.id}-ko`}>{section.titleKo}</a></span>
        <span className="lang-en"><a href={`#${section.id}-en`}>{section.titleEn}</a></span>
      </li>)}</ol>
    </nav>
    <p><span className="lang-ko">절 제목으로 이동한 뒤 주소를 복사하면 그 부분을 공유할 수 있어요.</span><span className="lang-en">Jump to a section, then copy the address to share that part.</span></p>
  </details>;
}
