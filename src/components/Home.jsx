// import { useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// function Home() {
//   const [search, setSearch] = useState("");
//   const [movies, setMovies] = useState([]);

//   const searchMovies = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/movies?query=${search}`);
//       setMovies(response.data);
//     } catch (error) {
//       console.error("Error fetching movies", error);
//     }
//   };

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-8 text-center">
//       <h1 className="text-3xl font-bold">Welcome to Movie Watchlist</h1>
//       <p className="text-gray-400 mt-2">Search and save your favorite movies</p>
//       <input
//         type="text"
//         placeholder="Search for movies..."
//         className="mt-4 p-2 w-1/2 rounded bg-gray-800 text-white"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <button onClick={searchMovies} className="ml-2 p-2 bg-blue-500 rounded">Search</button>
//       <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
//         {movies.map((movie) => (
//           <div key={movie.id} className="p-4 bg-gray-800 rounded-lg">
//             <h2 className="text-lg font-bold">{movie.title}</h2>
//             <p className="text-gray-400">{movie.release_date}</p>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// export default Home;

import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { FaRegBookmark, FaSearch, FaSun, FaMoon,FaPlus, FaMinus } from "react-icons/fa";

const movies = [
  {
    id: 1,
    title: "RRR",
    image: "https://indiaglitz-media.s3.amazonaws.com/telugu/home/rrr-review-250322-1.jpg",
    director: "S. S. Rajamouli",
    genre: "Action, Drama",
    year: 2022,
    cast: "N. T. Rama Rao Jr., Ram Charan",
    imdb: 8.0,
  },
  {
    id: 2,
    title: "KGF Chapter 2",
    image: "https://www.hiravshah.com/wp-content/uploads/2022/04/kgf-chapter-2.jpg",
    director: "Prashanth Neel",
    genre: "Action, Crime, Drama",
    year: 2022,
    cast: "Yash, Sanjay Dutt, Raveena Tandon",
    imdb: 8.3,
  },
  {
    id: 3,
    title: "Pushpa: The Rule",
    image: "https://www.livehindustan.com/lh-img/smart/img/2024/11/17/1200x900/Pushpa_2_The_Rule_1731843940754_1731843941797.jpg",
    description: "A gripping tale of a red sandalwood smuggler.",
    director: "Sukumar",
    genre: "Action, Thriller",
    year: 2024,
    cast: "Allu Arjun, Rashmika Mandanna",
    imdb: 8.2,
  },
  {
    id: 4,
    title: "Vikram",
    image: "https://static.toiimg.com/photo/91660096.cms",
    description: "A dark, thrilling action-packed movie starring Kamal Haasan.",
    director: "Lokesh Kanagaraj",
    genre: "Action, Thriller",
    year: 2022,
    cast: "Kamal Haasan, Vijay Sethupathi, Fahadh Faasil",
    imdb: 8.4,
  },
];

function Home() {
  const [watchlist, setWatchlist] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const addToWatchlist = (movie) => {
    if (watchlist.find((m) => m.id === movie.id)) {
      setWatchlist(watchlist.filter((m) => m.id !== movie.id));
    } else {
      setWatchlist([...watchlist, movie]);
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
        <h3 className={isDarkMode ? "text-primary" : "text-dark"}>🎬 Movie Watchlist</h3>
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
      <div className="container" style={{ marginTop: "50px",marginLeft:'120px' }}>
        <div className="row" style={{marginLeft:'-80px'}}>
          {movies
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
                    height: "420px",
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
                      height: "165px",
                      objectFit: "cover",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  />
                  <div className="card-body text-start">
                    <h6 className="card-title" style={{color:isDarkMode ? 'white' : 'black'}}>{movie.title}</h6>
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

                    <button
                      className="btn w-100 mt-2"
                      onClick={() => addToWatchlist(movie)}
                      style={{
                        backgroundColor: watchlist.find((m) => m.id === movie.id) ? "red" : "#007bff",
                        color: "white",
                        fontSize: "12px",
                        padding: "6px",
                        transition: "background 0.3s ease",
                      }}
                    >
                      {/* Add Plus icon or Minus icon depending on the state */}
                      {watchlist.find((m) => m.id === movie.id) ? (
                        <>
                          <FaMinus style={{ marginRight: "8px" }} />
                          Remove from Watchlist
                        </>
                      ) : (
                        <>
                          <FaPlus style={{ marginRight: "8px" }} />
                          Add to Watchlist
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
