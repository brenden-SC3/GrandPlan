# Search launch checklist

## Current migration state

- public/robots.txt allows crawling and advertises the production sitemap.
- public/sitemap.xml is a production URL inventory for https://thegrandplan.org, not a statement that the migration preview is ready for indexing.
- public/llms.txt provides a curated public-content guide; it does not restrict crawlers.
- This change does not remove any existing noindex,nofollow page directives.
- Keep the migration preview excluded from indexing using page directives or deployment access protection. Do not rely on robots.txt to hide private content or to prevent indexing.

## Before switching the live domain

1. Confirm https://thegrandplan.org is the intended canonical production hostname. If using www instead, update robots.txt, sitemap.xml, and llms.txt consistently before launch.
2. Finish and test the contact form, enrollment, donation, and community links.
3. Review every HTML page's robots meta tag and any deployment-level X-Robots-Tag headers. Remove migration-only noindex/nofollow directives from production pages intended for search; keep preview indexing protection separate.
4. Add or verify self-referencing production canonical URLs on indexable pages.
5. Check every sitemap URL returns the intended page successfully without redirecting. Exclude any page deliberately kept noindex; keep legacy redirect URLs out of the sitemap.
6. Verify /robots.txt, /sitemap.xml, and /llms.txt are served as the correct files on the production domain.
7. After launch, submit https://thegrandplan.org/sitemap.xml in the production site's Google Search Console property. Do not submit the Vercel preview as the production site.
8. Maintain the sitemap and llms.txt when public page routes change. Add lastmod values only when accurate page modification dates are available.
