# ArtHub – Online Art Marketplace (Server)

**Purpose:** REST API for ArtHub: authentication, artworks, comments, Stripe payments, transactions and admin analytics.

**Live URL:** https://your-arthub-api.vercel.app  *(replace after deploying)*
**Client repo:** https://github.com/your-name/art-hub-client

## Key features
- JWT auth (7 days), bcrypt passwords, Google ID-token login, role middleware (user / artist / admin)
- Artworks CRUD with server-side search, category/price filters, sorting and pagination
- Comments allowed only for buyers of that artwork (checked from the transactions collection)
- Stripe Checkout for artwork purchases and Pro/Premium plans; payments are verified with Stripe on `/api/payments/confirm` and recorded once (idempotent)
- Purchase limits per tier (free 3, pro 9, premium unlimited), checked before the Stripe session is created
- Artwork marked sold after purchase; dummy email logged to console
- Admin stats, user role management, all transactions; admin account auto-seeded on first start

## Setup
```bash
npm install
cp .env.example .env     # fill in values
npm run dev              # http://localhost:5000
npm run seed             # optional demo artists + 12 artworks
```
Deploy to Vercel (`vercel.json` included). Set the same variables in the Vercel dashboard and set `CLIENT_URL` to your client URL (comma separate several origins).

## NPM packages
express, mongoose, cors, dotenv, jsonwebtoken, bcryptjs, stripe, google-auth-library
