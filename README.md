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

## AI layer (Google Gemini)
| Feature | Endpoint | How |
|---|---|---|
| F1 Smart listing | `POST /api/ai/listing-assist` | Gemini vision reads the image and drafts title, 5-8 tags, category, description |
| F2 Semantic and visual search | `GET /api/ai/search?q=`, `POST /api/ai/search/image` | `gemini-embedding-2` puts text and images in one vector space; results ranked by cosine similarity with a score |
| F3 Similar art | `GET /api/ai/similar/:id` | 6 nearest artworks, excluding itself |
| F4 Price guidance | inside `listing-assist` | Range = 25th-75th percentile of the nearest listed prices; the LLM only explains it and the artworks used are returned |
| F5 Duplicate flagging | on create/update, `GET /api/ai/duplicates` | Similarity above `DUP_THRESHOLD` sets `dupStatus: pending` for admin review; nothing is removed automatically |

All AI calls time out after 10 s. On failure, search falls back to keyword search, similar art falls back to the same category, and listing falls back to manual entry. Embeddings (768 dimensions) are stored on each artwork and compared in Node; the search is isolated in `src/services/vectors.js` so it can be swapped for MongoDB Atlas Vector Search later. Image URLs are only fetched from hosts in `AI_IMAGE_HOSTS` (default imgBB and picsum). Embedding supports PNG and JPEG.

## Setup
```bash
npm install
cp .env.example .env     # fill in values
npm run dev              # http://localhost:5000
npm run seed             # optional demo artists + 12 artworks
# then log in as admin > AI duplicates > "Index artworks for AI" to embed the demo data
```
Deploy to Vercel (`vercel.json` included). Set the same variables in the Vercel dashboard and set `CLIENT_URL` to your client URL (comma separate several origins).

## NPM packages
express, mongoose, cors, dotenv, jsonwebtoken, bcryptjs, stripe, google-auth-library
