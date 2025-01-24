export const SkeletonLoader = () => (
    <div className="relative bg-[#F8F9FB] rounded-lg p-4 h-full">
      <div className="absolute top-2 left-4 bg-white text-black py-1 px-2 rounded text-xs flex items-center gap-2">
        <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse" />
        <div className="w-12 h-4 bg-gray-300 animate-pulse" />
      </div>
      <div className="flex justify-center">
        <div className="w-40 h-40 bg-gray-300 animate-pulse rounded-lg" />
      </div>
    </div>
  );