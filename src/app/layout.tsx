import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

export const metadata: Metadata = {
  title: "CatholicTV - Live Catholic Streaming",
  description:
    "Watch live Catholic TV and radio streams: TV2000, Telepace, Vatican Media, EWTN Italia, Shalom World, Radio Maria, and more.",
  manifest: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/manifest.json`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CatholicTV",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1628",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-catholic-navy">
      <head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icons/icon-192.png`} sizes="192x192" />
        <link rel="apple-touch-icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icons/icon-192.png`} />
      </head>
      <body className="bg-catholic-navy text-white min-h-screen">
        <ServiceWorkerRegistration />
        <Navigation />
        <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
