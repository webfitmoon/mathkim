import Link from "next/link";
import { notFound } from "next/navigation";
import SubpageShell, { PageBlock, NextStep } from "../../../components/subpage-shell";
import ProgramsSection from "../../../components/programs-section";
import EbooksSection from "../../../components/ebooks-section";
import FaqSection from "../../../components/faq-section";

const pages = {
  about: { label: "강사 소개", title: "문제의 첫 줄을 스스로 정할 수 있도록.", description: "매쓰킴 김성민은 개념과 문제 사이를 연결하는 생각의 순서를 가르칩니다. 수업의 관점과 그 관점이 만들어진 이야기를 만나보세요." },
  courses: { label: "강의 프로그램", title: "내가 막히는 지점에서 수업을 살펴보세요.", description: "개념을 몰라서인지, 배운 개념을 꺼내지 못해서인지. 현재 공부 상태를 짚어보고 공개된 맛보기 수업으로 설명의 깊이와 속도를 확인하세요." },
  reviews: { label: "수강 후기", title: "수업 이후, 공부의 무엇이 달라졌을까요?", description: "후기를 볼 때는 만족했다는 말보다 어떤 문제에서 막혔고, 혼자 공부하는 행동이 어떻게 달라졌는지 살펴보세요." },
  ebooks: { label: "무료 전자책", title: "수업을 고르기 전, 한 장부터 읽어보세요.", description: "수학을 공부하는 방법과 가르치는 사람의 이야기. 두 권 모두 한국어와 영어로 전문을 공개합니다." },
  contact: { label: "문의하기", title: "궁금한 내용에 맞게 문의해 주세요.", description: "수강 선택, 교재, 협업 문의와 수학 문제 질문의 경로를 나눴습니다. 필요한 정보를 함께 보내면 질문의 맥락을 파악하는 데 도움이 됩니다." },
};
export function generateStaticParams() { return Object.keys(pages).map(slug => ({ slug })); }
export async function generateMetadata({ params }) { const { slug } = await params; const page = Object.hasOwn(pages, slug) ? pages[slug] : null; return page ? { title: `${page.label} | 매쓰킴`, description: page.description } : {}; }

