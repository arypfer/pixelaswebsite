'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function RedirectPage() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');

  useEffect(() => {
    if (url && typeof window !== 'undefined') {
      // Check if in an in-app browser (TikTok, Instagram, etc.)
      const userAgent = navigator.userAgent;
      const isInAppBrowser = /TikTok|Instagram|Facebook|Line|WeChat|WhatsApp|Twitter|LinkedIn/i.test(userAgent) ||
                             (/Safari/i.test(userAgent) && /Mobile/i.test(userAgent) && !/Chrome|CriOS|FxiOS|EdgiOS/i.test(userAgent));

      if (isInAppBrowser) {
        // Try to open in external browser using intent for Android
        if (/Android/i.test(userAgent)) {
          const intentUrl = `intent://${url.replace('https://', '').replace('http://', '')}#Intent;scheme=${url.startsWith('https') ? 'https' : 'http'};action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(url)};end`;
          window.location.href = intentUrl;
        } else {
          // For iOS and others, try window.open
          const newWindow = window.open(url, '_blank');
          if (!newWindow) {
            // If popup blocked, fallback to direct redirect
            window.location.href = url;
          }
        }
      } else {
        // Not in in-app browser, redirect normally
        window.location.href = url;
      }
    }
  }, [url]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg">Redirecting to external browser...</p>
        <p className="text-sm text-gray-600 mt-2">If nothing happens, <a href={url || '#'} className="text-blue-600 underline">click here</a></p>
      </div>
    </div>
  );
}

export default function Redirect() {
  return (
    <Suspense fallback={<div>Redirecting...</div>}>
      <RedirectPage />
    </Suspense>
  );
}
