"use client";

import Sidebar from "@/components/Sidebar";
import Characters from "./Characters";
import { useEffect, useState } from "react";
import Hamburger from "@/components/Hamburger/Hamburger";


function HomePage() {
  const [hide, setHide] = useState(false)
  useEffect(() => {
    var wWidth = window.innerWidth
    if (wWidth <= 670) {
      setHide(false)
    } else {
      setHide(false)
    }
  }, [])
  return (
    <div className='w-full h-screen flex items-center justify-center ' >
      <div className={`rsm:${false ? 'hidden' : 'block'}  sm:block md:block lg:block`}>
        <Sidebar hide={hide} />
      </div>
        <Hamburger hideValue={setHide} />
      <div className="w-full z-50 bg-edeColor p-4 h-screen flex-wrap justify-center overflow-x-hidden rsm:overflow-y-scroll rmd:overflow-y-scroll rlg:overflow-y-scroll">
        <Characters />
      </div>
    </div>
  );
}

export default HomePage;
