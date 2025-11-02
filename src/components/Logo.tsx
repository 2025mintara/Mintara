export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="mintara-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8FF9F" />
          <stop offset="50%" stopColor="#00A676" />
          <stop offset="100%" stopColor="#00E0C6" />
        </linearGradient>
      </defs>
      
      {/* Base ring inspired by Base Network */}
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="url(#mintara-gradient)"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
      />
      
      {/* Geometric M symbol */}
      <path
        d="M 10 26 L 10 14 L 15 20 L 20 14 L 25 20 L 30 14 L 30 26"
        stroke="url(#mintara-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Inner glow effect */}
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="#00E0C6"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
      />
    </svg>
  );
}
