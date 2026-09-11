import Link from "next/link";
import SiteHeader from "./site-header";
import LegalLinks from "./legal-links";
import styles from "./legal.module.css";

export default function LegalPage({ title, intro, children }) {
  return <><a className="skip" href="#main">본문으로 바로가기</a><SiteHeader />
    <main id="main" className={styles.page}>
      <header className={styles.heading}><p>매쓰킴 · 이용 안내</p><h1>{title}</h1><p>{intro}</p></header>
      <div className={styles.notice}><strong>검토용 초안 · 2026년 9월 11일 작성</strong><p>현재 공개 시안의 기능을 기준으로 작성했습니다. 운영 주체의 정식 정보, 개인정보 문의 연락처 및 호스팅의 개인정보 처리 조건을 확인한 뒤 최종본과 시행일을 안내합니다.</p></div>
      <article className={styles.content}>{children}</article>
      <div className={styles.back}><Link href="/">메인으로 돌아가기</Link></div>
    </main>
    <footer className="footer"><div className="wrap"><Link href="/">매쓰킴</Link><p>© 2026 매쓰킴 · 김성민 수학</p><LegalLinks /></div></footer>
  </>;
}
