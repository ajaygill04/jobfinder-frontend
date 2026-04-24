import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState({});
  const [showApps, setShowApps] = useState({});

  const fetchMyJobs = async () => {
    try {
      const res = await axios.get("https://jobfinder-backend-kl3p.onrender.com/api/jobs/myjobs", { headers: { Authorization: `Bearer ${user.token}` } });
      setJobs(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchMyJobs(); }, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await axios.delete(`https://jobfinder-backend-kl3p.onrender.com/api/jobs/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
      toast.success("Job deleted");
      fetchMyJobs();
    } catch (err) { toast.error("Failed to delete"); }
  };

  const viewApplications = async (jobId) => {
    if (showApps[jobId]) { setShowApps({ ...showApps, [jobId]: false }); return; }
    try {
      const res = await axios.get(`https://jobfinder-backend-kl3p.onrender.com/api/applications/job/${jobId}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setApplications({ ...applications, [jobId]: res.data });
      setShowApps({ ...showApps, [jobId]: true });
    } catch (err) { toast.error("Failed to fetch"); }
  };

  const updateStatus = async (appId, status, jobId) => {
    try {
      await axios.put(`https://jobfinder-backend-kl3p.onrender.com/api/applications/${appId}`, { status }, { headers: { Authorization: `Bearer ${user.token}` } });
      toast.success(`Application ${status}`);
      viewApplications(jobId);
      setShowApps({ ...showApps, [jobId]: false });
    } catch (err) { toast.error("Failed"); }
  };

  return (
    <div className="fade-in">
      <div className="dashboard-header">
        <h2 className="dashboard-title">📊 My Dashboard</h2>
        <Link to="/post-job" className="btn-search" style={{ textDecoration: "none" }}>+ Post New Job</Link>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state-icon">📋</span>
          <p className="empty-state-text">No jobs posted yet</p>
          <p className="empty-state-subtext">Start hiring by posting your first job!</p>
          <Link to="/post-job" className="btn-submit" style={{ display: "inline-block", width: "auto", padding: "12px 30px", marginTop: "20px", textDecoration: "none" }}>Post a Job →</Link>
        </div>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="dashboard-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div>
                <h3 className="job-title">{job.title}</h3>
                <div style={{ marginBottom: "15px", marginTop: "8px" }}>
                  <span className="job-tag tag-location">📍 {job.location}</span>
                  <span className="job-tag tag-type">🕐 {job.jobType}</span>
                  <span className="job-tag tag-salary">🏢 {job.company}</span>
                </div>
              </div>
            </div>
            <div className="dashboard-actions">
              <button onClick={() => viewApplications(job._id)} className="btn-info">
                📩 {showApps[job._id] ? "Hide" : "View"} Applications
              </button>
              <button onClick={() => deleteJob(job._id)} className="btn-danger">🗑 Delete</button>
            </div>

            {showApps[job._id] && applications[job._id] && (
              <div className="application-panel">
                <h4 style={{ marginBottom: "15px", fontWeight: "700" }}>📩 Applications ({applications[job._id].length})</h4>
                {applications[job._id].length === 0 ? (
                  <p style={{ color: "#9CA3AF" }}>No applications yet.</p>
                ) : (
                  applications[job._id].map((app) => (
                    <div key={app._id} className="application-card">
                      <p className="applicant-name">{app.applicant?.name}</p>
                      <p className="applicant-email">✉️ {app.applicant?.email}</p>
                      <p style={{ margin: "10px 0", color: "#4B5563", fontSize: "14px" }}>📝 {app.coverLetter}</p>
                      <span className={`status-badge status-${app.status.toLowerCase()}`}>{app.status}</span>
                      {app.status === "Pending" && (
                        <div style={{ marginTop: "12px" }}>
                          <button onClick={() => updateStatus(app._id, "Accepted", job._id)} className="btn-accept">✅ Accept</button>
                          <button onClick={() => updateStatus(app._id, "Rejected", job._id)} className="btn-reject">❌ Reject</button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;