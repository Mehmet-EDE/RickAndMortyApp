"use client";

import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";


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
      {/* <div className={`rsm:${false ? 'hidden' : 'block'}  sm:block md:block lg:block`}>
        <Sidebar hide={hide} />
      </div> */}
    </div>
  );
}

export default HomePage;
