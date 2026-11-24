import React, { useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

const DOCTOR_PORTRAIT_SRC = '/assets/aistudio/image_de151fb9.png';

/**
 * Full-Viewport Scroll-Following Transparent Portrait Backdrop
 *
 * Keeps Dr. Mariam Ibrahim's portrait gracefully integrated into the entire page
 * background as the visitor scrolls through About, Services, and Booking.
 * Hardware-accelerated via `fixed inset-0` + compositor-only GPU transforms
 * for smooth 60fps behavior on both mobile (iOS/Android) and desktop.
 */
export const ScrollPortraitBackdrop: React.FC = () => {
  const { isRtl } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const portraitY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [18, -22]);
  const portraitScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.04]
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#F7F3ED] select-none"
    >
      {/* Ambient Warm Champagne Studio Halo */}
      <div
        className={`absolute top-1/2 h-[540px] w-[540px] sm:h-[680px] sm:w-[680px] lg:h-[860px] lg:w-[860px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,222,209,0.92)_0%,rgba(198,167,123,0.14)_44%,rgba(247,243,237,0)_74%)] transition-all duration-500 ${
          isRtl
            ? 'left-1/2 -translate-x-1/2 lg:left-[3%] lg:translate-x-0'
            : 'left-1/2 -translate-x-1/2 lg:left-auto lg:right-[3%] lg:translate-x-0'
        }`}
      />

      {/* Fixed Transparent Portrait Layer — Centered softly on Mobile/Tablet, Asymmetric Luxury Editorial on Desktop */}
      {!imageError && (
        <motion.div
          style={{ y: portraitY, scale: portraitScale }}
          className={`absolute inset-x-0 bottom-0 top-16 sm:top-20 flex items-end justify-center will-change-transform ${
            isRtl
              ? 'lg:justify-start lg:pl-[4%] xl:pl-[7%]'
              : 'lg:justify-end lg:pr-[4%] xl:pr-[7%]'
          }`}
        >
          <img
            src={DOCTOR_PORTRAIT_SRC}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="h-[82dvh] max-h-[680px] sm:h-[86dvh] sm:max-h-[780px] lg:h-[90dvh] lg:max-h-[880px] w-auto max-w-[92vw] object-contain object-bottom opacity-[0.20] sm:opacity-[0.24] lg:opacity-[0.34] saturate-[0.88] contrast-[0.95] [mask-image:radial-gradient(ellipse_78%_88%_at_50%_44%,black_46%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_78%_88%_at_50%_44%,black_46%,transparent_100%)]"
          />
        </motion.div>
      )}

      {/* Soft Ivory Edge Melts — Guarantees zero hard boundaries on any screen size */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#F7F3ED] via-[#F7F3ED]/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F7F3ED] via-[#F7F3ED]/70 to-transparent" />

      {/* Subtle Directional Reading Veil on Desktop */}
      <div
        className={`hidden lg:block absolute inset-0 ${
          isRtl
            ? 'bg-gradient-to-l from-[#F7F3ED]/85 via-[#F7F3ED]/45 to-transparent'
            : 'bg-gradient-to-r from-[#F7F3ED]/85 via-[#F7F3ED]/45 to-transparent'
        }`}
      />
    </div>
  );
};
