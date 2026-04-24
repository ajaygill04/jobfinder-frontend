import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import MyApplications from "./pages/MyApplications";
import PostJob from "./pages/PostJob";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/post-job" element={<PrivateRoute><PostJob /></PrivateRoute>} />
          <Route path="/my-applications" element={<PrivateRoute><MyApplications /></PrivateRoute>} />
        </Routes>
      </div>

      {/* ====== FANCY DEVELOPER CREDIT ====== */}
      <div className="dev-credit">
        <div className="dev-credit-glow"></div>
        
        <div className="dev-avatar">👨‍💻</div>
        
        <div className="dev-name">
          Developed by <span>Ajay Gill</span>
        </div>
        
        <div className="dev-role">
          Full Stack Developer • MERN Specialist
        </div>
        
        <div className="dev-badge">
          <span className="dev-badge-text">✨ Handcrafted with Passion</span>
        </div>
        
        <div className="dev-tech-stack">
          <span className="dev-tech">⚛️ React.js</span>
          <span className="dev-tech">🟢 Node.js</span>
          <span className="dev-tech">🚂 Express.js</span>
          <span className="dev-tech">🍃 MongoDB</span>
          <span className="dev-tech">🔐 JWT Auth</span>
          <span className="dev-tech">☁️ Cloud Deploy</span>
        </div>
        
        <div className="dev-social">
          <a href="https://github.com/ajaygill04" target="_blank" rel="noreferrer" className="dev-social-link">🐙</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="dev-social-link">💼</a>
          <a href="mailto:ajaygill@email.com" target="_blank" rel="noreferrer" className="dev-social-link">📧</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="dev-social-link">🐦</a>
        </div>
        
        <div className="dev-divider"></div>
        
        <div className="dev-copyright">
          © 2025 <a href="/">JobFinder</a> • All rights reserved
        </div>
        
        <div className="dev-hearts">
          <span className="dev-heart">❤️</span>
          <span className="dev-heart">❤️</span>
          <span className="dev-heart">❤️</span>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;