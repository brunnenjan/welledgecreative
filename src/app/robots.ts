import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Search engines may read the site, except client proposals and the API.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/en/proposals/", "/de/proposals/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
