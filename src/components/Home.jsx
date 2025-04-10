import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { FaRegBookmark, FaSearch, FaSun, FaMoon, FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 30;

  const fetchMovies = async (page) => {
    try {
      setLoading(true);
      const [res1, res2] = await Promise.all([
        axios.get("https://api.themoviedb.org/3/discover/movie", {
          params: {
            api_key: "2d30d4b184e9f0394d6e01d8326fc65f",
            language: "ta-IN",
            sort_by: "popularity.desc",
            include_adult: false,
            include_video: false,
            page: (page - 1) * 2 + 1,
            "primary_release_date.gte": "2000-01-01",
            with_original_language: "ta"
          }
        }),
        axios.get("https://api.themoviedb.org/3/discover/movie", {
          params: {
            api_key: "2d30d4b184e9f0394d6e01d8326fc65f",
            language: "ta-IN",
            sort_by: "popularity.desc",
            include_adult: false,
            include_video: false,
            page: (page - 1) * 2 + 2,
            "primary_release_date.gte": "2000-01-01",
            with_original_language: "ta"
          }
        })
      ]);

      const combined = [...res1.data.results, ...res2.data.results].slice(0, 30);

      const tmdbMovies = combined
        .map((movie) => ({
          movie_id: movie.id,
          title: movie.title,
          image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          description: movie.overview,
          director: "Unknown",
          genre: movie.genre_ids.join(", "),
          year: movie.release_date?.split("-")[0],
          cast: "Not available",
          imdb: movie.vote_average,
          region: "Kollywood"
        }))
        .filter((movie) => parseInt(movie.year) < 2026)
        .sort((a, b) => (b.year || 0) - (a.year || 0));

      setMovies(tmdbMovies);
      setLoading(false);
    } catch (err) {
      setError("Failed to load movies");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const addToWatchlist = async (movieId) => {
    try {
      const response = await axios.post(`${BASE_URL}/watchlist/add/${movieId}`);
      if (response.status === 200) {
        toast.success("Movie added to Watchlist");
      }
    } catch (error) {
      toast.error("Failed to add to watchlist");
    }
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(
    movies.filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase())).length / moviesPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`container-fluid min-vh-100 py-4`}
      style={{
        backgroundColor: isDarkMode ? "#000" : "#f4f4f4",
        color: isDarkMode ? "white" : "#222",
        transition: "background 0.5s ease, color 0.5s ease"
      }}
    >
      <div className="d-flex justify-content-between align-items-center px-4 pb-3">
        <h3 className={isDarkMode ? "text-primary" : "text-dark"}>🎬 Tamil Movie Watchlist</h3>
        <div className="d-flex align-items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSearchVisible(!searchVisible)}
            style={{ cursor: "pointer" }}
          >
            <FaSearch size={20} color={isDarkMode ? "white" : "#222"} />
          </motion.div>
          <motion.div
            whileTap={{ rotate: 360 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{ cursor: "pointer" }}
          >
            {isDarkMode ? <FaSun size={22} color="yellow" /> : <FaMoon size={22} color="#222" />}
          </motion.div>
        </div>
      </div>

      {searchVisible && (
        <motion.div className="container mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <input
            type="text"
            className={`form-control ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </motion.div>
      )}

      <div className="container">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <div className="row g-4">
              {currentMovies.map((movie, index) => (
                <motion.div
                  className="col-md-4"
                  key={movie.movie_id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <motion.div
                    className="position-relative rounded overflow-hidden shadow"
                    style={{
                      height: "260px",
                      transition: "transform 0.3s ease",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="img-fluid w-100 h-100"
                      style={{
                        objectFit: "cover",
                        filter: isDarkMode ? "brightness(0.75)" : "brightness(0.95)"
                      }}
                    />
                    <div
                      className="position-absolute bottom-0 start-0 w-100 p-3"
                      style={{
                        background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                        color: "white"
                      }}
                    >
                      <h5 className="fw-bold mb-1" style={{ fontSize: "18px" }}>{movie.title}</h5>
                      <p className="mb-0" style={{ fontSize: "12px" }}>
                        Year: {movie.year} | ⭐ {movie.imdb}
                      </p>
                      <button
                        className="btn btn-sm mt-2"
                        style={{
                          backgroundColor: watchlist.find((m) => m.movie_id === movie.movie_id) ? "red" : "#007bff",
                          color: "white",
                          fontSize: "12px",
                          padding: "4px 8px"
                        }}
                        onClick={() => addToWatchlist(movie.movie_id)}
                      >
                        {watchlist.find((m) => m.movie_id === movie.movie_id) ? (
                          <>
                            <FaMinus className="me-1" /> Remove
                          </>
                        ) : (
                          <>
                            <FaPlus className="me-1" /> Add
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <div className="d-flex justify-content-center mt-4">
              <motion.ul
                className="pagination d-flex gap-2"
                initial={{ x: 0 }}
                animate={{ x: -((currentPage - 1) * 40) }} // slide left on page click
                transition={{ type: "spring", stiffness: 100 }}
                style={{ overflow: "hidden", width: "fit-content", padding: "0 20px", justifyContent: "center" }}
              >
                {[1, 2, 3, 4, 5].map((pageNum) => (
                  <motion.li
                    key={pageNum}
                    className={`page-item ${currentPage === pageNum ? "active" : ""}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ cursor: "pointer" }}
                  >
                    <button
                      type="button" // prevents it from being interpreted as a submit button
                      className="page-link"
                      style={{
                        borderRadius: "8px",
                        fontWeight: "bold",
                        backgroundColor: currentPage === pageNum ? "#007bff" : "transparent",
                        color: currentPage === pageNum ? "white" : isDarkMode ? "white" : "#222",
                        border: "1px solid #007bff",
                        transition: "all 0.3s ease"
                      }}
                      onClick={(e) => {
                        e.preventDefault(); // prevent default anchor/button behavior
                        if (pageNum !== currentPage) {
                          setCurrentPage(pageNum);
                          fetchMovies(pageNum); // make sure this is not causing a reload
                        }
                      }}
                    >
                      {pageNum}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default Home;
