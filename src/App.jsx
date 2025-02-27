import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import Home from "./components/Home";
import AdminHome from "./components/AdminHome";
import AddMovie from "./components/AddMovie";
import Watchlist from "./components/Watchlist";
import MovieDetails from "./components/MovieDetails";
import Login from "./components/Login";
import "./index.css";
import axios from "axios";
import Register from "./components/Register";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Router>
      <div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies_list" element={<Home />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/add_movie" element={<AddMovie />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> */}
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
}

export default App;