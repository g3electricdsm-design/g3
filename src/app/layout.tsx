import type { Metadata } from "next";
import { Megrim, Montserrat, Raleway } from "next/font/google";
import "./globals.css";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const megrim = Megrim({
  variable: "--font-megrim",
  subsets: ["latin"],
  weight: "400",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://g3electricdsm.com'),
  title: {
    default: "G3 Electric | Licensed Electricians in Des Moines",
    template: "%s | G3 Electric Des Moines",
  },
  description: "Professional electrical services for homes and businesses in Des Moines, Iowa. Licensed electricians providing safe, dependable residential and commercial solutions.",
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "G3 Electric | Licensed Electricians in Des Moines",
    description: "Professional electrical services for homes and businesses in Des Moines, Iowa. Licensed electricians providing safe, dependable residential and commercial solutions.",
    type: "website",
    locale: "en_US",
    url: 'https://g3electricdsm.com',
    siteName: 'G3 Electric',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'G3 Electric - Licensed Electricians in Des Moines',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "G3 Electric | Licensed Electricians in Des Moines",
    description: "Professional electrical services for homes and businesses in Des Moines.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${megrim.variable} ${montserrat.variable} ${raleway.variable} antialiased`}
      >
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
