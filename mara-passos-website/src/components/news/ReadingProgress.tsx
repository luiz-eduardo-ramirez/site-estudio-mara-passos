"use client";

import { useEffect, useRef } from 'react';

/**
 * Barra de progresso de leitura fixa no topo.
 * Acompanha o scroll diretamente (sem animação temporizada), então não há
 * conflito com prefers-reduced-motion.
 */
export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const bar = barRef.current;
      if (!bar) return;

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progresso = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      bar.style.transform = `scaleX(${progresso})`;
    };

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed top-0 left-0 z-[60] h-[3px] w-full pointer-events-none">
      <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-mara-orange" />
    </div>
  );
}
