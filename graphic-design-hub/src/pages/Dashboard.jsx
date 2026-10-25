import { Link } from "react-router-dom";

const classPopularity = [
  { name: "UI/UX Design Masterclass", value: 19, color: "#e91e63" },
  { name: "Logo & Branding Basics", value: 4, color: "#2196f3" },
  { name: "3D Modeling & Blender", value: 10, color: "#4caf50" },
  { name: "Advanced Photoshop Suite", value: 21, color: "#ffeb3b" },
  { name: "Vector Illustration Academy", value: 2, color: "#9e9e9e" },
];

const academyEnrollment = [
  { name: "Alpro Design Studio", value: 15, color: "#2c3e50" },
  { name: "Pekan Creative Hub", value: 12, color: "#3498db" },
  { name: "OK Graphic Center", value: 5, color: "#2ecc71" },
  { name: "Creative Arts Nilai", value: 9, color: "#9b59b6" },
  { name: "Digital Design Institute", value: 14, color: "#e67e22" },
];

function DonutCard({ title, data, targetPath }) {
  return (
    <section className="dash-card">
      <div className="card-header">
        <h3>{title}</h3>
        <i className="fa-solid fa-circle-info info-icon" aria-hidden="true" />
      </div>
      <div className="card-body donut-section">
        <div className="chart-container">
          <svg className="donut-chart" viewBox="0 0 42 42" role="img" aria-label={`${title} chart`}>
            <circle cx="21" cy="21" r="15.915" fill="white" />
            <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e0e0e0" strokeWidth="4" />
            {data.map((item, index) => {
              const currentOffset = data
                .slice(0, index)
                .reduce((total, previousItem) => total + previousItem.value, 0);
              return (
                <circle
                  key={item.name}
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke={item.color}
                  strokeWidth="4"
                  strokeDasharray={`${item.value} ${100 - item.value}`}
                  strokeDashoffset={-currentOffset}
                />
              );
            })}
          </svg>
        </div>
        <ul className="data-list">
          {data.map((item) => (
            <li key={item.name}>
              <span className="list-name"><i className="fa-solid fa-square" style={{ color: item.color }} /> {item.name}</span>
              <span className="list-value">{item.value}%</span>
            </li>
          ))}
        </ul>
      </div>
      <Link className="details-btn" to={targetPath}>MORE DETAILS</Link>
    </section>
  );
}

export default function Dashboard() {
  return (
    <>
      <h1 className="dash-title">Welcome To GraphicDesignHUB!</h1>
      <div className="dashboard-grid">
        <DonutCard title="Popularity by Design Classes" data={classPopularity} targetPath="/classes" />
        <DonutCard title="Enrolment by Design Academies" data={academyEnrollment} targetPath="/academies" />

        <section className="dash-card">
          <div className="card-header">
            <h3>Smart Market Usage by Software</h3>
            <i className="fa-solid fa-circle-info info-icon" aria-hidden="true" />
          </div>
          <div className="card-body usage-section">
            <ul className="data-list compact">
              <li><span className="list-name"><i className="fa-solid fa-circle icon-pink" /> Figma Assets</span><span className="list-value">25%</span></li>
              <li><span className="list-name"><i className="fa-solid fa-circle icon-blue" /> Adobe Creative Cloud</span><span className="list-value">33%</span></li>
            </ul>
          </div>
          <Link className="details-btn" to="/market">OPEN MARKETPLACE</Link>
        </section>

        <section className="dash-card">
          <div className="card-header">
            <div>
              <h3>Design Skills Index</h3>
              <div className="health-rate">70% <span className="green-text">+3%</span></div>
            </div>
          </div>
          <div className="card-body chart-wrapper">
            <svg className="line-chart" viewBox="0 0 300 100" role="img" aria-label="Design skills index trending upward">
              <path d="M 0 80 Q 50 90 100 60 T 200 40 T 300 20" fill="none" stroke="#1d1d42" strokeWidth="3" />
            </svg>
          </div>
          <Link className="details-btn" to="/classes">EXPLORE CLASSES</Link>
        </section>
      </div>
      <footer className="dashboard-footer">
        <p>© 2026, made with <i className="fa-solid fa-heart heart-icon" /> by <strong>GraphicDesignHUB</strong> for a better web.</p>
        <div className="footer-links">
          <a href="#">GraphicDesignHUB</a>
          <a href="#">About Us</a>
          <a href="#">Blog</a>
        </div>
      </footer>
    </>
  );
}