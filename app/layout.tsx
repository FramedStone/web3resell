import "./globals.css";
import { Inter } from "next/font/google";
import ScrollToTop from "./components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
