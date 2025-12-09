import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onboarding - Thrico | Create & Run Your Own Social Media Universe",
  description:
    "Join Thrico - Create and run your own social media universe. Build communities, engage with content, foster conversations, and create culture. Get started with our custom onboarding process.",
  keywords:
    "Thrico, social media, community platform, content management, conversations, communities, commerce, culture, onboarding",
  generator: "Next.js",
  authors: [{ name: "Thrico" }],
  openGraph: {
    title: "Onboarding - Thrico",
    description: "Create & Run Your Own Social Media Universe",
    url: "https://thrico.com",
    siteName: "Thrico",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onboarding - Thrico",
    description: "Create & Run Your Own Social Media Universe",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
