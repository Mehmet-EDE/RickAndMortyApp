
import Image from "next/image"
import Link from "next/link"

interface SidebarProps {
    hide?: boolean
}
function Sidebar({ hide }: SidebarProps) {
    if (hide) return (<div />)
    return (
        <div className={` w-[250px] rsm:z-50 rsm:absolute  h-screen bg-black sticky top-0 overflow-hidden flex items-start justify-center`}>
            <div className=" rsm:w-[950px]  w-24 h-24  bg-red overflow-hidden "
            >
                <Image
                    src="/pp.png"
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