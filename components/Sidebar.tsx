
import Image from "next/image"
import Link from "next/link"

interface SidebarProps {
    hide?: boolean
}
function Sidebar({ hide }: SidebarProps) {
    if (hide) return (<div />)
    return (
        <div className={` w-[250px] rsm:z-50 rsm:absolute h-screen bg-[#06090f] border-r border-gray-800 sticky top-0 overflow-hidden flex flex-col items-center pt-10`}>
            <div className="w-40 h-40 bg-gray-900 rounded-full overflow-hidden relative shadow-2xl border-2 border-gray-800 transition-transform hover:scale-105 duration-300">
                <Image
                    src="/pp.png"
                    fill
                    className="object-cover"
                    alt="Profile" />
            </div>
            
            <ul className="mt-16 w-full flex flex-col items-center text-gray-300 font-semibold text-lg">
                <li className="w-full">
                    <Link href="/Characters" className="block w-full text-center py-4 tracking-[2px] transition-all duration-300 hover:bg-[#161b22] hover:text-green-500 hover:tracking-[4px] cursor-pointer border-l-4 border-transparent hover:border-green-500">
                        Characters
                    </Link>
                </li>
                <li className="w-full">
                    <Link href="/Episodes" className="block w-full text-center py-4 tracking-[2px] transition-all duration-300 hover:bg-[#161b22] hover:text-green-500 hover:tracking-[4px] cursor-pointer border-l-4 border-transparent hover:border-green-500">
                        Episodes
                    </Link>
                </li>
                <li className="w-full">
                    <Link href="/Locations" className="block w-full text-center py-4 tracking-[2px] transition-all duration-300 hover:bg-[#161b22] hover:text-green-500 hover:tracking-[4px] cursor-pointer border-l-4 border-transparent hover:border-green-500">
                        Locations
                    </Link>
                </li>
                <li className="w-full border-t border-gray-700/50 mt-2 pt-2">
                    <Link href="/Favorites" className="block w-full text-center py-4 tracking-[2px] transition-all duration-300 hover:bg-[#161b22] hover:text-red-500 hover:tracking-[4px] cursor-pointer border-l-4 border-transparent hover:border-red-500 text-gray-400">
                        Favorites
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