import Link from "next/link";
import styles from "./legal.module.css";

export default function LegalLinks() {
  return <nav className={styles.links} aria-label="정책 안내"><Link href="/privacy"><strong>개인정보처리방침</strong></Link><Link href="/terms">이용약관</Link></nav>;
}
