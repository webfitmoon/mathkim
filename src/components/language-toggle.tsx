"use client";

import { useEffect } from "react";
import { useLocale } from "./locale-navigation";
import {
  applyLocale,
  persistLocale,
  resolveLocale,
} from "@/lib/locale";
import styles from "./ui.module.css";

export function LanguageToggle() {
  const locale = useLocale();

  useEffect(() => {
    // Sync DOM if boot script / gate already set something else.
    const next = resolveLocale();
    applyLocale(next);
  }, [locale]);

  return (
    <div
      className={styles.languageToggle}
      role="group"
      aria-label={locale === "ko" ? "언어 선택" : "Language"}
    >
      <button
        type="button"
        aria-pressed={locale === "ko"}
        onClick={() => persistLocale("ko")}
      >
        KO
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        aria-pressed={locale === "en"}
        onClick={() => persistLocale("en")}
      >
        EN
      </button>
    </div>
  );
}
