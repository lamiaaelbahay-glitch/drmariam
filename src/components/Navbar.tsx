import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Globe, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CLINIC_SETTINGS } from '../config/clinicSettings';
import { useLanguage } from '../i18n/LanguageContext';
import { FullClinicLogo, HorizontalLogo } from './BrandLogo';

interface NavbarProps {
  onBookClick: () => void;
}

const DOCTOR_PORTRAIT_SRC = '/assets/aistudio/image_de151fb9.png';

const NAV_LINKS = [
  {
    index: '01',
    labelEn: 'Home',
    labelAr: 'الرئيسية',
    descEn: 'Welcome & Showcase',
    descAr: 'الواجهة الرئيسية للعيادة',
    href: '#home',
  },
  {
    index: '02',
    labelEn: 'About',
    labelAr: 'عن الدكتورة',
    descEn: 'Meet Dr. Mariam Ibrahim',
    descAr: 'تعرّف على د. مريم إبراهيم',
    href: '#about',
  },
  {
    index: '03',
    labelEn: 'Services',
    labelAr: 'الخدمات',
    descEn: 'Dental, Aesthetics & Home Visits',
    descAr: 'الأسنان والتجميل والزيارات المنزلية',
    href: '#services',
  },
  {
    index: '04',
    labelEn: 'Contact',
    labelAr: 'تواصل معنا',
    descEn: 'WhatsApp Appointment',
    descAr: 'حجز المواعيد عبر واتساب',
    href: '#booking',
  },
] as const;

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const { lang, setLang, isRtl } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleMobileNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled
            ? 'bg-[#F7F3ED]/95 backdrop-blur-md border-b border-[#E8DED1]'
            : 'bg-gradient-to-b from-[#1F1D1B]/60 via-[#1F1D1B]/25 to-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-[68px] lg:h-[76px] max-w-7xl items-center justify-between gap-8 px-5 sm:px-8 lg:px-12">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#home"
            aria-label={
              lang === 'ar'
                ? `${CLINIC_SETTINGS.brandName.ar} — الرئيسية`
                : `${CLINIC_SETTINGS.brandName.en} — Home`
            }
            className="inline-flex items-center whitespace-nowrap shrink-0 focus-visible:rounded-sm"
          >
            <HorizontalLogo
              variant={scrolled ? 'dark' : 'light'}
              showSubtitle={false}
              lang={lang}
            />
          </a>

          {/* Zone 2: Clean Single-Line Navigation Links + Language Switch */}
          <nav
            aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}
            className="hidden md:flex items-center gap-7 lg:gap-9"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group relative py-1 text-[14px] font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ${
                  isRtl ? 'tracking-normal' : 'tracking-[0.02em]'
                } ${
                  scrolled
                    ? 'text-[#4B4640] hover:text-[#292725]'
                    : 'text-[#F7F3ED]/90 hover:text-[#FFFFFF]'
                }`}
              >
                {lang === 'ar' ? link.labelAr : link.labelEn}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#C6A77B] transition-transform duration-200 ease-out group-hover:scale-x-100"
                />
              </a>
            ))}

            {/* Distinctive Luxury Segmented Language Switcher (Desktop) */}
            <div
              role="group"
              aria-label={lang === 'ar' ? 'اختيار اللغة' : 'Select language'}
              className={`inline-flex items-center gap-1 rounded-sm border p-0.5 transition-colors duration-200 shrink-0 ${
                scrolled
                  ? 'border-[#D8CBB8] bg-[#EFE8DD]/85'
                  : 'border-[#C6A77B]/45 bg-[#1F1D1B]/45 backdrop-blur-xs'
              }`}
            >
              <span
                aria-hidden="true"
                className={`inline-flex items-center justify-center ps-2 pe-1 ${
                  scrolled ? 'text-[#96774B]' : 'text-[#C6A77B]'
                }`}
              >
                <Globe className="h-3.5 w-3.5" strokeWidth={1.75} />
              </span>
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`min-h-[30px] rounded-[2px] px-2.5 text-[12px] font-semibold tracking-[0.06em] whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  lang === 'en'
                    ? scrolled
                      ? 'bg-[#292725] text-[#F7F3ED] shadow-xs'
                      : 'bg-[#C6A77B] text-[#1F1D1B] shadow-xs'
                    : scrolled
                      ? 'text-[#59534C] hover:text-[#292725]'
                      : 'text-[#E8DED1]/80 hover:text-[#FFFFFF]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('ar')}
                aria-pressed={lang === 'ar'}
                className={`font-arabic min-h-[30px] rounded-[2px] px-2.5 text-[12px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  lang === 'ar'
                    ? scrolled
                      ? 'bg-[#292725] text-[#F7F3ED] shadow-xs'
                      : 'bg-[#C6A77B] text-[#1F1D1B] shadow-xs'
                    : scrolled
                      ? 'text-[#59534C] hover:text-[#292725]'
                      : 'text-[#E8DED1]/80 hover:text-[#FFFFFF]'
                }`}
              >
                عربي
              </button>
            </div>
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Distinctive Compact Segmented Language Switcher (Mobile) */}
            <div
              role="group"
              aria-label={lang === 'ar' ? 'اختيار اللغة' : 'Select language'}
              className={`md:hidden inline-flex items-center gap-0.5 rounded-sm border p-0.5 transition-colors duration-200 shrink-0 ${
                scrolled
                  ? 'border-[#D8CBB8] bg-[#EFE8DD]/90'
                  : 'border-[#C6A77B]/45 bg-[#1F1D1B]/50 backdrop-blur-xs'
              }`}
            >
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`min-h-[32px] rounded-[2px] px-2 text-[11px] font-semibold tracking-[0.05em] whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  lang === 'en'
                    ? scrolled
                      ? 'bg-[#292725] text-[#F7F3ED]'
                      : 'bg-[#C6A77B] text-[#1F1D1B]'
                    : scrolled
                      ? 'text-[#59534C]'
                      : 'text-[#E8DED1]/80'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('ar')}
                aria-pressed={lang === 'ar'}
                className={`font-arabic min-h-[32px] rounded-[2px] px-2 text-[11px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  lang === 'ar'
                    ? scrolled
                      ? 'bg-[#292725] text-[#F7F3ED]'
                      : 'bg-[#C6A77B] text-[#1F1D1B]'
                    : scrolled
                      ? 'text-[#59534C]'
                      : 'text-[#E8DED1]/80'
                }`}
              >
                عربي
              </button>
            </div>

            <button
              type="button"
              onClick={onBookClick}
              className={`hidden sm:inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer ${
                isRtl ? 'tracking-normal' : 'tracking-[0.04em]'
              } ${
                scrolled
                  ? 'bg-[#292725] text-[#F7F3ED] hover:bg-[#3E3A36]'
                  : 'bg-[#F7F3ED] text-[#292725] hover:bg-[#E8DED1]'
              }`}
            >
              {lang === 'ar' ? 'احجز موعدك' : 'Book Appointment'}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={lang === 'ar' ? 'فتح القائمة' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className={`md:hidden inline-flex h-11 w-11 items-center justify-center rounded-sm transition-colors duration-200 cursor-pointer ${
                scrolled
                  ? 'text-[#292725] hover:bg-[#E8DED1]/60'
                  : 'text-[#F7F3ED] hover:bg-white/10'
              }`}
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {/* Bespoke Luxury Atelier Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 md:hidden bg-[#141210]/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: isRtl ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '-100%' : '100%' }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              aria-label={lang === 'ar' ? 'قائمة الهاتف' : 'Mobile navigation'}
              className={`${
                isRtl ? 'mr-auto border-r' : 'ml-auto border-l'
              } relative flex h-[100dvh] w-[88vw] max-w-[375px] flex-col justify-between overflow-y-auto bg-[#22201E] text-[#F7F3ED] border-[#C6A77B]/25 shadow-[0_24px_60px_rgba(0,0,0,0.45)]`}
            >
              {/* Atmospheric Background Layer inside Drawer */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden select-none"
              >
                {/* Warm Champagne Ambient Glow */}
                <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(198,167,123,0.16)_0%,rgba(34,32,30,0)_72%)]" />

                {/* Subtle Blended Portrait Silhouette in Lower Background */}
                <img
                  src={DOCTOR_PORTRAIT_SRC}
                  alt=""
                  referrerPolicy="no-referrer"
                  className={`absolute bottom-14 h-[52%] w-auto object-contain object-bottom opacity-[0.09] saturate-[0.75] [mask-image:radial-gradient(ellipse_75%_82%_at_50%_46%,black_38%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_75%_82%_at_50%_46%,black_38%,transparent_100%)] ${
                    isRtl ? '-left-8' : '-right-8'
                  }`}
                />

                {/* Refined Inner Champagne Architectural Hairline Border */}
                <div className="absolute inset-3 rounded-[2px] border border-[#C6A77B]/15" />
              </div>

              {/* Top Brand Showcase & Close Trigger */}
              <div className="relative z-10 px-7 pt-7">
                <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#C6A77B]/20">
                  <div className="pt-1">
                    <FullClinicLogo width={132} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label={lang === 'ar' ? 'إغلاق القائمة' : 'Close navigation menu'}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C6A77B]/30 bg-[#2C2926]/80 text-[#E8DED1] transition-colors duration-200 hover:border-[#C6A77B] hover:text-[#FFFFFF] cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" strokeWidth={1.65} />
                  </button>
                </div>

                {/* Numbered Editorial Navigation Links */}
                <nav className="mt-6 flex flex-col">
                  {NAV_LINKS.map((link, idx) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.32,
                        delay: 0.06 + idx * 0.045,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMobileNavClick(link.href);
                      }}
                      className="group flex min-h-[64px] items-center justify-between gap-4 border-b border-[#F7F3ED]/10 py-3.5 transition-colors hover:border-[#C6A77B]/45"
                    >
                      <div className="flex items-baseline gap-3.5 min-w-0">
                        <span className="text-[11px] font-medium tabular-nums tracking-[0.14em] text-[#C6A77B]">
                          {link.index}
                        </span>
                        <div className="min-w-0">
                          <span
                            className={`block text-[#F7F3ED] transition-colors group-hover:text-[#C6A77B] ${
                              isRtl
                                ? 'font-arabic text-[20px] font-semibold leading-snug'
                                : 'font-editorial text-[26px] font-normal leading-none'
                            }`}
                          >
                            {lang === 'ar' ? link.labelAr : link.labelEn}
                          </span>
                          <span className="mt-1 block truncate text-[12px] text-[#E8DED1]/55">
                            {lang === 'ar' ? link.descAr : link.descEn}
                          </span>
                        </div>
                      </div>

                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C6A77B]/20 text-[#C6A77B] transition-all duration-200 group-hover:border-[#C6A77B] group-hover:bg-[#C6A77B]/10">
                        {isRtl ? (
                          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
                        ) : (
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                        )}
                      </span>
                    </motion.a>
                  ))}
                </nav>

                {/* Refined Segmented Bilingual Switcher */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-7"
                >
                  <div className="mb-2.5 flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] text-[#C6A77B]/85">
                    <Globe className="h-3.5 w-3.5" strokeWidth={1.65} />
                    <span>{lang === 'ar' ? 'لغة العرض' : 'Language'}</span>
                  </div>
                  <div
                    role="group"
                    aria-label={lang === 'ar' ? 'اختيار اللغة' : 'Select language'}
                    className="grid grid-cols-2 gap-1.5 rounded-sm border border-[#C6A77B]/25 bg-[#191715]/80 p-1"
                  >
                    <button
                      type="button"
                      onClick={() => setLang('en')}
                      aria-pressed={lang === 'en'}
                      className={`min-h-[40px] rounded-[2px] text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                        lang === 'en'
                          ? 'bg-[#C6A77B] text-[#22201E]'
                          : 'text-[#E8DED1]/75 hover:text-[#FFFFFF]'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setLang('ar')}
                      aria-pressed={lang === 'ar'}
                      className={`font-arabic min-h-[40px] rounded-[2px] text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                        lang === 'ar'
                          ? 'bg-[#C6A77B] text-[#22201E]'
                          : 'text-[#E8DED1]/75 hover:text-[#FFFFFF]'
                      }`}
                    >
                      العربية
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Signature Action Block */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.34, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 mt-8 px-7 pb-7 pt-5 border-t border-[#C6A77B]/20"
              >
                <p
                  className={`text-[12px] text-[#E8DED1]/65 mb-3 ${
                    isRtl ? 'tracking-normal' : 'tracking-[0.14em]'
                  }`}
                >
                  {CLINIC_SETTINGS.brandSubtitle[lang]}
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <a
                    href={CLINIC_SETTINGS.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[#C6A77B]/30 text-[#E8DED1] hover:border-[#C6A77B] hover:text-[#C6A77B]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                  <a
                    href={CLINIC_SETTINGS.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[#C6A77B]/30 text-[#E8DED1] hover:border-[#C6A77B] hover:text-[#C6A77B]"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                      <path d="M14.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.6V3.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.5H8.7V13h2.6v8h3.2Z" />
                    </svg>
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookClick();
                  }}
                  className={`group inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-sm bg-[#F7F3ED] px-6 py-3.5 text-[14px] font-medium text-[#22201E] transition-colors duration-200 hover:bg-[#E8DED1] cursor-pointer ${
                    isRtl ? 'tracking-normal' : 'tracking-[0.04em]'
                  }`}
                >
                  <Calendar className="h-4 w-4 text-[#96774B]" strokeWidth={1.8} />
                  <span>{lang === 'ar' ? 'احجز موعدك الآن' : 'Book An Appointment'}</span>
                </button>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
