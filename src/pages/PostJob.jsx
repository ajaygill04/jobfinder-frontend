import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full-time",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://jobfinder-backend-kl3p.onrender.com/api/jobs", formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Job posted successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post job");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-page">
      <div className="form-container fade-in" style={{ maxWidth: "580px" }}>
        <div className="form-icon">📋</div>
        <h2 className="form-title">Post a New Job</h2>
        <p className="form-subtitle">Find the perfect candidate for your team</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Job Title</label>
            <input name="title" placeholder="e.g. Senior React Developer" className="form-input" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input name="company" placeholder="e.g. Google" className="form-input" onChange={handleChange} required />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div className="form-group">
              <label className="form-label">Location</label>
              <input name="location" placeholder="e.g. Bangalore" className="form-input" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Salary</label>
              <input name="salary" placeholder="e.g. \$80k - \$120k" className="form-input" onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Job Type</label>
            <select name="jobType" className="form-select" onChange={handleChange}>
              <option value="Full-time">💼 Full-time</option>
              <option value="Part-time">⏰ Part-time</option>
              <option value="Internship">🎓 Internship</option>
              <option value="Remote">🏠 Remote</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Job Description</label>
            <textarea name="description" placeholder="Describe the role, responsibilities, requirements, perks..." className="form-textarea" style={{ minHeight: "160px" }} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn-submit btn-submit-green">Post Job →</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;