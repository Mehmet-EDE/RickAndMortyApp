export default function SkeletonCard() {
    return (
        <div className="m-4 w-72 sm:w-80 rounded-xl bg-[#161b22] border border-gray-700/50 shadow-lg flex flex-col overflow-hidden relative animate-pulse">
            {/* Image Placeholder */}
            <div className="w-full h-[220px] bg-gray-800/50"></div>
            
            {/* Content Placeholder */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <div className="h-8 bg-gray-800/80 rounded mb-3 w-3/4"></div>
                
                <div className="flex flex-col space-y-3 mb-4 flex-grow mt-2">
                    <div>
                        {/* Subtitle Label */}
                        <div className="h-3 bg-gray-700/50 rounded w-1/3 mb-2"></div>
                        {/* Subtitle Value */}
                        <div className="h-6 bg-gray-800/80 rounded w-12 mt-1"></div>
                    </div>
                </div>

                <div className="mt-auto border-t border-gray-700/50 pt-3">
                    {/* Location Label */}
                    <div className="h-3 bg-gray-700/50 rounded w-1/2 mb-2"></div>
                    {/* Location Value */}
                    <div className="h-5 bg-gray-800/80 rounded w-5/6"></div>
                </div>
            </div>
        </div>
    );
}
