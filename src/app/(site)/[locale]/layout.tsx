/** 언어별 바탕: <html lang>, 헤더 · 본문 · 푸터 (Whole 화면 틀과 같은 모양) */
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import "../../tokens.css";
import "../../base.css";
import "../../site.css";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { LOCALES, isLocale } from "../../../i18n/locales";
import { t } from "../../../i18n/text";
import { allPages } from "../../../lib/pages";
import { SITE_NAME, SITE_URL } from "../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
    description: t(locale, "100Start가 쌓아 온 Workflow의 사용 사례와 최신 소식을 전합니다."),
    openGraph: { siteName: SITE_NAME, locale: locale === "ko" ? "ko_KR" : "en_US", type: "website" },
    // 응답 머리글을 걸 수 없는 곳 (GitHub Pages)에서도 다른 사이트로 주소가 넘어가지 않게
    referrer: "no-referrer",
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const pages = allPages().map((p) => p.path);
  return (
    <html lang={locale}>
      <body>
        <div className="whole">
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} pages={pages} />
        </div>
      </body>
    </html>
  );
}
