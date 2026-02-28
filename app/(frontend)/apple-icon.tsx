import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#060606',
          borderRadius: 40,
        }}
      >
        <svg
          width="130"
          height="130"
          viewBox="0 0 512 512"
          fill="none"
        >
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <rect x="86" y="51" width="60" height="60" rx="8" fill="url(#g)" />
          <rect x="156" y="51" width="60" height="60" rx="8" fill="url(#g)" />
          <rect x="226" y="51" width="60" height="60" rx="8" fill="url(#g)" />
          <rect x="296" y="51" width="60" height="60" rx="8" fill="url(#g)" />
          <rect x="86" y="121" width="60" height="60" rx="8" fill="url(#g)" />
          <rect x="366" y="121" width="60" height="60" rx="8" fill="url(#g)" />
          <rect x="86" y="191" width="60" height="60" rx="8" fill="url(#g)" />
          <rect x="366" y="191" width="60" height="60" rx="8" fill="url(#g)" />
          <rect x="86" y="261" width="60" height="60" rx="8" fill="url(#g)" />
          <rect x="156" y="261" width="60" height="60" rx="8" fill="url(#g)" />
          <rect x="226" y="261" width="60" height="60" rx="8" fill="url(#g)" />
          <rect x="296" y="261" width="60" height="60" rx="8" fill="url(#g)" />
          <rect x="86" y="331" width="60" height="60" rx="8" fill="url(#g)" />
          <rect x="86" y="401" width="60" height="60" rx="8" fill="url(#g)" />
        </svg>
      </div>
    ),
    { ...size },
  )
}
