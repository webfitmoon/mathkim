import SiteHeader from "../../components/site-header";
import HeroSection from "../../components/hero-section";
import PerspectiveSection from "../../components/perspective-section";
import MethodSection from "../../components/method-section";
import ProgramsSection from "../../components/programs-section";
import TeacherSection from "../../components/teacher-section";
import EbooksSection from "../../components/ebooks-section";
import FaqSection from "../../components/faq-section";
import ContactSection from "../../components/contact-section";
import LegalLinks from "../../components/legal-links";
import Link from "next/link";

export default function HomePage() {
  return <>
    <a className="skip" href="#main">본문으로 바로가기</a>
    <SiteHeader />
    <main id="main"><HeroSection />
<PerspectiveSection />
<MethodSection />
<ProgramsSection />
<TeacherSection />
<EbooksSection />
<FaqSection />
<ContactSection /></main>
    <footer className="footer"><div className="wrap"><Link href="/" className="logo" aria-label="매쓰킴 메인"><span aria-hidden="true" style={{ color: "var(--brand-orange)" }}>∫</span><strong>MATHSKIM</strong></Link><p>{"© 2026 매쓰킴"}</p><LegalLinks /></div></footer>
  </>;
}
