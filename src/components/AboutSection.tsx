import React from 'react';
import { Award, GraduationCap, Stethoscope, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

interface AboutSectionProps {
  onBookClick: () => void;
}

const QUALIFICATIONS = [
  {
    icon: GraduationCap,
    titleEn: 'Master of Business Administration (MBA)',
    titleAr: 'ماجستير إدارة الأعمال (MBA)',
  },
  {
    icon: Stethoscope,
    titleEn: 'Bachelor of Oral and Dental Medicine and Surgery (BDS)',
    titleAr: 'بكالوريوس جراحة الفم والأسنان (BDS)',
  },
  {
    icon: Award,
    titleEn: 'Egyptian Fellowship in Oral & Maxillofacial Surgery',
    titleAr: 'الزمالة المصرية في جراحة الفم والوجه والفكين',
  },
  {
    icon: Briefcase,
    titleEn: 'American Board of Aesthetic Medicine',
    titleAr: 'البورد الأمريكي للطب التجميلي',
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ onBookClick }) => {
  const { lang, isRtl } = useLanguage();

  const copy =
    lang === 'ar'
      ? {
          kicker: 'عن الدكتورة',
          heading: 'عن د. مريم إبراهيم',
          p1: 'د. مريم إبراهيم هي طبيبة جراحة أسنان ومقيم جراحة الفم والوجه والفكين، بخلفية متعددة التخصصات تجمع بين جراحة الأسنان، تجميل الوجه، وإدارة الرعاية الصحية.',
          p2: 'حاصلة على بكالوريوس جراحة الفم والأسنان (BDS)، والزمالة المصرية في جراحة الفم والوجه والفكين، وماجستير إدارة الأعمال (MBA). كما أنها معتمدة من البورد الأمريكي للطب التجميلي مع تدريب مهني متقدم في الطب التجميلي غير الجراحي.',
          p3: 'تجمع اهتماماتها المهنية بين جراحة الفم والوجه والفكين والتجميل الجلدي، مع التركيز التام على سلامة المريض، وتخطيط العلاج الفردي، والنتائج الطبيعية المتقنة.',
          cardTitle: 'المؤهلات الأكاديمية والشهادات',
          cta: 'احجز استشارتك الآن',
        }
      : {
          kicker: 'The Doctor',
          heading: 'About Dr. Mariam Ibrahim',
          p1: 'Dr. Mariam Ibrahim is a dental surgeon and Oral & Maxillofacial Surgery Resident with a multidisciplinary background in dentistry, facial aesthetics, and healthcare management.',
          p2: 'She holds a Bachelor of Oral and Dental Medicine and Surgery (BDS), an Egyptian Fellowship in Oral & Maxillofacial Surgery, and a Master of Business Administration (MBA). She is also certified by the American Board of Aesthetic Medicine, with professional training in non-surgical aesthetic medicine.',
          p3: 'Her professional interests combine oral and maxillofacial surgery with facial aesthetics, emphasizing patient safety, individualized treatment planning, and natural-looking results.',
          cardTitle: 'Academic Qualifications & Certifications',
          cta: 'Schedule a Consultation',
        };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-10 bg-transparent py-24 sm:py-28 lg:py-36"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
          {/* Left Column: Intro Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div
              className={`flex items-center gap-3 text-[13px] font-medium text-[#96774B] ${
                isRtl ? 'tracking-normal' : 'tracking-[0.16em]'
              }`}
            >
              <span className="h-px w-8 bg-[#C6A77B]" aria-hidden="true" />
              <span>{copy.kicker}</span>
            </div>

            <h2
              id="about-heading"
              className={`mt-4 text-[#292725] [text-wrap:balance] ${
                isRtl
                  ? 'font-arabic text-[clamp(2rem,3.4vw,3.1rem)] font-semibold leading-[1.22]'
                  : 'font-editorial text-[clamp(2.25rem,3.8vw,3.5rem)] font-medium leading-[1.12]'
              }`}
            >
              {copy.heading}
            </h2>

            <div className="mt-6 space-y-5 text-[15px] sm:text-[16px] leading-[1.8] text-[#4A453E]">
              <p>{copy.p1}</p>
              <p>{copy.p2}</p>
              <p>{copy.p3}</p>
            </div>

            <div className="mt-9">
              <button
                type="button"
                onClick={onBookClick}
                className={`inline-flex min-h-[46px] items-center justify-center rounded-sm bg-[#292725] px-7 py-3.5 text-[14px] font-medium text-[#F7F3ED] transition-colors hover:bg-[#3B3733] cursor-pointer ${
                  isRtl ? 'tracking-normal' : 'tracking-[0.04em]'
                }`}
              >
                {copy.cta}
              </button>
            </div>
          </motion.div>

          {/* Right Column: Academic Qualifications & Certifications Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="rounded-sm border border-[#E5DACB] bg-[#FFFFFF]/90 backdrop-blur-[6px] p-7 sm:p-9 shadow-[0_12px_32px_rgba(41,39,37,0.06)]">
              <h3
                className={`text-[#292725] pb-5 border-b border-[#ECE2D3] ${
                  isRtl
                    ? 'font-arabic text-[21px] font-semibold'
                    : 'font-editorial text-[24px] font-medium'
                }`}
              >
                {copy.cardTitle}
              </h3>

              <ul className="mt-6 space-y-5">
                {QUALIFICATIONS.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index} className="flex items-start gap-4">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#FAF6F0] text-[#96774B] border border-[#E6DBCC]">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <div className="pt-1.5">
                        <span className="text-[15px] font-medium text-[#292725] leading-snug block">
                          {isRtl ? item.titleAr : item.titleEn}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
