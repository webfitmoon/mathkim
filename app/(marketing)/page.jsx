import SiteHeader from "../../components/site-header";
import HeroSection from "../../components/hero-section";
import PerspectiveSection from "../../components/perspective-section";
import MethodSection from "../../components/method-section";
import ProgramsSection from "../../components/programs-section";
import TeacherSection from "../../components/teacher-section";
import EbooksSection from "../../components/ebooks-section";
import FaqSection from "../../components/faq-section";
import ContactSection from "../../components/contact-section";

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
    <footer className="footer"><div className="wrap"><strong>{"매쓰킴"}</strong><p>{"© 2026 매쓰킴"}</p></div></footer>
  </>;
}
