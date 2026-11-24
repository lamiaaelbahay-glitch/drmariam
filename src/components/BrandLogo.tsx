import React from 'react';
import { CLINIC_SETTINGS } from '../config/clinicSettings';
import type { Language } from '../i18n/LanguageContext';

export const CLINIC_LOGO_SRC = '/assets/aistudio/image_a025e2c5.png';

interface MonogramLogoProps {
  size?: number;
  variant?: 'dark' | 'light';
  className?: string;
}

/**
 * Compact Emblem Logo — Displays the tooth, butterfly, and profile emblem cropped
 * cleanly from the official uploaded clinic logo.
 * On light surfaces ('dark' variant), places the metallic pearl-and-gold emblem
 * inside a refined deep charcoal medallion so every highlight remains crisp.
 */
export const MonogramLogo: React.FC<MonogramLogoProps> = ({
  size = 42,
  variant = 'dark',
  className = '',
}) => {
  const showDarkMedallion = variant === 'dark';

  return (
    <span
      style={{ width: size, height: size }}
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-sm transition-colors duration-200 ${
        showDarkMedallion
          ? 'bg-[#292725] border border-[#C6A77B]/45 p-[3px]'
          : 'bg-transparent'
      } ${className}`}
    >
      <span className="relative h-full w-full overflow-hidden">
        <img
          src={CLINIC_LOGO_SRC}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute max-w-none select-none"
          style={{
            width: '455%',
            height: 'auto',
            left: '-168%',
            top: '-42%',
          }}
        />
      </span>
    </span>
  );
};

interface FullClinicLogoProps {
  width?: number;
  className?: string;
}

/**
 * Full Official Clinic Logo — Renders the complete transparent PNG artwork
 * tightly cropped to its exact bounds for rich presentation on dark surfaces.
 */
export const FullClinicLogo: React.FC<FullClinicLogoProps> = ({
  width = 210,
  className = '',
}) => {
  const height = Math.round(width / 1.14);

  return (
    <span
      style={{ width, height }}
      className={`relative inline-block shrink-0 overflow-hidden ${className}`}
    >
      <img
        src={CLINIC_LOGO_SRC}
        alt="Dr. Mariam Ibrahim Dental & Aesthetic Clinic"
        className="pointer-events-none absolute max-w-none select-none"
        style={{
          width: '228.7%',
          height: 'auto',
          left: '-64.35%',
          top: '-24.4%',
        }}
      />
    </span>
  );
};

interface HorizontalLogoProps {
  variant?: 'dark' | 'light';
  showSubtitle?: boolean;
  lang?: Language;
  className?: string;
}

/**
 * Main Horizontal Logo — Pairs the official clinic emblem with clean editorial typography.
 */
export const HorizontalLogo: React.FC<HorizontalLogoProps> = ({
  variant = 'dark',
  showSubtitle = false,
  lang = 'en',
  className = '',
}) => {
  const titleColor = variant === 'light' ? 'text-[#F7F3ED]' : 'text-[#292725]';
  const subtitleColor = variant === 'light' ? 'text-[#C6A77B]' : 'text-[#8B6F46]';
  const dividerColor = variant === 'light' ? 'bg-[#C6A77B]/45' : 'bg-[#C6A77B]/55';
  const isArabic = lang === 'ar';

  return (
    <span className={`inline-flex items-center gap-3 shrink-0 ${className}`}>
      <MonogramLogo size={showSubtitle ? 48 : 42} variant={variant} className="shrink-0" />
      <span className={`h-6 w-px shrink-0 ${dividerColor}`} aria-hidden="true" />
      <span className="flex flex-col leading-none">
        <span
          className={`whitespace-nowrap ${titleColor} ${
            isArabic
              ? 'font-arabic font-semibold tracking-normal'
              : 'font-editorial font-medium tracking-[0.02em]'
          } ${showSubtitle ? 'text-[1.4rem]' : 'text-[1.15rem] sm:text-[1.28rem]'}`}
        >
          {CLINIC_SETTINGS.brandName[lang]}
        </span>
        {showSubtitle && (
          <span
            className={`mt-1.5 text-[11px] font-medium whitespace-nowrap ${subtitleColor} ${
              isArabic ? 'font-arabic tracking-normal' : 'tracking-[0.16em]'
            }`}
          >
            {CLINIC_SETTINGS.brandSubtitle[lang]}
          </span>
        )}
      </span>
    </span>
  );
};
