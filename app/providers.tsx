'use client';
 
import type { ReactNode } from 'react';
import reaper from './assets/img/reaper.png';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { baseSepolia, base } from 'wagmi/chains'; // add baseSepolia for testing 
 
export function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.ONCHAINKIT_API_KEY}
  chain={base}
  config={{
    appearance: {
      name: 'survival.fun',        // Displayed in modal header
      logo: 'https://altcoinsbox.com/wp-content/uploads/2023/02/base-logo-300x300.webp',// Displayed in modal header
      mode: 'auto',                 // 'light' | 'dark' | 'auto'
      theme: 'default',             // 'default' or custom theme
    },
    wallet: { 
      display: 'modal', 
      termsUrl: 'https://...', 
      privacyUrl: 'https://...', 
      supportedWallets: { 
        rabby: true, 
        trust: true, 
        frame: true, 
      }, 
      },
  }}
    >
      {props.children}
    </OnchainKitProvider>
  );
}