import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-8 text-center">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <p className="text-gray-400 mt-2">{movie.description}</p>
    </motion.div>
  );
}

export default MovieDetails;
