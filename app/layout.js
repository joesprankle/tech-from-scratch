'use  client';
import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cyber-BrandGen",
  description: "The Data You Need",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
        <head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <link rel="icon" href="/img/Group-785522.png" />
        </head>
        <body className={inter.className}>{children}</body>
   
    </html>
  );
}
