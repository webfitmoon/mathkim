import downloads from "@/content/book-downloads.json";
import styles from "@/app/book/book.module.css";

/** Ordinary static links: works without JavaScript and never contacts QNA. */
export function BookDownloads({ book }: { book: "book" | "story" }) {
  return (
    <div className={styles.downloads}>
      {downloads.files.filter((file) => file.book === book).map((file) => (
        <span key={file.locale} className={`lang-${file.locale}`} lang={file.locale}>
          <a className={styles.downloadLink} href={file.href} download={file.filename}>
            <strong>{file.locale === "ko" ? "한국어 PDF 다운로드" : "Download English PDF"}</strong>
            <small>
              {file.pages}{file.locale === "ko" ? "쪽" : " pages"} · {(file.bytes / 1_000_000).toFixed(1)} MB
            </small>
          </a>
          <p className={styles.downloadNote}>
            {file.locale === "ko"
              ? "웹 교정판 전문 · 개인적인 오프라인 읽기와 인쇄용"
              : "Complete web edition · For personal offline reading and printing"}
          </p>
        </span>
      ))}
    </div>
  );
}
