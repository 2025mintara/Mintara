/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ONCHAINKIT_API_KEY: string
  readonly VITE_BASE_RPC_URL: string
  readonly VITE_NETWORK: string
  readonly VITE_CHAIN_ID: string
  readonly VITE_OWNER_WALLET: string
  readonly VITE_HF_TOKEN: string
  readonly VITE_PINATA_JWT: string
  readonly VITE_PINATA_GATEWAY: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_ENVIRONMENT: string
  readonly VITE_ENABLE_AI_AUDIT: string
  readonly VITE_DEPLOYMENT_FEE_USDC: string
  readonly VITE_DEFAULT_SUPPLY: string
  readonly VITE_PROJECT_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
