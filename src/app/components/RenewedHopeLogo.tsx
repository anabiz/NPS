interface RenewedHopeLogoProps {
  className?: string;
}

export function RenewedHopeLogo({ className = 'h-8 w-auto' }: RenewedHopeLogoProps) {
  return (
    <svg viewBox="0 0 220 80" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* "RENEWED" text */}
      <text x="95" y="22" fontSize="14" fontWeight="700" fill="#4CAF50" fontFamily="Arial, sans-serif" letterSpacing="3">
        RENEWED
      </text>

      {/* "H" left stroke */}
      <rect x="10" y="28" width="14" height="48" rx="2" fill="#2E7D32" />

      {/* Infinity/ribbon shape forming the crossbar of H and connecting to "ope" */}
      <path
        d="M24 52 C30 38, 42 38, 52 48 C62 58, 74 58, 80 48 C86 38, 80 28, 70 28 C60 28, 54 38, 52 48 C50 58, 42 68, 30 68 C20 68, 18 58, 24 52Z"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* "H" right stroke */}
      <rect x="76" y="28" width="14" height="48" rx="2" fill="#2E7D32" />

      {/* "ope" text */}
      <text x="95" y="65" fontSize="38" fontWeight="800" fill="#2E7D32" fontFamily="Arial, sans-serif">
        ope
      </text>
    </svg>
  );
}
