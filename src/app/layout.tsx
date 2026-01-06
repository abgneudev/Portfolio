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
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&family=VT323&family=Patrick+Hand+SC&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}

        {/* Google Analytics - only loads in production (not localhost) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H0HJ2FZ6PC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H0HJ2FZ6PC');
            }
          `}
        </Script>
      </body>
    </html>
  );
}