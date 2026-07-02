export function iconCards(className = "h-8 w-8") {
  return `
    <svg class="${className}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="4" width="10" height="14" rx="2" stroke="currentColor" stroke-width="2" />
      <rect x="9" y="7" width="10" height="14" rx="2" stroke="currentColor" stroke-width="2" />
      <path d="M12 12h4M14 10v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `;
}

export function iconList(className = "h-8 w-8") {
  return `
    <svg class="${className}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 7h10M9 12h10M9 17h10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <circle cx="5" cy="7" r="1.5" fill="currentColor" />
      <circle cx="5" cy="12" r="1.5" fill="currentColor" />
      <circle cx="5" cy="17" r="1.5" fill="currentColor" />
    </svg>
  `;
}

export function iconUsers(className = "h-8 w-8") {
  return `
    <svg class="${className}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="2" />
      <path d="M3.5 19c.8-3.2 2.7-5 5.5-5s4.7 1.8 5.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <circle cx="17" cy="9" r="2.2" stroke="currentColor" stroke-width="2" />
      <path d="M14.8 14.4c2.7.2 4.5 1.7 5.2 4.6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `;
}

export function iconRefresh(className = "h-8 w-8") {
  return `
    <svg class="${className}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 7v5h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M4 17v-5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M18.2 9A7 7 0 0 0 6.4 6.9L4 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M5.8 15A7 7 0 0 0 17.6 17.1L20 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  `;
}
