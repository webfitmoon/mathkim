import Link from "next/link";

export default function TeacherSection() {
  return (<section className="section " id="teacher"><div className="wrap"><div className="section-head"><h2>{"수업을 들을 때의 이해가,"}<br />{"혼자 풀 때의 실력으로 이어지도록."}</h2><p>{"매쓰킴 · 수학 강사 김성민"}</p></div><div className="teacher-profile"><figure className="teacher-photo"><img src="/media/kim-sungmin-photo-placeholder.svg" alt="김성민 대표님 사진을 넣을 임시 이미지" width="800" height="1000" loading="lazy" /><figcaption>{"김성민 대표 · 실제 사진으로 교체 예정"}</figcaption></figure><div className="teacher-letter"><p className="statement">{"어떤 조건을 보고,"}<br />{"왜 이 풀이를 떠올렸는지."}</p><p>{"해설을 들으면 알겠는데, 혼자 풀면 다시 막히는 학생에게 필요한 것은 풀이를 떠올리는 과정입니다. 수학을 깊게 공부한 경험과 입시 현장에서의 경험을 바탕으로, 조건을 읽고 개념을 연결하는 생각의 순서를 전합니다."}</p><p className="signature">{"김성민 "}<span>{"MATHSKIM"}</span></p><Link className="text-link" href="/story?lang=ko">{"김성민의 이야기를 읽어보세요 ↗"}</Link></div></div></div></section>);
}
