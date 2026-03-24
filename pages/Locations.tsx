import { useEffect, useRef, useCallback, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { client } from '@/lib/apollo';
import LocationCard from '@/components/LocationCard';
import SkeletonListCard from '@/components/SkeletonListCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GET_LOCATIONS = gql`
  query GetLocations($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      info {
        next
      }
      results {
        id
        name
        type
        dimension
        residents {
          id
        }
      }
    }
  }
`;

interface LocationItem {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: { id: string }[];
}

export default function Locations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filterParams: any = {};
  if (debouncedSearchTerm) filterParams.name = debouncedSearchTerm;

  const { loading, error, data, fetchMore } = useQuery(GET_LOCATIONS, { 
    client,
    variables: { 
      page: 1,
      filter: Object.keys(filterParams).length > 0 ? filterParams : undefined
    },
    notifyOnNetworkStatusChange: true,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const nextLoadingRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && data?.locations?.info?.next && !loading) {
      fetchMore({
        variables: {
          page: data.locations.info.next,
          filter: Object.keys(filterParams).length > 0 ? filterParams : undefined
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            locations: {
              ...fetchMoreResult.locations,
              results: [
                ...prev.locations.results,
                ...fetchMoreResult.locations.results,
              ],
            },
          };
        },
      });
    }
  }, [loading, data, fetchMore, filterParams]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "100px",
      threshold: 0
    };
    
    observerRef.current = new IntersectionObserver(handleObserver, option);
    if (nextLoadingRef.current) observerRef.current.observe(nextLoadingRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver]);

  if (error) {
    console.error('GraphQL Error:', error);
    toast.error(`${error.message}`, {
      position: "bottom-center",
      autoClose: 5000,
      theme: "dark",
    });
  }

  const locations = data?.locations?.results || [];
  const isInitialLoading = loading && locations.length === 0;

  return (
    <div className='flex flex-col items-center w-full min-h-screen'>
      
      {/* Search Header */}
      <div className="w-full max-w-5xl px-4 py-8 flex flex-col items-center relative z-10 pt-12">
         <h1 className="text-4xl text-white font-black mb-8 tracking-tight drop-shadow-lg text-center">Gezegen ve Mekan Arşivi</h1>
         <div className="flex flex-col md:flex-row w-full gap-4 relative">
            <input 
              type="text" 
              placeholder="Bir mekan arayın... (Örn: Earth)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow bg-[#161b22] border border-gray-700/50 text-white rounded-xl px-6 py-4 focus:outline-none focus:border-green-500 transition-all shadow-lg placeholder-gray-500 font-medium"
            />
         </div>
      </div>

      {isInitialLoading ? (
        <div className='flex justify-center flex-wrap p-4 md:p-8 gap-4 w-full max-w-[1600px]'>
          {Array.from({ length: 8 }).map((_, idx) => (
            <SkeletonListCard key={idx} />
          ))}
        </div>
      ) : (
        <>
          <div className='flex justify-center flex-wrap p-4 md:p-8 gap-4 rsm:items-center w-full max-w-[1600px]'>
            {locations.length === 0 && !loading && (
              <div className="text-gray-400 text-xl font-medium mt-10 text-center">
                Aradığınız mekan bulunamadı.
              </div>
            )}
            {locations.map((loc: LocationItem) => (
              <LocationCard
                key={loc.id}
                locationId={loc.id}
                name={loc.name}
                type={loc.type}
                dimension={loc.dimension}
                residentCount={loc.residents.length}
              />
            ))}
          </div>
          
          {/* Intersection Observer Sensor Div */}
          <div ref={nextLoadingRef} className="w-full flex justify-center py-8">
            {loading && data ? (
              <div className="flex items-center space-x-2 text-green-500 font-bold">
                <span className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></span>
                <span>Daha Fazla Mekan Yükleniyor...</span>
              </div>
            ) : data?.locations?.info?.next === null && locations.length > 0 ? (
              <p className="text-gray-500 font-medium">Tüm mekanlar listelendi ({locations.length})</p>
            ) : null}
          </div>
        </>
      )}
    </div>
  )
}
