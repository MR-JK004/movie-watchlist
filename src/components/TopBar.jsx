import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

function TopBar({ darkMode, setDarkMode }) {
  return (
    <motion.nav initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold">🎬 Movie Watchlist</Link>
      <div className="flex gap-4">
        <Link to="/watchlist" className="hover:underline">Watchlist</Link>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-800 text-white">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </motion.nav>
  );
}

export default TopBar;