const iconShapes = {
  dashboard: <><path d="M11 3.05A9 9 0 1 0 20.95 13H11z" /><path d="M13 3.05V11h7.95A9 9 0 0 0 13 3.05Z" /></>,
  classes: <><path d="M12 3a9 9 0 1 0 0 18h1.3a2 2 0 0 0 1.4-3.4 1.7 1.7 0 0 1 1.2-2.9h1.6A3.5 3.5 0 0 0 21 11.2C21 6.7 17 3 12 3Z" /><path d="M7.5 10h.01M10 7.5h.01M14 7.5h.01" /></>,
  instructors: <><circle cx="12" cy="7" r="3.5" /><path d="M5 21a7 7 0 0 1 14 0M10 12l2 2 2-2-2 8z" /></>,
  academies: <><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c3.7 3 8.3 3 12 0v-5M22 9v6" /></>,
  chat: <><path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-4 2 1-4a7.5 7.5 0 1 1 16-5.5Z" /><path d="M8 10h8M8 14h5" /></>,
  market: <><path d="M3 10h18l-2-6H5l-2 6Z" /><path d="M5 10v10h14V10M9 20v-6h6v6M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /></>,
  portfolio: <><rect x="3" y="4" width="15" height="16" rx="2" /><path d="m5 16 4-4 3 3 2-2 4 4M8 8h.01" /><path d="M18 8h3v12h-3" /></>,
  assignments: <><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10H3z" /><path d="M3 9h18M7 13h10M7 16h7" /></>,
  profile: <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="2" /><path d="M5.5 16a3.5 3.5 0 0 1 7 0M15 10h3M15 14h3" /></>,
  preferences: <><path d="M4 6h16M4 12h16M4 18h16" /><circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" /><circle cx="11" cy="18" r="2" fill="currentColor" stroke="none" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.3 1-1.3 2.2-1.6-.6a8 8 0 0 1-1.7 1l-.3 1.7h-2.6l-.3-1.7a8 8 0 0 1-1.7-1l-1.6.6-1.3-2.2 1.3-1a7 7 0 0 1 0-2l-1.3-1 1.3-2.2 1.6.6a8 8 0 0 1 1.7-1l.3-1.7h2.6l.3 1.7a8 8 0 0 1 1.7 1l1.6-.6 1.3 2.2-1.3 1a7 7 0 0 1-.1 1.9Z" transform="translate(-1 -1)" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.6 9a2.5 2.5 0 1 1 4.2 1.8c-1.2 1-1.8 1.3-1.8 2.7M12 17h.01" /></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  home: <><path d="m3 10 9-7 9 7v10H5V10M9 20v-6h6v6" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
  arrowRight: <><path d="M4 12h15M13 5l7 7-7 7" /></>,
  logout: <><path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M14 8l4 4-4 4M8 12h10" /></>,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
  eyeOff: <><path d="m3 3 18 18M10.6 6.2A11 11 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.1 3.7M6.2 6.2C3.5 7.8 2 12 2 12s3.5 6 10 6c1.1 0 2.1-.2 3-.5" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>,
  notifications: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  chevronLeft: <><path d="m15 18-6-6 6-6" /></>,
  chevronRight: <><path d="m9 18 6-6-6-6" /></>,
  apple: <><path d="M16.6 12.9c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.4-1.6-2.9-1.7-1.2-.1-2.4.7-3.1.7-.6 0-1.7-.7-2.7-.7a4 4 0 0 0-3.4 2c-1.4 2.4-.4 6.1 1 8 .7.9 1.5 1.9 2.5 1.9s1.4-.6 2.7-.6 1.7.6 2.8.6 1.8-.9 2.4-1.9c.7-1 1-2.1 1-2.1s-2.1-.8-2.1-3Z" /><path d="M14.6 6.6c.5-.6.9-1.5.8-2.4-.8 0-1.8.5-2.4 1.1-.5.6-.9 1.5-.8 2.4.9.1 1.8-.4 2.4-1.1Z" /></>,
  android: <><path d="m5 8 2-3M19 8l-2-3M4 10a8 8 0 0 1 16 0H4ZM5 11v7a2 2 0 0 0 2 2h1v-4h8v4h1a2 2 0 0 0 2-2v-7" /><path d="M8 7h.01M16 7h.01" /></>,
};

export default function NavigationIcon({ name, size = 18, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {iconShapes[name] || iconShapes.dashboard}
    </svg>
  );
}