interface CoatOfArmsProps {
  className?: string;
}

export function CoatOfArms({ className = 'w-20 h-20' }: CoatOfArmsProps) {
  return (
    <svg viewBox="0 0 200 220" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Eagle */}
      <g transform="translate(100,28)">
        <ellipse cx="0" cy="0" rx="18" ry="12" fill="#2d2d2d" />
        <path d="M-40,-8 Q-20,-30 0,-15 Q20,-30 40,-8 Q30,0 20,-2 Q10,5 0,0 Q-10,5 -20,-2 Q-30,0 -40,-8Z" fill="#2d2d2d" />
        <circle cx="-4" cy="-2" r="1.5" fill="#fff" />
        <circle cx="4" cy="-2" r="1.5" fill="#fff" />
        <path d="M-2,2 L0,6 L2,2" fill="#c8a415" stroke="#c8a415" strokeWidth="0.5" />
      </g>

      {/* Shield - black Y on green-white */}
      <g transform="translate(100,95)">
        <path d="M-38,-40 L38,-40 L38,15 Q38,45 0,55 Q-38,45 -38,15Z" fill="#fff" stroke="#333" strokeWidth="2" />
        {/* Green sections */}
        <path d="M-36,-38 L-3,-38 L-3,-5 L-36,12Z" fill="#008751" />
        <path d="M3,-38 L36,-38 L36,12 L3,-5Z" fill="#008751" />
        {/* Black Y band */}
        <path d="M-3,-38 L3,-38 L3,-5 L36,12 L36,18 L3,1 L3,50 Q0,53 -3,50 L-3,1 L-36,18 L-36,12 L-3,-5Z" fill="#2d2d2d" />
        {/* Red flowers on Y */}
        <circle cx="0" cy="-20" r="3" fill="#cc0000" />
        <circle cx="-14" cy="8" r="3" fill="#cc0000" />
        <circle cx="14" cy="8" r="3" fill="#cc0000" />
      </g>

      {/* Left horse (supporter) */}
      <g transform="translate(38,110)">
        <path d="M5,-20 Q15,-35 20,-25 Q22,-20 18,-15 L15,-10 Q20,-5 18,5 L15,20 L12,20 L14,5 Q10,0 8,5 L5,20 L2,20 L5,5 Q0,0 -2,-10 Q0,-18 5,-20Z" fill="#888" stroke="#666" strokeWidth="0.5" />
        <circle cx="18" cy="-22" r="1" fill="#333" />
      </g>

      {/* Right horse (supporter) */}
      <g transform="translate(162,110) scale(-1,1)">
        <path d="M5,-20 Q15,-35 20,-25 Q22,-20 18,-15 L15,-10 Q20,-5 18,5 L15,20 L12,20 L14,5 Q10,0 8,5 L5,20 L2,20 L5,5 Q0,0 -2,-10 Q0,-18 5,-20Z" fill="#888" stroke="#666" strokeWidth="0.5" />
        <circle cx="18" cy="-22" r="1" fill="#333" />
      </g>

      {/* Wreath / base */}
      <g transform="translate(100,155)">
        <ellipse cx="0" cy="0" rx="45" ry="8" fill="#228B22" opacity="0.7" />
        <path d="M-40,0 Q-30,-12 -15,-5 Q0,-12 15,-5 Q30,-12 40,0" fill="none" stroke="#228B22" strokeWidth="3" />
        <path d="M-40,0 Q-30,12 -15,5 Q0,12 15,5 Q30,12 40,0" fill="none" stroke="#228B22" strokeWidth="3" />
      </g>

      {/* Motto banner */}
      <g transform="translate(100,185)">
        <path d="M-55,0 L-50,-8 L50,-8 L55,0 L50,8 L-50,8Z" fill="#fff" stroke="#333" strokeWidth="1" />
        <text x="0" y="4" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#2d2d2d" fontFamily="serif">
          UNITY AND FAITH
        </text>
      </g>

      {/* Peace and Progress */}
      <g transform="translate(100,202)">
        <text x="0" y="4" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#2d2d2d" fontFamily="serif">
          PEACE AND PROGRESS
        </text>
      </g>
    </svg>
  );
}
