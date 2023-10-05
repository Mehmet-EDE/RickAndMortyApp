import { useRouter } from "next/router";
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { client } from '@/lib/apollo';
import Image from "next/image";
import { Key } from "react";

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
    }
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

    if (loading) return <p>Loading...</p>;
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
                    <b className="text-2xl text-center">Name:</b>
                    <b className="card-title text-lg text-center font-semibold mt-2 p-2 "> {character.name} </b>
                </div>
                    <hr />
                <div className="mt-4 flex flex-wrap space-x-8">
                    <div className="flex-1">
                        <div className="text-center">
                            <b className="text-2xl text-center">Episodes With The Character</b>
                            {character.episode.slice(0, 5).map((item: { id: number; name: string }) => (
                                <div key={item.id}>
                                    <p className="text-xl text-center list-disc">{item.name}</p>
                                </div>
                            ))}
                            {character.episode.length > 5 && (
                                <div className="w-full">
                                    <p className="text-xl text-center">... Diğerleri</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-center">
                            <b className="text-2xl text-center">Location:</b>
                            <p className="text-xl text-center">{character.location.name}</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="text-center">
                            <b className="text-2xl text-center">Origin:</b>
                            <p className="text-xl text-center">{character.origin.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>




        // <div className="flex flex-col h-screen">
        //     <div className="flex items-center justify-around w-full">
        //         <div>
        //             <b className="text-2xl">Name : </b>
        //             <b className="card-title text-lg font-semibold mt-3"> {character.name} </b>
        //         </div>
        //         <Image
        //             src={character.image}
        //             width={500}
        //             height={500}
        //             objectFit="cover"
        //             alt=''
        //         />
        //     </div>

        //     <div className="flex-4/5 flex flex-row justify-around p-4">
        //         <div className="flex-1/2">


        //             <div className="w-full bg-gray-200 p-4 rounded-lg shadow-lg mb-4 text-center">
        //                 <b className="text-2xl text-black">Episodes With The Character </b>
        //                 {character.episode.slice(0, 5).map((item: { id: number; name: string }) => (
        //                     <div key={item.id} >
        //                         <p className="text-black text-xl text-center list-disc">{item.name}</p>
        //                     </div>
        //                 ))}
        //                 {character.episode.length > 5 && (
        //                     <div className="w-full">
        //                         <p className="text-black text-xl text-center">... Diğerleri</p>
        //                     </div>
        //                 )}
        //             </div>
        //         </div>
        //         <div className="flex-4/5 bg-gray-200 p-4 rounded-lg h-fit shadow-lg">
        //             <div style={{ height: '3rem' }}>
        //                 <b className="mt-4 text-gray-500 text-lg">Last Known Location :</b>
        //                 <p className="text-black text-xl text-center list-disc overflow-hidden overflow-ellipsis" style={{ height: '100%' }}>
        //                     {character.location.name}
        //                 </p>
        //             </div>
        //         </div>


        //         <div className="flex-1/2">
        //             <div className="w-full bg-gray-200 p-4 rounded-lg shadow-lg mb-4">
        //                 <div style={{ height: '3rem' }}>
        //                     <b className="mt-4 text-gray-500 text-lg">Character's Dimension :</b>
        //                     <p className="text-black text-xl text-center list-disc overflow-hidden overflow-ellipsis" style={{ height: '100%' }}>
        //                         {character.location.dimension}
        //                     </p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default CharacterDetail