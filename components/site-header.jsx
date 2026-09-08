"use client";
import { useEffect, useRef, useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const media = window.matchMedia("(min-width:1024px)");
    const onResize = (event) => { if (event.matches) setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", onResize);
    };
  }, [open]);
  return (<header className="header"><div className="wrap header-inner"><a href="#main" className="logo" aria-label="매쓰킴 메인"><span aria-hidden="true">∫</span><strong>MATHSKIM</strong></a><button className="menu" aria-controls="navigation" type="button" aria-expanded={open} onClick={() => setOpen(!open)} ref={buttonRef}>{open ? "닫기" : "메뉴"}</button><nav id="navigation" aria-label="주 메뉴" className={open ? "nav open" : "nav"} onClick={(event) => { if (event.target.closest("a")) setOpen(false); }}><a href="#teacher">{"강사 소개"}</a><a href="#programs">{"강의 프로그램 안내"}</a><a href="#reviews">{"수강 후기"}</a><a href="#ebooks">{"무료 전자책"}</a><a className="btn" href="#contact">{"문의하기"}</a></nav></div></header>);
}
