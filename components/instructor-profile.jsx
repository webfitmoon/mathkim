import Link from "next/link";
import styles from "./instructor-profile.module.css";

export default function InstructorProfile() {
  return <>
  <div className={styles.profile}>
    <aside className={styles.portrait}>
      <img src="/media/banner-about.webp" alt="칠판 앞에서 설명하는 김성민 강사" width="1280" height="720" />
      <div><p>수학 강사 · MATHSKIM</p><strong>김성민</strong><span>소개 사진 임시 배치 · 강의 화면</span></div>
    </aside>
    <div className={styles.introduction}>
      <p className="label">수학 강사</p>
      <h2>김성민, 매쓰킴.</h2>
      <p>Trinity College, Cambridge에서 Mathematical Tripos BA를 마치고 Cambridge MA를 받았습니다. 연세대 치과대학 합격, 대성학원 재종 근무.<br /><br />깊이 있는 수학을 학생이 문제를 시작할 때 쓸 수 있는 구체적인 기준으로 바꿔 가르치려고 합니다.</p>
      <blockquote>“문제를 푸는 기술보다,<br />수학을 바라보는 눈을 남기고 싶습니다.”</blockquote>
      <div className="simple-actions"><Link className="btn" href="/courses">강좌 안내 보기</Link><Link className="text-link" href="/story?lang=ko">김성민의 이야기 읽기</Link></div>
    <dl className={styles.facts}>
      <div><dt>학력</dt><dd><ul><li>Trinity College, Cambridge</li><li>Mathematical Tripos BA · Cambridge MA</li></ul></dd></div>
      <div><dt>경력</dt><dd><ul><li>대성학원 재종 근무</li><li>2026년 12월 대성마이맥 런칭 예정</li></ul></dd></div>
      <div><dt>런칭 과목</dt><dd><ul><li>공통수학1, 공통수학2, 대수, 미적분Ⅰ, 확률과 통계</li><li>교재 『트리니티 에센스』(개념서), 『트리니티 타겟』(개념서 워크북)</li></ul></dd></div>
    </dl>
    </div>
  </div>
  <section className={styles.activities} aria-labelledby="instructor-activities-title">
    <h2 id="instructor-activities-title">강사님 활동 내역</h2>
    <p>강의 현장과 교재 연구, 교육 활동을 사진으로 전할 공간입니다. 현재는 배치 확인용 데모 이미지입니다.</p>
    <div className={styles.gallery}>
      {[
        { image: "/media/lesson-concept-structure.jpg", title: "강의 현장", description: "강의와 수업 현장을 담은 사진을 넣을 수 있습니다." },
        { image: "/media/banner-reviews.webp", title: "교재·콘텐츠 연구", description: "교재 집필과 수업 준비 과정을 담을 수 있습니다." },
        { image: "/media/banner-ebooks.webp", title: "교육 활동 기록", description: "특강과 행사 등 활동 사진을 넣을 수 있습니다." },
      ].map(activity => <article key={activity.title} className={styles.activity}>
        <div className={styles.activityImage}><img src={activity.image} alt={`${activity.title} 이미지 배치 예시`} width="1280" height="720" loading="lazy" /><span>DEMO</span></div>
        <h3>{activity.title}</h3><p>{activity.description}</p>
      </article>)}
    </div>
  </section>
  </>;
}
