'use client';
import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { base } from 'wagmi/chains'; // add baseSepolia for testing 
 
export function Providers(props: { children: ReactNode }) {

  return (
     <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_CDP_API_KEY_NAME}
      chain={base}
    >
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
     </MiniKitProvider>
  );
}