export default async function Page({ params }) {
  const { slug } = await params;
  const page = Object.hasOwn(pages, slug) ? pages[slug] : null;
  if (!page) notFound();
  return <SubpageShell {...page}>
    {slug === "about" && <>
      <PageBlock title="알고 있는 개념이 풀이의 출발점이 되려면."><div className="subpage-split"><div><p>공식을 기억하는 것과 문제에서 그 공식을 떠올리는 것은 다릅니다. 조건을 읽고, 어떤 개념과 연결되는지 판단한 뒤 계산을 시작하는 연습이 필요합니다.</p><p>매쓰킴의 수업은 정답까지 가는 계산뿐 아니라, 그 풀이를 선택한 이유를 함께 살펴봅니다.</p><Link className="text-link" href="/#method">실제 문제로 수업 관점 살펴보기</Link></div><figure><img src="/media/book-cover-20260906.png" alt="김성민의 수학 공부법 전자책 표지" width="1200" height="630" /><figcaption>『수학, 머리로 풀지 마라』에서 교육 관점을 더 읽어보세요.</figcaption></figure></div></PageBlock>
      <PageBlock title="이해에서 자립까지, 네 가지 질문." tint><div className="subpage-grid">{[["이해", "이 개념은 무엇을 뜻하고, 언제 쓸 수 있을까?"], ["접근", "문제의 어느 조건에서 이 개념을 떠올렸을까?"], ["적용", "조건이 달라져도 같은 생각을 쓸 수 있을까?"], ["자립", "설명을 덮고도 처음부터 끝까지 풀 수 있을까?"]].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></PageBlock>
      <PageBlock title="대전에서 케임브리지로, 그리고 다시 교실로."><p>수학을 공부하며 걸어온 길과 학생을 만난 경험은 김성민의 에세이 『돌아서 간 길』에 담겨 있습니다. 배움과 가르침을 어떤 시선으로 바라보는지 직접 쓴 이야기로 확인해 보세요.</p><Link className="text-link" href="/story?lang=ko">김성민의 이야기 읽기</Link></PageBlock>
      <NextStep title="설명하는 방식을 직접 확인하세요." description="문항 해설과 개념 설명, 두 개의 공개 영상으로 수업을 만나보세요." href="/courses" label="강의 프로그램 보기" />
    </>}
    {slug === "courses" && <>
      <PageBlock title="현재 공부 상태부터 짚어보세요."><div className="subpage-grid">{[["개념의 뜻부터 낯설다면", "먼저 해당 개념의 정의와 기본 예제를 보완해 주세요. 강좌가 공개되면 필요한 선수 지식을 확인한 뒤 선택하세요."], ["개념은 아는데 시작이 어렵다면", "문항 해설 영상에서 조건을 어떻게 읽고 어떤 개념을 꺼내는지 살펴보세요. 혼자 막혔던 지점과 비교해 보세요."], ["여러 개념이 따로 느껴진다면", "개념 구조 영상에서 극한·연속·미분의 순서와 관계를 확인해 보세요. 알고 있던 개념을 연결하는 설명인지 살펴보세요."]].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><p className="subpage-note">위 안내는 공개 콘텐츠를 고르는 기준입니다. 확정된 강좌별 추천 등급이나 수강 효과를 뜻하지 않습니다.</p></PageBlock>
      <ProgramsSection /><FaqSection />
      <NextStep title="강좌 선택에 궁금한 점이 남았다면." description="학년과 공부 중인 과목, 혼자 풀 때 막히는 부분을 함께 알려 주세요." href="/contact" label="수강 문의하기" />
    </>}
    {slug === "reviews" && <>
      <PageBlock title="실제 수강 후기는 준비 중입니다." tint><p>현재 메인에 표시된 후기는 디자인 확인을 위한 가상 문구입니다. 실제 수강생의 경험이나 성적 향상 근거로 사용하지 않습니다.</p><p>확인된 후기가 준비되면 수강 전 고민, 수강한 강의, 달라진 학습 행동을 함께 안내하겠습니다.</p><Link className="text-link" href="/#reviews">메인의 후기 데모 보기</Link></PageBlock>
      <PageBlock title="맛보기를 본 뒤, 이 세 가지를 확인해 보세요."><ol className="subpage-list"><li><h3>첫 줄의 이유를 설명할 수 있나요?</h3><p>왜 그 개념을 선택했는지 영상의 설명을 자신의 말로 정리해 보세요.</p></li><li><h3>다른 조건에서도 생각해 봤나요?</h3><p>메인의 변형 예제에서 같은 관점을 적용할 수 있는지 확인해 보세요.</p></li><li><h3>나에게 맞는 설명인가요?</h3><p>말의 속도, 개념 설명의 깊이, 혼자 복습할 수 있는지를 살펴보세요.</p></li></ol></PageBlock>
      <NextStep title="내 판단은 직접 본 수업에서." description="공개 영상과 연습 예제로 수업 방식이 나에게 맞는지 확인하세요." href="/courses" label="맛보기 수업 보기" />
    </>}
    {slug === "ebooks" && <>
      <EbooksSection />
      <PageBlock title="어떤 책부터 읽을까요?" tint><div className="subpage-grid"><article><h3>공부하는 방법을 돌아보고 싶다면</h3><p>『수학, 머리로 풀지 마라』는 개념 학습과 문제를 대하는 태도를 다룹니다. 목차의 13개 장과 부록 중 지금 궁금한 주제부터 골라 읽어보세요.</p><Link className="text-link" href="/book?lang=ko">수학 공부법 목차 보기</Link></article><article><h3>가르치는 사람의 관점이 궁금하다면</h3><p>『돌아서 간 길』은 김성민이 배움과 가르침 사이에서 걸어온 이야기입니다. 여섯 편의 에세이를 통해 수업을 만드는 사람을 만나보세요.</p><Link className="text-link" href="/story?lang=ko">에세이 목차 보기</Link></article></div></PageBlock>
      <PageBlock title="온라인으로 읽고, PDF로도 간직하세요."><p>가입 없이 전문을 읽을 수 있습니다. 각 책에서 언어를 선택하거나 PDF를 내려받을 수 있습니다. 읽던 위치는 같은 브라우저에 저장되며, 다른 기기로 자동 동기화되지는 않습니다.</p><div className="subpage-links"><a href="/downloads/mathskim-book-ko.pdf">공부법 한국어 PDF</a><a href="/downloads/mathskim-book-en.pdf">공부법 English PDF</a><a href="/downloads/mathskim-story-ko.pdf">에세이 한국어 PDF</a><a href="/downloads/mathskim-story-en.pdf">에세이 English PDF</a></div><p className="subpage-note">개인이 오프라인에서 읽거나 인쇄하는 용도로 이용해 주세요.</p></PageBlock>
    </>}
    {slug === "contact" && <>
      <PageBlock title="문의 주제에 맞는 경로를 선택하세요."><div className="subpage-grid">{[["수강·교재 문의", "학년, 공부 중인 과목, 살펴본 맛보기 영상과 궁금한 내용을 알려 주세요. 강좌·교재·수강 경로는 확정된 범위에서 안내합니다.", "mailto:sk851@cantab.ac.uk?subject=매쓰킴%20수강·교재%20문의", "수강·교재 이메일 문의"], ["강의·콘텐츠 협업", "소속, 협업 목적, 요청 범위와 희망 일정을 함께 적어 주세요.", "mailto:sk851@cantab.ac.uk?subject=매쓰킴%20협업%20문의", "협업 이메일 문의"], ["수학 문제·전자책 질문", "문제나 책의 해당 장, 어디까지 생각했는지와 막힌 줄을 함께 남겨 주세요. 공식 질문 페이지에서 접수합니다.", "https://www.mathskim.com/ask?lang=ko", "공식 질문 페이지 열기"]].map(([title, text, href, label]) => <article key={title}><h3>{title}</h3><p>{text}</p><a className="text-link" href={href}>{label}</a></article>)}</div><p className="subpage-note">이메일 버튼은 기기의 메일 앱을 엽니다. 즉시 답변이나 특정 시간 내 답변을 보장하지 않습니다.</p></PageBlock><FaqSection />
    </>}
  </SubpageShell>;
}
