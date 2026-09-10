"use client";

import { useState } from "react";

export default function ApplicationExercise() {
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState(0);
  const [result, setResult] = useState(null);
  return <section className="application-exercise" aria-labelledby="exercise-title">
    <p className="label">직접 적용해보기 · 강사 검토 전 체험 예제</p>
    <h3 id="exercise-title">직선이 달라졌습니다. 무엇부터 확인할까요?</h3>
    <p>두 곡선 <strong>y = 4x</strong>, <strong>y = x² − 4x</strong>가 둘러싼 전체 영역의 넓이를 반으로 나누는 수직선 <strong>x = a</strong>를 찾아보세요.</p>
    <p className="note">완전제곱식과 함수 그래프를 배운 학생을 위한 연습입니다. 낯설다면 위 예제를 먼저 살펴보세요.</p>
    <form onSubmit={(event) => { event.preventDefault(); setResult(Number(answer) === 4); }}>
      <label htmlFor="exercise-reason">먼저 확인할 것과 그 이유를 적어보세요. <span>(선택)</span></label>
      <textarea id="exercise-reason" rows={2} placeholder="두 함수의 무엇을 비교하면 좋을까요?" />
      <label htmlFor="exercise-answer">내가 구한 a의 값</label>
      <input id="exercise-answer" type="number" step="any" required value={answer} onChange={(event) => { setAnswer(event.target.value); setResult(null); }} />
      <div className="actions"><button className="btn" type="submit">답 확인하기</button><button className="btn secondary" type="button" disabled={hint === 2} onClick={() => setHint(Math.min(hint + 1, 2))}>힌트 {hint === 2 ? "확인 완료" : `${hint + 1} 보기`}</button></div>
    </form>
    <div aria-live="polite" className="exercise-feedback">
      {hint >= 1 && <p>힌트 1 · 같은 x에서 위쪽 함수와 아래쪽 함수의 값 차이를 적어보세요.</p>}
      {hint >= 2 && <p>힌트 2 · 높이 차 8x − x²를 완전제곱식으로 정리하면 대칭축이 보입니다.</p>}
      {result === false && <p>이 값은 정답과 다릅니다. 두 함수 중 하나의 축이 아니라, 높이 차의 대칭축을 확인해 보세요.</p>}
      {result === true && <p>이번 문항의 답은 a = 4입니다. 왜 높이 차의 대칭을 사용했는지 적은 이유와 아래 해설을 비교해 보세요.</p>}
    </div>
    <details><summary>해설과 적용 조건 확인하기</summary><p>교점은 x = 0, 8입니다. 이 구간에서 높이 차는 4x − (x² − 4x) = 16 − (x − 4)²로, 음이 아니며 x = 4를 중심으로 대칭입니다. 따라서 수직선 x = 4가 두 곡선 사이의 전체 넓이를 반으로 나눕니다.</p><p>모든 넓이 문제에서 대칭을 쓸 수 있는 것은 아닙니다. 이번에는 높이 차와 둘러싸인 구간의 대칭을 확인했기 때문에 사용할 수 있습니다.</p></details>
    <p className="note">작성 내용은 저장·전송하지 않습니다. 숫자 답만 비교하며, 서술한 이유를 자동 채점하거나 학습 수준을 진단하지 않습니다.</p>
    <a className="text-link" href="#programs">맛보기 수업 이어 보기 ↓</a>
  </section>;
}
