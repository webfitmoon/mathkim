import LessonCards from "./lesson-cards";
import styles from "./course-guide.module.css";

export default function CourseGuide() {
  return <div className={styles.guide}>
    <div className={styles.intro}>
      <h2>강좌를 고르는 기준부터.</h2>
      <p>학년뿐 아니라 지금 알고 있는 개념과 풀고 싶은 문제를 함께 살펴보세요.<br />강좌에 필요한 사전 개념과 사용할 교재까지 확인하면, 나에게 맞는 수업을 고르기 쉽습니다.</p>
    </div>
    <section className={styles.launch} aria-labelledby="course-launch-title">
      <p className={styles.date}>2026년 12월 론칭 예정</p>
      <h3 id="course-launch-title">대성마이맥 론칭을 준비하고 있습니다.</h3>
      <p>공통수학1, 공통수학2, 대수, 미적분Ⅰ, 확률과 통계 강좌를 준비하고 있습니다.</p>
      <p>교재는 개념서 <strong>『트리니티 에센스』</strong>와 개념서 워크북 <strong>『트리니티 타겟』</strong>으로 구성할 예정입니다.</p>
      <p>강좌명과 추천 대상, 수강 링크는 확정되는 대로 이 페이지에서 안내하겠습니다.</p>
      <p className={styles.note}>현재는 준비 내용을 안내하는 단계로, 이 페이지에서는 수강 신청이나 결제를 받지 않습니다.</p>
    </section>
    <section id="programs" className={styles.samples} aria-labelledby="sample-lessons-title">
      <h2 id="sample-lessons-title">수업은 맛보기로 먼저 만나보세요.</h2>
      <p>개념 설명과 문항 해설을 한 편씩 준비했습니다.<br />설명을 이해하며 풀이 과정을 따라갈 수 있는지 직접 확인해 보세요.</p>
      <LessonCards />
    </section>
  </div>;
}
