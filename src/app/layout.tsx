import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AffiliateForge - Build Stunning Affiliate Websites for Free",
  description: "Create professional affiliate marketing websites with our intuitive drag-and-drop builder. Choose from premium templates, manage links, track performance - all for free.",
  keywords: "affiliate marketing, website builder, drag and drop, free website, affiliate links, templates",
  authors: [{ name: "AffiliateForge Team" }],
  openGraph: {
    title: "AffiliateForge - Build Stunning Affiliate Websites for Free",
    description: "Create professional affiliate marketing websites with our intuitive drag-and-drop builder. Choose from premium templates, manage links, track performance - all for free.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AffiliateForge - Build Stunning Affiliate Websites for Free",
    description: "Create professional affiliate marketing websites with our intuitive drag-and-drop builder. Choose from premium templates, manage links, track performance - all for free.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}