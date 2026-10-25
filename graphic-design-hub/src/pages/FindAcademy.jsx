import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const academies = [
  {
    name: "Alpro Design Studio & Academy",
    specialty: "UI/UX Design & Motion Graphics Tracks",
    academyId: "alpro-design-studio",
  },
  {
    name: "Pekan Creative Hub",
    specialty: "3D Modeling & Animation Specialization Center",
    academyId: "pekan-creative-hub",
  },
];

const location = "Lot 193,194 Jalan Nilai Square 6, Bandar Baru Nilai, 71800 Nilai, Negeri Sembilan Malaysia";
const favoritesKey = "graphic-design-hub-academy-favorites";

function readFavorites() {
  try {
    return JSON.parse(localStorage.getItem(favoritesKey) || "[]");
  } catch {
    return [];
  }
}

export default function FindAcademy() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [locationSearch, setLocationSearch] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [sortBy, setSortBy] = useState("availability");
  const [favorites, setFavorites] = useState(readFavorites);
  const [expandedAcademy, setExpandedAcademy] = useState(null);

  const visibleAcademies = academies
    .filter((academy) => {
      const query = search.trim().toLowerCase();
      const matchesSearch = !query || `${academy.name} ${academy.specialty}`.toLowerCase().includes(query);
      const matchesLocation = !locationSearch.trim() || location.toLowerCase().includes(locationSearch.trim().toLowerCase());
      const matchesSpecialty = specialty === "all" || academy.specialty.toLowerCase().includes(specialty);
      return matchesSearch && matchesLocation && matchesSpecialty;
    })
    .sort((first, second) => sortBy === "name" ? first.name.localeCompare(second.name) : 0);

  const toggleFavorite = (academyId) => {
    const nextFavorites = favorites.includes(academyId)
      ? favorites.filter((favorite) => favorite !== academyId)
      : [...favorites, academyId];
    localStorage.setItem(favoritesKey, JSON.stringify(nextFavorites));
    setFavorites(nextFavorites);
  };

  const clearFilters = () => {
    setSearch("");
    setLocationSearch("");
    setSpecialty("all");
  };

  return (
    <div className="academy-page">
      <section className="hero-banner-custom">
        <h1>Find a Design Academy</h1>
        <p>Search Academies and schedule an appointment with instructors through Academy</p>
        <form className="search-wrapper-custom" onSubmit={(event) => event.preventDefault()}>
          <input aria-label="Search academy" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search an academy by name, software..." />
          <input aria-label="Location" value={locationSearch} onChange={(event) => setLocationSearch(event.target.value)} placeholder="Zip Code or Neighborhood" />
          <button className="btn-search-go" type="submit"><i className="fa-solid fa-magnifying-glass" /> SEARCH</button>
        </form>
      </section>

      <div className="two-column-layout">
        <aside className="left-filters-sidebar">
          <div className="filter-card-box">
            <label>Filter By</label>
            <select aria-label="Specialty" value={specialty} onChange={(event) => setSpecialty(event.target.value)}>
              <option value="all">All specialties</option>
              <option value="ui/ux">UI/UX design</option>
              <option value="3d modeling">3D modeling</option>
            </select>
          </div>
          <button className="filter-reset-btn" type="button" onClick={clearFilters}>CLEAR FILTERS</button>
        </aside>

        <section className="right-results-pane" aria-label="Academy results">
          <div className="sorting-row-bar">
            <span>{visibleAcademies.length} academies</span>
            <span>Sort by</span>
            <button className={`sort-btn-action ${sortBy === "availability" ? "active" : ""}`} type="button" onClick={() => setSortBy("availability")}>FEATURED</button>
            <button className={`sort-btn-action ${sortBy === "name" ? "active" : ""}`} type="button" onClick={() => setSortBy("name")}>NAME A-Z</button>
          </div>

          {visibleAcademies.map((academy) => (
            <article className="item-data-card" key={academy.name}>
              <div className="card-left-content">
                <div className="item-avatar-box academy-type" aria-hidden="true">
                  <i className="fa-solid fa-school" />
                </div>
                <div className="item-details-box">
                  <h3>{academy.name}</h3>
                  <p className="item-spec-tag">{academy.specialty}</p>
                  <p className="item-info-txt"><i className="fa-solid fa-location-dot" /> {location}</p>
                  <a className="item-link-url" href="https://graphicdesignhub.edu" target="_blank" rel="noreferrer">
                    https://graphicdesignhub.edu
                  </a>
                  <p className="item-info-txt"><i className="fa-solid fa-phone" /> +60126504921</p>
                  <p className="item-info-txt language-text">Languages: English, Malay</p>
                  {expandedAcademy === academy.academyId && (
                    <p className="academy-expanded-info">Programs include guided design classes, portfolio reviews, and instructor-led sessions.</p>
                  )}
                </div>
              </div>
              <div className="academy-actions-wrapper">
                <button className="btn-pink-large" type="button" onClick={() => setExpandedAcademy(expandedAcademy === academy.academyId ? null : academy.academyId)}>
                  {expandedAcademy === academy.academyId ? "SHOW LESS" : "MORE ABOUT THIS ACADEMY"}
                </button>
                <button className="btn-pink-sub" type="button" onClick={() => toggleFavorite(academy.academyId)}>
                  <i className={`fa-${favorites.includes(academy.academyId) ? "solid" : "regular"} fa-heart`} /> {favorites.includes(academy.academyId) ? "SAVED" : "SAVE ACADEMY"}
                </button>
                <Link className="btn-pink-sub academy-schedule-link" to="/instructors">FIND AN INSTRUCTOR</Link>
              </div>
            </article>
          ))}
          {visibleAcademies.length === 0 && <p className="empty-state" role="status">No academies match those filters. Try a different search.</p>}
          {favorites.length > 0 && <p className="saved-note" role="status">Saved academies are remembered on this device.</p>}
        </section>
      </div>
    </div>
  );
}