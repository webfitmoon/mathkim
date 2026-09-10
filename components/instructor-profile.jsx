import Link from "next/link";
import styles from "./instructor-profile.module.css";

export default function InstructorProfile() {
  return <div className={styles.profile}>
    <div className={styles.introduction}>
      <p className="label">수학 강사</p>
      <h2>김성민, 매쓰킴.</h2>
      <p>Trinity College, Cambridge에서 Mathematical Tripos BA를 마치고 Cambridge MA를 받았습니다. 연세대 치과대학 합격, 대성학원 재종 근무.<br /><br />깊이 있는 수학을 학생이 문제를 시작할 때 쓸 수 있는 구체적인 기준으로 바꿔 가르치려고 합니다.</p>
      <blockquote>“문제를 푸는 기술보다,<br />수학을 바라보는 눈을 남기고 싶습니다.”</blockquote>
      <p className={styles.coach}>Lecture Coach는 강사가 자기 설명을 돌아보고 다음 강의와 교재를 고쳐 나가는 방식입니다. 학생용 코칭 기능이나 성적 향상을 약속하는 말은 아닙니다.</p>
      <div className="simple-actions"><Link className="btn" href="/courses">강좌 안내 보기</Link><Link className="text-link" href="/story?lang=ko">김성민의 이야기 읽기</Link></div>
    </div>
    <dl className={styles.facts}>
      <div><dt>학력</dt><dd>Trinity College, Cambridge<br />Mathematical Tripos BA · Cambridge MA</dd></div>
      <div><dt>경력</dt><dd>대성학원 재종 근무<br />2026년 12월 대성마이맥 런칭 예정</dd></div>
      <div><dt>런칭 과목</dt><dd>공통수학1, 공통수학2, 대수, 미적분Ⅰ, 확률과 통계</dd><dd>교재 『트리니티 에센스』(개념서), 『트리니티 타겟』(개념서 워크북)</dd></div>
    </dl>
  </div>;
}
