@AGENTS.md

# BamBha App

Indian wellness e-commerce brand selling Monkfruit Sweetener and Moringa Powder. Built with Next.js 16 App Router.

## Tech Stack

- **Framework**: Next.js 16.2.2 (App Router, JS only — no TypeScript)
- **UI**: React 19.2.4, CSS Modules, Framer Motion
- **Backend**: Supabase (Postgres DB + Storage + Auth)
- **Auth**: @supabase/ssr with PKCE OAuth (email + Google)
- **Payments**: Razorpay
- **Deployment**: Vercel

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=      # NOT anon key — use publishable key
SUPABASE_SERVICE_ROLE_KEY=                 # server only
RAZORPAY_KEY_ID=                           # server only
RAZORPAY_KEY_SECRET=                       # server only
NEXT_PUBLIC_RAZORPAY_KEY_ID=               # same as KEY_ID, safe to expose
```

## Supabase Client Usage

- Browser (client components): `@/utils/supabase/client.js` → `createBrowserClient`
- Server (API routes): `@/utils/supabase/server.js` → `createServerClient` with cookies
- Middleware: `@/utils/supabase/middleware.js`

**Important**: Always use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, never `ANON_KEY`.

## Database Tables

| Table | Purpose |
|---|---|
| `profiles` | Auto-created on signup via trigger. Has `is_admin`, `first_name`, `last_name` |
| `products` | Product catalog. Has `main_image`, `gallery_images[]`, `weight_options[]`, `price`, `mrp`, `avg_rating`, `review_count` |
| `reviews` | Product reviews. FK → products. UNIQUE on (product_id, user_id). Trigger auto-updates `avg_rating` + `review_count` on products |
| `orders` | Razorpay orders. Has `razorpay_order_id`, `razorpay_payment_id`, `status`, `amount` (paise), `items` (jsonb), `shipping_address` (jsonb) |
| `banners` | Hero carousel banners. Has `image_url`, `redirect_url`, `display_order`, `is_active` |
| `contacts` | Contact form submissions |

## Supabase Storage Buckets

| Bucket | Access | Used for |
|---|---|---|
| `products` | Public | Product main image + gallery images |
| `banners` | Public | Hero carousel banner images |

## Admin System

- `is_admin` is stored in the `profiles` table (DB-level, not user_metadata)
- Admin routes are protected by `app/admin/layout.js` — redirects to `/` if not admin
- Admin nav link only shown when `isAdmin === true`
- To make a user admin: `update profiles set is_admin = true where id = '<user_uuid>';`

## Key Patterns

**params in client components (Next.js 15+)**:
```js
import { use } from 'react';
export default function Page({ params }) {
  const { id } = use(params);
}
```

**RLS for INSERT**: always use `WITH CHECK`, not just `USING`:
```sql
create policy "insert_policy" on table_name for insert
with check (auth.uid() = user_id);
```

**Admin RLS mutations**: do mutations directly from the browser Supabase client (not via API route) — the browser client carries the user JWT which satisfies RLS. Server client may not pass auth correctly for writes.

**Order amounts**: stored in **paise** (multiply Rs × 100 to store, divide by 100 to display).

## Page Structure

```
/                       Home (Hero carousel + sections + HomeFooter)
/products               Product listing (fetches from /api/products)
/products/[id]          Product detail (fetches from /api/products/[id])
/cart                   Cart (localStorage via CartContext)
/checkout               Address form + Razorpay payment
/orders/[id]            Order confirmation
/profile                User info + order history
/contact                Contact form → contacts table
/login                  Email (two-step) + Google OAuth
/signup                 Registration
/auth/callback          PKCE OAuth code exchange
/admin                  Admin dashboard
/admin/products         List all products (delete)
/admin/products/add     Add product (upload to Storage + insert)
/admin/orders           All orders + inline status update
/admin/banner           Add/list/reorder/toggle banners
```

## API Routes

```
GET  /api/products              All products
GET  /api/products/[id]         Single product
GET  /api/reviews?product_id=   Reviews for a product
POST /api/reviews               Submit review (auth required)
GET  /api/banners               All banners (public)
POST /api/banners               Create banner (admin)
PATCH /api/banners              Toggle active or bulk reorder (admin)
DELETE /api/banners             Delete banner + storage file (admin)
GET  /api/admin/orders          All orders (admin)
PATCH /api/admin/orders         Update order status (admin)
POST /api/razorpay/create-order Create Razorpay order
POST /api/razorpay/verify       Verify payment signature + save order
```

## Razorpay Payment Flow

1. Cart → `/checkout` (address form)
2. `POST /api/razorpay/create-order` → creates order (amount in paise)
3. Razorpay modal opens client-side
4. On success → `POST /api/razorpay/verify` → HMAC-SHA256 signature check → save to `orders` table
5. Clear cart → redirect to `/orders/[id]`

## Order Status Values

`pending` → `paid` → `processing` → `shipped` → `delivered` (or `failed`)

DB constraint: `check (status in ('pending', 'paid', 'processing', 'shipped', 'delivered', 'failed'))`

## Contexts

- `AuthContext` — user, session, profile, isAdmin, loading, signUp, signIn, signInWithGoogle, signOut
- `CartContext` — cart (localStorage), addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice

## Known Gotchas

- Hydration errors: `suppressHydrationWarning` on `<html>` in layout.js (browser extensions inject attributes)
- Hero carousel: loads banners from DB, shows skeleton until fetch resolves to avoid flicker
- Razorpay test mode: use `rzp_test_*` keys. Switch to live keys for production
- Google OAuth requires test users added in Google Cloud Console (OAuth consent screen) while in testing mode
