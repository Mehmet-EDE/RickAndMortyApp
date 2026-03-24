import Image from "next/image";
import { useRouter } from "next/router";
import { useFavorites } from "@/hooks/useFavorites";

interface CardProps {
    cardId: string;
    title: string;
    episode: number;
    location: string;
    imageUrl: string;
}

const Card = ({ cardId, title, episode, location, imageUrl }: CardProps) => {
    const router = useRouter()
    const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

    // Check if favorited
    const isFav = isFavorite(cardId);

    const handleCardClick = () => {
        router.push(`/CharacterDetail?${cardId}`);
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite({
            id: cardId,
            title,
            episode,
            location,
            imageUrl
        });
    };

    return (
        <div id={cardId} onClick={handleCardClick} className="m-4 w-72 sm:w-80 cursor-pointer rounded-xl bg-[#161b22] border border-gray-700/50 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-green-500/50 hover:shadow-[0_8px_30px_rgba(34,197,94,0.2)] flex flex-col overflow-hidden relative group">

            {/* Heart Icon (Favori Butonu) */}
            {isLoaded && (
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 shadow-lg backdrop-blur-md border border-gray-600/50 hover:scale-110 hover:bg-black/80 transition-all duration-300 group-hover:opacity-100 opacity-80"
                    aria-label="Favorilere Ekle"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill={isFav ? "#EF4444" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={isFav ? "#EF4444" : "currentColor"} className={`w-6 h-6 ${isFav ? 'text-red-500' : 'text-white'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>
            )}

            <div className="relative w-full h-[220px]">
                <Image className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' src={`${imageUrl}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority={false}
                    alt={title} />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-white mb-3 truncate" title={title}>
                    {title}
                </h2>

                <div className="flex flex-col space-y-3 mb-4 flex-grow">
                    <div>
                        <span className="text-gray-400 text-sm uppercase tracking-wide font-semibold">Bölüm Sayısı</span>
                        <div className="flex items-center mt-1">
                            <span className="bg-gray-800 text-green-400 font-bold py-1 px-3 rounded-md text-sm">{episode}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto border-t border-gray-700/50 pt-3">
                    <span className="text-gray-400 text-xs uppercase tracking-wide font-semibold">Son Bilinen Konum</span>
                    <p className="text-gray-200 text-base font-medium mt-1 truncate" title={location}>
                        {location}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
