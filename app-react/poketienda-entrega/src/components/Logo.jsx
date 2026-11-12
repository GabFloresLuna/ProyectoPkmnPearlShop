import { useId } from 'react';

/** Átomo: ícono de la perla. El tamaño lo controla la prop `size`; useId evita ids repetidos entre logos. */
export default function Logo({ size = 40 }) {
  const id = 'perla-' + useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={id} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#D63384" />
          <stop offset="100%" stopColor="#4A148C" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill={`url(#${id})`} stroke="#FFC107" strokeWidth="3" />
      <ellipse cx="35" cy="35" rx="10" ry="6" fill="#FFFFFF" opacity="0.6" />
    </svg>
  );
}
