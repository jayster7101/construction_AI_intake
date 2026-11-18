# Construction Rework prevention AI

A Next.js waitlist. Its server-side API validates names and email addresses and forwards accepted signups to Formspree.

## Deploy to Vercel

1. Create a form in Formspree and copy its endpoint, such as `https://formspree.io/f/yourformid`.
2. Import this project into Vercel. In the project settings, add `FORMSPREE_ENDPOINT` with the endpoint as its value.
3. Deploy, or redeploy if you added the variable after the first build. Submit a test signup and verify the name and email in Formspree’s submissions dashboard.

Alternatively, run `npx vercel --prod` from this directory after linking your Vercel project and setting the variable in Vercel. Vercel Hobby is for personal, non-commercial use.

## Run locally

Use Node.js 20.9 or later. Copy `.env.example` to `.env.local`, set the endpoint, then run `npm ci` and `npm run dev`. Open http://localhost:3000. The API reports that signup is unavailable until an endpoint is configured.
