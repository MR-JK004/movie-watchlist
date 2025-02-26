import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import TopBar from "./components/TopBar";
import Home from "./components/Home";
import AdminHome from "./components/AdminHome";
import Watchlist from "./components/Watchlist";
import MovieDetails from "./components/MovieDetails";
// import Login from "./auth/Login";
// import Register from "./auth/Register";
import "./index.css";
import axios from "axios";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Router>
      <div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminHome />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> */}
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
}

export default App;