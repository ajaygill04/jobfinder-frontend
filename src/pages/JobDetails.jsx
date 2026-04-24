import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`https://jobfinder-backend-kl3p.onrender.com/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) { console.error(err); }
    };
    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!coverLetter.trim()) return toast.error("Please write a cover letter");
    try {
      await axios.post("https://jobfinder-backend-kl3p.onrender.com/api/applications", { jobId: id, coverLetter }, { headers: { Authorization: `Bearer ${user.token}` } });
      toast.success("Application submitted!");
      setApplied(true);
    } catch (err) { toast.error(err.response?.data?.message || "Failed"); }
  };

  if (!job) return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <p>Loading job details...</p>
    </div>
  );

  return (
    <div className="detail-page fade-in">
      <div className="detail-container">
        <div className="detail-header">
          <h1 className="detail-title">{job.title}</h1>
          <p className="detail-company">🏢 {job.company}</p>
          <div className="detail-tags">
            <span className="detail-tag">📍 {job.location}</span>
            <span className="detail-tag">💰 {job.salary || "Competitive"}</span>
            <span className="detail-tag">🕐 {job.jobType}</span>
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-info-grid">
            <div className="detail-info-card">
              <span className="detail-info-icon">📍</span>
              <div className="detail-info-label">Location</div>
              <div className="detail-info-value">{job.location}</div>
            </div>
            <div className="detail-info-card">
              <span className="detail-info-icon">💰</span>
              <div className="detail-info-label">Salary</div>
              <div className="detail-info-value">{job.salary || "Competitive"}</div>
            </div>
            <div className="detail-info-card">
              <span className="detail-info-icon">🕐</span>
              <div className="detail-info-label">Job Type</div>
              <div className="detail-info-value">{job.jobType}</div>
            </div>
          </div>

          <h3 className="detail-section-title">📋 Job Description</h3>
          <p className="detail-description">{job.description}</p>

          <p style={{ color: "#9CA3AF", fontSize: "14px" }}>👤 Posted by: {job.postedBy?.name}</p>

          {user && user.role === "jobseeker" && !applied && (
            <div className="apply-section">
              <h3 className="detail-section-title">📩 Apply Now</h3>
              <textarea placeholder="Write an awesome cover letter..." className="form-textarea" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />
              <button onClick={handleApply} className="btn-submit btn-submit-green" style={{ marginTop: "15px" }}>Submit Application →</button>
            </div>
          )}

          {applied && (
            <div className="success-banner">
              <p>✅ Application Submitted Successfully!</p>
            </div>
          )}

          {!user && (
            <div className="login-banner">
              <p style={{ color: "#6B7280" }}>🔐 Please login as a Job Seeker to apply</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;