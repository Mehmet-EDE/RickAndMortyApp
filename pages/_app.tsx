import Sidebar from '@/components/Sidebar';
import '../app/globals.css';
import { useEffect, useState } from "react";
import type { AppProps } from 'next/app';
import Hamburger from '@/components/Hamburger';

export default function Home({ Component, pageProps }: AppProps) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const wWidth = window.innerWidth;
      if (wWidth <= 670) {
        setHide(true);
      } else {
        setHide(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex">
      <div className="sticky top-0 h-screen">
        <Sidebar hide={hide} />
      </div>
      <div className={`rsm:${false ? 'hidden' : 'block'} fixed top-0 p-2 right-3`}>
        <Hamburger hideValue={setHide} />
      </div>
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
