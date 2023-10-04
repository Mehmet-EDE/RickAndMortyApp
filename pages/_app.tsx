import Sidebar from '@/components/Sidebar';
import '../app/globals.css';
import type { AppProps } from 'next/app'
 
export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="flex">
          <Sidebar /> 
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
        </div>
      );
}