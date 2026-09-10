import LessonCards from "./lesson-cards";
import styles from "./course-guide.module.css";

export default function CourseGuide() {
  return <div className={styles.guide}>
    <section aria-labelledby="course-values-title">
      <div className={styles.intro}><h2 id="course-values-title">혼자 문제를 풀 수 있도록,<br />네 가지를 배웁니다.</h2></div>
      <div className={styles.values}>
        <article className={styles.value}><div className={styles.marker}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 6c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V5c-4-1-7-1-10 1Zm0 0v15" /></svg><span>01</span></div><h3>공식을 쓰는 조건까지 이해합니다.</h3><p>공식을 외우는 데서 그치지 않고, 어떤 의미이며 언제 사용할 수 있는지 배웁니다.</p></article>
        <article className={styles.value}><div className={styles.marker}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m16 8-3 5-5 3 3-5Z" /></svg><span>02</span></div><h3>문제의 첫 접근을 결정합니다.</h3><p>주어진 조건에서 단서를 찾고, 어떤 개념을 꺼내야 할지 판단하는 과정을 배웁니다.</p></article>
        <article className={styles.value}><div className={styles.marker}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="6" height="6" rx="1" /><rect x="16" y="15" width="6" height="6" rx="1" /><path d="M8 6h7a4 4 0 0 1 4 4v5M16 12l3 3 3-3M5 9v9h7m-3-3 3 3-3 3" /></svg><span>03</span></div><h3>문제가 달라져도 적용합니다.</h3><p>특정 풀이를 그대로 따라 하기보다, 달라진 조건에서도 배운 개념을 연결하는 연습을 합니다.</p></article>
        <article className={styles.value}><div className={styles.marker}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="19" rx="2" /><path d="M9 3V2h6v1M8 12l3 3 5-6M8 18h8" /></svg><span>04</span></div><h3>해설 없이 스스로 점검합니다.</h3><p>혼자 다시 풀고 풀이의 이유를 설명하며, 이해한 부분과 더 공부할 부분을 구분합니다.</p></article>
      </div>
    </section>
    <section id="programs" className={styles.samples} aria-labelledby="sample-lessons-title">
      <h2 id="sample-lessons-title">수업은 맛보기로 먼저 만나보세요.</h2>
      <p>개념 설명과 문항 해설을 한 편씩 준비했습니다.<br />설명을 이해하며 풀이 과정을 따라갈 수 있는지 직접 확인해 보세요.</p>
      <LessonCards />
    </section>
  </div>;
}
