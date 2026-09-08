"use client";

import { useEffect, useId, useState } from "react";
import {
  hasLocalePreference,
  persistLocale,
  type Locale,
} from "@/lib/locale";
import styles from "./language-gate.module.css";

/**
 * First-visit language gate for business-card QR landings.
 * Compatible with production: preferred_lang + ?lang= query.
 *
 * Intentional asymmetry: the EN button is primary + autofocused because the
 * physical business card targets English-speaking recipients, while Escape
 * (dismiss without choosing) keeps the site's Korean-first default.
 */
export function LanguageGate() {
  const titleId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Defer one frame so boot script / storage are readable.
    const frame = window.requestAnimationFrame(() => {
      if (!hasLocalePreference()) {
        setOpen(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function choose(locale: Locale) {
    persistLocale(locale);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        // Escape defaults to Korean — common QR audience, no blank state.
        persistLocale("ko");
        setOpen(false);
      }

      if (event.key === "Tab") {
        const enButton = document.getElementById("btn_select_en");
        const koButton = document.getElementById("btn_select_ko");
        if (!enButton || !koButton) return;

        const activeElement = document.activeElement;
        const focusIsOutside = activeElement !== enButton && activeElement !== koButton;

        if (event.shiftKey && (activeElement === enButton || focusIsOutside)) {
          event.preventDefault();
          koButton.focus();
        } else if (!event.shiftKey && (activeElement === koButton || focusIsOutside)) {
          event.preventDefault();
          enButton.focus();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      id="lang_selection_modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className={styles.panel} id="lang_modal_content">
        <div className={styles.mark} aria-hidden="true">
          ∫
        </div>
        <div className={styles.copy}>
          <h2 id={titleId}>Welcome to mathskim</h2>
          <p>
            내용을 편하게 보실 언어를 선택해 주세요.
            <br />
            Please select your preferred language.
          </p>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            id="btn_select_en"
            className={styles.primary}
            onClick={() => choose("en")}
            autoFocus
          >
            English (EN)
          </button>
          <button
            type="button"
            id="btn_select_ko"
            className={styles.secondary}
            onClick={() => choose("ko")}
          >
            한국어 (KO)
          </button>
        </div>
        <p className={styles.hint}>
          명함 QR · mathskim.com
        </p>
      </div>
    </div>
  );
}
