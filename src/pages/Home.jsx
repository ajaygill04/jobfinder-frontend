import axios from "axios";
import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await axios.get("https://jobfinder-backend-kl3p.onrender.com/api/jobs", {
        params: { search, location },
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="fade-in">
      {/* HERO SECTION */}
      <div className="hero-section">
        <span className="hero-emoji">🚀</span>
        <h1 className="hero-title">Find Your Dream Job Today</h1>
        <p className="hero-subtitle">
          Connect with top employers and discover opportunities that match your skills and ambitions
        </p>
      </div>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-icon">💼</span>
          <span className="stat-number">{jobs.length}+</span>
          <span className="stat-label">Active Jobs</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🏢</span>
          <span className="stat-number">50+</span>
          <span className="stat-label">Companies</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <span className="stat-number">200+</span>
          <span className="stat-label">Job Seekers</span>
        </div>
      </div>

      {/* SEARCH */}
      <div className="search-section">
        <h3 className="search-section-title">🔍 Search Jobs</h3>
        <form onSubmit={handleSearch} className="search-bar">
          <div className="search-input-wrapper">
            <span className="search-input-icon">💼</span>
            <input
              type="text"
              placeholder="Job title or keyword..."
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="search-input-wrapper">
            <span className="search-input-icon">📍</span>
            <input
              type="text"
              placeholder="City or location..."
              className="search-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-search">Search Jobs</button>
        </form>
      </div>

      {/* JOB LISTINGS */}
      <div className="section-header">
        <h2 className="section-title">Latest Job Openings</h2>
        <span className="section-count">{jobs.length} jobs found</span>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state-icon">🔍</span>
          <p className="empty-state-text">No jobs found yet</p>
          <p className="empty-state-subtext">New opportunities are added every day. Check back soon!</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}

      {/* FEATURES */}
      <div className="features-section">
        <h2 className="features-title">Why Choose JobFinder?</h2>
        <p className="features-subtitle">Everything you need to land your next great opportunity</p>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎯</span>
            <h3 className="feature-name">Smart Matching</h3>
            <p className="feature-desc">Find jobs that perfectly match your skills and experience</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3 className="feature-name">Quick Apply</h3>
            <p className="feature-desc">Apply to jobs with just one click and a cover letter</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <h3 className="feature-name">Track Progress</h3>
            <p className="feature-desc">Monitor your application status in real-time</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">💼 JobFinder</div>
            <p className="footer-desc">
              The #1 platform connecting talented professionals with amazing companies.
              Start your journey today!
            </p>
          </div>
          <div>
            <h4 className="footer-title">For Job Seekers</h4>
            <span className="footer-link">Browse Jobs</span>
            <span className="footer-link">Career Tips</span>
            <span className="footer-link">Resume Builder</span>
            <span className="footer-link">Salary Guide</span>
          </div>
          <div>
            <h4 className="footer-title">For Employers</h4>
            <span className="footer-link">Post a Job</span>
            <span className="footer-link">Browse Candidates</span>
            <span className="footer-link">Pricing Plans</span>
            <span className="footer-link">Hiring Tips</span>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 JobFinder. Built with ❤️ using MERN Stack
        </div>
      </footer>
    </div>
  );
};

export default Home;