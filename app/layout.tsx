import type { Metadata } from "next";
import survivalLogo from './assets/img/survivorLogo.png';
import '@coinbase/onchainkit/styles.css';
import "./globals.css";
import { type ReactNode } from 'react';
import { Providers } from './providers'; 
import {WalletComponents} from './wallet';


/**
 * Metadata for the page
 */
export const metadata: Metadata = {
  title: "survival.fun",
  description: "Survivor.fun is an onchain, AI-powered game where 10,000 Player NFTs enter a battle of creativity, chaos, and survival. Players guide AI agents by feeding them strategies for absurd survival scenarios. The Grim Reaper AI judges each response. If your agent dies, your NFT is burned. Welcome to *Survivor.fun*. The fun ends when your agent dies.",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
       
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-600 dark flex flex-col min-h-screen">
      <Providers>
        {/* Header (Fixed Height) */}
   
        <header className="py-6 flex items-center justify-between relative">
          <img
            src={survivalLogo.src}
            alt="survival.fun"
            className="h-10 ml-6"
          />
          <span className="h-10 mr-6"><WalletComponents /></span>
        </header>

        {/* Main Content (Dynamic, Grows but Doesn't Force Scroll) */}
        <main className="flex-grow flex items-center justify-center px-4">{props.children}</main>

        {/* Footer (Fixed Height) */}
        <footer className="py-4 text-center text-gray-500 dark:text-gray-400 flex-none">
      
        </footer>
        </Providers>
      </body>
    </html>
    
  );
}
