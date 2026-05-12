import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers/Providers";

export const metadata: Metadata = {
  title: "AMETAS medical GmbH | Sustainable and Well Thought-out Solutions",
  description: "AMETAS medical GmbH - Your partner for health, care, quality and trust. Providing licensing, acquisition, marketing, and sales of medicines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-outfit">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
