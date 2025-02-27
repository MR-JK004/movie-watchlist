import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

function AddMovie() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [movie, setMovie] = useState({
    title: "",
    image: "",
    description: "",
    director: "",
    genre: "",
    year: "",
    cast: "",
    imdb: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(movie).some((value) => value.trim() === "")) {
      alert("Please fill in all fields!");
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`container-fluid min-vh-100 py-4 transition-all`}
      style={{
        backgroundColor: isDarkMode ? "#000" : "#f4f4f4",
        color: isDarkMode ? "white" : "#222",
        transition: "background 0.5s ease, color 0.5s ease",
      }}
    >
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center px-4 pb-3">
        <h3 className={isDarkMode ? "text-primary" : "text-dark"}>🎬 Add Movie</h3>
        <motion.div
          onClick={() => setIsDarkMode(!isDarkMode)}
          whileTap={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          style={{ cursor: "pointer" }}
        >
          {isDarkMode ? <FaSun size={22} color="yellow" /> : <FaMoon size={22} color="#222" />}
        </motion.div>
      </div>

      {/* Form Section */}
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="row" style={{marginLeft:'20%',marginTop:'4%',width:'120%'}}>
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="p-4 rounded shadow"
              style={{
                backgroundColor: isDarkMode ? "#1b263b" : "white",
                border: isDarkMode ? "none" : "2px solid #222",
                transition: "all 0.5s ease",
              }}
            >
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="mb-3">
                <label className="form-label">Movie Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={movie.title}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  type="text"
                  name="image"
                  className="form-control"
                  value={movie.image}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={movie.description}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <div className="row">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="col-md-6 mb-3">
                  <label className="form-label">Director</label>
                  <input type="text" name="director" className="form-control" value={movie.director} onChange={handleChange} required />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="col-md-6 mb-3">
                  <label className="form-label">Genre</label>
                  <input type="text" name="genre" className="form-control" value={movie.genre} onChange={handleChange} required />
                </motion.div>
              </div>

              <div className="row">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="col-md-6 mb-3">
                  <label className="form-label">Year</label>
                  <input type="number" name="year" className="form-control" value={movie.year} onChange={handleChange} required />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="col-md-6 mb-3">
                  <label className="form-label">IMDB Rating</label>
                  <input type="number" step="0.1" name="imdb" className="form-control" value={movie.imdb} onChange={handleChange} required />
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="mb-3">
                <label className="form-label">Main Cast</label>
                <input type="text" name="cast" className="form-control" value={movie.cast} onChange={handleChange} required />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn w-100"
                type="submit"
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  fontSize: "16px",
                  transition: "background 0.3s ease",
                }}
              >
                Submit Movie
              </motion.button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="col-md-6">
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="card text-white shadow-lg mt-4"
                style={{
                  background: isDarkMode ? "#0d1b2a" : "#ffffff",
                  borderRadius: "10px",
                  border: isDarkMode ? "none" : "2px solid #222",
                }}
              >
                <img
                  src={movie.image || "https://via.placeholder.com/300"}
                  className="card-img-top"
                  alt="Movie"
                  style={{
                    height: "180px",
                    objectFit: "cover",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                  }}
                />
                <div className="card-body">
                  <h5>{movie.title}</h5>
                  <p><strong>Genre:</strong> {movie.genre}</p>
                  <p><strong>IMDB:</strong> ⭐ {movie.imdb}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AddMovie;
