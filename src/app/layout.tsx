import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ecommerce Petshop",
  description: "Trabalho Bimestral",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-[90vh]">
          <Navbar />
          <Toaster position="bottom-right" />
          {children}
        </div>
      </body>
    </html>
  );
}
