/** 빌드하는 모든 주소: 언어 고르기 · sitemap.xml */
import { LOCALES } from "../i18n/locales";
import { listPosts } from "./content";
import { KINDS, href } from "./site";

export function allPages(): { path: string; date?: string }[] {
  return LOCALES.flatMap((locale) => [
    { path: href(locale) },
    ...KINDS.flatMap((kind) => [{ path: href(locale, kind) }, ...listPosts(kind, locale).map((p) => ({ path: href(locale, kind, p.slug), date: p.date }))]),
  ]);
}
