import Link from "next/link";

export default function TeacherSection() {
  return (<section className="section " id="teacher"><div className="wrap"><div className="section-head"><h2>{"문제를 푸는 기술을 넘어,"}<br />{"수학을 바라보는 눈을 남기고 싶습니다."}</h2><p>{"매쓰킴 · 수학 강사 김성민"}</p></div><div className="teacher-profile"><figure className="teacher-photo"><img src="/media/kim-sungmin-photo-placeholder.svg" alt="김성민 대표님 사진을 넣을 임시 이미지" width="800" height="1000" loading="lazy" /><figcaption>{"김성민 대표 · 실제 사진으로 교체 예정"}</figcaption></figure><div className="teacher-letter"><p className="statement">{"무슨 공식을 쓸지보다"}<br />{"왜 그 생각을 했는지."}</p><p>{"수학을 깊게 공부한 경험과 입시 현장에서의 경험을 바탕으로, 학생이 혼자 문제를 만났을 때 꺼낼 수 있는 생각의 기준을 전합니다."}</p><p className="signature">{"김성민 "}<span>{"MATHSKIM"}</span></p><Link className="text-link" href="/story?lang=ko">{"김성민의 이야기를 읽어보세요 ↗"}</Link></div></div></div></section>);
}
