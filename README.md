# Construction Rework prevention AI

The React signup form posts names and email addresses to the Next.js API at `/api/submit`. The API validates submissions and forwards them to the configured Formspree form.

## Deploy to Vercel

Import this repository as a Next.js project and deploy. The API uses the Formspree form `xaeoovko` by default. To use a different form, set `FORMSPREE_ENDPOINT` in the Vercel project settings and redeploy.

After deployment, submit a test signup and verify that both fields appear in the Formspree submissions dashboard. Vercel Hobby is for personal, non-commercial use.

## Run locally

Use Node.js 20.9 or later. Run `npm ci` and `npm run dev`, then open http://localhost:3000. Local signups also go to the configured Formspree form. To use a separate form for local testing, copy `.env.example` to `.env.local` and set `FORMSPREE_ENDPOINT` there.
