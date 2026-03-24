import { useRouter } from "next/router";
import { useQuery, gql } from '@apollo/client';
import { client } from '@/lib/apollo';
import Loading from "@/components/Loading";
import Card from "@/components/Card";

interface EpisodeCharacter {
  id: string;
  name: string;
  image: string;
  location: { name: string };
  episode: { id: string }[];
}

export default function EpisodeDetail() {
    const router = useRouter();
    
    let paramValue = router.query.id as string;
    if (!paramValue && router.asPath.includes('?')) {
        const queryStr = router.asPath.split('?')[1];
        paramValue = new URLSearchParams(queryStr).get('id') || queryStr;
    }
    
    const GET_EPISODE = gql`
      query GetEpisode($id: ID!) {
        episode(id: $id) {
            id
            name
            air_date
            episode
            characters {
                id
                name
                image
                location {
                    name
                }
                episode {
                    id
                }
            }
        }
    }
    `;

    const { loading, error, data } = useQuery(GET_EPISODE, {
        client,
        variables: { id: paramValue },
        skip: !paramValue,
    });

    if (loading) return (
        <div className='flex justify-center flex-wrap items-center w-full min-h-[50vh]'>
            <Loading />
        </div>
    );
    
    if (error) {
        return <p className="text-white text-center mt-10">Bölüm yüklenirken hata oluştu: {error.message}</p>;
    }

    const episodeData = data?.episode;

    if (!episodeData) {
        return null;
    }

    return (
        <div className="flex flex-col items-center w-full min-h-screen p-4 md:p-8">
            {/* Episode Header */}
            <div className="w-full max-w-5xl bg-[#161b22] border border-gray-700/50 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-10 mb-10 flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-green-600 via-green-400 to-green-600"></div>
                <span className="bg-[#0d1117] border border-green-500/50 text-green-400 font-bold py-1.5 px-5 rounded-full text-sm uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                    {episodeData.episode}
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-white text-center mb-4 tracking-tight">
                    {episodeData.name}
                </h1>
                <p className="text-gray-400 text-lg font-medium">Yayın Tarihi: <span className="text-gray-200">{episodeData.air_date}</span></p>
                <div className="mt-8 flex items-center space-x-3 bg-[#0d1117] px-6 py-3 rounded-xl border border-gray-800">
                    <span className="text-gray-400 text-sm uppercase tracking-widest font-bold">Oynayan Karakter:</span>
                    <span className="text-green-400 font-black text-2xl">{episodeData.characters.length}</span>
                </div>
            </div>

            {/* Characters Grid */}
            <div className="w-full max-w-7xl">
                <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-700/50 pb-4 inline-block">Bu Bölümdeki Karakterler</h2>
                <div className='flex justify-center md:justify-start flex-wrap gap-4'>
                    {episodeData.characters.map((char: EpisodeCharacter) => (
                        <Card
                            key={char.id}
                            cardId={char.id}
                            title={char.name}
                            episode={char.episode.length}
                            location={char.location.name}
                            imageUrl={char.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
