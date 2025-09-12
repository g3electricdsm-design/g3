import type { Metadata } from "next";
import { Megrim, Montserrat, Raleway } from "next/font/google";
import "./globals.css";

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
  title: "Master Electricians Des Moines | G3 Electric - Licensed Electrical Services",
  description: "Licensed master electricians in Des Moines, IA. Professional residential & commercial electrical services, emergency repairs, lighting installation, and electrical panel upgrades. 24/7 emergency service available.",
  keywords: "master electrician Des Moines, electrical contractor Iowa, licensed electrician, electrical services, emergency electrical repair, electrical panel upgrade, lighting installation, commercial electrical, residential electrical",
  openGraph: {
    title: "Master Electricians Des Moines | G3 Electric - Licensed Electrical Services",
    description: "Licensed master electricians in Des Moines, IA. Professional residential & commercial electrical services, emergency repairs, lighting installation, and electrical panel upgrades.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Electricians Des Moines | G3 Electric",
    description: "Licensed master electricians in Des Moines, IA. Professional electrical services you can trust.",
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
        {children}
      </body>
    </html>
  );
}
