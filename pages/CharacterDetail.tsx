import { useRouter } from "next/router";
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { client } from '@/lib/apollo';
import Image from "next/image";
import { Key } from "react";
import Loading from "@/components/Loading";

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
        character(id:${paramValue}) {
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
        <div className="flex items-center justify-center w-full flex-wrap">
            <div className="m-5 p-5 w-2/4 cursor-pointer rounded-lg bg-gray-800 shadow-lg">
                <div className="h-1/4 min-h-3/5 bg-gray-800 flex justify-center items-center rounded-md">
                    <Image
                        className="w-96"
                        width={300}
                        height={300}
                        src={character.image}
                        quality={100}
                        alt=""
                    />
                </div>
                <div className="flex items-center justify-center">
                    <b className="text-2xl text-white text-center">Name:</b>
                    <b className=" text-white text-lg text-center font-semibold mt-2 p-2 "> {character.name} </b>
                </div>
                <hr />
                <div className="mt-4 flex flex-wrap space-x-8">
                    <div className="flex-1">
                        <div className="text-center">
                            <b className="text-2xl text-white text-center">Episodes With The Character</b>
                            {character.episode.slice(0, 5).map((item: { id: number; name: string }) => (
                                <div key={item.id}>
                                    <p className="text-xl text-white text-center list-disc">{item.name}</p>
                                </div>
                            ))}
                            {character.episode.length > 5 && (
                                <div className="w-full">
                                    <p className="text-xl text-white text-center">... Diğerleri</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-center">
                            <b className="text-2xl text-white text-center">Location:</b>
                            <p className="text-xl text-white text-center">{character.location.name}</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-center">
                            <b className="text-2xl text-white text-center">Origin:</b>
                            <p className="text-xl text-white text-center">{character.origin.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterDetail