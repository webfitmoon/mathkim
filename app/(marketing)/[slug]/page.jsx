import Link from "next/link";
import { notFound } from "next/navigation";
import SubpageShell from "../../../components/subpage-shell";
import InquiryForm from "../../../components/inquiry-form";

const pages = {
  about: { label: "강사 소개", description: "중위권에서 상위권으로. 혼자 문제를 풀 수 있는 힘을 가르칩니다." },
  courses: { label: "프로그램 소개", description: "공개된 맛보기 수업으로 설명의 깊이와 속도를 확인하세요." },
  reviews: { label: "수강 후기", description: "학생들의 실제 공부 변화가 담길 공간입니다." },
  ebooks: { label: "무료 전자책", description: "공부법 한 권, 에세이 한 권. 가입 없이 전문을 읽어보세요." },
  contact: { label: "문의하기", description: "강의·교재·협업 중 문의 유형을 선택해 주세요." },
};
export function generateStaticParams() { return Object.keys(pages).map(slug => ({ slug })); }
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = Object.hasOwn(pages, slug) ? pages[slug] : null;
  return page ? { title: `${page.label} | 매쓰킴`, description: page.description } : {};
}
export default async function Page({ params }) {
  const { slug } = await params;
  const page = Object.hasOwn(pages, slug) ? pages[slug] : null;
  if (!page) notFound();
  return <SubpageShell {...page} title={page.label}>
    <section className="simple-content"><div className="wrap">
      {slug === "about" && <div className="simple-profile">
        <div><p className="label">수학 강사</p><h2>김성민, 매쓰킴.</h2>
          <p>개념을 아는 것에서, 문제에 적용하는 것으로.<br />조건을 읽고 풀이의 첫 줄을 정하는 생각의 순서를 전합니다.</p>
          <p>대전에서 케임브리지로, 다시 교실로 이어진 이야기는<br />직접 쓴 에세이 『돌아서 간 길』에 담았습니다.</p>
          <div className="simple-actions"><Link className="btn" href="/courses">맛보기 수업 보기</Link><Link className="text-link" href="/story?lang=ko">김성민의 이야기 읽기</Link></div>
        </div><aside className="simple-method" aria-label="수업의 관점"><h3>이해에서 자립까지</h3><p>개념을 이해하고<br />문제의 조건과 연결하고<br />다른 문제에 적용하고<br />혼자 다시 풀어봅니다.</p><Link className="text-link" href="/#method">문제로 수업 방식 확인하기</Link></aside>
      </div>}
      {slug === "courses" && <>
        <div className="simple-lessons">
          <article><p className="label">수학 II · 5분 49초</p><h2>배운 개념으로<br />문제의 조건 읽기</h2><p>함수의 연속을 판단하는 세 조건을 그래프와 연결합니다.</p><a className="btn" href="https://drive.google.com/file/d/1fpk09Gt_qe4uUqzGdDswrVsb8_oJI9_K/view" target="_blank" rel="noopener noreferrer">맛보기 영상 보기 ↗</a></article>
          <article><p className="label">개념 구조 · 36초</p><h2>따로 외운 개념의<br />관계 찾기</h2><p>극한·연속을 미분보다 먼저 배우는 이유를 살펴봅니다.</p><a className="btn" href="https://drive.google.com/file/d/1eya6kA69Nb7dMDmpvdxze-My-ripNncd/view" target="_blank" rel="noopener noreferrer">맛보기 영상 보기 ↗</a></article>
        </div><div className="simple-launch"><p>정규 강의는 2026년 12월 대성마이맥 론칭 예정입니다.<br /><span>강좌명·교재·수강 경로는 확정 후 안내합니다.</span></p><Link href="/contact">수강 문의하기</Link></div>
      </>}
      {slug === "reviews" && <div className="simple-empty"><h2>실제 수강 후기를 준비하고 있습니다.</h2><p>현재 메인의 후기는 디자인 확인용 데모이며,<br />실제 수강생의 경험은 아닙니다.</p><Link className="btn" href="/courses">맛보기 수업 먼저 보기</Link></div>}
      {slug === "ebooks" && <>
        <div className="simple-books">{[
          { title: "수학, 머리로 풀지 마라", text: "개념 학습부터 문제에 접근하는 태도까지, 수학 공부법을 돌아봅니다.", image: "book-cover-20260906.png", route: "book" },
          { title: "돌아서 간 길", text: "대전에서 케임브리지로, 다시 교실로. 김성민의 배움과 가르침에 관한 에세이.", image: "story-cover-20260906.png", route: "story" },
        ].map(book => <article key={book.route}><Link href={`/${book.route}?lang=ko`}><img src={`/media/${book.image}`} alt={`${book.title} 표지`} width="1200" height="630" /></Link><h2>{book.title}</h2><p>{book.text}</p><div className="simple-book-links"><Link className="text-link" href={`/${book.route}?lang=ko`}>무료로 읽기</Link><a href={`/downloads/mathskim-${book.route}-ko.pdf`}>한국어 PDF</a><a href={`/downloads/mathskim-${book.route}-en.pdf`}>English PDF</a></div></article>)}</div>
        <p className="simple-footnote">두 책 모두 한국어·영어 전문을 제공합니다. PDF는 개인 열람·인쇄용으로 이용해 주세요.</p>
      </>}
      {slug === "contact" && <><InquiryForm /><p className="simple-footnote">수학 문제·전자책 내용에 관한 질문은 <a href="https://www.mathskim.com/ask?lang=ko">공식 질문 페이지</a>를 이용해 주세요.</p></>}
    </div></section>
  </SubpageShell>;
}
