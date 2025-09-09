import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-earle-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-megrim text-6xl text-white mb-4">404</h1>
        <h2 className="font-montserrat text-2xl text-white-smoke mb-6">Page Not Found</h2>
        <p className="font-raleway text-white-smoke mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn-primary"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
