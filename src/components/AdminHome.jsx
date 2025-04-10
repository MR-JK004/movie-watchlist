import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegBookmark, FaSearch, FaSun, FaMoon, FaEdit, FaTrash,FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

function AdminHome() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movies`);
        console.log(response.data);
        setMovies(Array.isArray(response.data.movies) ? response.data.movies : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const deleteMovie = async (movieId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/movies/delete/${movieId}`);

      if (response.status === 200) {
        toast.warn("Movie deleted Successfully");
        window.location.reload();
      }
    } catch (error) {
       toast.error("There was an error in deleting the movie",error);
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`container-fluid min-vh-100 text-white py-4 transition-all`}
      style={{
        backgroundColor: isDarkMode ? "#000" : "#f4f4f4",
        color: isDarkMode ? "white" : "#222",
        transition: "background 0.5s ease, color 0.5s ease",
      }}
    >
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center px-4 pb-3" style={{ marginTop: "10px" }}>
        <h3 className={isDarkMode ? "text-primary" : "text-dark"}>🎬 Admin Movie Watchlist Management</h3>
        <div className="d-flex align-items-center gap-4">
          {/* Search Icon */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSearchVisible(!searchVisible)}
            className="text-white"
            style={{ cursor: "pointer", textShadow: "0 0 10px rgba(255,255,255,0.7)" }}
          >
            <FaSearch size={20} color={isDarkMode ? "white" : "#222"} title="Search" />
          </motion.div>

          {/* Watchlist Icon */}
          <motion.div
            className="position-relative"
            whileHover={{ scale: 1.2 }}
            style={{ cursor: "pointer" }}
            title="Watchlist"
          >
            <FaRegBookmark size={24} color={isDarkMode ? "white" : "#222"} />
            {watchlist.length > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.8rem" }}
              >
                {watchlist.length}
              </span>
            )}
          </motion.div>

          {/*AddMovie Icon*/}
          <Link to={'/add-movie'}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => console.log("Add movie")}
              style={{ cursor: "pointer", color: isDarkMode ? "white" : "#222" }}
            >
            <FaPlusCircle size={24} title="Add Movie"/>
            </motion.div>
          </Link>

          {/* Dark Mode Toggle */}
          <motion.div
            onClick={() => setIsDarkMode(!isDarkMode)}
            whileTap={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            style={{ cursor: "pointer" }}
          >
            {isDarkMode ? (
              <FaSun size={22} color="yellow" title="Light Mode" />
            ) : (
              <FaMoon size={22} color="#222" title="Dark Mode" />
            )}
          </motion.div>
        </div>
      </div>

      {/* Search Input Field */}
      {searchVisible && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="container mb-3">
          <input
            type="text"
            className={`form-control ${isDarkMode ? "bg-dark text-white border-secondary" : "bg-light text-dark border-dark"}`}
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
      )}

      {/* Movie Cards */}
      <div className="container" style={{ marginTop: "50px", marginLeft: '120px' }}>
        <div className="row" style={{ marginLeft: '-80px' }}>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
              <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            movies
              .filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((movie) => (
                <motion.div
                  key={movie.id}
                  className="col-lg-3 col-md-6 d-flex justify-content-center mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className="card shadow-lg"
                    style={{
                      background: isDarkMode
                        ? "linear-gradient(135deg, #0d1b2a, #1b263b)"
                        : "linear-gradient(135deg, #ffffff, #e0e0e0)",
                      borderRadius: "10px",
                      width: "300px",
                      height: "440px",
                      overflow: "hidden",
                      border: isDarkMode ? "none" : "2px solid #222",
                      transition: "all 0.5s ease",
                    }}
                  >
                    <img
                      src={movie.image}
                      className="card-img-top"
                      alt={movie.title}
                      style={{
                        height: "185px",
                        objectFit: "cover",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                    />
                    <div className="card-body text-start">
                      <h6 className="card-title" style={{ color: isDarkMode ? 'white' : 'black' }}>{movie.title}</h6>
                      <p className="card-text small"
                        style={{
                          color: "#61757D",
                          fontSize: "15px",
                          paddingRight: "6px",
                          transition: "background 0.3s ease",
                        }}>
                        <strong>Director:</strong> {movie.director} <br />
                        <strong>Genre:</strong> {movie.genre} <br />
                        <strong>Year:</strong> {movie.year} <br />
                        <strong>Main Cast:</strong> {movie.cast} <br />
                        <strong>IMDB Rating:</strong> ⭐ {movie.imdb} <br />
                      </p>
                      <div className="row g-2 mt-3">
                        <div className="col-6">
                          <Link to={`/update-movie/${movie.movie_id}`} style={{ textDecoration: "none" }}>
                            <motion.button
                              className="btn w-100 d-flex align-items-center justify-content-center"
                              style={{
                                backgroundColor: "#28a745",
                                color: "white",
                                fontSize: "13px",
                                padding: "8px",
                                borderRadius: "8px",
                                transition: "background 0.3s ease",
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FaEdit style={{ marginRight: "5px" }} />
                              Update
                            </motion.button>
                          </Link>
                        </div>

                        <div className="col-6">
                          <motion.button
                            className="btn w-100 d-flex align-items-center justify-content-center"
                            style={{
                              backgroundColor: "#dc3545",
                              color: "white",
                              fontSize: "13px",
                              padding: "8px",
                              borderRadius: "8px",
                              transition: "background 0.3s ease",
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={()=>deleteMovie(movie.movie_id)}
                          >
                            <FaTrash style={{ marginRight: "5px" }} />
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default AdminHome;
