import { useFavorites } from '@/hooks/useFavorites';
import Card from '@/components/Card';
import SkeletonCard from '@/components/SkeletonCard';

export default function Favorites() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) return (
    <div className='flex justify-center flex-wrap p-4 md:p-8 gap-4 w-full max-w-[1600px] mt-20'>
      {Array.from({ length: 8 }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );

  return (
    <div className='flex flex-col items-center w-full min-h-screen'>
      
      {/* Header */}
      <div className="w-full max-w-5xl px-4 py-8 flex flex-col items-center relative z-10 pt-12">
         <h1 className="text-4xl text-white font-black mb-4 tracking-tight drop-shadow-lg text-center">Favori Karakterlerim</h1>
         <p className="text-gray-400 font-medium">Beğendiğiniz tüm karakterler sadece size özel, tarayıcı belleğinizde şifreli olarak saklanır.</p>
      </div>

      <div className='flex justify-center flex-wrap p-4 md:p-8 gap-4 rsm:items-center w-full max-w-[1600px]'>
        {favorites.length === 0 ? (
          <div className="text-gray-400 text-base md:text-xl font-medium mt-10 text-center flex flex-col items-center gap-4 bg-[#161b22] p-10 rounded-2xl border border-gray-700/50 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-600 mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            Henüz favoriye aldığınız bir karakter bulunmuyor.<br/>
            Karakter kartlarının sağ üstündeki kalp simgesine tıklayarak arşivinize ekleyebilirsiniz.
          </div>
        ) : (
          favorites.map((character) => (
            <Card
              cardId={character.id}
              key={character.id}
              title={character.title}
              episode={character.episode}
              location={character.location}
              imageUrl={character.imageUrl}
            />
          ))
        )}
      </div>
    </div>
  )
}
