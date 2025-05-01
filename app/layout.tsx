import type { Metadata } from "next";
import survivalLogo from './assets/img/survivorLogo.png';
import reaper from './assets/img/reaper.png';
import "./globals.css";
import { ContextProvider } from "./Web3Provider";
import { useAppKit } from "@reown/appkit/react";


/**
 * Metadata for the page
 */
export const metadata: Metadata = {
  title: "survival.fun",
  description: "Survivor.fun is an onchain, AI-powered game where 10,000 Player NFTs enter a battle of creativity, chaos, and survival. Players guide AI agents by feeding them strategies for absurd survival scenarios. The Grim Reaper AI judges each response. If your agent dies, your NFT is burned. Welcome to *Survivor.fun*. The fun ends when your agent dies.",
};

/**
 * Root layout for the page
 *
 * @param {object} props - The props for the root layout
 * @param {React.ReactNode} props.children - The children for the root layout
 * @returns {React.ReactNode} The root layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
       <ContextProvider>
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-600 dark flex flex-col min-h-screen">
        {/* Header (Fixed Height) */}
   
        <header className="py-6 flex items-center justify-between relative">
          <img
            src={survivalLogo.src}
            alt="survival.fun"
            className="h-10 ml-6"
          />
          <appkit-button className="h-10 mr-6" />
        </header>

        {/* Main Content (Dynamic, Grows but Doesn't Force Scroll) */}
        <main className="flex-grow flex items-center justify-center px-4">{children}</main>

        {/* Footer (Fixed Height) */}
        <footer className="py-4 text-center text-gray-500 dark:text-gray-400 flex-none">
      
        </footer>
        
      </body>
    </html>
    </ContextProvider>
  );
}
