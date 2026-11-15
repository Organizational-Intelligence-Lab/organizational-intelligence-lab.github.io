/** 첫 주소 (/) 전용 바탕: 언어를 골라 /ko/ · /en/으로 보낸다 */
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "../tokens.css";
import "../base.css";
import "../site.css";
import { SITE_NAME, SITE_URL } from "../../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  alternates: { canonical: "/ko/", languages: { ko: "/ko/", en: "/en/" } },
  referrer: "no-referrer",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
