import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Artifacts Renderer",
  description: "Dynamic React component renderer for artifacts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-full w-full antialiased">{children}</body>
    </html>
  );
}
