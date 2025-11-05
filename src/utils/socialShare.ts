export function shareOnTwitter(text: string, url?: string) {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}${url ? `&url=${encodeURIComponent(url)}` : ''}`;
  window.open(twitterUrl, '_blank', 'width=550,height=420');
}

export function getBaseScanUrl(address: string, type: 'address' | 'token' | 'tx' = 'address'): string {
  return `https://basescan.org/${type}/${address}`;
}

export function getOpenSeaUrl(contractAddress: string, tokenId?: string): string {
  const baseUrl = 'https://opensea.io/assets/base';
  return tokenId ? `${baseUrl}/${contractAddress}/${tokenId}` : `${baseUrl}/${contractAddress}`;
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
