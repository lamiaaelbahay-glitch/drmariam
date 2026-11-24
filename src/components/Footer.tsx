import React from 'react';
import { CLINIC_SETTINGS } from '../config/clinicSettings';
import { useLanguage } from '../i18n/LanguageContext';
import { FullClinicLogo } from './BrandLogo';

const FOOTER_LINKS = [
  { labelEn: 'Home', labelAr: 'الرئيسية', href: '#home' },
  { labelEn: 'About', labelAr: 'عن الدكتورة', href: '#about' },
  { labelEn: 'Services', labelAr: 'الخدمات', href: '#services' },
  { labelEn: 'Contact', labelAr: 'تواصل معنا', href: '#booking' },
] as const;

export const Footer: React.FC = () => {
  const { lang, toggleLang, isRtl } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialItems = [
    {
      name: 'Instagram',
      href: CLINIC_SETTINGS.socialLinks.instagram || '#booking',
      configured: Boolean(CLINIC_SETTINGS.socialLinks.instagram),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: CLINIC_SETTINGS.socialLinks.facebook || '#booking',
      configured: Boolean(CLINIC_SETTINGS.socialLinks.facebook),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
          <path d="M14.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.6V3.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.5H8.7V13h2.6v8h3.2Z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative z-20 bg-[#292725] text-[#F7F3ED]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <a
              href="#home"
              aria-label={lang === 'ar' ? 'العودة إلى الأعلى' : 'Back to top'}
              className="inline-block"
            >
              <FullClinicLogo width={185} />
            </a>
            <p className="mt-5 max-w-[38ch] text-[14px] leading-[1.75] text-[#E8DED1]/75">
              {lang === 'ar'
                ? 'الابتسامة الجميلة تبدأ برعاية استثنائية. رعاية أسنان علاجية وتجميلية مخصصة بدقة وراحة ونتائج تدوم.'
                : 'A Beautiful Smile Begins With Exceptional Care. Personalized dental and aesthetic treatments grounded in precision, comfort, and timeless artistry.'}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3">
            <h3
              className={`font-sans text-[12px] font-medium text-[#C6A77B] ${
                isRtl ? 'tracking-normal' : 'tracking-[0.16em]'
              }`}
            >
              {lang === 'ar' ? 'روابط سريعة' : 'Navigation'}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block py-0.5 text-[14px] text-[#E8DED1]/85 transition-colors hover:text-[#FFFFFF]"
                  >
                    {lang === 'ar' ? link.labelAr : link.labelEn}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={toggleLang}
                  className="inline-block py-0.5 text-[14px] text-[#C6A77B] transition-colors hover:text-[#FFFFFF] cursor-pointer"
                >
                  {lang === 'en' ? 'النسخة العربية' : 'English Version'}
                </button>
              </li>
            </ul>
          </div>

          {/* Social Media Placeholders Column */}
          <div className="lg:col-span-4">
            <h3
              className={`font-sans text-[12px] font-medium text-[#C6A77B] ${
                isRtl ? 'tracking-normal' : 'tracking-[0.16em]'
              }`}
            >
              {lang === 'ar' ? 'تواصل معنا' : 'Connect'}
            </h3>
            <p className="mt-4 text-[14px] leading-relaxed text-[#E8DED1]/75">
              {lang === 'ar'
                ? 'تابعوا عيادة د. مريم إبراهيم لأحدث النصائح والعناية بالابتسامة.'
                : 'Follow Dr. Mariam Ibrahim for clinic updates and smile care guidance.'}
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socialItems.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.configured ? '_blank' : undefined}
                  rel={social.configured ? 'noopener noreferrer' : undefined}
                  aria-label={social.name}
                  title={social.configured ? social.name : `${social.name} (configurable link)`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#F7F3ED]/15 text-[#E8DED1] transition-colors duration-200 hover:border-[#C6A77B] hover:text-[#C6A77B]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-[#F7F3ED]/12 pt-7 text-[13px] text-[#E8DED1]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} {CLINIC_SETTINGS.brandName[lang]}.{' '}
            {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <p className={isRtl ? 'tracking-normal' : 'tracking-[0.04em]'}>
            {CLINIC_SETTINGS.brandSubtitle[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
};
