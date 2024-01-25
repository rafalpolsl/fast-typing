import type { Metadata } from "next";
import { Inter } from "next/font/google";

import StoreProvider from "./store-provider";
import { Navigation } from "../ui/navigation/navigation";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fast Typing",
  description: "Fast Typing",
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Navigation />
          <div className="pt-12 h-full">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
}
