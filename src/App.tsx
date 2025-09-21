import {
  query,
  startAfter,
  limitToFirst,
  orderByKey,
  onValue,
  ref,
} from "firebase/database";
import { useCallback, useEffect, useRef, useState } from "react";
import { db } from "./utils";
import HotelCard from "./components/HotelCard";
import type { IHotelData } from "./types";
const limit = 5;
function App() {
  const [hotels, setHotels] = useState<IHotelData[]>([]);
  const [lastItmKey, setLastItemKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // console.log("Database URL:", import.meta.env.VITE_DATABASE_URL);
  // console.log("Project ID:", import.meta.env.VITE_PROJECT_ID);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const loadHotels = useCallback(
    (after?: string) => {
      if (loading) return;
      setLoading(true);
      const queryConstraints = [limitToFirst(limit), orderByKey()];

      if (after) {
        queryConstraints.push(startAfter(after));
      }

      const hotelQuery = query(ref(db, "hotels"), ...queryConstraints);
      onValue(hotelQuery, (snapshoot) => {
        if (snapshoot.exists()) {
          const hotelsKey = Object.keys(snapshoot.val());
          setLastItemKey(hotelsKey[hotelsKey.length - 1]);
          const hotelsData = Object.values(snapshoot.val()) as IHotelData[];
          setHotels((prev) =>
            after ? [...prev, ...hotelsData] : [...hotelsData]
          );
        }
        setLoading(false);
      });
    },
    [loading]
  );
  useEffect(() => {
    loadHotels();
    // const query = ref(db, "hotels");
    // onValue(query, (snapshoot) => {
    //   if (snapshoot.exists()) {
    //     setHotels(Object.values(snapshoot.val()));
    //   }
    // });
  }, [loadHotels]);
  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      const first = entries[0];
      if (!loading && first.isIntersecting && lastItmKey) {
        loadHotels(lastItmKey);
      }
    };

    const options: IntersectionObserverInit = { threshold: 0.1 };
    const observer = new IntersectionObserver(callback, options);
    const loadingRefCurrent = loadingRef.current;
    if (loadingRefCurrent) {
      observer.observe(loadingRefCurrent);
    }
    return () => {
      if (loadingRefCurrent) {
        observer.unobserve(loadingRefCurrent);
      }
    };
  }, [lastItmKey, loading, loadHotels]);
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      <section className="flex flex-col gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} data={hotel} />
        ))}
        <div className="flex items-center justify-center" ref={loadingRef}>
          {loading && (
            <div className="animate-spin w-6 h-6 border-b-2 border-gray-400 rounded-full mb-6" />
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
