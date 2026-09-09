import Link from "next/link";

export default function TeacherSection() {
  return (<section className="section " id="teacher"><div className="wrap"><div className="section-head"><h2>{"수학을 깊이 공부한 경험을,"}<br />{"학생을 가르치는 일로."}</h2><p>{"매쓰킴 · 수학 강사 김성민"}</p></div><div className="teacher-profile"><figure className="teacher-photo"><img src="/media/kim-sungmin-photo-placeholder.svg" alt="김성민 대표님 사진을 넣을 임시 이미지" width="800" height="1000" loading="lazy" /><figcaption>{"김성민 대표 · 실제 사진으로 교체 예정"}</figcaption></figure><div className="teacher-letter"><p className="statement">{"대전에서 케임브리지로,"}<br />{"그리고 다시 교실로."}</p><p>{"수학을 공부하며 걸어온 길과 입시 현장에서 학생을 만난 경험이 지금의 수업을 만들었습니다. 김성민이 어떤 과정을 거쳐 가르치는 일을 선택했는지, 직접 쓴 이야기에서 만나보세요."}</p><p className="signature">{"김성민 "}<span>{"MATHSKIM"}</span></p><Link className="text-link" href="/story?lang=ko">{"김성민의 이야기를 읽어보세요 ↗"}</Link></div></div></div></section>);
}
