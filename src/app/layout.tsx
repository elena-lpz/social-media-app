// import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Playfair_Display, Raleway } from "next/font/google";

export const metadata = {
  title: "Booksy",
  description: "Read it. Log it. Love it.",
  type: "website",
  // url: "https://booksy.vercel.app/",
  // icons: {
  //   icon: "/logos/favicon.png",
  // },
};

const playfair = Playfair_Display({
  variable: "--font-playfair",
  weight: "variable",
  subsets: ["latin"],
});

const raleway = Raleway({
  weight: "variable",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${playfair.variable} ${raleway.className} antialiased flex flex-col min-h-screen`}
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Toaster />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
