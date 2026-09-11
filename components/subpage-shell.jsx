import Link from "next/link";
import SiteHeader from "./site-header";
import ContactSection from "./contact-section";
import styles from "./subpage-banner.module.css";
import LegalLinks from "./legal-links";

export default function SubpageShell({ label, title, description, bannerImage = "/media/student-study-contact.webp", bannerPosition = "center 55%", children }) {
  const plainHeader = label === "문의하기";
  return <><a className="skip" href="#main">본문으로 바로가기</a><SiteHeader />
    <main id="main" className="subpage"><header className={plainHeader ? styles.plainHeader : styles.banner} style={plainHeader ? undefined : { "--banner-image": `url("${bannerImage}")`, "--banner-position": bannerPosition }}><div className="wrap">
      <h1>{title}</h1><p className={styles.lead}>{description}</p>
    </div></header>{children}<ContactSection onContactPage={label === "문의하기"} /></main>
    <footer className="footer"><div className="wrap"><Link href="/">매쓰킴</Link><p>© 2026 매쓰킴 · 김성민 수학</p><Link href="/contact">문의하기</Link><LegalLinks /></div></footer></>;
}

export function PageBlock({ title, children, tint = false }) {
  return <section className={`subpage-block${tint ? " subpage-tint" : ""}`}><div className="wrap"><h2>{title}</h2>{children}</div></section>;
}

export function NextStep({ title, description, href, label }) {
  return <section className="subpage-next"><div className="wrap"><h2>{title}</h2><p>{description}</p><Link className="btn" href={href}>{label}</Link></div></section>;
}
