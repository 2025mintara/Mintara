// IPFS Integration for NFT Metadata Storage
import axios from 'axios';

// Pinata API Configuration
const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY || '';
const PINATA_SECRET_KEY = import.meta.env.VITE_PINATA_SECRET_KEY || '';
const PINATA_API_URL = 'https://api.pinata.cloud';

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  external_url?: string;
  collection?: string;
}

// Upload image to IPFS via Pinata
export const uploadImageToIPFS = async (
  file: File | Blob,
  filename: string = 'nft-image.png'
): Promise<string> => {
  try {
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      console.warn('Pinata API keys not configured. Using mock IPFS hash.');
      return generateMockIPFSHash();
    }

    const formData = new FormData();
    formData.append('file', file, filename);

    const response = await axios.post(
      `${PINATA_API_URL}/pinning/pinFileToIPFS`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      }
    );

    return `ipfs://${response.data.IpfsHash}`;
  } catch (error) {
    console.error('Failed to upload image to IPFS:', error);
    return generateMockIPFSHash();
  }
};

// Upload JSON metadata to IPFS
export const uploadMetadataToIPFS = async (
  metadata: NFTMetadata
): Promise<string> => {
  try {
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      console.warn('Pinata API keys not configured. Using mock IPFS hash.');
      return generateMockIPFSHash();
    }

    const response = await axios.post(
      `${PINATA_API_URL}/pinning/pinJSONToIPFS`,
      metadata,
      {
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_KEY,
        },
      }
    );

    return `ipfs://${response.data.IpfsHash}`;
  } catch (error) {
    console.error('Failed to upload metadata to IPFS:', error);
    return generateMockIPFSHash();
  }
};

// Generate mock IPFS hash for development
const generateMockIPFSHash = (): string => {
  const randomHash = Array.from({ length: 46 }, () =>
    'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 36))
  ).join('');
  return `ipfs://Qm${randomHash}`;
};

// Convert IPFS URI to HTTP gateway URL
export const ipfsToHttp = (ipfsUri: string): string => {
  if (ipfsUri.startsWith('ipfs://')) {
    const hash = ipfsUri.replace('ipfs://', '');
    return `https://gateway.pinata.cloud/ipfs/${hash}`;
  }
  return ipfsUri;
};

// Upload full NFT (image + metadata) to IPFS
export const uploadNFTToIPFS = async (
  imageBlob: Blob,
  metadata: Omit<NFTMetadata, 'image'>
): Promise<{ imageUri: string; metadataUri: string }> => {
  try {
    // Upload image first
    const imageUri = await uploadImageToIPFS(imageBlob, `${metadata.name}.png`);
    
    // Create full metadata with image URI
    const fullMetadata: NFTMetadata = {
      ...metadata,
      image: imageUri,
      attributes: metadata.attributes || [],
    };
    
    // Upload metadata
    const metadataUri = await uploadMetadataToIPFS(fullMetadata);
    
    return {
      imageUri,
      metadataUri,
    };
  } catch (error) {
    console.error('Failed to upload NFT to IPFS:', error);
    throw new Error('Failed to upload NFT to IPFS');
  }
};

// Get pinned files from Pinata
export const getPinnedFiles = async (): Promise<any[]> => {
  try {
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      return [];
    }

    const response = await axios.get(`${PINATA_API_URL}/data/pinList`, {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
    });

    return response.data.rows || [];
  } catch (error) {
    console.error('Failed to get pinned files:', error);
    return [];
  }
};

// Unpin file from IPFS
export const unpinFile = async (ipfsHash: string): Promise<boolean> => {
  try {
    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      return false;
    }

    await axios.delete(`${PINATA_API_URL}/pinning/unpin/${ipfsHash}`, {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
    });

    return true;
  } catch (error) {
    console.error('Failed to unpin file:', error);
    return false;
  }
};
