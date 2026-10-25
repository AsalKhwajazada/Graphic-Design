import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const modules = {
  classes: {
    title: "Design Classes",
    subtitle: "Explore popular courses and build your design skills",
    icon: "palette",
    records: [
      { name: "UI/UX Design Masterclass", category: "Product Design", detail: "19% popularity", status: "Featured" },
      { name: "Logo & Branding Basics", category: "Brand Identity", detail: "4% popularity", status: "Beginner" },
      { name: "3D Modeling & Blender", category: "3D Design", detail: "10% popularity", status: "Popular" },
      { name: "Advanced Photoshop Suite", category: "Digital Imaging", detail: "21% popularity", status: "Most popular" },
      { name: "Vector Illustration Academy", category: "Illustration", detail: "2% popularity", status: "Explore" },
    ],
  },
  chat: {
    title: "Student Chat",
    subtitle: "Connect with classmates, share ideas, and learn together.",
    icon: "comments",
    sample: true,
    records: [
      {
        name: "Sara Ahmadi",
        category: "Direct message",
        detail: "I shared the color palette with you.",
        status: "Online now",
        messages: [
          "Hey! How is your UI/UX assignment going?",
          "Hi Sara! It’s going well. I’m working on the colors and layout now.",
          "I shared the color palette with you. Maybe it can help!",
          "This is perfect, thank you so much!",
        ],
      },
      {
        name: "Design Study Group",
        category: "Group chat",
        detail: "Mina: Great work everyone!",
        status: "Unread",
        messages: ["Mina: Great work everyone!"],
      },
      {
        name: "Mina Rahimi",
        category: "Direct message",
        detail: "Thank you for your feedback",
        status: "Yesterday",
        messages: ["Thank you for your feedback"],
      },
      {
        name: "Ahmad Noori",
        category: "Direct message",
        detail: "Can you send me the assignment?",
        status: "Monday",
        messages: ["Can you send me the assignment?"],
      },
    ],
  },
  market: {
    title: "Asset Marketplace",
    subtitle: "Search marketplaces and find the design resources you need.",
    icon: "store",
    sample: true,
    records: [
      { name: "Figma UI Assets", category: "UI Assets", detail: "Premium kits with modern UI component structures.", vendor: "Figma Assets", price: "5 RM", status: "Available" },
      { name: "Vector Mockups", category: "Graphics", detail: "Vector styles for the core of a design project.", vendor: "Adobe Cloud", price: "10 RM", status: "Available" },
      { name: "3D Templates", category: "3D Models", detail: "Models in a variety of styles and standard formats.", vendor: "Blender HUB", price: "15 RM", status: "Available" },
      { name: "Typography Packs", category: "Typography", detail: "Clean typefaces for a range of visual styles.", vendor: "Minimalist Studio", price: "20 RM", status: "Available" },
      { name: "Figma Assets Kit", category: "Graphics", detail: "Marketplace listing · ID 243598234 · No discount", vendor: "Figma Team", price: "10 RM", status: "Available" },
    ],
  },
  portfolio: {
    title: "Design Portfolio",
    subtitle: "Showcase your creativity, organize your projects, and share your best work.",
    icon: "images",
    sample: true,
    stats: [
      { label: "Total projects", value: "12" },
      { label: "Portfolio views", value: "1,284" },
      { label: "Total likes", value: "326" },
    ],
    records: [
      { name: "Bloom Identity", category: "Branding", detail: "Visual identity", views: 248, likes: 42, status: "Published" },
      { name: "Mindful App", category: "UI/UX", detail: "Mobile app", views: 196, likes: 38, status: "Published" },
      { name: "Sunday Coffee", category: "Social Media", detail: "Campaign", views: 312, likes: 81, status: "Published" },
      { name: "Little Worlds", category: "Illustration", detail: "Digital art", views: 174, likes: 29, status: "Draft" },
      { name: "Forma Studio", category: "Branding", detail: "Logo design", views: 221, likes: 57, status: "Published" },
      { name: "Travel Notes", category: "UI/UX", detail: "Travel concept", views: 133, likes: 24, status: "Draft" },
    ],
  },
  assignments: {
    title: "My Assignments",
    subtitle: "Keep track of your design tasks, deadlines, and feedback in one place.",
    icon: "folder-open",
    sample: true,
    stats: [
      { label: "Total assignments", value: "12" },
      { label: "In progress", value: "4" },
      { label: "Completed", value: "6" },
      { label: "Due this week", value: "2" },
    ],
    records: [
      { name: "Social Media Campaign", category: "UI/UX Design", detail: "Project · 4 tasks · Due Oct 12, 2026", progress: 65, status: "In Progress" },
      { name: "Logo & Brand Identity", category: "Logo & Branding", detail: "Practical task · 3 files · Due Oct 10, 2026 · Waiting for review", progress: 100, status: "Submitted" },
      { name: "Photo Manipulation", category: "Photoshop Suite", detail: "Practice · 2 tasks · Due Oct 14, 2026", progress: 40, status: "In Progress" },
      { name: "3D Product Mockup", category: "3D Modeling", detail: "Project · 5 tasks · Due Oct 05, 2026 · 5 days overdue", progress: 25, status: "Overdue" },
      { name: "Vector Illustration", category: "Vector Academy", detail: "Practice · Feedback received · Reviewed by instructor", progress: 100, status: "Completed" },
    ],
  },
  profile: {
    title: "My Profile",
    subtitle: "Manage your personal information and showcase your creative journey.",
    icon: "id-card",
    sample: true,
    records: [
      { name: "Arezo Noori", category: "Graphic Design Student", detail: "Creative learner interested in graphic design, web development, and UI/UX. Kabul, Afghanistan · arezo@example.com · Member since September 2026", status: "Active Member" },
      { name: "My Skills", category: "Creative toolkit", detail: "Graphic Design · UI/UX Design · Web Development · Adobe Photoshop · Figma", status: "5 skills" },
      { name: "Profile Completion", category: "Account", detail: "Basic information added · 4 of 5 steps", status: "80%" },
      { name: "Learning Overview", category: "Activity", detail: "12 assignments · 8 completed · 3 certificates · 24h learning time", status: "In progress" },
    ],
  },
  preferences: {
    title: "Preferences",
    subtitle: "Personalize GraphicDesignHUB to work the way you do.",
    icon: "sliders",
    sample: true,
    records: [
      { name: "Account", category: "Profile and sign-in", detail: "Language: English · Time zone: Afghanistan Time (UTC +4:30) · student@example.com", status: "Configured" },
      { name: "Appearance", category: "Theme and display", detail: "Light theme · Compact sidebar off · Reduced animations off", status: "Light" },
      { name: "Notifications", category: "What you hear about", detail: "Assignment updates, student chat messages, and class announcements enabled. Tips and email notifications disabled.", status: "Configured" },
      { name: "Privacy", category: "Visibility and security", detail: "Public portfolio, online status, and direct messages enabled.", status: "Configured" },
      { name: "Learning", category: "Design interests", detail: "Beginner · Graphic Design and UI/UX Design · Weekly goal: 3–5 hours", status: "Beginner" },
    ],
  },
  settings: {
    title: "Settings",
    subtitle: "Manage your workspace, account, security, and learning experience.",
    icon: "gear",
    sample: true,
    records: [
      { name: "General settings", category: "General", detail: "English · Afghanistan Time (UTC +4:30) · DD / MM / YYYY · Dashboard landing page · Product announcements and accessibility support enabled.", status: "Configured", roles: ["student", "admin"] },
      { name: "Account settings", category: "Account", detail: "Student account · student@example.com · Preferred contact: Email · Profile visibility: Classmates. Demo account details only.", status: "Demo account", roles: ["student", "admin"] },
      { name: "Security & sign-in", category: "Security", detail: "Sign-in alerts enabled · Two-step verification off. Password changes and session management require an authentication backend.", status: "Backend required", roles: ["student", "admin"] },
      { name: "Learning & classes", category: "Learning", detail: "Beginner · Weekly study goal: 3–5 hours · Assignment reminders and class announcements enabled · Course recommendations off.", status: "Student settings", roles: ["student"] },
      { name: "Messages & notifications", category: "Messages", detail: "Student chat messages and direct messages enabled · Email notifications and quiet hours off.", status: "Student settings", roles: ["student"] },
      { name: "User management", category: "User Management", detail: "1,284 total users · 1,106 students · 142 instructors · New registration open · Instructor approval required. Counts are illustrative.", status: "Admin demo", roles: ["admin"] },
      { name: "System & integrations", category: "System & Integrations", detail: "Marketplace review and portfolio moderation enabled · Upload limit: 25 MB · support@example.com. Configure integrations securely on a server.", status: "Admin settings", roles: ["admin"] },
      { name: "Data & backup", category: "Data & Backup", detail: "Automated backups are not connected · Daily frequency · 30-day retention · Completion alerts enabled.", status: "Not connected", roles: ["admin"] },
    ],
  },
};

