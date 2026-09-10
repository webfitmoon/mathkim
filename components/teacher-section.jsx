import Link from "next/link";

export default function TeacherSection() {
  return (<section className="section " id="teacher"><div className="wrap"><div className="section-head"><h2>{"수학을 깊이 공부한 경험을,"}<br />{"학생을 가르치는 일로."}</h2><p>{"매쓰킴 · 수학 강사 김성민"}</p></div><div className="teacher-profile"><figure className="teacher-photo"><img src="/media/kim-sungmin-photo-placeholder.svg" alt="김성민 대표님 사진을 넣을 임시 이미지" width="800" height="1000" loading="lazy" /><figcaption>{"김성민 대표 · 실제 사진으로 교체 예정"}</figcaption></figure><div className="teacher-letter"><p className="statement">{"개념을 아는 중위권에서,"}<br />{"문제를 풀어내는 상위권으로."}</p><p>{"풀이를 따라가는 데서 끝나지 않도록, 문제의 조건을 읽고 배운 개념을 꺼내는 과정을 함께 살펴봅니다."}<br /><br />{"해설을 덮은 뒤에도 스스로 시작할 수 있는 힘. 매쓰킴이 수업에서 길러주고 싶은 실력입니다."}</p><p className="signature">{"김성민 "}<span>{"MATHSKIM"}</span></p><Link className="text-link" href="/story?lang=ko">{"김성민의 이야기를 읽어보세요 ↗"}</Link></div></div></div></section>);
}
