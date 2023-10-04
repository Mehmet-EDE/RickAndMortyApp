"use client";

import Sidebar from "@/components/Sidebar";
import Characters from "./Characters";


function HomePage() {
  
  return (
    <div className='w-full h-screen flex items-center justify-center ' >
      <div className={`rsm:${false ? 'hidden' : 'block'} rsm:z-[999] sm:z-[999] md:z-[999] lg:z-[999] sm:block md:block lg:block`}>
      <Sidebar/>
      </div>
      <div className="w-full z-50 bg-edeColor p-4 h-screen flex-wrap justify-center overflow-x-hidden rsm:overflow-y-scroll rmd:overflow-y-scroll rlg:overflow-y-scroll">
      <Characters/>
      </div>
    </div>
  );
}

export default HomePage;
