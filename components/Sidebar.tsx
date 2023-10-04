
import Image from "next/image"
import Link from "next/link"
function Sidebar() {
    return (
        <div
            className="w-[250px] h-screen bg-black relative overflow-hidden flex items-start justify-center">
            <div
                className="w-24 h-24 rounded-full bg-red overflow-hidden z-20 mt-14 border-[5px] border-white"
            >
                <Image src="/pp.png"
                    layout="fill"
                    objectFit="cover"
                    alt="" />
            </div>
            <ul className="absolute top-72 left-5 items-center justify-center text-black z-20 p-2 font-bold text-xl">
                <li className="flex items-center tracking-[3px] mb-5 transition-all translate-x-3 duration-300 hover:translate-x-5 text-center hover:text-green-600 cursor-pointer">
                    <Link href="/Characters">
                    Characters
                    </Link>
                </li>
                <li className="flex w-full items-center tracking-[3px] flex-nowrap mb-5 transition-all translate-x-3 duration-300 hover:translate-x-5 text-center hover:text-green-600 cursor-pointer">
                <Link href="/Locations">
                    Locations
                </Link>
                </li>
            </ul>
            <ul className="absolute flex bottom-0 left-10 text-white text-xs z-20 p-2">
                <li
                    className="flex items-center tracking-[3px] transition-all duration-300 hover:scale-110 hover:text-green-600 cursor-pointer mr-2"
                >
                </li>
                <li
                    className="flex items-center tracking-[3px] transition-all duration-300 hover:scale-110 hover:text-green-600 cursor-pointer mr-2"
                >
                </li>
            </ul>
        </div>
    )
}

export default Sidebar