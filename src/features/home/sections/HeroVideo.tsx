import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { useRef, useEffect } from 'react';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force playback on mount in case browser blocks declarative autoPlay
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, []);

  return (
    <section className="relative -mt-6 sm:-mt-10 z-20 pb-16 sm:pb-24">
      <Container className="px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl rounded-[1.5rem] sm:rounded-[2.5rem] bg-white p-2 sm:p-4 shadow-[0_24px_80px_-12px_rgba(28,20,120,0.15)] border border-line/40"
        >
          <div className="relative overflow-hidden rounded-[1rem] sm:rounded-[2rem] bg-void-2 aspect-video flex items-center justify-center group">
            {/* The actual video */}
            <video 
              ref={videoRef}
              src="/video/so_this_video_change_it_comple.mp4"
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover rounded-[1rem] sm:rounded-[2rem]"
            />
            {/* Inner shadow overlay for depth */}
            <div className="absolute inset-0 rounded-[1rem] sm:rounded-[2rem] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] pointer-events-none" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
