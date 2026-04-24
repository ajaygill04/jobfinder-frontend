import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : "J";

  return (
    <div className="job-card">
      <div className="job-card-left">
        <div className="job-logo">
          {getInitial(job.company)}
        </div>
        <div>
          <h3 className="job-title">{job.title}</h3>
          <p className="job-company">🏢 {job.company}</p>
          <div className="job-tags">
            <span className="job-tag tag-location">📍 {job.location}</span>
            <span className="job-tag tag-salary">💰 {job.salary || "Competitive"}</span>
            <span className="job-tag tag-type">🕐 {job.jobType}</span>
          </div>
        </div>
      </div>
      <Link to={`/jobs/${job._id}`} className="btn-view">
        View Details →
      </Link>
    </div>
  );
};

export default JobCard;