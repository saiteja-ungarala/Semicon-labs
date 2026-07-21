/** Full-viewport loading state shown while a lazy route chunk loads. */
export function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-10 w-10">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-line border-t-blue" />
          <span className="absolute inset-2 rounded-full bg-blue/20" />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">Loading</p>
      </div>
    </div>
  );
}
