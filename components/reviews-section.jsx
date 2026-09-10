"use client";

import { useEffect, useRef } from "react";

import { reviews } from "./reviews-data";

export default function ReviewsSection() {
  const rail = useRef(null);
  const manualPauseUntil = useRef(0);
  useEffect(() => {
    const node = rail.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame, last = 0, visible = false, position = node.scrollLeft;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(node);
    const tick = (time) => {
      const elapsed = last ? Math.min(time - last, 50) : 0;
      last = time;
      if (visible && time >= manualPauseUntil.current && !motion.matches && !node.matches(":hover") && !node.contains(document.activeElement)) {
        position += elapsed * 0.056;
        const repeatStart = node.children[reviews.length].offsetLeft - node.children[0].offsetLeft;
        if (position >= repeatStart) position -= repeatStart;
        node.scrollLeft = position;
      } else { position = node.scrollLeft; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);
  const move = (direction) => {
    manualPauseUntil.current = performance.now() + 1600;
    const node = rail.current;
    node.scrollBy({ left: direction * (node.children[0].offsetWidth + 24), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return (
    <section className="section review-demo-section" id="reviews">
      <div className="wrap">
        <div className="review-demo-heading">
          <div className="section-head">
            <h2>수업 이후의 공부 습관,<br />이런 모습을 그립니다.</h2>
            <p>아래 내용은 디자인 확인을 위해 임의로 작성한 데모이며, 실제 수강 후기가 아닙니다.</p>
          </div>
          <div className="review-demo-controls" aria-label="후기 데모 스크롤 제어">
            <button type="button" onClick={() => move(-1)} aria-label="이전 후기 데모">←</button>
            <button type="button" onClick={() => move(1)} aria-label="다음 후기 데모">→</button>
          </div>
        </div>
      </div>
      <div className="review-demo-rail" ref={rail} tabIndex={0} aria-label="가상 수강 후기 데모, 좌우로 넘겨 보기" onTouchStart={() => { manualPauseUntil.current = Infinity; }} onTouchEnd={() => { manualPauseUntil.current = performance.now() + 1600; }} onTouchCancel={() => { manualPauseUntil.current = performance.now() + 1600; }}>
        {[...reviews, ...reviews].map((review, index) => (
          <article className="review-demo-card" key={index} aria-hidden={index >= reviews.length ? true : undefined}>
            <p className="review-demo-badge">DEMO · 가상 후기 {String(index % reviews.length + 1).padStart(2, "0")}</p>
            <h3>{review.title}</h3>
            <p className="review-demo-body">{review.body}</p>
            <p className="review-demo-foot">실제 수강생의 경험이 아닌 예시 문구입니다.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
