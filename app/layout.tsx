import type { Metadata } from "next";
import "./css/globals.css";

export const metadata: Metadata = {
  title: "TechNest",
  description: "All tech articles you wnat!",
};

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        {children}
      </body>
    </html>
  );
}
