"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useSyncExternalStore, type ComponentProps, type ReactNode } from "react";
import { applyLocale, localizeHref, LOCALE_CHANGE_EVENT, refreshStoredLocale, resolveLocale, type Locale } from "@/lib/locale";

const ServerLocale = createContext<Locale>("ko");
function subscribe(notify: () => void) {
  const onStorage = (event: StorageEvent) => { refreshStoredLocale(event.key); notify(); };
  window.addEventListener(LOCALE_CHANGE_EVENT, notify);
  window.addEventListener("storage", onStorage);
  window.addEventListener("popstate", notify);
  return () => {
    window.removeEventListener(LOCALE_CHANGE_EVENT, notify);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("popstate", notify);
  };
}

export function useLocale() {
  const serverLocale = useContext(ServerLocale);
  return useSyncExternalStore(subscribe, resolveLocale, () => serverLocale);
}

/** Locale follows our navigation without depending on localStorage writes. */
export function LocaleScope({ locale = "ko", children }: { locale?: Locale; children: ReactNode }) {
  const pathname = usePathname();
  useEffect(() => {
    applyLocale(resolveLocale());
    window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
  }, [pathname]);
  return <ServerLocale.Provider value={locale}>{children}</ServerLocale.Provider>;
}

export function LocaleLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const locale = useLocale();
  return <Link {...props} href={localizeHref(href, locale)} />;
}
