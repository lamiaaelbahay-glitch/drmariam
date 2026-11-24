import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroSectionProps {
  onExploreServices: () => void;
  onBookAppointment: () => void;
}

const HERO_VIDEO_SRC = '/assets/aistudio/Woman_in_dental_clinic_53a9ef73__1080p_249c0124.mp4';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreServices,
  onBookAppointment,
}) => {
  const { lang, isRtl } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    videoEl.muted = true;
    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay may be deferred on low-power mobile modes; video remains muted and ready.
      });
    }
  }, []);

  const content =
    lang === 'ar'
      ? {
          kicker: 'للعناية بالأسنان والتجميل',
          title: 'د. مريم إبراهيم',
          tagline: 'الابتسامة الجميلة تبدأ برعاية استثنائية.',
          primaryCta: 'احجز موعدك الآن',
          secondaryCta: 'استكشف خدماتنا',
          ariaLabel: 'عيادة د. مريم إبراهيم للعناية بالأسنان والتجميل',
        }
      : {
          kicker: 'Dental & Aesthetic Care',
          title: 'Dr. Mariam Ibrahim',
          tagline: 'A Beautiful Smile Begins With Exceptional Care.',
          primaryCta: 'Book An Appointment',
          secondaryCta: 'Explore Our Services',
          ariaLabel: 'Dr. Mariam Ibrahim Dental & Aesthetic Care',
        };

  return (
    <section
      id="home"
      aria-label={content.ariaLabel}
      className="relative z-20 flex min-h-[100svh] w-full items-end lg:items-center overflow-hidden bg-[#292725]"
    >
      {/* Exact Attached Cinematic Hero Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[26%_20%] sm:object-[30%_22%] lg:object-[25%_center]"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Measured Contrast Scrims — Keeps Dr. Mariam clearly luminous on left/upper frame while guaranteeing crisp readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1A18]/90 via-[#1C1A18]/42 to-[#1C1A18]/20 lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block bg-gradient-to-l from-[#1C1A18]/86 via-[#1C1A18]/48 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1C1A18]/45 to-transparent"
      />

      {/* Keep editorial column anchored to physical right side of frame so it never covers Dr. Mariam on the left */}
      <div dir="ltr" className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-28 sm:px-8 sm:pb-20 lg:px-12 lg:py-24">
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className="ml-auto max-w-xl lg:max-w-[540px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={`flex items-center gap-3.5 text-[13px] font-medium text-[#E8DED1] ${
              isRtl ? 'tracking-normal' : 'tracking-[0.18em]'
            }`}
          >
            <span className="h-px w-8 bg-[#C6A77B]" aria-hidden="true" />
            <span>{content.kicker}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`mt-4 text-[#FFFFFF] [text-wrap:balance] ${
              isRtl
                ? 'font-arabic text-[clamp(2.4rem,4.6vw,4.1rem)] font-semibold leading-[1.18]'
                : 'font-editorial text-[clamp(2.65rem,5vw,4.5rem)] font-medium leading-[1.06] tracking-[0.01em]'
            }`}
          >
            {content.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`mt-5 max-w-[34ch] text-[16px] sm:text-[18px] leading-[1.7] text-[#F7F3ED]/90 ${
              isRtl ? 'tracking-normal' : 'tracking-[0.01em]'
            }`}
          >
            {content.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4"
          >
            <button
              type="button"
              onClick={onBookAppointment}
              className={`group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-sm bg-[#F7F3ED] px-7 py-3.5 text-[14px] font-medium text-[#292725] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#E8DED1] cursor-pointer ${
                isRtl ? 'tracking-normal' : 'tracking-[0.03em]'
              }`}
            >
              <span>{content.primaryCta}</span>
              {isRtl ? (
                <ArrowLeft
                  className="h-4 w-4 text-[#96774B] transition-transform duration-200 group-hover:-translate-x-0.5"
                  strokeWidth={1.75}
                />
              ) : (
                <ArrowRight
                  className="h-4 w-4 text-[#96774B] transition-transform duration-200 group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                />
              )}
            </button>

            <button
              type="button"
              onClick={onExploreServices}
              className={`group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm border border-[#F7F3ED]/45 bg-[#1C1A18]/25 px-7 py-3.5 text-[14px] font-medium text-[#F7F3ED] backdrop-blur-xs whitespace-nowrap shrink-0 transition-colors duration-200 hover:border-[#C6A77B] hover:bg-[#1C1A18]/45 cursor-pointer ${
                isRtl ? 'tracking-normal' : 'tracking-[0.03em]'
              }`}
            >
              <span>{content.secondaryCta}</span>
              <ArrowDownRight
                className="h-4 w-4 text-[#C6A77B] transition-transform duration-200 group-hover:translate-y-0.5"
                strokeWidth={1.75}
              />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:flex flex-col items-center gap-2"
      >
        <span className="h-10 w-px bg-gradient-to-b from-[#C6A77B]/80 to-transparent" />
      </div>
    </section>
  );
};
