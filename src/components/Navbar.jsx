import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        💼 JobFinder
      </Link>
      <div className="navbar-links">
        <Link to="/" className="nav-link">🏠 Home</Link>
        {user ? (
          <>
            {user.role === "employer" && (
              <>
                <Link to="/dashboard" className="nav-link">📊 Dashboard</Link>
                <Link to="/post-job" className="nav-link">➕ Post Job</Link>
              </>
            )}
            {user.role === "jobseeker" && (
              <Link to="/my-applications" className="nav-link">📄 My Applications</Link>
            )}
            <span className="nav-user">👋 {user.name}</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">🔐 Login</Link>
            <Link to="/register" className="nav-link">📝 Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;