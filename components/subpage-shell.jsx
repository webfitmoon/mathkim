import Link from "next/link";
import SiteHeader from "./site-header";
import styles from "./subpage-banner.module.css";

export default function SubpageShell({ label, title, description, children }) {
  return <><a className="skip" href="#main">본문으로 바로가기</a><SiteHeader />
    <main id="main" className="subpage"><header className={styles.banner}><div className="wrap">
      <nav className={styles.breadcrumbs} aria-label="현재 위치"><Link href="/">홈</Link><span aria-hidden="true">/</span><span>{label}</span></nav>
      <h1>{title}</h1><p className={styles.lead}>{description}</p>
    </div></header>{children}</main>
    <footer className="footer"><div className="wrap"><Link href="/">매쓰킴</Link><p>© 2026 매쓰킴 · 김성민 수학</p><Link href="/contact">문의하기</Link></div></footer></>;
}

export function PageBlock({ title, children, tint = false }) {
  return <section className={`subpage-block${tint ? " subpage-tint" : ""}`}><div className="wrap"><h2>{title}</h2>{children}</div></section>;
}

export function NextStep({ title, description, href, label }) {
  return <section className="subpage-next"><div className="wrap"><h2>{title}</h2><p>{description}</p><Link className="btn" href={href}>{label}</Link></div></section>;
}
