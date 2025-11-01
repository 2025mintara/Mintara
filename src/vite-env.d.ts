/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_RPC_URL: string;
  readonly VITE_WALLETCONNECT_PROJECT_ID: string;
  readonly VITE_HF_TOKEN: string;
  readonly VITE_PINATA_API_KEY: string;
  readonly VITE_PINATA_SECRET_KEY: string;
  readonly VITE_BASESCAN_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
