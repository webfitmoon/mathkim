import LessonCards from "./lesson-cards";
import Link from "next/link";
export default function ProgramsSection() {
  return (<section className="section white" id="programs"><div className="wrap"><div className="section-head"><h2>{"나도 이해하며 따라갈 수 있을지,"}<br />{"직접 들어보세요."}</h2><p>{"문항 해설과 개념 설명을 하나씩 골랐습니다."}<br />{"설명을 들으며 풀이 과정을 따라갈 수 있는지 확인해 보세요."}</p></div><LessonCards /></div><div className="course-launch-band"><div className="wrap course-launch-note"><p>{"정규 강의는 2026년 12월 대성마이맥 론칭 예정입니다. 강좌명·교재·수강 경로는 확정 후 안내합니다."}</p><Link className="btn secondary" href="/contact">{"수강 문의하기"}</Link></div></div></section>);
}
