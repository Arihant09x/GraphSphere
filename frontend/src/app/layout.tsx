import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";

export const metadata: Metadata = {
  title: "GraphSphere | Graph intelligence",
  description: "Explore the connections inside your developer graph.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#070b14]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
