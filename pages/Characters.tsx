import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { client } from '@/lib/apollo';
import Image from 'next/image';

const GET_CHARACTERS = gql`
{
  characters {
    results {
      id
      name
      image
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
                <div className="w-48 h-64 bg-gray-300 rounded-3xl shadow-inner shadow-black flex items-center justify-center m-5 flex-col">
                    <div className='w-48 h-52 rounded-s-3xl rounded-e-3xl overflow-hidden'>
                        <Image className='-z-0' src={`${character.image}`}
                            width={300}
                            height={300}
                            objectFit='fill'
                            quality={100}
                            alt="" />
                    </div>
                    <p className='text-center text-black' key={character.id}>{character.name}</p>
                </div>
            ))}
        </div>
    )
}

export default CenterPage