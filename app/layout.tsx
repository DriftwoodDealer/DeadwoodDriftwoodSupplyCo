import type { Metadata } from "next";
import { Anton } from "next/font/google";
import { CartProvider } from "@/components/cart/CartContext";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { ScrollFadeController } from "@/components/scroll/ScrollFadeController";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DEADWOOD: Driftwood Supply Co.",
  description:
    "Missouri River driftwood, visual provenance, and custom relic inventory for reptile, taxidermy, aquarium, and landscape spaces."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={anton.variable}>
      <body>
        <CartProvider>
          <SiteHeader />
          <ScrollFadeController />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
