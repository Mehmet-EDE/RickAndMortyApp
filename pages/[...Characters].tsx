import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { client } from '@/lib/apollo';
import Card from '@/components/Card';
import Loading from '@/components/Loading';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GET_CHARACTERS = gql`
{
    characters {
      results {
        id
        name
        image
        location {
          id
          name
          
        }
        episode {
          id
          name
        }
      }
    }
  }
`;
function CenterPage() {
  const { loading, error, data } = useQuery(GET_CHARACTERS, { client });

  if (loading) return(
    <div className='flex justify-center flex-wrap items-center w-full'>
      <Loading />
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
      progress: undefined,
      theme: "dark",
      });
    return <p>Bİr Hata Oluştu</p>;
  }

  const characters = data.characters.results;


  return (
    <div className='flex justify-between flex-wrap bg-black rsm:items-center rsm:justify-center'>
      {characters.map((character: any) => (
        <Card
          cardId={character.id.toString()}
          key={character.id}
          title={character.name}
          episode={character.episode.length}
          location={character.location.name}
          imageUrl={character.image}
        />
      ))}
    </div>
  )
}

export default CenterPage