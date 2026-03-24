export default function SkeletonListCard() {
    return (
        <div className="m-4 w-72 sm:w-80 rounded-xl bg-[#161b22] border border-gray-700/50 shadow-lg flex flex-col overflow-hidden relative animate-pulse p-6">
            
            {/* Top Badge Placeholder */}
            <div className="flex justify-between items-start mb-4">
                <div className="bg-gray-800/80 rounded py-1 px-3 w-16 h-6"></div>
            </div>
            
            {/* Title Placeholder */}
            <div className="h-8 bg-gray-800/80 rounded mb-2 w-3/4"></div>
            
            {/* Subtitle Placeholder */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm mb-6 flex-grow">
                <div className="h-4 bg-gray-700/50 rounded w-1/4"></div>
                <div className="h-4 bg-gray-800/80 rounded w-1/2"></div>
            </div>

            {/* Bottom Row Placeholder */}
            <div className="mt-auto border-t border-gray-700/50 pt-4 flex items-center justify-between">
                <div className="h-4 bg-gray-700/50 rounded w-1/3"></div>
                <div className="h-6 bg-gray-800/80 rounded w-8"></div>
            </div>
        </div>
    );
}
