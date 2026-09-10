"use client";

export default function InquiryForm() {
  return <form className="inquiry-form" onSubmit={(event) => event.preventDefault()}>
    <div className="inquiry-fields">
      <label>문의 유형 <span>(필수)</span><select name="topic" required defaultValue=""><option value="" disabled>문의 유형을 선택해 주세요</option><option>강의</option><option>교재</option><option>협업</option></select></label>
      <label>이름 <span>(필수)</span><input name="name" autoComplete="name" required maxLength={80} pattern=".*\S.*" /></label>
      <label>답변받을 이메일 <span>(필수)</span><input name="email" type="email" autoComplete="email" required maxLength={160} /></label>
      <label>학년 또는 소속 <span>(선택)</span><input name="context" maxLength={120} placeholder="예: 고2 학생 / 학부모 / 회사·기관명" /></label>
    </div>
    <label>문의 내용 <span>(필수)</span><textarea name="message" required minLength={10} maxLength={2000} rows={7} placeholder="강의·교재: 공부 중인 과목과 궁금한 점을 적어 주세요. 협업: 목적, 요청 범위, 희망 일정을 알려 주세요." /></label>
    <p className="inquiry-help">현재 문의 접수 기능을 준비 중입니다. 입력한 내용은 저장되거나 전송되지 않습니다.</p>
    <button className="btn" type="submit" disabled>문의 보내기 · 연결 준비 중</button>
  </form>;
}
