export default function LoadingShimmer({ count = 3 }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-full h-24 rounded-lg bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  );
}
