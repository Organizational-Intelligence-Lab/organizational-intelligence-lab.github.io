/** 사이트 주소 · 바깥 링크 */
import type { Text } from "../i18n/text";

export const SITE_NAME = "Workflow";
/** 회사명: 푸터 © */
export const COMPANY_NAME = "Workflow";
export const SITE_URL = "https://compare-workflow.com";

export const HUNDREDSTART_URL = "https://hundredstart.com";
export const HUNDREDSTART_INQUIRY_URL = `${HUNDREDSTART_URL}/inquiry`;

/** 글 종류: 주소 이름 (content/<kind>/) · 화면 이름 · 목록 설명 */
export const KINDS = ["news", "cases"] as const;
export type Kind = (typeof KINDS)[number];

export const KIND_TEXT: Record<Kind, { title: Text; description: Text }> = {
  news: { title: "최신 뉴스", description: "100Start의 소식과 업데이트를 전합니다." },
  cases: { title: "사용 사례", description: "Workflow로 일을 바꾼 사례를 소개합니다." },
};

export function isKind(value: unknown): value is Kind {
  return value === "news" || value === "cases";
}

/** 사이트 안 주소: /{locale}/ · /{locale}/{kind}/ · /{locale}/{kind}/{slug}/ */
export function href(locale: string, kind?: Kind, slug?: string): string {
  return "/" + [locale, kind, slug].filter(Boolean).join("/") + "/";
}
