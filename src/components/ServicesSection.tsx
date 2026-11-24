import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Home, Sparkles, Stethoscope, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import {
  AESTHETIC_SUB_CATEGORIES,
  DENTAL_SERVICES,
  HOME_VISIT_ITEMS,
  type DentalService,
} from '../data/services';
import { useLanguage } from '../i18n/LanguageContext';
import { MonogramLogo } from './BrandLogo';

interface ServicesSectionProps {
  onSelectService: (bookingValue: string) => void;
}

interface ServiceCardProps {
  service: DentalService;
  onSelectService: (bookingValue: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelectService }) => {
  const { lang, isRtl } = useLanguage();
  const [imageError, setImageError] = useState(false);

  const primaryTitle = isRtl ? service.titleAr : service.titleEn;
  const secondaryTitle = isRtl ? service.titleEn : service.titleAr;
  const primarySubtitle = isRtl ? service.subtitleAr : service.subtitleEn;
  const description = isRtl ? service.descriptionAr : service.descriptionEn;
  const imageAlt = isRtl ? service.imageAltAr : service.imageAltEn;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-sm border border-[#E5DACB]/90 bg-[#FFFFFF]/86 backdrop-blur-[5px] transition-all duration-300 hover:border-[#C6A77B] hover:bg-[#FFFFFF]/95 hover:shadow-[0_14px_34px_rgba(41,39,37,0.07)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE3D7]">
        {!imageError ? (
          <img
            src={service.image}
            alt={imageAlt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#F3ECE2] to-[#E5D9C8] p-6 text-center">
            <MonogramLogo size={44} variant="dark" className="opacity-70" />
            <span className="mt-3 font-editorial text-lg text-[#292725]">{primaryTitle}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div
          className={`flex items-center gap-2 text-[12px] font-medium text-[#7A7269] ${
            isRtl ? 'tracking-normal' : 'tracking-[0.08em]'
          }`}
        >
          <span className="tabular-nums text-[#96774B]">{service.index}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{isRtl ? 'خدمات الأسنان' : 'Dental Services'}</span>
        </div>

        <div className="mt-3">
          <h3
            className={`text-[#292725] ${
              isRtl
                ? 'font-arabic text-[21px] font-semibold leading-[1.35]'
                : 'font-editorial text-[25px] font-medium leading-[1.2]'
            }`}
          >
            {primaryTitle}
          </h3>
          <p
            lang={isRtl ? 'en' : 'ar'}
            dir={isRtl ? 'ltr' : 'rtl'}
            className={`mt-1 font-medium leading-relaxed text-[#59534C] ${
              isRtl ? 'font-editorial text-[16px] text-right' : 'font-arabic text-[16px] text-left'
            }`}
          >
            {secondaryTitle}
          </p>
        </div>

        {primarySubtitle && (
          <div className="mt-3 border-t border-[#F0E8DD] pt-3">
            <p className="text-[13px] font-medium text-[#3A3632]">{primarySubtitle}</p>
          </div>
        )}

        {service.variants && service.variants.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[#F0E8DD] pt-3 text-[13px] font-medium text-[#6B6258]">
            {service.variants.map((variant, idx) => (
              <React.Fragment key={variant.labelEn}>
                {idx > 0 && <span aria-hidden="true" className="text-[#C6A77B]">&middot;</span>}
                <span>{isRtl ? variant.labelAr : variant.labelEn}</span>
              </React.Fragment>
            ))}
          </div>
        )}

        <p className="mt-3.5 text-[14px] leading-[1.7] text-[#59534C]">{description}</p>

        {service.suitableCases && service.suitableCases.length > 0 && (
          <div className="mt-4 rounded-sm border border-[#ECE2D3] bg-[#FAF7F2] p-3.5">
            <p className="text-[12px] font-semibold text-[#96774B]">
              {isRtl
                ? service.suitableCasesLabelAr ?? 'الحالات المناسبة:'
                : service.suitableCasesLabelEn ?? 'Suitable Cases:'}
            </p>
            <ul className="mt-2 space-y-1.5">
              {service.suitableCases.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-[13px] leading-snug text-[#3A3632]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C6A77B]"
                  />
                  <span>{isRtl ? item.ar : item.en}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={() => onSelectService(service.bookingValue)}
            className={`inline-flex min-h-[44px] w-full items-center justify-between rounded-sm border border-[#292725]/20 bg-[#F7F3ED] px-4 py-2.5 text-[13px] font-medium text-[#292725] whitespace-nowrap transition-colors duration-200 hover:border-[#292725] hover:bg-[#292725] hover:text-[#F7F3ED] cursor-pointer ${
              isRtl ? 'tracking-normal' : 'tracking-[0.04em]'
            }`}
          >
            <span>{lang === 'ar' ? 'احجز الآن' : 'Book now'}</span>
            {isRtl ? (
              <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            ) : (
              <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const { lang, isRtl } = useLanguage();
  const [activeAestheticTab, setActiveAestheticTab] = useState(AESTHETIC_SUB_CATEGORIES[0].id);
  const [failedAestheticImages, setFailedAestheticImages] = useState<Record<string, boolean>>({});

  const activeAestheticGroup =
    AESTHETIC_SUB_CATEGORIES.find((sub) => sub.id === activeAestheticTab) ??
    AESTHETIC_SUB_CATEGORIES[0];

  const isAestheticImageFailed = Boolean(failedAestheticImages[activeAestheticGroup.id]);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative z-10 border-y border-[#DFD4C4]/80 bg-[#EFE8DD]/52 py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Main Section Header */}
        <div className="max-w-3xl">
          <div
            className={`flex items-center gap-3 text-[13px] font-medium text-[#96774B] ${
              isRtl ? 'tracking-normal' : 'tracking-[0.16em]'
            }`}
          >
            <span className="h-px w-8 bg-[#C6A77B]" aria-hidden="true" />
            <span>{lang === 'ar' ? 'العلاجات والخدمات' : 'Treatments & Services'}</span>
          </div>
          <h2
            id="services-heading"
            className={`mt-4 text-[#292725] [text-wrap:balance] ${
              isRtl
                ? 'font-arabic text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.22]'
                : 'font-editorial text-[clamp(2.15rem,3.6vw,3.35rem)] font-medium leading-[1.12]'
            }`}
          >
            {lang === 'ar' ? 'خدمات العيادة المتخصصة' : 'Our Specialized Clinic Services'}
          </h2>
          <p className="mt-4 max-w-[62ch] text-[15px] sm:text-[16px] leading-[1.75] text-[#59534C]">
            {lang === 'ar'
              ? 'مجموعة متكاملة من خدمات الأسنان وعلاجات التجميل غير الجراحي والزيارات المنزلية المخصصة برعاية د. مريم إبراهيم.'
              : 'Comprehensive dental treatments, non-surgical facial aesthetics, and dedicated home visits delivered under the expertise of Dr. Mariam Ibrahim.'}
          </p>
        </div>

        {/* GROUP 1: Dental Services | خدمات الأسنان */}
        <div className="mt-16">
          <div className="flex items-center gap-3 pb-6 border-b border-[#D8CBB7]">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-[#292725] text-[#C6A77B]">
              <Stethoscope className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div>
              <h3
                className={`text-[#292725] ${
                  isRtl ? 'font-arabic text-[24px] font-semibold' : 'font-editorial text-[28px] font-medium'
                }`}
              >
                {lang === 'ar' ? 'خدمات الأسنان' : 'Dental Services'}
              </h3>
              <p className="text-[13px] text-[#7A7269]">
                {lang === 'ar'
                  ? 'العلاج التحفظي، جراحة الفم، التركيبات، وزراعة الأسنان'
                  : 'Restorative, surgical, prosthodontic & implant care'}
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {DENTAL_SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelectService={onSelectService}
              />
            ))}
          </div>
        </div>

        {/* GROUP 2: Aesthetic Services | خدمات التجميل */}
        <div className="mt-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between pb-6 border-b border-[#D8CBB7]">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-[#292725] text-[#C6A77B]">
                <Sparkles className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <h3
                  className={`text-[#292725] ${
                    isRtl ? 'font-arabic text-[24px] font-semibold' : 'font-editorial text-[28px] font-medium'
                  }`}
                >
                  {lang === 'ar' ? 'خدمات التجميل' : 'Aesthetic Services'}
                </h3>
                <p className="text-[13px] text-[#7A7269]">
                  {lang === 'ar'
                    ? 'علاجات البوتوكس، حقن النضارة، الديرما بن، والميزوثيرابي'
                    : 'Botox, skin boosters, dermapen & mesotherapy'}
                </p>
              </div>
            </div>

            {/* Sub-category Tabs */}
            <div
              role="tablist"
              aria-label={lang === 'ar' ? 'تصنيفات خدمات التجميل' : 'Aesthetic service sub-categories'}
              className="flex flex-wrap items-center gap-1.5 rounded-sm border border-[#E2D6C5] bg-[#F7F3ED] p-1"
            >
              {AESTHETIC_SUB_CATEGORIES.map((sub) => {
                const isActive = activeAestheticTab === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveAestheticTab(sub.id)}
                    className={`min-h-[38px] rounded-[2px] px-3.5 py-2 text-[13px] font-medium whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#292725] text-[#F7F3ED]'
                        : 'text-[#59534C] hover:text-[#292725] hover:bg-[#E8DED1]/60'
                    }`}
                  >
                    {isRtl ? sub.titleAr : sub.titleEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Aesthetic Sub-Category Content Card */}
          <motion.div
            key={activeAestheticTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10 rounded-sm border border-[#E5DACB] bg-[#FFFFFF]/90 backdrop-blur-[6px] p-7 sm:p-10 shadow-[0_12px_32px_rgba(41,39,37,0.06)]"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#ECE3D7]">
                  {!isAestheticImageFailed ? (
                    <img
                      key={activeAestheticGroup.image}
                      src={activeAestheticGroup.image}
                      alt={isRtl ? activeAestheticGroup.imageAltAr : activeAestheticGroup.imageAltEn}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedAestheticImages((prev) => ({
                          ...prev,
                          [activeAestheticGroup.id]: true,
                        }))
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#F3ECE2] to-[#E5D9C8] p-6 text-center">
                      <MonogramLogo size={44} variant="dark" className="opacity-70" />
                      <span className="mt-3 font-editorial text-lg text-[#292725]">
                        {isRtl ? activeAestheticGroup.titleAr : activeAestheticGroup.titleEn}
                      </span>
                    </div>
                  )}
                </div>
                <h4
                  className={`mt-4 text-[#292725] ${
                    isRtl ? 'font-arabic text-[22px] font-semibold' : 'font-editorial text-[26px] font-medium'
                  }`}
                >
                  {isRtl ? activeAestheticGroup.titleAr : activeAestheticGroup.titleEn}
                </h4>
                <p
                  lang={isRtl ? 'en' : 'ar'}
                  dir={isRtl ? 'ltr' : 'rtl'}
                  className={`mt-1 text-[15px] font-medium text-[#6B6258] ${
                    isRtl ? 'font-editorial text-right' : 'font-arabic text-left'
                  }`}
                >
                  {isRtl ? activeAestheticGroup.titleEn : activeAestheticGroup.titleAr}
                </p>
                <button
                  type="button"
                  onClick={() => onSelectService(activeAestheticGroup.bookingValue)}
                  className={`mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-sm bg-[#292725] px-5 py-2.5 text-[13px] font-medium text-[#F7F3ED] transition-colors hover:bg-[#3B3733] cursor-pointer ${
                    isRtl ? 'tracking-normal' : 'tracking-[0.04em]'
                  }`}
                >
                  <span>{lang === 'ar' ? 'احجز الآن' : 'Book now'}</span>
                  {isRtl ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
              </div>

              <div className="lg:col-span-8 border-t pt-6 lg:border-t-0 lg:border-s lg:pt-0 lg:ps-8 border-[#E8DED1]">
                <h5
                  className={`text-[13px] font-medium text-[#96774B] ${
                    isRtl ? 'tracking-normal' : 'tracking-[0.12em]'
                  }`}
                >
                  {lang === 'ar' ? 'العلاجات المتاحة في هذا القسم' : 'Available Treatments'}
                </h5>
                <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {activeAestheticGroup.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col justify-between gap-3 rounded-sm border border-[#EBE2D4] bg-[#FAF8F4] p-4 transition-colors hover:border-[#C6A77B]"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-[#96774B] shrink-0 mt-1" strokeWidth={1.85} />
                        <div className="min-w-0">
                          <p className="text-[15px] font-medium text-[#292725] leading-snug">
                            {isRtl ? item.ar : item.en}
                          </p>
                          <p
                            lang={isRtl ? 'en' : 'ar'}
                            dir={isRtl ? 'ltr' : 'rtl'}
                            className={`mt-1 text-[13px] text-[#6B6258] leading-snug ${
                              isRtl ? 'text-right' : 'font-arabic text-left'
                            }`}
                          >
                            {isRtl ? item.en : item.ar}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectService(item.bookingValue)}
                        className="inline-flex items-center gap-1.5 self-start text-[12px] font-medium text-[#96774B] transition-colors hover:text-[#292725] cursor-pointer"
                      >
                        <span>{lang === 'ar' ? 'احجز الآن' : 'Book now'}</span>
                        {isRtl ? <ArrowLeft className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Short note under aesthetic services */}
                <div className="mt-8 rounded-sm bg-[#F4EFE6] p-4 text-[13px] leading-relaxed text-[#59534C] border border-[#E5DACB]">
                  <span className="font-semibold text-[#292725]">
                    {lang === 'ar' ? 'ملاحظة: ' : 'Note: '}
                  </span>
                  {lang === 'ar'
                    ? 'تُحدد ملاءمة العلاج بعد الاستشارة والفحص الطبي.'
                    : 'Treatment suitability is determined after consultation and examination.'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* GROUP 3 (separate, highlighted section): Home Dental Visits | الزيارات المنزلية */}
        <div className="mt-24 rounded-sm border border-[#C6A77B]/45 bg-[#F9F6F0] p-8 sm:p-12 shadow-[0_16px_40px_rgba(41,39,37,0.06)]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div
                className={`flex items-center gap-3 text-[13px] font-medium text-[#96774B] ${
                  isRtl ? 'tracking-normal' : 'tracking-[0.16em]'
                }`}
              >
                <span className="h-px w-8 bg-[#C6A77B]" aria-hidden="true" />
                <span>{lang === 'ar' ? 'رعاية منزلية مخصصة' : 'Dedicated Home Care'}</span>
              </div>
              <h3
                className={`mt-4 text-[#292725] ${
                  isRtl
                    ? 'font-arabic text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1.25]'
                    : 'font-editorial text-[clamp(2rem,3.2vw,3rem)] font-medium leading-[1.15]'
                }`}
              >
                {lang === 'ar' ? 'الزيارات المنزلية' : 'Home Dental Visits'}
              </h3>
              <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.75] text-[#59534C]">
                {lang === 'ar'
                  ? 'خدمة طبية منزلية لتقديم رعاية الأسنان لمن لا يستطيعون الحضور إلى العيادة، تشمل الكشف وتقييم الحالة وتقديم الخدمات المناسبة بأمان.'
                  : 'In-home dental care designed to bring professional examination and suitable treatments directly to patients unable to travel to the clinic.'}
              </p>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => onSelectService('Home Dental Visit — زيارة منزلية')}
                  className={`inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-sm bg-[#292725] px-7 py-3.5 text-[14px] font-medium text-[#F7F3ED] transition-colors hover:bg-[#3B3733] cursor-pointer ${
                    isRtl ? 'tracking-normal' : 'tracking-[0.04em]'
                  }`}
                >
                  <Home className="h-4 w-4 text-[#C6A77B]" strokeWidth={1.8} />
                  <span>{lang === 'ar' ? 'احجز زيارة منزلية' : 'Book a home visit'}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-sm border border-[#E2D5C2] bg-[#FFFFFF] p-6 sm:p-8">
                <h4
                  className={`text-[13px] font-medium text-[#96774B] ${
                    isRtl ? 'tracking-normal' : 'tracking-[0.12em]'
                  }`}
                >
                  {lang === 'ar' ? 'تشمل الخدمة' : 'The Service Includes'}
                </h4>
                <ul className="mt-5 space-y-4">
                  {HOME_VISIT_ITEMS.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3.5">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FAF5EE] text-[#96774B] border border-[#E6DBCC]">
                        <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.2} />
                      </span>
                      <span className="text-[14px] sm:text-[15px] font-medium text-[#292725] leading-relaxed">
                        {isRtl ? item.ar : item.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
