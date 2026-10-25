import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./PortfolioPage.css";

const initialProjects = [
  { id: "bloom", name: "Bloom Identity", category: "branding", detail: "Visual identity", date: 6, views: 248, likes: 42, status: "Published", art: "bloom" },
  { id: "mindful", name: "Mindful App", category: "uiux", detail: "Mobile app", date: 5, views: 196, likes: 38, status: "Published", art: "mind" },
  { id: "coffee", name: "Sunday Coffee", category: "social", detail: "Campaign", date: 4, views: 312, likes: 81, status: "Published", art: "coffee" },
  { id: "worlds", name: "Little Worlds", category: "illustration", detail: "Digital art", date: 3, views: 174, likes: 29, status: "Draft", art: "worlds" },
  { id: "forma", name: "Forma Studio", category: "branding", detail: "Logo design", date: 2, views: 221, likes: 57, status: "Published", art: "forma" },
  { id: "travel", name: "Travel Notes", category: "uiux", detail: "Travel concept", date: 1, views: 133, likes: 24, status: "Draft", art: "travel" },
];

const projectsKey = "graphic-design-hub-portfolio-projects";
const savedKey = "graphic-design-hub-portfolio-saved";

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function categoryLabel(category) {
  return {
    branding: "Branding · Visual identity",
    uiux: "UI/UX · Design concept",
    illustration: "Illustration · Digital art",
    social: "Social Media · Campaign",
  }[category] || "Design project";
}

