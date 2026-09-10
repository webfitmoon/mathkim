"use client";

import { useState } from "react";
import { reviews } from "./reviews-data";
import styles from "./reviews-list.module.css";

const categories = ["전체", "개념 이해", "문제 접근", "복습·자립"];

export default function ReviewsList() {
  const [category, setCategory] = useState("전체");
  const visible = reviews.filter(review => category === "전체" || review.category === category);
  return <div>
    <div className={styles.intro}>
      <h2>공부의 변화, 유형별로 살펴보세요.</h2>
      <p>아래 6개 문구는 메인과 동일한 디자인 확인용 데모이며, 실제 수강 후기가 아닙니다.</p>
    </div>
    <div className={styles.filters} role="group" aria-label="후기 유형 필터">
      {categories.map(item => <button key={item} type="button" aria-pressed={category === item} aria-controls="review-results" onClick={() => setCategory(item)}>{item}<span>{item === "전체" ? reviews.length : reviews.filter(review => review.category === item).length}</span></button>)}
    </div>
    <p className={styles.count} role="status">{category} · {visible.length}개</p>
    <div id="review-results" className={styles.grid}>
      {visible.map(review => <article key={review.id} className={styles.card}>
        <div className={styles.meta}><span>{review.category}</span><span>DEMO · 가상 후기 {String(review.id).padStart(2, "0")}</span></div>
        <h3>{review.title}</h3>
        <p className={styles.body}>{review.body}</p>
        <p className={styles.note}>실제 수강생의 경험이 아닌 예시 문구입니다.</p>
      </article>)}
    </div>
  </div>;
}
