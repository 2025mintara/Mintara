// IPFS Integration using Web3.Storage or Pinata
export interface IPFSUploadResult {
  cid: string;
  url: string;
}

export async function uploadToIPFS(
  file: File | Blob,
  filename?: string
): Promise<IPFSUploadResult> {
  const ipfsKey = import.meta.env.VITE_IPFS_KEY;
  const ipfsProvider = import.meta.env.VITE_IPFS_PROVIDER || 'web3storage';

  if (!ipfsKey) {
    console.warn('IPFS key not found. Using mock upload.');
    return {
      cid: 'mock-cid-' + Date.now(),
      url: URL.createObjectURL(file),
    };
  }

  try {
    if (ipfsProvider === 'pinata') {
      return await uploadToPinata(file, filename, ipfsKey);
    } else {
      return await uploadToWeb3Storage(file, filename, ipfsKey);
    }
  } catch (error) {
    console.error('IPFS upload error:', error);
    throw error;
  }
}

async function uploadToPinata(
  file: File | Blob,
  filename: string | undefined,
  apiKey: string
): Promise<IPFSUploadResult> {
  const formData = new FormData();
  formData.append('file', file);
  if (filename) {
    formData.append('pinataMetadata', JSON.stringify({ name: filename }));
  }

  const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Pinata upload failed: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    cid: data.IpfsHash,
    url: `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`,
  };
}

async function uploadToWeb3Storage(
  file: File | Blob,
  filename: string | undefined,
  apiKey: string
): Promise<IPFSUploadResult> {
  const formData = new FormData();
  formData.append('file', file);
  if (filename) {
    formData.append('name', filename);
  }

  const response = await fetch('https://api.web3.storage/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Web3.Storage upload failed: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    cid: data.cid,
    url: `https://${data.cid}.ipfs.w3s.link`,
  };
}

export async function uploadJSONToIPFS(data: object): Promise<IPFSUploadResult> {
  const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  return uploadToIPFS(jsonBlob, 'metadata.json');
}
