import { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Successful");
  };

  return (
    <div style={{backgroundColor:'#121212',marginTop:'30px',marginLeft:'40px'}}>
    <h3 className="text-primary">🎬 Movie Watchlist</h3>
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 text-white"
      style={{ background: "#121212" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="card p-4 shadow-lg"
        style={{ background: "#1b1b1b", borderRadius: "15px", width: "550px",height:'450px',marginTop:'-100px' }}
      >
        <h3 className="text-center text-primary mb-3">Welcome Back!</h3>
        <p className="text-center text-secondary">"Movies are the windows to infinite worlds."</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-secondary">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-dark text-white border-0">
                <FaUser />
              </span>
              <input
                type="email"
                className="form-control bg-dark text-white border-0"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label text-secondary">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-dark text-white border-0">
                <FaLock />
              </span>
              <input
                type="password"
                className="form-control bg-dark text-white border-0"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary w-100 mt-4 mb-4"
          >
            Login
          </motion.button>
        </form>
        <p className="text-center mt-3 text-secondary" >
          Don't have an account? <a href="/register" style={{marginLeft:'20px',textDecoration:'none'}} >Sign Up</a>
        </p>
      </motion.div>
    </div>
    </div>
  );
}

export default Login;
