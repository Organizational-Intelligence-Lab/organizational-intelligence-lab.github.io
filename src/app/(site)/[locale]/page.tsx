/** 첫 화면: HundredStart로 이동, 고른 사용 사례 · 최신 뉴스 (featured, 없으면 최신 글) */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Icon } from "../../../components/Icon";
import { PostGrid } from "../../../components/PostCard";
import { isLocale, type Locale } from "../../../i18n/locales";
import { t } from "../../../i18n/text";
import { featuredPosts } from "../../../lib/content";
import { HUNDREDSTART_URL, KIND_TEXT, href, type Kind } from "../../../lib/site";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: { canonical: `/${locale}/`, languages: { ko: "/ko/", en: "/en/" } } };
}

function Featured({ kind, locale }: { kind: Kind; locale: Locale }) {
  return (
    <section className="cw-section" aria-labelledby={`featured-${kind}`}>
      <div className="cw-section-head">
        <h2 id={`featured-${kind}`} className="text-section-title">
          {t(locale, KIND_TEXT[kind].title)}
        </h2>
        <Link href={href(locale, kind)} className="btn btn-ghost btn-small">
          {t(locale, "전체 보기")}
          <Icon name="arrow-right" small />
        </Link>
      </div>
      <PostGrid posts={featuredPosts(kind, locale)} locale={locale} empty={t(locale, "아직 올린 글이 없습니다.")} />
    </section>
  );
}

export default async function HomePage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <div className="home">
      <section className="cw-hero">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> COMPARE WORKFLOW · BY 100START
        </span>
        <h1 className="text-hero-title">
          {t(locale, "고객이 아는 것에서 출발해,")}
          <br />
          <span className="title-accent">{t(locale, "기술을 키웁니다")}</span>
        </h1>
        <p className="lead">{t(locale, "100Start가 쌓아 온 Workflow의 사용 사례와 최신 소식을 전합니다.")}</p>
        <div className="home-actions">
          <a href={HUNDREDSTART_URL} className="btn btn-primary">
            {t(locale, "HundredStart로 이동")}
            <Icon name="arrow-right" />
          </a>
          <Link href={href(locale, "cases")} className="btn btn-secondary">
            {t(locale, "사용 사례 보기")}
          </Link>
        </div>
      </section>
      <Featured kind="cases" locale={locale} />
      <Featured kind="news" locale={locale} />
    </div>
  );
}
