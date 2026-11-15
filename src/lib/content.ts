/**
 * 글 읽기 (빌드할 때): content/<kind>/<slug>/<locale>.md
 * 앞머리 (--- 사이): title · date (YYYY-MM-DD) · summary · featured (true면 첫 화면에 보임).
 * 그 언어 파일이 있는 글만 그 언어 목록에 나온다.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { marked } from "marked";

import type { Locale } from "../i18n/locales";
import type { Kind } from "./site";

export type Post = {
  kind: Kind;
  slug: string;
  title: string;
  date: string;
  summary: string;
  featured: boolean;
};

const CONTENT_DIR = join(process.cwd(), "content");
const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

function parse(file: string): { meta: Record<string, string>; body: string } {
  const raw = readFileSync(file, "utf8");
  const match = raw.match(FRONT_MATTER);
  if (!match) throw new Error(`앞머리 (---)가 없습니다: ${file}`);
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["'](.*)["']$/, "$1");
  }
  return { meta, body: raw.slice(match[0].length) };
}

function toPost(kind: Kind, slug: string, meta: Record<string, string>, file: string): Post {
  if (!meta.title) throw new Error(`title이 없습니다: ${file}`);
  if (!DATE.test(meta.date ?? "")) throw new Error(`date는 YYYY-MM-DD입니다: ${file}`);
  return { kind, slug, title: meta.title, date: meta.date, summary: meta.summary ?? "", featured: meta.featured === "true" };
}

function fileOf(kind: Kind, slug: string, locale: Locale): string {
  return join(CONTENT_DIR, kind, slug, `${locale}.md`);
}

/** 그 언어의 글, 최신 날짜 먼저 */
export function listPosts(kind: Kind, locale: Locale): Post[] {
  const dir = join(CONTENT_DIR, kind);
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(fileOf(kind, d.name, locale)))
    .map((d) => {
      const file = fileOf(kind, d.name, locale);
      return toPost(kind, d.name, parse(file).meta, file);
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

/** 첫 화면에 보일 글: featured 글, 없으면 최신 글 */
export function featuredPosts(kind: Kind, locale: Locale, limit = 3): Post[] {
  const posts = listPosts(kind, locale);
  const featured = posts.filter((p) => p.featured);
  return (featured.length > 0 ? featured : posts).slice(0, limit);
}

/** 글 하나와 본문 HTML (content/는 저장소에서 쓰는 글이라 그대로 그린다) */
export function readPost(kind: Kind, slug: string, locale: Locale): { post: Post; html: string } | null {
  const file = fileOf(kind, slug, locale);
  if (!existsSync(file)) return null;
  const { meta, body } = parse(file);
  return { post: toPost(kind, slug, meta, file), html: marked.parse(body, { async: false }) };
}

/** 글이 있는 언어들 (주소 · 다른 언어 링크) */
export function postLocales(kind: Kind, slug: string, locales: readonly Locale[]): Locale[] {
  return locales.filter((l) => existsSync(fileOf(kind, slug, l)));
}

export function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "ko" ? "ko-KR" : "en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );
}
