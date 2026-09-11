import Link from "next/link";
import { notFound } from "next/navigation";
import SubpageShell from "../../../components/subpage-shell";
import InquiryForm from "../../../components/inquiry-form";
import CourseGuide from "../../../components/course-guide";
import InstructorProfile from "../../../components/instructor-profile";
import ReviewsList from "../../../components/reviews-list";

const pages = {
  about: { bannerPosition: "center 55%", bannerImage: "/media/banner-ebooks.webp", label: "강사 소개", description: "중위권에서 상위권으로. 혼자 문제를 풀 수 있는 힘을 가르칩니다." },
  courses: { bannerPosition: "center 55%", bannerImage: "/media/banner-reviews.webp", label: "강좌 안내", description: "준비 중인 강좌와 교재를 살펴보고, 맛보기 강의로 수업을 만나보세요." },
  reviews: { bannerPosition: "center 45%", bannerImage: "/media/student-study-contact.webp", label: "수강 후기", description: "학생들의 실제 공부 변화가 담길 공간입니다." },
  ebooks: { bannerImage: "/media/banner-ebooks.webp", label: "무료 전자책", description: "공부법 한 권, 에세이 한 권. 가입 없이 전문을 읽어보세요." },
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
      {slug === "about" && <InstructorProfile />}
      {slug === "courses" && <CourseGuide />}
      {slug === "reviews" && <ReviewsList />}
      {slug === "ebooks" && <>
        <div className="simple-books">{[
          { title: "수학, 머리로 풀지 마라", text: "개념 학습부터 문제에 접근하는 태도까지, 수학 공부법을 돌아봅니다.", image: "book-cover-20260906.png", route: "book" },
          { title: "돌아서 간 길", text: "대전에서 케임브리지로, 다시 교실로. 김성민의 배움과 가르침에 관한 에세이.", image: "story-cover-20260906.png", route: "story" },
        ].map(book => <article key={book.route}><Link href={`/${book.route}?lang=ko`}><img src={`/media/${book.image}`} alt={`${book.title} 표지`} width="1200" height="630" /></Link><h2>{book.title}</h2><p>{book.text}</p><div className="simple-book-links"><Link className="text-link" href={`/${book.route}?lang=ko`}>무료로 읽기</Link></div></article>)}</div>
      </>}
      {slug === "contact" && <InquiryForm />}
    </div></section>
  </SubpageShell>;
}
