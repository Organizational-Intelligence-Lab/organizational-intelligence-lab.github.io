/** 글 목록: 최신 뉴스 · 사용 사례, 최신 날짜 먼저 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostGrid } from "../../../../components/PostCard";
import { LOCALES, isLocale } from "../../../../i18n/locales";
import { t } from "../../../../i18n/text";
import { listPosts } from "../../../../lib/content";
import { KINDS, KIND_TEXT, href, isKind } from "../../../../lib/site";

type Params = { params: Promise<{ locale: string; kind: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => KINDS.map((kind) => ({ locale, kind })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, kind } = await params;
  if (!isLocale(locale) || !isKind(kind)) return {};
  return {
    title: t(locale, KIND_TEXT[kind].title),
    description: t(locale, KIND_TEXT[kind].description),
    alternates: { canonical: href(locale, kind), languages: { ko: href("ko", kind), en: href("en", kind) } },
  };
}

export default async function ListPage({ params }: Params) {
  const { locale, kind } = await params;
  if (!isLocale(locale) || !isKind(kind)) notFound();
  return (
    <div className="public-page">
      <header className="cw-page-head">
        <h1 className="text-page-title">{t(locale, KIND_TEXT[kind].title)}</h1>
        <p className="lead">{t(locale, KIND_TEXT[kind].description)}</p>
      </header>
      <PostGrid posts={listPosts(kind, locale)} locale={locale} empty={t(locale, "아직 올린 글이 없습니다.")} />
    </div>
  );
}
