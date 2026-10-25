import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import firstInstructorImage from "../assets/c6f3394289ca9038f446be207c032d8a.jpg";

const instructors = [
  {
    name: "Prof. Dr. Muhammad Shamsir Bin Mohd Aris",
    specialty: "UI/UX Design Masterclass & Brand Identity",
    role: "Visiting Consultant",
    image: firstInstructorImage,
    languages: ["English", "Malay"],
    bookingId: "muhammad-shamsir",
  },
  {
    name: "PROF. DR. MADYA DR. Khairullah",
    specialty: "3D Modeling & Blender Professional Course",
    role: "Senior Lecturer",
    image: firstInstructorImage,
    languages: ["English", "Malay"],
    bookingId: "khairullah",
  },
];

const location = "Lot 193,194 Jalan Nilai Square 6, Bandar Baru Nilai, Malaysia";
const bookingsKey = "graphic-design-hub-bookings";

function readBookings() {
  try {
    return JSON.parse(localStorage.getItem(bookingsKey) || "[]");
  } catch {
    return [];
  }
}

export default function FindInstructor() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [locationSearch, setLocationSearch] = useState("");
  const [skill, setSkill] = useState("all");
  const [language, setLanguage] = useState("all");
  const [sortBy, setSortBy] = useState("availability");
  const [bookings, setBookings] = useState(readBookings);

  const visibleInstructors = instructors
    .filter((instructor) => {
      const searchText = search.trim().toLowerCase();
      const matchesSearch = !searchText ||
        `${instructor.name} ${instructor.specialty} ${instructor.role}`.toLowerCase().includes(searchText);
      const matchesLocation = !locationSearch.trim() || location.toLowerCase().includes(locationSearch.trim().toLowerCase());
      const matchesSkill = skill === "all" || instructor.specialty.toLowerCase().includes(skill);
      const matchesLanguage = language === "all" || instructor.languages.includes(language);
      return matchesSearch && matchesLocation && matchesSkill && matchesLanguage;
    })
    .sort((first, second) => sortBy === "name" ? first.name.localeCompare(second.name) : 0);

  const saveBooking = (bookingId) => {
    const nextBookings = bookings.includes(bookingId)
      ? bookings
      : [...bookings, bookingId];
    localStorage.setItem(bookingsKey, JSON.stringify(nextBookings));
    setBookings(nextBookings);
  };

  const clearFilters = () => {
    setSearch("");
    setLocationSearch("");
    setSkill("all");
    setLanguage("all");
  };

  return (
    <div className="instructor-page">
      <section className="instructor-hero-banner">
        <h1>Find an Instructor</h1>
        <p>Search Mentors and schedule a private design session</p>
        <form className="hero-search-wrapper" onSubmit={(event) => event.preventDefault()}>
          <input aria-label="Search instructor" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search an instructor by name, skill..." />
          <input aria-label="Location" value={locationSearch} onChange={(event) => setLocationSearch(event.target.value)} placeholder="Zip Code or City" />
          <button className="btn-search-submit" type="submit"><i className="fa-solid fa-magnifying-glass" /> SEARCH</button>
        </form>
      </section>

      <div className="instructor-main-layout">
        <aside className="left-filters-pane">
          <div className="filter-box-card">
            <label>Filter By</label>
            <select aria-label="Specialty" value={skill} onChange={(event) => setSkill(event.target.value)}>
              <option value="all">All specialties</option>
              <option value="ui/ux">UI/UX design</option>
              <option value="3d modeling">3D modeling</option>
            </select>
            <select aria-label="Languages" value={language} onChange={(event) => setLanguage(event.target.value)}>
              <option value="all">All languages</option>
              <option value="English">English</option>
              <option value="Malay">Malay</option>
            </select>
          </div>
          <button className="filter-reset-btn" type="button" onClick={clearFilters}>CLEAR FILTERS</button>
        </aside>

        <section className="results-layout-pane" aria-label="Instructor results">
          <div className="sorting-header-bar">
            <span>{visibleInstructors.length} instructors</span>
            <span>Sort by</span>
            <button className={`sort-action-btn ${sortBy === "availability" ? "active" : ""}`} type="button" onClick={() => setSortBy("availability")}>FEATURED</button>
            <button className={`sort-action-btn ${sortBy === "name" ? "active" : ""}`} type="button" onClick={() => setSortBy("name")}>NAME A-Z</button>
          </div>

          {visibleInstructors.map((instructor) => (
            <article className="profile-mentor-card" key={instructor.name}>
              <div className="mentor-avatar-box">
                <img src={instructor.image} alt={`${instructor.name} profile`} />
              </div>
              <div className="mentor-info-box">
                <h3>{instructor.name}</h3>
                <p className="mentor-tag">{instructor.specialty}</p>
                <p className="mentor-status-text">{instructor.role}</p>
                <p className="mentor-address-text"><i className="fa-solid fa-location-dot" /> {location}</p>
                <a className="mentor-link-site" href="https://graphicdesignhub.edu" target="_blank" rel="noreferrer">
                  https://graphicdesignhub.edu
                </a>
                <p className="mentor-phone-text"><i className="fa-solid fa-phone" /> +60126504921</p>
                <p className="mentor-lang-tags">English, Malay</p>
                <button
                  className="action-booking-btn"
                  type="button"
                  onClick={() => saveBooking(instructor.bookingId)}
                  disabled={bookings.includes(instructor.bookingId)}
                >
                  {bookings.includes(instructor.bookingId) ? "REQUEST SAVED" : "REQUEST NEXT AVAILABLE SESSION"}
                </button>
              </div>
            </article>
          ))}
          {visibleInstructors.length === 0 && (
            <p className="empty-state" role="status">No instructors match those filters. Try a different search.</p>
          )}
          {bookings.length > 0 && <p className="saved-note" role="status">Appointment requests are saved on this device.</p>}
        </section>
      </div>
    </div>
  );
}