import type { Metadata } from "next";
import {  Montserrat } from "next/font/google";
import Head from "next/head"; 
import "./globals.css";


const geistSans = Montserrat({ subsets: ["cyrillic"], weight: ["400", "700", "800"] });


export const metadata: Metadata = {
  title: "Medusa E-commerce: Next.js Powered Online Store",
  description: "A modern, fully-featured e-commerce app built with Next.js, Medusa Cloud, and seamless user authentication.",
  keywords: "Next.js, Medusa, e-commerce, online store, SEO, web development, authentication, cloud-based app",
  authors: [{ name: "Your Name", url: "https://your-website-url.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-website-url.com",
    title: "Medusa E-commerce: Next.js Powered Online Store",
    description: "A modern, fully-featured e-commerce app built with Next.js, Medusa Cloud, and seamless user authentication.",
    images: "https://your-website-url.com/og-image.jpg",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "Medusa E-commerce: Next.js Powered Online Store",
    description: "A modern, fully-featured e-commerce app built with Next.js, Medusa Cloud, and seamless user authentication.",
    images: "https://your-website-url.com/twitter-image.jpg",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" /> 
        <link rel="icon" href="/favicon.ico" /> 
        <meta name="description" content={metadata.description ?? ''} /> 
      </Head>
      <body className={`${geistSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
