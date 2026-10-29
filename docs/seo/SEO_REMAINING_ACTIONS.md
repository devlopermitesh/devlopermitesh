# SEO Remaining Actions

Items that require owner action, external setup, DNS changes, or missing information not available in the repository.

## High Priority
| Action | Why | Required From | How/Notes |
|---|---|---|---|
| **A1. Link building execution** | Backlink acquisition is off-site work. On-site prep done in docs. | Site owner/SEO | Identify target directories (relevant dev portfolios, local tech communities if applicable), create original content/resources, pursue ethical digital PR/partnerships. Do not buy links. Track outreach separately. |
| **A2. Confirm production domain** | Canonical URLs, sitemap, robots.txt sitemap reference need absolute prod domain. Currently falls back to `http://localhost:3000`. | Site owner/DevOps | Set `NEXT_PUBLIC_SITE_URL` in production env (e.g., `https://yourdomain.com`). Update `config/site.ts` usage is fine once env set. |
| **A3. Provide/host OG image** | `siteConfig.ogImagePath` points to `/og-image.png` but file not present in `public/`. | Site owner/Designer | Add a 1200x630px OG image at `public/og-image.png` or update `NEXT_PUBLIC_OG_IMAGE`. Without it, social shares may show no image. |

## Medium Priority
| Action | Why | Required From | How/Notes |
|---|---|---|---|
| **B1. Verify robots.txt after deploy** | File/route created; need to confirm accessible at `/robots.txt`. | DevOps/QA | Test in production/staging. Ensure sitemap URL matches confirmed domain. |
| **C1. Verify sitemap** | Created; need to confirm XML validity and coverage at `/sitemap.xml`. | DevOps/QA | Validate with XML validator; check all public URLs are included. |
| **E1. Confirm canonical consistency** | Canonicals use metadataBase + siteConfig.url. Must match prod domain exactly (https, no trailing slash issues). | Site owner/DevOps | Verify canonical tags resolve correctly in prod. |

## Low Priority
| Action | Why | Required From | How/Notes |
|---|---|---|---|
| **O1. DMARC record** | Email auth - DNS change required. | Domain owner/DNS provider | After reviewing SPF/DKIM, add DMARC TXT record at `_dmarc.<domain>` starting with monitoring policy (e.g., `v=DMARC1; p=none; rua=mailto:...`) before moving to quarantine/reject. Need mail infrastructure details. |
| **P1. SPF record** | Email auth - DNS change required. | Domain owner/DNS provider/Email provider | Identify legitimate senders (e.g., transactional email provider). Avoid multiple SPF records; respect lookup limits. Add/update TXT at domain root. |
| **Q1. Business contact details** | Portfolio may be online-only; need verified info if to be displayed. | Site owner | If want address/phone shown, provide verified public details. Don't invent. |
| **R1. LocalBusiness schema decision** | Only if qualifies as local business with verified info. | Site owner | Determine eligibility; if not applicable, keep Organization schema only. |
| **S1. Analytics setup** | No analytics configured. | Site owner/Marketing | Choose provider (GA4 recommended if desired), get Measurement ID, configure consent if required by jurisdiction. Set via env/config; implement with privacy controls. |
| **T1/U1/V1. Social profiles** | No official profiles found in repo. | Site owner/Marketing | Create/link official Facebook/Instagram/YouTube if desired. Provide verified URLs to add to site. |
| **X1. Facebook Pixel** | Tracking pixel - needs auth/ID. | Site owner/Marketing | Get verified Pixel ID, confirm consent requirements, configure via env. |
| **W1. llms.txt review** | Created as experimental aid. | Site owner/Content | Review content; update as site evolves. Not a guaranteed indexing signal. |

## Notes
- No DNS changes, deployments, purchases, or account creations performed.
- All code changes are reversible via git.
- Email address `miteshgehlot6@gmail.com` appears in README (docs) - kept as-is per instructions (distinguish docs from app; prefer not breaking workflows). Consider contact form if preferred.
