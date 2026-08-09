import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UIProvider } from "@/context/ui_context";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Real Estate Web  App",
  description: "",
};
const poppins = localFont({
  src: "../fonts/Poppins/Poppins-Regular.ttf",
  variable: "--font-poppins",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", poppins.className, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col">
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
