/** 첫 주소 (/): 브라우저 언어가 영어 쪽이면 /en/, 아니면 /ko/ */
"use client";

import { useEffect } from "react";

import { LOCALES, LOCALE_NAMES } from "../../i18n/locales";

export default function RootPage() {
  useEffect(() => {
    const first = (navigator.languages ?? [navigator.language]).find((l) => /^(ko|en)\b/i.test(l));
    window.location.replace(first?.toLowerCase().startsWith("en") ? "/en/" : "/ko/");
  }, []);
  return (
    <main className="cw-root">
      {LOCALES.map((l) => (
        <a key={l} href={`/${l}/`} hrefLang={l} lang={l} className="btn btn-secondary">
          {LOCALE_NAMES[l]}
        </a>
      ))}
    </main>
  );
}
