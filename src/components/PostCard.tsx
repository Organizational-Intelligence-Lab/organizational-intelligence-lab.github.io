/** 글 카드: 날짜 · 제목 · 요약, 누르면 글로 이동 */
import Link from "next/link";

import type { Locale } from "../i18n/locales";
import { formatDate, type Post } from "../lib/content";
import { href } from "../lib/site";

export function PostCard({ post, locale }: { post: Post; locale: Locale }) {
  return (
    <Link href={href(locale, post.kind, post.slug)} className="card cw-card">
      <time className="text-body-small cw-muted" dateTime={post.date}>
        {formatDate(post.date, locale)}
      </time>
      <strong className="text-item-title">{post.title}</strong>
      {post.summary && <p className="cw-card-summary">{post.summary}</p>}
    </Link>
  );
}

export function PostGrid({ posts, locale, empty }: { posts: Post[]; locale: Locale; empty: string }) {
  if (posts.length === 0) return <p className="cw-muted">{empty}</p>;
  return (
    <div className="cw-grid">
      {posts.map((p) => (
        <PostCard key={p.slug} post={p} locale={locale} />
      ))}
    </div>
  );
}
