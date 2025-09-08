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
  title: "G3 Electric - Safe & Dependable Electrical Services",
  description: "Professional electrical services for residential and commercial projects. Safety and dependability you can trust.",
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
