export function TourPackageCardHomeSkeleton() {
  return (
    <div className="relative bg-white rounded-2xl overflow-hidden flex flex-col shadow-[0_2px_16px_rgba(0,0,0,0.07)]">
      {/* Image placeholder */}
      <div
        className="w-full animate-pulse bg-gray-200"
        style={{ aspectRatio: "16/9" }}
      />

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Title lines */}
        <div className="flex flex-col gap-2">
          <div className="h-3.5 bg-gray-200 rounded animate-pulse w-[90%]" />
          <div className="h-3.5 bg-gray-200 rounded animate-pulse w-[60%]" />
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col gap-1.5">
            <div className="h-2.5 bg-gray-200 rounded animate-pulse w-12" />
            <div className="h-5 bg-gray-200 rounded animate-pulse w-20" />
          </div>
          <div className="h-9 bg-gray-200 rounded-lg animate-pulse w-24" />
        </div>
      </div>
    </div>
  );
}
