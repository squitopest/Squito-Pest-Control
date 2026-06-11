type FunnelProgressProps = {
  step: number;
  total?: number;
};

export default function FunnelProgress({
  step,
  total = 4,
}: FunnelProgressProps) {
  const pct = Math.min(100, Math.max(0, (step / total) * 100));

  return (
    <div className="w-full max-w-xl mx-auto mb-10 md:mb-12">
      <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-600 to-green-500 transition-all duration-700 ease-out rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
