import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Abhinav's Portfolio",
  description: "Portfolio of Abhinav Gupta - Frontend Engineer and Product Designer",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F2ECE9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Handjet:wght,ELSH@100..900,2&family=Open+Sans:wght@300;400;500;600;700&family=Patrick+Hand+SC&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}

        {/* Google Analytics with bfcache support */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H0HJ2FZ6PC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H0HJ2FZ6PC', { send_page_view: false });

            // Track page view on initial load
            gtag('event', 'page_view');

            // Re-track page view when restored from bfcache
            window.addEventListener('pageshow', function(event) {
              if (event.persisted) {
                gtag('event', 'page_view');
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}