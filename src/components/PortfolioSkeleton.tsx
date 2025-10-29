export default function PortfolioSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`bg-gray-300 animate-pulse rounded-lg ${
            index === 0 ? 'md:col-span-3 md:row-span-2' : 'md:col-span-1 md:row-span-1'
          }`}
        />
      ))}
    </div>
  );
}


