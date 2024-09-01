import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gabriel Sufrir",
  description: "Personal website of Gubriyeeel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-primary text-secondary", inter.className)}>
        <div className="container mx-auto py-8">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
