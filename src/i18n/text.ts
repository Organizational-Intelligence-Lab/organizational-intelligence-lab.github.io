/**
 * 화면 글: 코드에는 한국어 기본 글을 쓰고 t(locale, "한국어")로 감싼다. 영어는 아래 EN에 둔다.
 * EN에 없는 글은 t에 넘길 수 없어 (형 검사) 번역이 빠지면 빌드가 멈춘다. 값은 {이름} 인자로 넘긴다.
 */
import type { Locale } from "./locales";

const EN = {
  "Workflow 홈": "Workflow home",
  "주 메뉴": "Main menu",
  "화면 언어": "Language",
  "최신 뉴스": "Latest news",
  "사용 사례": "Use cases",
  "HundredStart로 이동": "Go to HundredStart",
  "HundredStart": "HundredStart",
  "고객이 아는 것에서 출발해,": "Start from what you already know,",
  "기술을 키웁니다": "and grow your technology",
  "100Start가 쌓아 온 Workflow의 사용 사례와 최신 소식을 전합니다.": "Use cases and news from the workflows 100Start builds up.",
  "사용 사례 보기": "See use cases",
  "전체 보기": "View all",
  "목록으로": "Back to list",
  "아직 올린 글이 없습니다.": "No posts yet.",
  "100Start의 소식과 업데이트를 전합니다.": "News and updates from 100Start.",
  "Workflow로 일을 바꾼 사례를 소개합니다.": "How teams changed their work with workflows.",
  "도입 문의": "Contact us",
} as const;

export type Text = keyof typeof EN;

export function t(locale: Locale, text: Text, values?: Record<string, string | number>): string {
  const s: string = locale === "ko" ? text : EN[text];
  return values ? s.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? String(values[k]) : m)) : s;
}
