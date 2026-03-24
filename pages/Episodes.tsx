import { useQuery, gql } from '@apollo/client';
import { client } from '@/lib/apollo';
import EpisodeCard from '@/components/EpisodeCard';
import SkeletonListCard from '@/components/SkeletonListCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GET_EPISODES = gql`
{
  episodes {
    results {
      id
      name
      air_date
      episode
      characters {
        id
      }
    }
  }
}
`;

interface EpisodeItem {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: { id: string }[];
}

export default function Episodes() {
  const { loading, error, data } = useQuery(GET_EPISODES, { client });

  if (loading) return (
    <div className='flex justify-center flex-wrap p-4 md:p-8 gap-4 w-full'>
      {Array.from({ length: 12 }).map((_, idx) => (
        <SkeletonListCard key={idx} />
      ))}
    </div>
  );

  if (error) {
    console.error('GraphQL Error:', error);
    toast.error(`${error.message}`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    return <p className="text-white text-center mt-10">Bölümler yüklenirken hata oluştu.</p>;
  }

  const episodes = data.episodes.results;

  return (
    <div className='flex justify-center flex-wrap p-4 md:p-8 gap-4 rsm:items-center'>
      {episodes.map((ep: EpisodeItem) => (
        <EpisodeCard
          key={ep.id}
          episodeId={ep.id}
          name={ep.name}
          episode={ep.episode}
          air_date={ep.air_date}
          characterCount={ep.characters.length}
        />
      ))}
    </div>
  );
}
