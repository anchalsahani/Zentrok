import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Zentrok",
  description: "Creative Digital Marketing Agency",
  icons: {
    icon: "/favicon.png",        // Default favicon
    apple: "/favicon.png",       // iOS devices
    shortcut: "/favicon.png",    // Legacy support
  },
  metadataBase: new URL("https://www.zentrok.com"), // Replace with your domain
  openGraph: {
    title: "Zentrok",
    description: "Creative Digital Marketing Agency",
    url: "https://www.zentrok.com",
    siteName: "Zentrok",
    images: [
      {
        url: "/og-image.png", // Place this in /public
        width: 1200,
        height: 630,
        alt: "Zentrok - Creative Digital Marketing Agency",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentrok",
    description: "Creative Digital Marketing Agency",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="antialiased bg-white text-gray-900">
        <Navbar />
        <main className="pt-20">{children}</main>
        <div className="aurora">
          <span></span>
        </div>
      </body>
    </html>
  );
}
