import { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock,FaEye,FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const inputVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const PasswordInput = ({ label, value, onChange, showPassword, togglePassword }) => (
  <div className="position-relative">
    <input
      type={showPassword ? "text" : "password"}
      className="form-control bg-dark text-white border-0"
      placeholder={label}
      value={value}
      onChange={onChange}
      required
    />
    <button
      className="position-absolute top-50 end-0 translate-middle-y"
      style={{
        backgroundColor: "transparent",
        border: "none",
        color: "#fff",
        cursor: "pointer",
      }}
      onClick={togglePassword}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
);

function Login() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        const user_id = response.data.payload.user_id;
      
        console.log(response.data.payload.user_id);
        if (token) {
          sessionStorage.setItem("authToken", token);
          sessionStorage.setItem("user_id",user_id);
          toast.success("Login Successful");
          setEmail("");
          setPassword("");
          setTimeout(() => navigate("/movies_list"), 1000); 
        } else {
          toast.error("Token not received");
        }
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#121212", paddingTop: "30px" }}>
      <h3 className="text-primary text-center">🎬 Movie Watchlist</h3>
      <div
        className="d-flex align-items-center justify-content-center min-vh-100 text-white"
        style={{ background: "#121212" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card p-4 shadow-lg"
          style={{
            background: "#1b1b1b",
            borderRadius: "15px",
            width: "610px",
            height: "450px",
            padding: "30px",
            marginTop: "-140px",
          }}
        >
          <h3 className="text-center text-primary mb-3">Welcome Back!</h3>
          <p className="text-center text-secondary">
            "Movies are the windows to infinite worlds."
          </p>
          <form onSubmit={handleLogin}>
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
                <motion.div
                  variants={inputVariant}
                  initial="hidden"
                  animate="visible"
                  style={{ width: "520px" }}
                >
                  <PasswordInput
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    showPassword={showPassword}
                    togglePassword={() => setShowPassword(!showPassword)}
                  />
                </motion.div>
              </div>
            </div>

            <motion.div
              variants={inputVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary w-100 mt-4 mb-4"
              >
                {loading ? <BeatLoader size={10} color="#ffffff" /> : "Login"}
              </motion.button>
            </motion.div>
          </form>

          <p className="text-center mt-3 text-secondary">
            Don't have an account?{" "}
            <a
              href="/register"
              style={{ textDecoration: "none", color: "#ffffff" }}
            >
              Sign Up
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Login;
