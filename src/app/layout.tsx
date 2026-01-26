import type { Metadata } from "next";
import "./globals.css";

import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://the-founders-handbook.com'),
  title: {
    default: 'The Founders Handbook - Complete Startup Guide for Indian Founders',
    template: '%s | The Founders Handbook'
  },
  description: 'Comprehensive startup handbook for Indian founders. Learn fundraising (Pre-Seed to Series A), product development, financial metrics, and legal compliance. All values in INR with India-specific insights.',
  keywords: [
    'Indian startup handbook',
    'startup fundraising India',
    'iSAFE notes India',
    'Pre-seed funding India',
    'Series A funding India',
    'SaaS metrics',
    'startup valuation India',
    'Indian SaaS ecosystem',
    'product-market fit',
    'customer acquisition cost',
    'burn rate calculator',
    'cap table India',
    'startup legal India',
    'FEMA regulations',
    'startup compliance India',
    'pitch deck guide',
    'financial metrics',
    'dilution calculator',
    'Indian startup investors',
    'Sequoia India',
    'Accel India',
    'Peak XV',
    'founder resources India',
    'startup calculators INR'
  ],
  authors: [{ name: 'Easyio Technologies', url: 'https://easyio.tech' }],
  creator: 'Easyio Technologies',
  publisher: 'Easyio Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'The Founders Handbook',
    title: 'The Founders Handbook - Complete Startup Guide for Indian Founders',
    description: 'Comprehensive startup handbook covering fundraising, product development, financial metrics & legal compliance for Indian founders. All values in INR.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Founders Handbook - Startup Guide for Indian Founders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Founders Handbook - Complete Startup Guide for Indian Founders',
    description: 'Learn fundraising (Pre-Seed to Series A), product development & financial metrics. India-focused with INR calculations.',
    images: ['/og-image.png'],
    creator: '@easyiotech',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: '/',
  },
  category: 'Business & Startups',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <StructuredData />

        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}

      </body>
    </html>
  );
}
