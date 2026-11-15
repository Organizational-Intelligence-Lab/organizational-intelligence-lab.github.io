/** 공통 헤더: 브랜드 (→ 첫 화면) · 최신 뉴스 · 사용 사례 · HundredStart로 이동. 지금 있는 메뉴는 파란색 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "../i18n/locales";
import { t } from "../i18n/text";
import { HUNDREDSTART_URL, KINDS, KIND_TEXT, href } from "../lib/site";
import { Icon } from "./Icon";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="cw-bar">
        <Link href={href(locale)} className="brand" aria-label={t(locale, "Workflow 홈")}>
          <span className="brand-mark">
            <Icon name="network" />
          </span>
          <span className="cw-brand-name">Workflow</span>
        </Link>
        <nav className="main-menu cw-menu" aria-label={t(locale, "주 메뉴")}>
          {KINDS.map((kind) => (
            <Link key={kind} href={href(locale, kind)} className="btn btn-ghost btn-small" aria-current={pathname.startsWith(href(locale, kind)) ? "page" : undefined}>
              {t(locale, KIND_TEXT[kind].title)}
            </Link>
          ))}
        </nav>
        <a href={HUNDREDSTART_URL} className="btn btn-primary btn-small cw-go">
          {t(locale, "HundredStart")}
          <Icon name="arrow-right" small />
        </a>
      </div>
    </header>
  );
}
