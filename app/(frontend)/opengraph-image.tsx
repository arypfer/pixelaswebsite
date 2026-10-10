import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Pixelas — Creative Software Tools'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
          position: 'relative',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '40%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 60,
            position: 'relative',
          }}
        >
          {/* Pixel P logo */}
          <svg
            width="180"
            height="180"
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

          {/* Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              Pixelas
            </div>
            <div
              style={{
                fontSize: 28,
                color: 'rgba(255,255,255,0.4)',
                fontWeight: 500,
              }}
            >
              Creative Software Tools
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(to right, transparent, #f59e0b, transparent)',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
