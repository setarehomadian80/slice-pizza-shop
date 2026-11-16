import type { Metadata } from "next";
import { Rubik, Shrikhand } from "next/font/google";
import "./globals.css";

import CartHydration from "@/components/providers/CartHydration";
import QueryProvider from "@/providers/QueryProvider";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
});

const shrikhand = Shrikhand({
  weight: "400",
  variable: "--font-shrikhand",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crust Club | Sourdough Pizza",
  description: "Fresh sourdough pizza made with love.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${shrikhand.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <QueryProvider>
          <CartHydration />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}