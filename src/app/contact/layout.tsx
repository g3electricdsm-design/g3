import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Free Electrical Estimates',
  description:
    'Get a free estimate for your electrical project in Des Moines. Contact G3 Electric for residential and commercial electrical services. Available 24/7 for emergencies.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact G3 Electric - Free Estimates in Des Moines',
    description:
      'Request a free quote for your electrical project. G3 Electric serves Des Moines homes and businesses with licensed, insured electricians.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
