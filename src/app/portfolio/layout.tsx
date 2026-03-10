import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work - Electrical Project Portfolio',
  description:
    'Browse completed residential and commercial electrical projects by G3 Electric in Des Moines. See our craftsmanship in lighting, panel upgrades, wiring, and more.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'G3 Electric Portfolio - Completed Electrical Projects',
    description:
      'View our portfolio of residential and commercial electrical projects in Des Moines, Iowa.',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
