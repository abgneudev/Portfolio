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
        <link rel="preconnect" href="/" />
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