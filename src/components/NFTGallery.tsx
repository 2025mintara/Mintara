import { useState } from 'react';
import { ExternalLink, Info } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useReadContract } from 'wagmi';
import { ERC721_ABI } from '../utils/nftFactory';
import { getBaseScanUrl, getOpenSeaUrl } from '../utils/socialShare';
import type { Address } from 'viem';

interface NFTGalleryProps {
  nftCollections: Array<{
    collectionAddress: string;
    name: string;
    symbol: string;
    collectionName: string;
    collectionDescription: string;
  }>;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{ trait_type: string; value: string }>;
}

export function NFTGallery({ nftCollections }: NFTGalleryProps) {
  const [selectedNFT, setSelectedNFT] = useState<{
    collectionAddress: string;
    tokenId: number;
    metadata: NFTMetadata | null;
  } | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nftCollections.map((collection) => (
          <NFTCollectionCard
            key={collection.collectionAddress}
            collection={collection}
            onNFTClick={(tokenId, metadata) =>
              setSelectedNFT({
                collectionAddress: collection.collectionAddress,
                tokenId,
                metadata,
              })
            }
          />
        ))}
      </div>

      {nftCollections.length === 0 && (
        <Card className="p-12 bg-mintara-surface/50 border-mintara-border text-center">
          <p className="text-mintara-text-secondary">
            No NFTs minted yet. Create your first NFT with AI NFT Builder!
          </p>
        </Card>
      )}

      {selectedNFT && (
        <NFTDetailModal
          isOpen={!!selectedNFT}
          onClose={() => setSelectedNFT(null)}
          collectionAddress={selectedNFT.collectionAddress}
          tokenId={selectedNFT.tokenId}
          metadata={selectedNFT.metadata}
        />
      )}
    </>
  );
}

function NFTCollectionCard({
  collection,
  onNFTClick,
}: {
  collection: any;
  onNFTClick: (tokenId: number, metadata: NFTMetadata | null) => void;
}) {
  const { data: totalSupply } = useReadContract({
    address: collection.collectionAddress as Address,
    abi: ERC721_ABI,
    functionName: 'totalSupply',
  });

  const nftCount = Number(totalSupply || 0);

  return (
    <Card className="p-6 bg-mintara-surface/50 border-mintara-border hover:border-mintara-accent/50 transition-all">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-mintara-text-primary mb-1">
          {collection.collectionName}
        </h3>
        <p className="text-sm text-mintara-text-secondary mb-2">
          {collection.symbol} • {nftCount} NFT{nftCount !== 1 ? 's' : ''}
        </p>
        <p className="text-xs text-mintara-text-secondary line-clamp-2">
          {collection.collectionDescription}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {Array.from({ length: Math.min(nftCount, 4) }).map((_, index) => (
          <NFTPreview
            key={index}
            collectionAddress={collection.collectionAddress}
            tokenId={index}
            onClick={(metadata) => onNFTClick(index, metadata)}
          />
        ))}
        {nftCount === 0 && (
          <div className="col-span-2 aspect-square bg-mintara-background rounded-lg flex items-center justify-center">
            <p className="text-xs text-mintara-text-secondary">No NFTs yet</p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-mintara-border text-mintara-text-primary"
          onClick={() =>
            window.open(getOpenSeaUrl(collection.collectionAddress), '_blank')
          }
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          OpenSea
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 border-mintara-border text-mintara-text-primary"
          onClick={() =>
            window.open(getBaseScanUrl(collection.collectionAddress, 'address'), '_blank')
          }
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          BaseScan
        </Button>
      </div>
    </Card>
  );
}

function NFTPreview({
  collectionAddress,
  tokenId,
  onClick,
}: {
  collectionAddress: string;
  tokenId: number;
  onClick: (metadata: NFTMetadata | null) => void;
}) {
  const { data: tokenURI } = useReadContract({
    address: collectionAddress as Address,
    abi: ERC721_ABI,
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
  });

  let metadata: NFTMetadata | null = null;
  try {
    if (tokenURI && typeof tokenURI === 'string') {
      metadata = JSON.parse(tokenURI);
    }
  } catch (e) {
    console.error('Failed to parse NFT metadata:', e);
  }

  return (
    <button
      onClick={() => onClick(metadata)}
      className="aspect-square bg-mintara-background rounded-lg overflow-hidden hover:ring-2 hover:ring-mintara-accent transition-all group"
    >
      {metadata?.image ? (
        <img
          src={metadata.image}
          alt={metadata.name || 'NFT'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Info className="w-6 h-6 text-mintara-text-secondary" />
        </div>
      )}
    </button>
  );
}

function NFTDetailModal({
  isOpen,
  onClose,
  collectionAddress,
  tokenId,
  metadata,
}: {
  isOpen: boolean;
  onClose: () => void;
  collectionAddress: string;
  tokenId: number;
  metadata: NFTMetadata | null;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-mintara-surface border-mintara-border max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-mintara-text-primary">
            {metadata?.name || `NFT #${tokenId}`}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {metadata?.image && (
            <div className="aspect-square bg-mintara-background rounded-lg overflow-hidden">
              <img
                src={metadata.image}
                alt={metadata.name || 'NFT'}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          
          {metadata?.description && (
            <div>
              <h4 className="text-sm font-medium text-mintara-text-primary mb-2">
                Description
              </h4>
              <p className="text-sm text-mintara-text-secondary">
                {metadata.description}
              </p>
            </div>
          )}

          {metadata?.attributes && metadata.attributes.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-mintara-text-primary mb-2">
                Attributes
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {metadata.attributes.map((attr, index) => (
                  <div
                    key={index}
                    className="p-3 bg-mintara-background rounded-lg border border-mintara-border"
                  >
                    <p className="text-xs text-mintara-text-secondary mb-1">
                      {attr.trait_type}
                    </p>
                    <p className="text-sm text-mintara-text-primary font-medium">
                      {attr.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 border-mintara-border"
              onClick={() =>
                window.open(getOpenSeaUrl(collectionAddress, tokenId.toString()), '_blank')
              }
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on OpenSea
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-mintara-border"
              onClick={() =>
                window.open(getBaseScanUrl(collectionAddress, 'address'), '_blank')
              }
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View on BaseScan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
