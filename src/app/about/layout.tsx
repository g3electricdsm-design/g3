import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Des Moines Electricians',
  description:
    'G3 Electric was founded in 2022 to provide safe, reliable, and affordable electrical services in Des Moines, Iowa. Learn about our mission, values, and commitment to quality.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About G3 Electric - Des Moines Electricians',
    description:
      'Learn about G3 Electric — licensed electricians serving Des Moines with safe, dependable residential and commercial electrical services since 2022.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
