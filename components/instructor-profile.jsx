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
      <p>어릴 때부터 수학을 좋아했습니다. 수학만큼은 잘한다고 생각했지만, 중학교 통계 시험에서 크게 무너진 적이 있습니다. 재미없다는 이유로 공부를 소홀히 했고, 개념도 제대로 익히지 않은 채 시험을 봤습니다. 머릿속으로만 풀다가 틀리기도 했습니다. 지금 학생들에게 강조하는 ‘손으로 쓰기’와 ‘개념부터 세우기’는 저도 그렇게 틀려 보면서 배운 습관입니다.</p>
      <p>케임브리지에 가기까지도 곧은 길을 걷지는 않았습니다. 대학에 들어가 학원 자습실에서 학생들의 질문을 받아 주는 일을 시작했고, 군 복무를 마친 뒤에는 워킹홀리데이로 영국에 갔습니다. 그곳에서도 수학을 가르치다가 케임브리지 입시를 준비하는 학생을 만났습니다. 그 학생을 보며 저도 도전해 보고 싶어졌고, 시험을 준비해 트리니티 칼리지에서 수학을 공부하게 됐습니다.</p>
      <p>그곳에서도 막히는 순간은 있었습니다. 답을 구하는 데 익숙했던 저는 풀이의 이유를 끝까지 글로 설명하는 일이 서툴렀습니다. 정의를 정확히 이해하고, 문제에 적용하고, 다시 풀어 보는 과정을 거쳤습니다. 지금 교실에서도 학생들과 그 과정을 함께하려고 합니다. 제 설명을 이해하는 데서 그치지 않고, 혼자 문제 앞에 앉았을 때 무엇부터 해 볼지 알 수 있도록 가르치고 싶습니다.</p>
      <blockquote>“문제를 푸는 기술보다,<br />수학을 바라보는 눈을 남기고 싶습니다.”</blockquote>
      <div className="simple-actions"><Link className="btn" href="/courses">강좌 안내 보기</Link><Link className="text-link" href="/story?lang=ko">김성민의 이야기 읽기</Link></div>
    </div>
  </div>
  <section className={styles.credentials} aria-label="학력, 경력 및 런칭 과목">
    <dl className={styles.facts}>
      <div><dt><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v6c3 3 9 3 12 0v-6M22 9v7" /></svg>학력</dt><dd><ul><li>Trinity College, Cambridge</li><li>Mathematical Tripos BA · Cambridge MA</li></ul></dd></div>
      <div><dt><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V3h8v4M3 12a22 22 0 0 0 18 0M12 11v4" /></svg>경력</dt><dd><ul><li>대성학원 재종 근무</li><li>2026년 12월 대성마이맥 런칭 예정</li></ul></dd></div>
      <div><dt><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Zm0 0v15" /></svg>런칭 과목</dt><dd><ul><li>공통수학1, 공통수학2, 대수, 미적분Ⅰ, 확률과 통계</li><li>교재 『트리니티 에센스』(개념서), 『트리니티 타겟』(개념서 워크북)</li></ul></dd></div>
    </dl>
  </section>
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
