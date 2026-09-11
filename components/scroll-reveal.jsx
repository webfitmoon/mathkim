"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !window.IntersectionObserver) return;
    const main = document.querySelector("main");
    if (!main) return;
    const seen = new WeakSet();
    const animations = new Set();
    const selector = "h1, h2, h3, p, figure, blockquote, dl > div, form, img, video";
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (motion.matches) continue;
        const animation = entry.target.animate([
          { opacity: 0, transform: "translateY(22px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 600, easing: "cubic-bezier(.22,1,.36,1)" });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

    const register = () => {
      for (const element of main.querySelectorAll(selector)) {
        if (seen.has(element)) continue;
        seen.add(element);
        // Animate each content group once, without nesting image/text effects.
        if (element.closest(".hero, nav, details, [role='dialog']")) continue;
        if (element.parentElement.closest("figure, blockquote, dl > div, form")) continue;
        observer.observe(element);
      }
    };
    register();
    // Filtered reviews and client-side content also receive the same entrance.
    const mutations = new MutationObserver(register);
    mutations.observe(main, { childList: true, subtree: true });
    const stopMotion = () => {
      if (motion.matches) animations.forEach((animation) => animation.cancel());
    };
    motion.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      motion.removeEventListener("change", stopMotion);
      animations.forEach((animation) => animation.cancel());
    };
  }, [pathname]);

  return null;
}
