import Link from "next/link";

export default function FaqSection() {
  return (
    <section className="section white" id="faq">
      <div className="wrap">
        <div className="section-head">
          <h2>시작 전에 궁금한 점</h2>
          <p>강좌 선택부터 무료 책 이용, 질문과 답변 확인까지 안내합니다.</p>
        </div>
        <div className="faq">
          <details>
            <summary>언제, 어디에서 수강하고 어떤 강좌부터 시작하면 되나요?</summary>
            <p>정규 강의는 2026년 12월 대성마이맥 론칭을 준비하고 있습니다. 강좌명과 추천 대상, 필요한 선수 개념, 교재와 수강 링크는 확정 후 안내하겠습니다. 강좌가 공개되면 현재 알고 있는 개념과 혼자 풀 때 막히는 부분을 기준으로 수강 대상을 확인해 주세요.</p>
            <p>지금은 <a href="#ebooks">무료 전자책</a>과 공개된 <a href="#programs">맛보기 영상</a>으로 수업의 관점을 먼저 살펴볼 수 있습니다. 강의 관련 문의는 <a href="mailto:sk851@cantab.ac.uk">이메일</a>로 남겨 주세요.</p>
          </details>
          <details>
            <summary>개념이 부족하거나 중위권에 머물러 있어도 따라갈 수 있나요?</summary>
            <p>현재 등급만으로 판단하기보다, 어느 개념에서 이해가 끊기고 문제의 어떤 지점에서 막히는지 확인하는 것이 먼저입니다. 개념 설명은 이해하지만 혼자 문제를 시작하기 어렵다면, 문제의 조건에서 어떤 개념을 꺼내야 하는지 살펴보세요.</p>
            <p>먼저 <Link href="/book/chapter-5?lang=ko">무료 전자책의 추천 장</Link>을 읽고, 이해되지 않은 문장이나 직접 시도한 풀이를 <a href="https://www.mathskim.com/ask?lang=ko">질문 페이지</a>에 남겨 주세요. 정규 강의를 선택할 때는 해당 강좌의 선수 지식과 추천 수준을 확인해 주세요.</p>
          </details>
          <details>
            <summary>전자책은 가입하거나 구매해야 하나요? 이어 읽기도 되나요?</summary>
            <p>『수학, 머리로 풀지 마라』와 『돌아서 간 길』은 모두 회원가입이나 구매 없이 전문을 무료로 읽을 수 있습니다. <Link href="/book?lang=ko">수학 공부법 책</Link>과 <Link href="/story?lang=ko">김성민의 에세이</Link> 중 관심 있는 책이나 장부터 시작하시면 됩니다.</p>
            <p>읽던 위치는 이용 중인 브라우저에 저장되어 다음 방문에 이어 읽을 수 있습니다. 다른 기기나 브라우저로 자동 동기화되지는 않으며, 브라우저의 저장 데이터를 지우면 읽기 기록도 사라질 수 있습니다.</p>
          </details>
          <details>
            <summary>수학 질문은 어떻게 남기고, 답변은 어디서 확인하나요?</summary>
            <p><a href="https://www.mathskim.com/ask?lang=ko">수학 질문 페이지</a>에 문제와 함께 어디까지 풀어 봤는지, 어느 줄에서 생각이 멈췄는지 적어 주세요. 책을 읽다가 생긴 질문이라면 해당 장과 이해되지 않은 문장을 함께 남겨 주시면 됩니다.</p>
            <p>접수 후 표시되는 ‘내 질문 답 확인하기’ 링크를 보관해 주세요. 그 링크에서 질문의 검토 상태와 공개된 답변을 확인할 수 있습니다. 즉시 답변하거나 특정 시간 안에 답변하는 서비스는 아니므로, 접수 후 확인 링크로 상태를 살펴봐 주세요.</p>
          </details>
        </div>
      </div>
    </section>
  );
}