const favoritesKey = "graphic-design-hub-saved-items";
const enrollmentsKey = "graphic-design-hub-enrollments";
const assignmentStatusesKey = "graphic-design-hub-assignment-statuses";
const chatMessagesKey = "graphic-design-hub-chat-messages";

function readStoredValue(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export default function ModulePage({ moduleKey }) {
  const page = modules[moduleKey];
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get("search") || "");
  const [category, setCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => readStoredValue(favoritesKey, []));
  const [enrollments, setEnrollments] = useState(() => readStoredValue(enrollmentsKey, []));
  const [assignmentStatuses, setAssignmentStatuses] = useState(() => readStoredValue(assignmentStatusesKey, {}));
  const [chatMessages, setChatMessages] = useState(() => readStoredValue(chatMessagesKey, {}));
  const [openRecord, setOpenRecord] = useState(null);
  const [settingsRole, setSettingsRole] = useState("student");

  if (!page) return null;

  const roleRecords = moduleKey === "settings"
    ? page.records.filter((record) => record.roles.includes(settingsRole))
    : page.records;
  const categories = [...new Set(roleRecords.map((record) => record.category))];
  const getRecordId = (record) => `${moduleKey}:${record.name}`;
  const getStatus = (record) => moduleKey === "assignments"
    ? assignmentStatuses[getRecordId(record)] || record.status
    : record.status;
  const visibleRecords = roleRecords.filter((record) => {
    const recordSearch = `${record.name} ${record.category} ${record.detail} ${getStatus(record)}`.toLowerCase();
    return (!search.trim() || recordSearch.includes(search.trim().toLowerCase())) &&
      (category === "all" || record.category === category) &&
      (statusFilter === "all" || getStatus(record) === statusFilter) &&
      (!favoritesOnly || favorites.includes(getRecordId(record)));
  });

  const toggleFavorite = (record) => {
    const recordId = getRecordId(record);
    const nextFavorites = favorites.includes(recordId)
      ? favorites.filter((favorite) => favorite !== recordId)
      : [...favorites, recordId];
    localStorage.setItem(favoritesKey, JSON.stringify(nextFavorites));
    setFavorites(nextFavorites);
  };

  const toggleEnrollment = (record) => {
    const recordId = getRecordId(record);
    const nextEnrollments = enrollments.includes(recordId)
      ? enrollments.filter((enrollment) => enrollment !== recordId)
      : [...enrollments, recordId];
    localStorage.setItem(enrollmentsKey, JSON.stringify(nextEnrollments));
    setEnrollments(nextEnrollments);
  };

  const updateAssignmentStatus = (record, nextStatus) => {
    const nextStatuses = { ...assignmentStatuses, [getRecordId(record)]: nextStatus };
    localStorage.setItem(assignmentStatusesKey, JSON.stringify(nextStatuses));
    setAssignmentStatuses(nextStatuses);
  };

  const sendChatMessage = (event, record) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = String(formData.get("message") || "").trim();
    if (!message) return;
    const nextMessages = {
      ...chatMessages,
      [record.name]: [...(chatMessages[record.name] || []), { text: message, sentAt: new Date().toISOString() }],
    };
    localStorage.setItem(chatMessagesKey, JSON.stringify(nextMessages));
    setChatMessages(nextMessages);
    event.currentTarget.reset();
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setStatusFilter("all");
    setFavoritesOnly(false);
  };

  return (
    <div className="academy-page">
      <section className="hero-banner-custom">
        <h1>{page.title}</h1>
        <p>{page.subtitle}</p>
        <form className="search-wrapper-custom" onSubmit={(event) => event.preventDefault()}>
          <input aria-label={`Search ${page.title}`} value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${page.title.toLowerCase()}...`} />
          <button className="btn-search-go" type="submit"><i className="fa-solid fa-magnifying-glass" /> SEARCH</button>
        </form>
      </section>

      {moduleKey === "settings" && (
        <div className="settings-role-control" aria-label="Settings role">
          <span>Settings for your workspace</span>
          <div role="group" aria-label="Choose settings role">
            <button className={settingsRole === "student" ? "active" : ""} type="button" onClick={() => { setSettingsRole("student"); setCategory("all"); setStatusFilter("all"); }}>Student</button>
            <button className={settingsRole === "admin" ? "active" : ""} type="button" onClick={() => { setSettingsRole("admin"); setCategory("all"); setStatusFilter("all"); }}>Admin</button>
          </div>
        </div>
      )}

      {page.stats && (
        <div className="dashboard-grid module-stats" aria-label={`${page.title} summary`}>
          {page.stats.map((stat) => (
            <section className="dash-card" key={stat.label}>
              <p className="item-info-txt">{stat.label}</p>
              <h2>{stat.value}</h2>
            </section>
          ))}
        </div>
      )}

      <div className="two-column-layout">
        <aside className="left-filters-sidebar">
          <div className="filter-card-box">
            <label>Browse</label>
            <label className="custom-chk-lbl"><input type="checkbox" checked={favoritesOnly} onChange={(event) => setFavoritesOnly(event.target.checked)} /> Saved items</label>
          </div>
          <div className="filter-card-box">
            <label>Category</label>
            <select aria-label="Category" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">All categories</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
            <select aria-label="Status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option value="all">All statuses</option>
              {[...new Set(roleRecords.map(getStatus))].map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <button className="filter-reset-btn" type="button" onClick={clearFilters}>CLEAR FILTERS</button>
        </aside>

        <section className="right-results-pane" aria-label={`${page.title} results`}>
          <div className="sorting-row-bar">
            <span>{visibleRecords.length} items</span>
            {page.sample && <span className="item-info-txt">Sample data</span>}
          </div>
          {visibleRecords.map((record) => (
            <article className="item-data-card" key={record.name}>
              <div className="card-left-content">
                <div className="item-avatar-box academy-type" aria-hidden="true">
                  <i className={`fa-solid fa-${page.icon}`} />
                </div>
                <div className="item-details-box">
                  <h3>{record.name}</h3>
                  <p className="item-spec-tag">{record.category}</p>
                  <p className="item-info-txt">{record.detail}</p>
                  {record.vendor && <p className="item-info-txt">Provided by {record.vendor}</p>}
                  {record.price && <p className="item-spec-tag">{record.price}</p>}
                  {record.views !== undefined && (
                    <p className="item-info-txt">{record.views} views · {record.likes} likes</p>
                  )}
                  {record.progress !== undefined && (
                    <label className="item-info-txt">
                      Progress {record.progress}%
                      <progress max="100" value={record.progress}>{record.progress}%</progress>
                    </label>
                  )}
                  {openRecord === record.name && moduleKey !== "chat" && (
                    <p className="academy-expanded-info">{record.detail} {moduleKey === "settings" ? "Changes are demo-only until a backend is connected." : "This sample content is stored only in this app."}</p>
                  )}
                </div>
              </div>
              <div className="academy-actions-wrapper">
                <span className="item-info-txt">{getStatus(record)}</span>
                {moduleKey === "assignments" ? (
                  <select aria-label={`Update status for ${record.name}`} value={getStatus(record)} onChange={(event) => updateAssignmentStatus(record, event.target.value)}>
                    <option>Not started</option>
                    <option>In Progress</option>
                    <option>Submitted</option>
                    <option>Overdue</option>
                    <option>Completed</option>
                  </select>
                ) : moduleKey === "classes" ? (
                  <button className="btn-pink-large" type="button" onClick={() => toggleEnrollment(record)}>
                    {enrollments.includes(getRecordId(record)) ? "ENROLLED" : "ENROLL IN CLASS"}
                  </button>
                ) : moduleKey === "chat" ? (
                  <button className="btn-pink-large" type="button" onClick={() => setOpenRecord(openRecord === record.name ? null : record.name)}>
                    {openRecord === record.name ? "CLOSE DISCUSSION" : "OPEN DISCUSSION"}
                  </button>
                ) : moduleKey === "settings" ? (
                  <button className="btn-pink-large" type="button" onClick={() => setOpenRecord(openRecord === record.name ? null : record.name)}>
                    {openRecord === record.name ? "HIDE DETAILS" : "VIEW SETTINGS"}
                  </button>
                ) : (
                  <button className="btn-pink-large" type="button" onClick={() => toggleFavorite(record)}>
                    <i className={`fa-${favorites.includes(getRecordId(record)) ? "solid" : "regular"} fa-heart`} /> {favorites.includes(getRecordId(record)) ? "SAVED" : "SAVE ITEM"}
                  </button>
                )}
                {moduleKey !== "chat" && moduleKey !== "assignments" && moduleKey !== "classes" && moduleKey !== "settings" && (
                  <button className="module-details-btn" type="button" onClick={() => setOpenRecord(openRecord === record.name ? null : record.name)}>
                    {openRecord === record.name ? "HIDE DETAILS" : "VIEW DETAILS"}
                  </button>
                )}
              </div>
              {moduleKey === "chat" && openRecord === record.name && (
                <div className="discussion-panel">
                  <div className="discussion-messages" aria-live="polite">
                    {(record.messages || []).map((message, index) => (
                      <p className="discussion-message" key={`source-${index}`}>{message}</p>
                    ))}
                    {(chatMessages[record.name] || []).map((message, index) => (
                      <p className="discussion-message" key={`${message.sentAt}-${index}`}>{message.text}</p>
                    ))}
                    {(record.messages || []).length === 0 && (chatMessages[record.name] || []).length === 0 && <p className="item-info-txt">No messages yet. Start the discussion.</p>}
                  </div>
                  <form className="discussion-composer" onSubmit={(event) => sendChatMessage(event, record)}>
                    <input name="message" aria-label="Write a message" placeholder="Write a message..." maxLength={500} />
                    <button className="btn-pink-sub" type="submit">SEND</button>
                  </form>
                </div>
              )}
            </article>
          ))}
          {visibleRecords.length === 0 && <p className="empty-state" role="status">No items match these filters. Try a different search.</p>}
        </section>
      </div>
    </div>
  );
}