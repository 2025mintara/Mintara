export interface TokenLogoData {
  tokenAddress: string;
  logoUrl: string;
  tokenName: string;
  tokenSymbol: string;
  uploadedAt: number;
}

const STORAGE_KEY = 'mintara_token_logos';

export const saveTokenLogo = (data: TokenLogoData): void => {
  try {
    const existing = getTokenLogos();
    const updated = [...existing.filter(t => t.tokenAddress !== data.tokenAddress), data];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save token logo:', error);
  }
};

export const getTokenLogo = (tokenAddress: string): string | null => {
  try {
    const logos = getTokenLogos();
    const found = logos.find(t => t.tokenAddress.toLowerCase() === tokenAddress.toLowerCase());
    return found?.logoUrl || null;
  } catch (error) {
    console.error('Failed to get token logo:', error);
    return null;
  }
};

export const getTokenLogos = (): TokenLogoData[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get token logos:', error);
    return [];
  }
};

export const uploadToIPFS = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const metadata = JSON.stringify({
      name: `token-logo-${file.name}`,
      keyvalues: {
        type: 'token-logo',
        uploadedAt: new Date().toISOString()
      }
    });
    formData.append('pinataMetadata', metadata);

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_PINATA_JWT || ''}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Pinata error:', errorData);
      throw new Error(`IPFS upload failed: ${response.status}`);
    }

    const data = await response.json();
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    console.log('✅ Logo uploaded to IPFS:', ipfsUrl);
    return ipfsUrl;
  } catch (error) {
    console.error('❌ IPFS upload error:', error);
    throw error;
  }
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
