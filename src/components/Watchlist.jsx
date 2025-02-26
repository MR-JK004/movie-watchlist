import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-8 text-center">
      <h1 className="text-3xl font-bold">Your Watchlist</h1>
      <p className="text-gray-400 mt-2">Manage your saved movies</p>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {watchlist.map((movie) => (
          <div key={movie.id} className="p-4 bg-gray-800 rounded-lg">
            <h2 className="text-lg font-bold">{movie.title}</h2>
            <p className="text-gray-400">{movie.release_date}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Watchlist;