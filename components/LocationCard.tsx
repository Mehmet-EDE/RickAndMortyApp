import { useRouter } from "next/router";

interface LocationCardProps {
    locationId: string;
    name: string;
    type: string;
    dimension: string;
    residentCount: number;
}

const LocationCard = ({ locationId, name, type, dimension, residentCount }: LocationCardProps) => {
    const router = useRouter()
    const handleCardClick = () => {
        router.push(`/LocationDetail?id=${locationId}`);
    };
    return (
        <div onClick={handleCardClick} className="m-4 w-72 sm:w-80 cursor-pointer rounded-xl bg-[#161b22] border border-gray-700/50 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-green-500/50 hover:shadow-[0_8px_30px_rgba(34,197,94,0.2)] flex flex-col overflow-hidden p-6 group relative">
            <div className="flex justify-between items-start mb-4">
                <span className="bg-[#0d1117] border border-green-500/30 text-green-400 font-bold py-1 px-3 rounded-md text-xs uppercase tracking-wider group-hover:border-green-400 transition-colors">
                    {type}
                </span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2 line-clamp-2" title={name}>
                {name}
            </h2>
            
            <p className="text-gray-400 text-sm mb-6 flex-grow">
                Boyut: <span className="text-gray-200">{dimension !== 'unknown' ? dimension : 'Bilinmeyen Boyut'}</span>
            </p>

            <div className="mt-auto border-t border-gray-700/50 pt-4 flex items-center justify-between">
                <span className="text-gray-400 text-xs uppercase tracking-wide font-semibold">Yaşayan</span>
                <span className="text-white font-medium text-lg">{residentCount}</span>
            </div>
        </div>
    );
};

export default LocationCard;
