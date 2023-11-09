import Image from "next/image";
import { useRouter } from "next/router";
interface CardProps {
    cardId: string;
    title: string;
    episode: number;
    location: string;
    imageUrl: string;
}

const Card = ({ cardId, title, episode, location, imageUrl }: CardProps) => {
    const router = useRouter()
    const handleCardClick = () => {
        router.push(`/CharacterDetail?${cardId}`);
    };
    return (
        <div id={cardId} onClick={handleCardClick} className="m-5 p-5 w-72 cursor-pointer min-h-[370px] rounded-lg bg-gray-800 shadow-lg transition-transform duration-400 hover:-translate-y-1">
            <div className="h3/4 min-h-3/5 bg-gray-800 rounded-md">
                <Image className='w-full cursor-pointer' src={`${imageUrl}`}
                    width={175}
                    height={170}
                    objectFit='fill'
                    quality={100}
                    alt="" />
            </div>
            <div>
                <div>

                    <b className="text-2xl text-white">Name : </b>
                    <b className="card-title text-white text-lg font-semibold mt-3"> {title} </b>
                </div>
                <div>
                    <b className="text-2xl text-white">Number Of Episodes </b>
                    <p className=" text-white text-xl text-center">
                        {episode}
                    </p>
                </div>
                <div>
                    <p className="footer float-right mt-4 text-gray-500 text-lg">
                        Last Known Location: <span className="text-white font-bold"> {location} </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