export default function PortfolioPage() {
  const [searchParams] = useSearchParams();
  const [projects, setProjects] = useState(() => readStorage(projectsKey, initialProjects));
  const [saved, setSaved] = useState(() => readStorage(savedKey, []));
  const [query, setQuery] = useState(() => searchParams.get("search") || "");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("recent");
  const [showSaved, setShowSaved] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("branding");

  useEffect(() => {
    try {
      localStorage.setItem(projectsKey, JSON.stringify(projects));
    } catch {
      // Portfolio remains usable for this session when storage is unavailable.
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(savedKey, JSON.stringify(saved));
    } catch {
      // Saved state remains available until the page is closed.
    }
  }, [saved]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setShowForm(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const visibleProjects = [...projects]
    .filter((project) => {
      const searchText = `${project.name} ${categoryLabel(project.category)} ${project.detail}`.toLowerCase();
      return (!query.trim() || searchText.includes(query.trim().toLowerCase())) &&
        (category === "all" || project.category === category) &&
        (!showSaved || saved.includes(project.id));
    })
    .sort((first, second) => sort === "az"
      ? first.name.localeCompare(second.name)
      : second.date - first.date);

  const toggleSaved = (projectId) => {
    setSaved((current) => current.includes(projectId)
      ? current.filter((id) => id !== projectId)
      : [...current, projectId]);
  };

  const addProject = (event) => {
    event.preventDefault();
    const title = newTitle.trim();
    if (!title) return;

    setProjects((current) => [{
      id: `project-${Date.now()}`,
      name: title,
      category: newCategory,
      detail: categoryLabel(newCategory).split(" · ")[1],
      date: Date.now(),
      views: 0,
      likes: 0,
      status: "Draft",
      art: newCategory,
    }, ...current]);
    setCategory("all");
    setShowSaved(false);
    setQuery("");
    setNewTitle("");
    setShowForm(false);
  };

  return (
    <div className="portfolio-page">
      <section className="portfolio-heading">
        <div>
          <p className="portfolio-eyebrow">YOUR CREATIVE SPACE</p>
          <h1>Design Portfolio</h1>
          <p>Showcase your creativity, organize your projects, and share your best work.</p>
        </div>
        <button className="portfolio-primary" type="button" onClick={() => setShowForm(true)}>
          <i className="fa-solid fa-plus" /> Add New Project
        </button>
      </section>

      <section className="portfolio-stats" aria-label="Portfolio summary">
        <article><span className="portfolio-stat-icon pink"><i className="fa-solid fa-layer-group" /></span><div><p>Total Projects</p><strong>{12 + Math.max(0, projects.length - initialProjects.length)}</strong><small>Keep creating</small></div></article>
        <article><span className="portfolio-stat-icon blue"><i className="fa-solid fa-eye" /></span><div><p>Portfolio Views</p><strong>1,284</strong><small>Across your projects</small></div></article>
        <article><span className="portfolio-stat-icon yellow"><i className="fa-solid fa-heart" /></span><div><p>Total Likes</p><strong>326</strong><small>Your work is inspiring</small></div></article>
      </section>

      <section className="portfolio-workspace">
        <div className="portfolio-toolbar">
          <div className="portfolio-tabs" role="group" aria-label="Filter portfolio by category">
            {[
              ["all", "All Projects"],
              ["branding", "Branding"],
              ["uiux", "UI/UX"],
              ["illustration", "Illustration"],
              ["social", "Social Media"],
            ].map(([value, label]) => (
              <button className={category === value ? "active" : ""} key={value} type="button" onClick={() => setCategory(value)}>
                {label}{value === "all" && <span>{projects.length}</span>}
              </button>
            ))}
          </div>
          <div className="portfolio-controls">
            <label className="portfolio-search">
              <i className="fa-solid fa-magnifying-glass" />
              <input type="search" aria-label="Search portfolio" placeholder="Search projects..." value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <label className="portfolio-sort">
              <i className="fa-solid fa-arrow-down-wide-short" />
              <select aria-label="Sort projects" value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="recent">Most Recent</option>
                <option value="az">Name: A to Z</option>
              </select>
            </label>
            <label className="portfolio-saved"><input type="checkbox" checked={showSaved} onChange={(event) => setShowSaved(event.target.checked)} /> Saved</label>
          </div>
        </div>

        {visibleProjects.length ? (
          <div className="portfolio-grid">
            {visibleProjects.map((project) => (
              <article className="portfolio-card" key={project.id}>
                <div className={`portfolio-art art-${project.art}`} aria-label={`${project.name} artwork`}>
                  {project.art === "bloom" && <><span className="bloom-orbit" /><span className="art-kicker">BOTANICAL STUDIO</span><strong>bloom.</strong><span className="art-caption">GROW WITH NATURE</span></>}
                  {project.art === "mind" && <><div className="mind-phone"><span>Good morning,</span><strong>take a breath.</strong><i /><small>Start session</small></div><span className="art-kicker">MINDFUL DAILY</span></>}
                  {project.art === "coffee" && <><span className="art-kicker">SUNDAY IS A MOOD</span><i className="coffee-cup" /><strong>slow mornings.</strong></>}
                  {project.art === "worlds" && <><i className="world world-one" /><i className="world world-two" /><i className="world world-three" /><strong>little worlds</strong><span className="art-caption">ILLUSTRATION SERIES</span></>}
                  {project.art === "forma" && <><i className="forma-mark" /><strong>FORMA</strong><span className="art-caption">DESIGN STUDIO · F—01</span></>}
                  {project.art === "travel" && <><i className="travel-sun" /><i className="travel-hill" /><div className="travel-paper"><small>YOUR NEXT CHAPTER</small><strong>Travel<br />notes.</strong><span>EXPLORE MORE</span></div></>}
                  {!(["bloom", "mind", "coffee", "worlds", "forma", "travel"].includes(project.art)) && <><span className="art-kicker">GRAPHIC DESIGNHUB</span><strong>{project.name}</strong><span className="art-caption">{categoryLabel(project.category).toUpperCase()}</span></>}
                </div>
                <div className="portfolio-card-info">
                  <div><h2>{project.name}</h2><p>{categoryLabel(project.category)}</p></div>
                  <button className="portfolio-save" type="button" aria-label={`${saved.includes(project.id) ? "Remove" : "Save"} ${project.name}`} aria-pressed={saved.includes(project.id)} onClick={() => toggleSaved(project.id)}>
                    <i className={`fa-${saved.includes(project.id) ? "solid" : "regular"} fa-heart`} />
                  </button>
                </div>
                <div className="portfolio-card-meta">
                  <span><i className="fa-regular fa-eye" /> {project.views} views</span>
                  <span><i className="fa-regular fa-heart" /> {project.likes}</span>
                  <span className={`portfolio-status ${project.status.toLowerCase()}`}>{project.status}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="portfolio-empty" role="status">
            <i className="fa-regular fa-folder-open" />
            <h2>No projects found</h2>
            <p>Try another category or search term.</p>
          </div>
        )}
      </section>

      {showForm && (
        <div className="portfolio-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowForm(false); }}>
          <form className="portfolio-modal" role="dialog" aria-modal="true" aria-labelledby="portfolio-modal-title" onSubmit={addProject}>
            <button className="portfolio-modal-close" type="button" aria-label="Close" onClick={() => setShowForm(false)}><i className="fa-solid fa-xmark" /></button>
            <p className="portfolio-eyebrow">ADD TO YOUR COLLECTION</p>
            <h2 id="portfolio-modal-title">New portfolio project</h2>
            <p>Add a project title and category to your portfolio.</p>
            <label>Project title<input autoFocus required maxLength={60} placeholder="e.g. Brand identity concept" value={newTitle} onChange={(event) => setNewTitle(event.target.value)} /></label>
            <label>Category<select value={newCategory} onChange={(event) => setNewCategory(event.target.value)}><option value="branding">Branding</option><option value="uiux">UI/UX</option><option value="illustration">Illustration</option><option value="social">Social Media</option></select></label>
            <button className="portfolio-primary" type="submit">Create project</button>
          </form>
        </div>
      )}
    </div>
  );
}