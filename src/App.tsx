import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "./utils";
function App() {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    const query = ref(db, "hotels");
    onValue(query, (snapshoot) => {
      if (snapshoot.exists()) {
        setHotels(Object.values(snapshoot.val()));
      }
    });
  }, []);
  return <main>{JSON.stringify(hotels)}</main>;
}

export default App;
