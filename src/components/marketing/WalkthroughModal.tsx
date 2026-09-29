import { Modal } from '@/components/ui/Modal';

interface WalkthroughModalProps {
  open: boolean;
  onClose: () => void;
}

export function WalkthroughModal({ open, onClose }: WalkthroughModalProps) {
  return (
    <Modal open={open} onClose={onClose} label="Semicon Labs Platform Walkthrough">
      <div className="overflow-hidden rounded-2xl border border-line-strong bg-[#0B0E24] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-2 font-mono text-xs font-semibold text-white/80">
              Platform Walkthrough · 1 Min Preview
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-blue-300">
            Live Demo
          </span>
        </div>
        <div className="relative aspect-video w-full bg-black">
          {open && (
            <iframe
              src="https://www.youtube-nocookie.com/embed/7qRjvRQaLMg?autoplay=1&rel=0&modestbranding=1&playsinline=1"
              title="Semicon Labs — Platform Walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          )}
        </div>
      </div>
    </Modal>
  );
}
