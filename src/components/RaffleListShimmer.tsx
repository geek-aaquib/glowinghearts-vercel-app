// components/raffle-page-skeleton.tsx
export default function RafflePageSkeleton() {
  return (
    <main className="overflow-hidden bg-white">
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mb-10 shimmer h-10 w-2/3 rounded" />
        <div className="lg:grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-16">
          <div className="lg:col-span-5 shimmer h-64 w-full rounded-lg mb-6" />
          <div className="lg:col-span-2 space-y-4">
            <div className="shimmer h-24 w-full rounded-xl" />
            <div className="shimmer h-12 w-full rounded" />
            <div className="shimmer h-10 w-full rounded" />
            <div className="shimmer h-16 w-full rounded" />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="shimmer h-24 w-full rounded-xl" />
          ))}
        </div>

        <div className="mt-16 space-y-4">
          <div className="shimmer h-10 w-1/3 rounded" />
          <div className="shimmer h-6 w-full rounded" />
          <div className="shimmer h-6 w-3/4 rounded" />
          <div className="shimmer h-6 w-2/3 rounded" />
        </div>
      </div>
    </main>
  )
}
