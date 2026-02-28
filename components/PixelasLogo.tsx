export function PixelasLogo({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pixelas-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      {/* Row 0: top of P bowl */}
      <rect x="86" y="51" width="60" height="60" rx="8" fill="url(#pixelas-g)" />
      <rect x="156" y="51" width="60" height="60" rx="8" fill="url(#pixelas-g)" />
      <rect x="226" y="51" width="60" height="60" rx="8" fill="url(#pixelas-g)" />
      <rect x="296" y="51" width="60" height="60" rx="8" fill="url(#pixelas-g)" />
      {/* Row 1: bowl right */}
      <rect x="86" y="121" width="60" height="60" rx="8" fill="url(#pixelas-g)" />
      <rect x="366" y="121" width="60" height="60" rx="8" fill="url(#pixelas-g)" />
      {/* Row 2: bowl right */}
      <rect x="86" y="191" width="60" height="60" rx="8" fill="url(#pixelas-g)" />
      <rect x="366" y="191" width="60" height="60" rx="8" fill="url(#pixelas-g)" />
      {/* Row 3: bowl bottom */}
      <rect x="86" y="261" width="60" height="60" rx="8" fill="url(#pixelas-g)" />
      <rect x="156" y="261" width="60" height="60" rx="8" fill="url(#pixelas-g)" />
      <rect x="226" y="261" width="60" height="60" rx="8" fill="url(#pixelas-g)" />
      <rect x="296" y="261" width="60" height="60" rx="8" fill="url(#pixelas-g)" />
      {/* Row 4-5: stem */}
      <rect x="86" y="331" width="60" height="60" rx="8" fill="url(#pixelas-g)" />
      <rect x="86" y="401" width="60" height="60" rx="8" fill="url(#pixelas-g)" />
    </svg>
  )
}
