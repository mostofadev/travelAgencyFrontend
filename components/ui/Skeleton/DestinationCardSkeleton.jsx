export function DestinationCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Image */}
      <div className="w-full h-48 bg-gray-200 animate-pulse" />
      {/* Name */}
      <div className="p-4 flex justify-center">
        <div className="h-3.5 bg-gray-200 rounded animate-pulse w-20" />
      </div>
    </div>
  );
}
