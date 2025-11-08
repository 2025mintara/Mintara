import { createContext, useContext, ReactNode } from 'react';
import sdk from '@farcaster/miniapp-sdk';

interface FarcasterContextType {
  sdk: typeof sdk;
  isInFarcaster: boolean;
}

const FarcasterContext = createContext<FarcasterContextType | null>(null);

export function FarcasterProvider({ children }: { children: ReactNode }) {
  const isInFarcaster = typeof window !== 'undefined' && 
    (window.parent !== window || navigator.userAgent.includes('Farcaster'));

  return (
    <FarcasterContext.Provider value={{ sdk, isInFarcaster }}>
      {children}
    </FarcasterContext.Provider>
  );
}

export function useFarcaster() {
  const context = useContext(FarcasterContext);
  if (!context) {
    throw new Error('useFarcaster must be used within FarcasterProvider');
  }
  return context;
}
