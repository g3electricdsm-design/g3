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
  weight: ["400", "500", "600", "700"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "G3 Electric | Licensed Electricians in Des Moines",
  description: "Professional electrical services for homes and businesses. Safety and reliability you can trust.",
  openGraph: {
    title: "G3 Electric | Licensed Electricians in Des Moines",
    description: "Professional electrical services for homes and businesses. Safety and reliability you can trust.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "G3 Electric",
    description: "Professional electrical services you can trust.",
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
