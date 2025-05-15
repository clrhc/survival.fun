import type { Metadata } from "next";
import { type ReactNode } from 'react';
import { Providers } from './providers'; 



/**
 * Metadata for the page
 */
export const metadata: Metadata = {
  title: "survival.fun",
  description: "Survivor.fun is an onchain, AI-powered game where 10,000 Player NFTs enter a battle of creativity, chaos, and survival. Players guide AI agents by feeding them strategies for absurd survival scenarios. The Grim Reaper AI judges each response. If your agent dies, your NFT is burned. Welcome to *Survivor.fun*. The fun ends when your agent dies.",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
       <Providers>
        {props.children}
     </Providers>
  );
}
