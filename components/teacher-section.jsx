import Link from "next/link";

export default function TeacherSection() {
  return <section className="section" id="teacher"><div className="wrap">
    <div className="section-head"><h2>답만 알려주기보다,<br />왜 그렇게 푸는지 설명합니다.</h2><p>수학 강사 김성민 · 매쓰킴</p></div>
    <div className="teacher-profile">
      <figure className="teacher-photo"><img src="/media/lesson-continuity.jpg" alt="칠판 앞에서 함수의 연속을 설명하는 김성민 강사" width="1280" height="720" style={{ aspectRatio: "16 / 9", height: "auto", objectFit: "contain" }} loading="lazy" /><figcaption>김성민 강사 · 함수의 연속 강의 중</figcaption></figure>
      <div className="teacher-letter"><p className="statement">정의를 그래프로 확인하고,<br />풀이의 이유를 짚습니다.</p>
        <p>공개된 연속 강의에서는 함숫값과 극한값을 그래프에서 하나씩 확인합니다. 넓이 문제에서는 두 곡선 사이의 높이를 비교하며 계산을 줄일 수 있는 이유를 설명합니다.<br /><br />수학 공부에 대한 생각은 『수학, 머리로 풀지 마라』에, 가르치는 일을 선택하기까지의 이야기는 에세이 『돌아서 간 길』에 담았습니다.</p>
        <p className="signature">김성민 <span>MATHSKIM</span></p><Link className="text-link" href="/story?lang=ko">김성민의 이야기를 읽어보세요 ↗</Link>
      </div>
    </div>
  </div></section>;
}
