"use client";

import { useEffect, useRef, useState } from "react";

const reviews = [
  { title: "해설을 보기 전에,\n첫 줄부터 써 봐요.", body: "전에는 조금만 막혀도 해설부터 펼쳤어요. 이제는 문제에 주어진 조건을 적고, 어떤 개념과 연결되는지 먼저 생각해 보려고 해요." },
  { title: "공식보다 먼저\n조건을 살펴봐요.", body: "아는 공식에 숫자를 넣기 바빴는데, 왜 이 조건이 주어졌는지 질문하는 연습을 해요. 문제를 읽는 순서부터 다시 잡는 느낌이에요." },
  { title: "왜 그 풀이인지\n설명해 보게 됐어요.", body: "답을 맞혔다고 끝내기보다, 왜 이 방법을 골랐는지 제 말로 설명해 봐요. 설명이 안 되는 부분이 제가 다시 공부할 부분이더라고요." },
  { title: "틀린 문제에서\n다음 공부를 찾아요.", body: "틀린 표시만 하고 넘어가지 않으려고 해요. 어느 조건을 놓쳤는지, 어떤 개념이 헷갈렸는지 나눠 적으니 다시 볼 내용이 정리돼요." },
  { title: "낯선 문제에도\n출발점을 찾아봐요.", body: "처음 보는 모양이라고 바로 포기하지 않고, 배운 개념과 닮은 부분을 찾아봐요. 당장 풀리지 않아도 제가 할 수 있는 생각부터 시작해요." },
  { title: "이해한 내용을\n직접 풀며 확인해요.", body: "강의를 들을 때 고개를 끄덕이는 것과 혼자 푸는 건 다르더라고요. 설명을 덮고 다시 풀면서 어디까지 제 것이 됐는지 확인해요." },
];

export default function ReviewsSection() {
  const rail = useRef(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const node = rail.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame, last = 0, visible = false, position = node.scrollLeft;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(node);
    const tick = (time) => {
      const elapsed = last ? Math.min(time - last, 50) : 0;
      last = time;
      if (visible && !paused && !motion.matches && !node.matches(":hover") && !node.contains(document.activeElement)) {
        position += elapsed * 0.028;
        const repeatStart = node.children[reviews.length].offsetLeft - node.children[0].offsetLeft;
        if (position >= repeatStart) position -= repeatStart;
        node.scrollLeft = position;
      } else { position = node.scrollLeft; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [paused]);
  const move = (direction) => {
    setPaused(true);
    const node = rail.current;
    node.scrollBy({ left: direction * (node.children[0].offsetWidth + 24), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return (
    <section className="section review-demo-section" id="reviews">
      <div className="wrap">
        <div className="review-demo-heading">
          <div className="section-head">
            <p className="label">수강 후기 · DEMO</p>
            <h2>혼자 문제를 만났을 때,<br />이런 변화를 목표로 합니다.</h2>
            <p>아래 내용은 디자인 확인을 위해 임의로 작성한 데모이며, 실제 수강 후기가 아닙니다.</p>
          </div>
          <div className="review-demo-controls" aria-label="후기 데모 스크롤 제어">
            <button type="button" onClick={() => move(-1)} aria-label="이전 후기 데모">←</button>
            <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "자동 재생" : "일시 정지"}</button>
            <button type="button" onClick={() => move(1)} aria-label="다음 후기 데모">→</button>
          </div>
        </div>
      </div>
      <div className="review-demo-rail" ref={rail} tabIndex={0} aria-label="가상 수강 후기 데모, 좌우로 넘겨 보기" onTouchStart={() => setPaused(true)} onKeyDown={() => setPaused(true)}>
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
