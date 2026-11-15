/**
 * 화면 언어 고르기: 지금 주소의 언어 부분만 바꾼다 (/ko/news/a/ → /en/news/a/).
 * 그 언어에 없는 글이면 그 언어의 목록으로 간다 (pages: 빌드한 모든 주소).
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LOCALES, LOCALE_NAMES, type Locale } from "../i18n/locales";
import { t } from "../i18n/text";

export function LanguageSwitch({ locale, pages }: { locale: Locale; pages: string[] }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(ko|en)(?=\/|$)/, "");
  const target = (l: Locale) => {
    const same = `/${l}${rest.endsWith("/") ? rest : rest + "/"}`;
    if (pages.includes(same)) return same;
    const list = `/${l}/${rest.split("/").filter(Boolean)[0] ?? ""}/`.replace(/\/\/$/, "/");
    return pages.includes(list) ? list : `/${l}/`;
  };
  return (
    <nav className="cw-lang" aria-label={t(locale, "화면 언어")}>
      {LOCALES.map((l) =>
        l === locale ? (
          <span key={l} aria-current="true" lang={l}>
            {LOCALE_NAMES[l]}
          </span>
        ) : (
          <Link key={l} href={target(l)} hrefLang={l} lang={l}>
            {LOCALE_NAMES[l]}
          </Link>
        ),
      )}
    </nav>
  );
}
