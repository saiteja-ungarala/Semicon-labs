import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { useRef, useEffect } from 'react';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 }); // Play when 30% visible

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);

  return (
    <section className="relative -mt-6 sm:-mt-10 z-20 pb-16 sm:pb-24">
      <Container className="px-4 sm:px-6">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 48, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl rounded-[1.5rem] sm:rounded-[2.5rem] bg-white p-2 sm:p-4 shadow-[0_24px_80px_-12px_rgba(28,20,120,0.15)] border border-line/40"
        >
          <div className="relative overflow-hidden rounded-[1rem] sm:rounded-[2rem] bg-void-2 aspect-video flex items-center justify-center group">
            {/* The actual video */}
            <video 
              ref={videoRef}
              src="/video/so_this_video_change_it_comple.mp4"
              controls
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
