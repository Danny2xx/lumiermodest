This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment Variables

| Variable | Used for |
| --- | --- |
| `DATABASE_URL` / `DIRECT_URL` | Neon Postgres (Prisma) |
| `NEON_AUTH_BASE_URL` / `NEON_AUTH_COOKIE_SECRET` | Neon Managed Better Auth |
| `NEXT_PUBLIC_SITE_URL` | Absolute URLs for password-reset and Stripe redirects |
| `STRIPE_SECRET_KEY` | Creating Checkout sessions |
| `STRIPE_WEBHOOK_SECRET` | Verifying incoming Stripe webhooks |

All of these must also be set in the Vercel project settings — `.env.local` is
local-only and is not committed.

## Stripe Checkout

Payment runs through Stripe's hosted Checkout page, so no card details reach
this app. The flow is:

1. `/checkout` collects an email and posts the bag to the `startCheckout`
   server action.
2. The action **re-prices every line from the database** — the cart lives in
   `localStorage`, so browser-supplied prices are never trusted — writes a
   `pending` order, and creates a Stripe Checkout session.
3. Stripe collects payment and a UK shipping address, then redirects to
   `/checkout/success`.
4. `POST /api/stripe/webhook` verifies the signature and flips the order to
   `paid`. This is the only thing that marks an order paid — the success page
   redirect is not treated as proof of payment.

### Testing locally

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the `whsec_…` it prints into `STRIPE_WEBHOOK_SECRET`, then pay with test
card `4242 4242 4242 4242`, any future expiry and any CVC.

### Going live

Add `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in Vercel, then register
the production endpoint at `https://<your-domain>/api/stripe/webhook` in the
Stripe dashboard, subscribed to `checkout.session.completed`,
`checkout.session.async_payment_succeeded`, `checkout.session.expired` and
`checkout.session.async_payment_failed`.

Shipping rates live in `src/lib/shipping.ts` and currently mirror the
placeholder figures published on `/shipping` — update both together once real
carrier pricing is confirmed.
