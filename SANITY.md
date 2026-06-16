# Sanity CMS

The client edits all site content (the four galleries, the contact page, and site/SEO settings) in a hosted Sanity Studio. The website is a static Next.js export; publishing in Sanity triggers a Cloudflare rebuild, so changes go live in about a minute.

## What is editable

- **Projects / Residencies / Exhibitions / Ceramics** — each is a list of items with a title, description, images (drag to reorder items, drag to reorder images), and a slug.
- **Contact Page** — heading, intro, and links (email, social, etc.).
- **Site Settings** — site name/logo text, SEO title, SEO description.

## One-time setup

### 1. Create the Sanity project

1. Go to https://www.sanity.io/manage and create a project (free plan is fine).
2. Add a dataset named `production`. Keep its visibility **Public** (the website reads published content with no token).
3. Copy the **Project ID**.

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in the project ID:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your project id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01

SANITY_STUDIO_PROJECT_ID=<your project id>
SANITY_STUDIO_DATASET=production
```

### 3. Seed the existing content (optional, one time)

Imports the current projects/images and the default contact + settings into Sanity.

1. At https://www.sanity.io/manage → API → Tokens, create a token with **Editor** permission.
2. Add it to `.env.local`: `SANITY_API_WRITE_TOKEN=<token>`
3. Run: `npm run seed`

You can delete the token afterward; it is only used for seeding.

## Running and deploying the Studio

- Local: `npm run studio` → http://localhost:3333
- Deploy hosted Studio: `npm run studio:deploy` → https://jackplatner.sanity.studio

Give the client the `jackplatner.sanity.studio` URL and invite them as a member at https://www.sanity.io/manage.

## Deploying the website (Cloudflare Pages)

Build settings:

- Build command: `npm run build`
- Output directory: `out`
- Environment variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (`production`), `NEXT_PUBLIC_SANITY_API_VERSION` (`2024-10-01`)

## Auto-rebuild on publish (webhook)

1. In Cloudflare Pages → the project → **Settings → Builds & deployments → Deploy hooks**, create a hook and copy its URL.
2. In https://www.sanity.io/manage → API → **Webhooks**, add a webhook:
   - URL: the Cloudflare deploy hook URL
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - Filter: `_type in ["project", "contactPage", "siteSettings"]`
   - HTTP method: `POST`

Now every publish in the Studio rebuilds and redeploys the live site automatically.

## Notes

- Until the env vars are set, the site builds and renders a built-in fallback copy of the original content (`app/lib/sanity/fallback.ts`). Once `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are present, Sanity content takes over.
- The "Projects" section lives at the `/stills` route for backwards compatibility.
