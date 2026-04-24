import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "jobseeker" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://jobfinder-backend-kl3p.onrender.com/api/auth/register", formData);
      login(res.data);
      toast.success("Registered successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container fade-in">
        <div className="form-icon">🚀</div>
        <h2 className="form-title">Create Account</h2>
        <p className="form-subtitle">Join thousands of professionals on JobFinder</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" placeholder="John Doe" className="form-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" placeholder="you@example.com" className="form-input" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" placeholder="Min 6 characters" className="form-input" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">I am a</label>
            <select className="form-select" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
              <option value="jobseeker">🔍 Job Seeker — Looking for jobs</option>
              <option value="employer">🏢 Employer — Hiring talent</option>
            </select>
          </div>
          <button type="submit" className="btn-submit">Create Account →</button>
        </form>
        <p className="form-footer">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;