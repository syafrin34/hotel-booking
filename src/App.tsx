import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "./utils";
function App() {
  const [hotels, setHotels] = useState([]);
  console.log("Database URL:", import.meta.env.VITE_DATABASE_URL);
  console.log("Project ID:", import.meta.env.VITE_PROJECT_ID);
  useEffect(() => {
    const query = ref(db, "hotels");
    onValue(query, (snapshoot) => {
      if (snapshoot.exists()) {
        setHotels(Object.values(snapshoot.val()));
      }
    });
  }, []);
  return <main className="mt-20">{JSON.stringify(hotels)}</main>;
}

export default App;
