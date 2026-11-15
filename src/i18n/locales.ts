/** 화면 언어: 한국어 (기본) · 영어. 주소 맨 앞에 둔다 (/ko/… · /en/…). */
export const LOCALES = ["ko", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ko";

/** 언어 고르기에 보이는 이름: 그 언어로 쓴 이름이라 번역하지 않음 */
export const LOCALE_NAMES: Record<Locale, string> = { ko: "한국어", en: "English" };

export function isLocale(value: unknown): value is Locale {
  return value === "ko" || value === "en";
}
