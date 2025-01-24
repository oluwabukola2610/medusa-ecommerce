This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).The app is integrated with Medusa Cloud for backend product and cart management and  NextAuth for authentication.

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:8000] with your browser to see the result.

# E-Commerce App with Next.js & Medusa Cloud

# Set up your environment variables by creating a .env.local file with the following values:
 NEXT_PUBLIC_MEDUSA_SERVER_URL="http://localhost:9000"
 NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY =pk_3a4aef482a04df7283f91598092896a4ef121927a1070c386a8c4a2ff10227e5
 NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

# Features
Authentication: Users can sign in using their email and password via NextAuth. JWT tokens manage user sessions.
Product Management: Products are fetched from Medusa's API and displayed on the frontend.
Cart System: Users can add products to their cart and proceed with checkout.

# Important Notes
Can't Use getServerSideProps
Since i am  using the App Router in Next.js, getServerSideProps isn’t available for data fetching. Instead, data like product listings and cart items are fetched on the client side using React hooks.

 # Known Limitations
Basic Error Handling: Error handling is done on the sign-in page, but it could be improved.
Session Expiration: Sessions are short-lived, and there's no refresh token mechanism yet.

 # Areas for Improvement
UI/UX: Add animations, loading states, and improve the overall look and feel.
State Management: Currently using React Context, but Redux might be a better choice for complex state.
Testing: Add unit and integration tests for authentication, cart management, and other key components.
SEO: Use Next.js' <Head> component for better SEO optimization, especially for product pages.

