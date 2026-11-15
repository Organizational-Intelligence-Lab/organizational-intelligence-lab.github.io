/** 공통 푸터: ©, hundredstart.com의 도입 문의, 화면 언어 고르기 */
import type { Locale } from "../i18n/locales";
import { t } from "../i18n/text";
import { COMPANY_NAME, HUNDREDSTART_INQUIRY_URL } from "../lib/site";
import { LanguageSwitch } from "./LanguageSwitch";

export function Footer({ locale, pages }: { locale: Locale; pages: string[] }) {
  return (
    <footer className="cw-footer">
      <div className="cw-bar cw-footer-bar">
        <span className="text-body-small cw-footer-copy">© 2026 {COMPANY_NAME}. All rights reserved.</span>
        <div className="cw-footer-group">
          <LanguageSwitch locale={locale} pages={pages} />
          <a href={HUNDREDSTART_INQUIRY_URL} className="btn btn-secondary btn-small">
            {t(locale, "도입 문의")}
          </a>
        </div>
      </div>
    </footer>
  );
}
