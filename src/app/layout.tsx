import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
    <html lang="en" className={`h-full antialiased ${poppins.className}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
