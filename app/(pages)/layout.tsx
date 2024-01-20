import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Navigation } from "../ui/navigation/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fast Typing",
  description: "Fast Typing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
