export default function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen bg-earle-black">
      <div className="bg-gradient-to-br from-purple to-phlox text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-12 bg-white/20 rounded animate-pulse mb-4 w-48"></div>
          <div className="h-8 bg-white/20 rounded animate-pulse mb-4 w-64"></div>
          <div className="h-6 bg-white/20 rounded animate-pulse w-96"></div>
        </div>
      </div>
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="aspect-video bg-gray-300 rounded-lg animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded animate-pulse w-48"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-5/6"></div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white-smoke rounded-lg p-6 space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded animate-pulse w-20"></div>
                    <div className="h-6 bg-gray-300 rounded animate-pulse w-32"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


