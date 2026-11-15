/** sitemap.xml: 빌드하는 모든 주소 */
import type { MetadataRoute } from "next";

import { allPages } from "../lib/pages";
import { SITE_URL } from "../lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return allPages().map((p) => ({ url: SITE_URL + p.path, ...(p.date ? { lastModified: p.date } : {}) }));
}
