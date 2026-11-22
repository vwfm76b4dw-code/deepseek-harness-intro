/* 共享线性图标（SF Symbols 风：stroke 1.5 / 圆角端点） */
import React from 'react';

const IconBase = ({ children, size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const Icons = {
  chip: () => (
    <IconBase>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <rect x="10.2" y="10.2" width="3.6" height="3.6" rx="0.8" />
      <path d="M9 4v3M15 4v3M9 17v3M15 17v3M4 9h3M4 15h3M17 9h3M17 15h3" />
    </IconBase>
  ),
  frame: () => (
    <IconBase>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="2.4" />
    </IconBase>
  ),
  robot: () => (
    <IconBase>
      <rect x="5" y="8.5" width="14" height="10.5" rx="3" />
      <path d="M12 8.5V5.6" />
      <circle cx="12" cy="4" r="1.3" />
      <circle cx="9.4" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.6" cy="13" r="1" fill="currentColor" stroke="none" />
      <path d="M10.2 16.4h3.6" />
    </IconBase>
  ),
  plugin: () => (
    <IconBase>
      <rect x="4" y="4" width="16" height="16" rx="3.5" />
      <path d="M12 9v6M9 12h6" />
    </IconBase>
  ),
  nodes: () => (
    <IconBase>
      <circle cx="6" cy="6" r="2.1" />
      <circle cx="18" cy="6" r="2.1" />
      <circle cx="12" cy="18" r="2.1" />
      <path d="M8.1 6.9h7.8M17 7.8l-4 8.2M7 7.8l4 8.2" />
    </IconBase>
  ),
  stack: () => (
    <IconBase>
      <path d="M12 3.2 21 8l-9 4.8L3 8l9-4.8Z" />
      <path d="M3 12.5l9 4.8 9-4.8M3 16.6l9 4.8 9-4.8" />
    </IconBase>
  ),
  pulse: () => (
    <IconBase>
      <path d="M3 12h4l2.5-6.5 4.5 13L16.5 12H21" />
    </IconBase>
  ),
  shield: () => (
    <IconBase>
      <path d="M12 3l7 2.8v5.4c0 4.4-3 7.4-7 8.8-4-1.4-7-4.4-7-8.8V5.8L12 3Z" />
      <path d="M9.4 11.6l2 2 3.6-3.6" />
    </IconBase>
  ),
  branch: () => (
    <IconBase>
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="7" r="2" />
      <path d="M6 8v8M18 9c0 3.3-2.7 6-6 6H8.6" />
    </IconBase>
  )
};
