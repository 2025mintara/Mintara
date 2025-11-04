import { parseUnits, formatUnits } from 'viem';
import type { Address } from 'viem';

// Owner wallet address - ALL fees go here
export const OWNER_WALLET: Address = import.meta.env.VITE_OWNER_WALLET as Address || '0x71DEdF5544692aF64FC2ce040a2b3dA573957275';

// Base Mainnet USDC contract address
export const USDC_CONTRACT_ADDRESS: Address = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

// Fee amounts in USDC (6 decimals)
export const TOKEN_BUILDER_FEE = '1'; // 1 USDC
export const NFT_BUILDER_FEE = '1';   // 1 USDC

// USDC ABI - only the functions we need
export const USDC_ABI = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'allowance',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'approve',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'bool' }]
  }
] as const;

/**
 * Parse USDC amount (6 decimals) to wei
 */
export function parseUSDC(amount: string): bigint {
  return parseUnits(amount, 6);
}

/**
 * Format wei to USDC amount (6 decimals)
 */
export function formatUSDC(wei: bigint): string {
  return formatUnits(wei, 6);
}

/**
 * Get the fee amount for token builder in wei
 */
export function getTokenBuilderFee(): bigint {
  return parseUSDC(TOKEN_BUILDER_FEE);
}

/**
 * Get the fee amount for NFT builder in wei
 */
export function getNFTBuilderFee(): bigint {
  return parseUSDC(NFT_BUILDER_FEE);
}

/**
 * Validate that the owner wallet is correctly configured
 */
export function validateOwnerWallet(): boolean {
  if (!OWNER_WALLET || OWNER_WALLET === '0x') {
    console.error('OWNER_WALLET not configured in environment variables');
    return false;
  }
  return true;
}

/**
 * Get deployment fee based on environment variable or default
 */
export function getDeploymentFeeUSDC(): string {
  const envFee = import.meta.env.VITE_DEPLOYMENT_FEE_USDC;
  if (envFee) {
    return parseFloat(envFee).toString();
  }
  return TOKEN_BUILDER_FEE;
}
