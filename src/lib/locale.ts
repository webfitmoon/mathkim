export type Locale = "ko" | "en";

/** Production used this key; keep for QR-card visitors who already chose. */
export const PREFERRED_LANG_KEY = "preferred_lang";
/** Local rebuild key (still written for back-compat). */
export const MATHSKIM_LOCALE_KEY = "mathskim-locale";
export const LOCALE_CHANGE_EVENT = "mathskim-locale-change";
let currentLocale: Locale | null = null;

export function refreshStoredLocale(key: string | null) {
  if (key === null || key === PREFERRED_LANG_KEY || key === MATHSKIM_LOCALE_KEY) currentLocale = null;
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "ko" || value === "en";
}

export function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;

  try {
    const fromPreferred = window.localStorage.getItem(PREFERRED_LANG_KEY);
    if (isLocale(fromPreferred)) return fromPreferred;

    const fromMathskim = window.localStorage.getItem(MATHSKIM_LOCALE_KEY);
    if (isLocale(fromMathskim)) return fromMathskim;
  } catch {
    // Private mode / blocked storage
  }

  return null;
}

export function readUrlLocale(): Locale | null {
  if (typeof window === "undefined") return null;

  try {
    const param = new URLSearchParams(window.location.search).get("lang");
    if (isLocale(param)) return param;
    return /^\/en(?:\/|$)/.test(window.location.pathname) ? "en" : null;
  } catch {
    return null;
  }
}

export function resolveLocale(): Locale {
  return readUrlLocale() ?? currentLocale ?? readStoredLocale() ?? "ko";
}

export function hasLocalePreference(): boolean {
  return Boolean(readUrlLocale() || readStoredLocale());
}

export function applyLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  currentLocale = locale;
  document.documentElement.dataset.localeReady = "true";
  document.documentElement.dataset.locale = locale;
  document.documentElement.lang = locale;
}

export function persistLocale(locale: Locale) {
  applyLocale(locale);

  try {
    window.localStorage.setItem(PREFERRED_LANG_KEY, locale);
    window.localStorage.setItem(MATHSKIM_LOCALE_KEY, locale);
  } catch {
    // Ignore storage failures; visual locale still applies.
  }

  try {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", locale);
    url.hash = url.hash.replace(/^(#section-[a-z0-9-]+)-(?:ko|en)$/, `$1-${locale}`);
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
    // replaceState does not navigate an anchor; keep the matching translated section visible.
    if (/^#section-[a-z0-9-]+-(?:ko|en)$/.test(url.hash)) {
      document.getElementById(url.hash.slice(1))?.scrollIntoView({ block: "start", behavior: "instant" });
    }
  } catch {
    // History API unavailable
  }

  window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
}

/** Tiny inline script for layout <head> — prevents language flash before hydration. */
export const LOCALE_BOOT_SCRIPT = `(function(){var p=new URLSearchParams(location.search).get("lang");var s=(p==="en"||p==="ko")?p:(/^\\/en(?:\\/|$)/.test(location.pathname)?"en":null);try{s=s||localStorage.getItem("${PREFERRED_LANG_KEY}")||localStorage.getItem("${MATHSKIM_LOCALE_KEY}");}catch(e){}if(s==="en"||s==="ko"){document.documentElement.dataset.locale=s;document.documentElement.lang=s;}document.documentElement.dataset.localeReady="true";})();`;

/** Only our public pages have static English aliases. Never rewrite external URLs. */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const url = new URL(href, "https://www.mathskim.com");
  const path = url.pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const publicPage = /^(?:\/|\/ask|\/(?:book|story)(?:\/[a-z0-9-]+)?)$/.test(path);
  if (publicPage) {
    url.pathname = locale === "en" ? `/en${path === "/" ? "" : path}` : path;
    if (locale === "en") url.searchParams.delete("lang");
    else url.searchParams.set("lang", "ko");
  } else {
    url.searchParams.set("lang", locale);
  }
  url.hash = url.hash.replace(/^(#section-[a-z0-9-]+)-(?:ko|en)$/, `$1-${locale}`);
  return `${url.pathname}${url.search}${url.hash}`;
}
