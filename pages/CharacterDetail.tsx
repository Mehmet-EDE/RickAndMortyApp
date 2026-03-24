import { useRouter } from "next/router";
import { useQuery, gql } from '@apollo/client';
import { client } from '@/lib/apollo';
import Image from "next/image";
import Loading from "@/components/Loading";
import Link from "next/link";

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        dimension: string;
    };
    location: {
        id: number;
        name: string;
        dimension: string;
    };
    episode: {
        id: number;
        name: string;
    }[]
    image: string;
}
function CharacterDetail() {
    const router = useRouter();
    const paramValue = router.asPath.split('?')[1] || router.query.paramName;
    const GET_CHARACTER = gql`
    {
        character(id:"${paramValue}") {
           id
           name
           status
           species
           type
           gender
           origin {
             name
             dimension
           }
           location {
            id
             name
             dimension
           }
           episode{
            id
            name
          }
           image
         }
       }

`;
    const { loading, error, data } = useQuery<{ character: Character }>(GET_CHARACTER, {
        client,
        skip: !paramValue,
    });

    if (loading) return (
        <div className='flex justify-center flex-wrap items-center w-full'>
            <Loading />
        </div>
    );
    if (error) {
        console.error('GraphQL Error:', error);
        return <p>Error: {error.message}</p>;
    }

    const character = data?.character;

    if (!character) {
        return <p>Character not found</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[90vh] p-4 md:p-8">
            <div className="w-full max-w-5xl bg-[#161b22] border border-gray-700/50 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row">
                
                {/* Sol Taraftaki Gorsel ve Temel Bilgi Paneli */}
                <div className="md:w-2/5 relative bg-[#0d1117] flex flex-col items-center justify-center p-10 border-b md:border-b-0 md:border-r border-gray-700/50">
                    <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-gray-800 mb-8 transition-transform hover:scale-105 duration-500">
                        <Image
                            src={character.image}
                            alt={character.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-white text-center mb-4 tracking-tight">
                        {character.name}
                    </h1>
                    <div className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-full ${character.status === 'Alive' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : character.status === 'Dead' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-gray-500'}`}></span>
                        <span className="text-gray-300 text-lg font-semibold uppercase tracking-widest">{character.status}</span>
                    </div>
                </div>

                {/* Sag Taraftaki Detayli İstatistikler */}
                <div className="md:w-3/5 p-8 flex flex-col justify-center space-y-8">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="bg-[#0d1117] p-5 rounded-xl border border-gray-700/30 transition-colors hover:border-gray-500/50 hover:bg-[#121820]">
                            <span className="text-gray-400 text-xs uppercase tracking-widest font-bold block mb-1">Tür (Species)</span>
                            <span className="text-white font-medium text-xl">{character.species}</span>
                        </div>
                        <div className="bg-[#0d1117] p-5 rounded-xl border border-gray-700/30 transition-colors hover:border-gray-500/50 hover:bg-[#121820]">
                            <span className="text-gray-400 text-xs uppercase tracking-widest font-bold block mb-1">Cinsiyet (Gender)</span>
                            <span className="text-white font-medium text-xl">{character.gender}</span>
                        </div>
                        <div className="bg-[#0d1117] p-5 rounded-xl border border-gray-700/30 transition-colors hover:border-gray-500/50 hover:bg-[#121820]">
                            <span className="text-gray-400 text-xs uppercase tracking-widest font-bold block mb-1">Köken (Origin)</span>
                            <span className="text-white font-medium text-lg leading-tight block">{character.origin.name}</span>
                        </div>
                        <div className="bg-[#0d1117] p-5 rounded-xl border border-gray-700/30 transition-colors hover:border-gray-500/50 hover:bg-[#121820]">
                            <span className="text-gray-400 text-xs uppercase tracking-widest font-bold block mb-1">Son Konum (Location)</span>
                            {character.location.id ? (
                                <Link href={`/LocationDetail?id=${character.location.id}`} className="text-green-500 hover:text-green-400 font-medium text-lg leading-tight block transition-colors">
                                    {character.location.name}
                                </Link>
                            ) : (
                                <span className="text-white font-medium text-lg leading-tight block">{character.location.name}</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700/50 pb-3">Oynadığı Bölümler ({character.episode.length})</h3>
                        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {character.episode.map((item: { id: number; name: string }) => (
                                <Link 
                                    href={`/EpisodeDetail?id=${item.id}`} 
                                    key={item.id} 
                                    className="bg-[#0d1117] border border-gray-700/50 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:border-green-500 hover:text-green-400 transition-colors cursor-pointer shadow-sm block"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CharacterDetail