export function FeeBadge({ fee = '1 USDC' }: { fee?: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-mintara-accent/40 bg-mintara-accent/5 backdrop-blur-sm">
      <div className="w-2 h-2 rounded-full bg-mintara-accent animate-pulse"></div>
      <span className="text-sm font-medium text-mintara-text-primary">
        Flat Fee — {fee}
      </span>
    </div>
  );
}
