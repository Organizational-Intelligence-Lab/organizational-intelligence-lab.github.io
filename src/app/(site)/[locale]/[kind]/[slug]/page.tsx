/** 글 하나: 종류 · 제목 · 날짜 · 본문 (content/<kind>/<slug>/<locale>.md) */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Icon } from "../../../../../components/Icon";
import { LOCALES, isLocale } from "../../../../../i18n/locales";
import { t } from "../../../../../i18n/text";
import { formatDate, listPosts, postLocales, readPost } from "../../../../../lib/content";
import { KINDS, KIND_TEXT, href, isKind } from "../../../../../lib/site";

type Params = { params: Promise<{ locale: string; kind: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => KINDS.flatMap((kind) => listPosts(kind, locale).map((p) => ({ locale, kind, slug: p.slug }))));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, kind, slug } = await params;
  if (!isLocale(locale) || !isKind(kind)) return {};
  const found = readPost(kind, slug, locale);
  if (!found) return {};
  const { post } = found;
  const languages = Object.fromEntries(postLocales(kind, slug, LOCALES).map((l) => [l, href(l, kind, slug)]));
  return {
    title: post.title,
    description: post.summary || undefined,
    alternates: { canonical: href(locale, kind, slug), languages },
    openGraph: { type: "article", title: post.title, description: post.summary || undefined, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: Params) {
  const { locale, kind, slug } = await params;
  if (!isLocale(locale) || !isKind(kind)) notFound();
  const found = readPost(kind, slug, locale);
  if (!found) notFound();
  const { post, html } = found;
  return (
    <article className="public-page cw-article">
      <Link href={href(locale, kind)} className="btn btn-ghost btn-small cw-back">
        <Icon name="arrow-left" small />
        {t(locale, "목록으로")}
      </Link>
      <span className="eyebrow">{t(locale, KIND_TEXT[kind].title)}</span>
      <h1 className="text-page-title cw-article-title">{post.title}</h1>
      <time className="text-body-small cw-muted" dateTime={post.date}>
        {formatDate(post.date, locale)}
      </time>
      <div className="cw-prose" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
