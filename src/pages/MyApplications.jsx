import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("https://jobfinder-backend-kl3p.onrender.com/api/applications/my", { headers: { Authorization: `Bearer ${user.token}` } });
        setApplications(res.data);
      } catch (err) { console.error(err); }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fade-in">
      <div className="dashboard-header">
        <h2 className="dashboard-title">📄 My Applications</h2>
        <span className="section-count">{applications.length} applications</span>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state-icon">📭</span>
          <p className="empty-state-text">No applications yet</p>
          <p className="empty-state-subtext">Browse jobs and apply to get started!</p>
        </div>
      ) : (
        applications.map((app) => (
          <div key={app._id} className="app-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap" }}>
              <div>
                <h3 className="job-title">{app.job?.title}</h3>
                <div style={{ marginTop: "8px", marginBottom: "10px" }}>
                  <span className="job-tag tag-location">📍 {app.job?.location}</span>
                  <span className="job-tag tag-salary">💰 {app.job?.salary || "N/A"}</span>
                  <span className="job-tag tag-type">🏢 {app.job?.company}</span>
                </div>
              </div>
              <span className={`status-badge status-${app.status.toLowerCase()}`}>{app.status}</span>
            </div>
            <p style={{ color: "#6B7280", margin: "10px 0", fontSize: "14px" }}>📝 {app.coverLetter}</p>
            <p className="app-date">📅 Applied on: {new Date(app.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyApplications;