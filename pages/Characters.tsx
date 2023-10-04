"use client"
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { client } from '@/lib/apollo';
import Card from '@/components/Card';

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

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error('GraphQL Error:', error);
        return <p>Error: {error.message}</p>;
    }

    const characters = data.characters.results;


    return (
        <div className='flex justify-between flex-wrap bg-black'>
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