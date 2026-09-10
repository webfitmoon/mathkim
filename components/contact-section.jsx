import Link from "next/link";

export default function ContactSection() {
  return <section className="section closing contact-finale" id="contact">
    <div className="wrap">
      <h2>수업이 궁금하다면,<br />편하게 문의해 주세요.</h2>
      <p className="finale-description">강의·교재·협업에 관한 궁금한 점을<br />문의 페이지에서 확인해 보세요.</p>
      <Link className="btn" href="/contact">문의하기 <span aria-hidden="true">↗</span></Link>
    </div>
  </section>;
}
