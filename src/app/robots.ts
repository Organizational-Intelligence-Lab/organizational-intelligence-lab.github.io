/** robots.txt: 모두 열고 sitemap.xml을 알림 */
import type { MetadataRoute } from "next";

import { SITE_URL } from "../lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
