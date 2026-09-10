"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SiteHeader() {
  const pathname = usePathname();
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
  return (<header className="header"><div className="wrap header-inner"><Link href="/" className="logo" aria-label="매쓰킴 메인"><span aria-hidden="true">∫</span><strong>MATHSKIM</strong></Link><button className="menu" aria-controls="navigation" type="button" aria-expanded={open} onClick={() => setOpen(!open)} ref={buttonRef}>{open ? "닫기" : "메뉴"}</button><nav id="navigation" aria-label="주 메뉴" className={open ? "nav open" : "nav"} onClick={(event) => { if (event.target.closest("a")) setOpen(false); }}><Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>강사 소개</Link><Link href="/courses" aria-current={pathname === "/courses" ? "page" : undefined}>프로그램 소개</Link><Link href="/reviews" aria-current={pathname === "/reviews" ? "page" : undefined}>수강 후기</Link><Link href="/ebooks" aria-current={pathname === "/ebooks" ? "page" : undefined}>무료 전자책</Link><Link href="/contact" className="btn" aria-current={pathname === "/contact" ? "page" : undefined}>문의하기</Link></nav></div></header>);
}
