import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nishan Yonjan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="antialiased bg-royal text-cream">{children}</body>
    </html>
  );
}
