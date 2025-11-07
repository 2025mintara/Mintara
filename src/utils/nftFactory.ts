import type { Address } from 'viem';

export const NFT_FACTORY_ADDRESS: Address = '0x56ba49A2a1fcd316B92355B1ccc12638cC1EefA8';

export const NFT_FACTORY_ABI = [
  {
    name: 'createCollection',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'name', type: 'string' },
      { name: 'symbol', type: 'string' },
      { name: 'collectionName', type: 'string' },
      { name: 'collectionDescription', type: 'string' }
    ],
    outputs: [{ name: '', type: 'address' }]
  },
  {
    name: 'mintNFT',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'collectionAddress', type: 'address' },
      { name: 'tokenURI', type: 'string' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'getUserCollections',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{
      name: '',
      type: 'tuple[]',
      components: [
        { name: 'collectionAddress', type: 'address' },
        { name: 'name', type: 'string' },
        { name: 'symbol', type: 'string' },
        { name: 'collectionName', type: 'string' },
        { name: 'collectionDescription', type: 'string' },
        { name: 'owner', type: 'address' },
        { name: 'createdAt', type: 'uint256' }
      ]
    }]
  },
  {
    name: 'getAllCollections',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{
      name: '',
      type: 'tuple[]',
      components: [
        { name: 'collectionAddress', type: 'address' },
        { name: 'name', type: 'string' },
        { name: 'symbol', type: 'string' },
        { name: 'collectionName', type: 'string' },
        { name: 'collectionDescription', type: 'string' },
        { name: 'owner', type: 'address' },
        { name: 'createdAt', type: 'uint256' }
      ]
    }]
  },
  {
    name: 'getTotalCollections',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'NFTCollectionCreated',
    type: 'event',
    inputs: [
      { name: 'collectionAddress', type: 'address', indexed: true },
      { name: 'owner', type: 'address', indexed: true },
      { name: 'name', type: 'string', indexed: false },
      { name: 'symbol', type: 'string', indexed: false }
    ]
  },
  {
    name: 'NFTMinted',
    type: 'event',
    inputs: [
      { name: 'collectionAddress', type: 'address', indexed: true },
      { name: 'owner', type: 'address', indexed: true },
      { name: 'tokenId', type: 'uint256', indexed: false },
      { name: 'tokenURI', type: 'string', indexed: false }
    ]
  }
] as const;

export const ERC721_ABI = [
  {
    name: 'name',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }]
  },
  {
    name: 'symbol',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }]
  },
  {
    name: 'tokenURI',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ name: '', type: 'string' }]
  },
  {
    name: 'ownerOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ name: '', type: 'address' }]
  },
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'totalSupply',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }]
  },
  {
    name: 'safeMint',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'uri', type: 'string' }
    ],
    outputs: []
  }
] as const;
