import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  Calendar,
  Check,
  Copy,
  MessageCircle,
  Phone,
  User,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  buildWhatsAppBookingUrl,
  CLINIC_SETTINGS,
  getSanitizedWhatsAppNumber,
} from '../config/clinicSettings';
import { BOOKING_SERVICE_OPTIONS } from '../data/services';
import { useLanguage } from '../i18n/LanguageContext';

interface BookingSectionProps {
  selectedService: string;
  onServiceChange: (value: string) => void;
  focusTrigger: number;
}

interface FormErrors {
  patientName?: string;
  phoneNumber?: string;
  service?: string;
  appointmentDate?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  selectedService,
  onServiceChange,
  focusTrigger,
}) => {
  const { lang, isRtl } = useLanguage();
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  const todayIso = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  useEffect(() => {
    if (focusTrigger > 0) {
      const timer = window.setTimeout(() => {
        nameInputRef.current?.focus({ preventScroll: true });
      }, 450);
      return () => window.clearTimeout(timer);
    }
  }, [focusTrigger]);

  const activeServiceOption = useMemo(
    () =>
      BOOKING_SERVICE_OPTIONS.find((opt) => opt.value === selectedService) ??
      BOOKING_SERVICE_OPTIONS[0],
    [selectedService]
  );

  const hasConfiguredWhatsAppNumber = getSanitizedWhatsAppNumber().length > 0;

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (patientName.trim().length < 2) {
      nextErrors.patientName =
        lang === 'ar' ? 'يرجى إدخال اسم المريض بالكامل.' : 'Please enter your full name.';
    }
    const digitsOnly = phoneNumber.replace(/[^\d+]/g, '');
    if (digitsOnly.length < 8) {
      nextErrors.phoneNumber =
        lang === 'ar'
          ? 'يرجى إدخال رقم هاتف صحيح للتواصل.'
          : 'Please enter a valid contact phone number.';
    }
    if (!selectedService) {
      nextErrors.service =
        lang === 'ar' ? 'يرجى اختيار الخدمة المطلوبة.' : 'Please select a dental service.';
    }
    if (!appointmentDate) {
      nextErrors.appointmentDate =
        lang === 'ar'
          ? 'يرجى اختيار التاريخ المفضل للموعد.'
          : 'Please choose your preferred appointment date.';
    }
    return nextErrors;
  };

  const composeBookingMessage = () => {
    const serviceLabel = isRtl ? activeServiceOption.labelAr : activeServiceOption.labelEn;

    if (lang === 'ar') {
      const lines = [
        `مرحباً عيادة ${CLINIC_SETTINGS.brandName.ar}،`,
        '',
        'أرغب في حجز موعد بالبيانات التالية:',
        `• اسم المريض: ${patientName.trim()}`,
        `• رقم الهاتف: ${phoneNumber.trim()}`,
        `• الخدمة المختارة: ${serviceLabel}`,
        `• التاريخ المفضل: ${appointmentDate}`,
      ];

      if (notes.trim()) {
        lines.push(`• ملاحظات إضافية: ${notes.trim()}`);
      }

      return lines.join('\n');
    }

    const lines = [
      `Hello ${CLINIC_SETTINGS.brandName.en} Clinic,`,
      '',
      'I would like to request an appointment:',
      `• Patient Name: ${patientName.trim()}`,
      `• Phone Number: ${phoneNumber.trim()}`,
      `• Selected Service: ${serviceLabel}`,
      `• Preferred Date: ${appointmentDate}`,
    ];

    if (notes.trim()) {
      lines.push(`• Additional Notes: ${notes.trim()}`);
    }

    return lines.join('\n');
  };

  const launchWhatsAppDirectly = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmittedMessage(null);
      return;
    }

    const message = composeBookingMessage();
    const url = buildWhatsAppBookingUrl(message);
    setSubmittedMessage(message);
    setCopied(false);
    launchWhatsAppDirectly(url);
  };

  const handleCopyMessage = async () => {
    if (!submittedMessage) return;
    try {
      await navigator.clipboard.writeText(submittedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const whatsappUrl = submittedMessage ? buildWhatsAppBookingUrl(submittedMessage) : '#';

  const copy =
    lang === 'ar'
      ? {
          kicker: 'حجز المواعيد',
          heading: 'احجز موعدك',
          intro:
            'احجز زيارتك في عيادة د. مريم إبراهيم. أدخل بياناتك واختر الخدمة والتاريخ المفضل لإرسال طلب الحجز مباشرة عبر واتساب.',
          selectedLabel: 'الخدمة المختارة',
          note: 'تُراجع جميع طلبات الحجز بعناية لتأكيد الموعد الأنسب لك والإجابة عن أي استفسارات قبل الزيارة.',
          nameLabel: 'اسم المريض',
          namePlaceholder: 'الاسم بالكامل',
          phoneLabel: 'رقم الهاتف',
          phonePlaceholder: 'رقم الموبايل للتواصل',
          serviceLabel: 'الخدمة المطلوبة',
          dateLabel: 'تاريخ الموعد المفضل',
          notesLabel: 'ملاحظات إضافية',
          optional: '(اختياري)',
          notesPlaceholder: 'اكتب أي ملاحظات أو الوقت المفضل خلال اليوم أو استفساراتك...',
          submitBtn: 'إرسال الحجز عبر واتساب',
          readyTitle: 'تم تجهيز بيانات الحجز للإرسال عبر واتساب',
          readyDescConfigured:
            'تم فتح محادثة واتساب مع العيادة ببياناتك كاملة. إذا لم تُفتح النافذة تلقائياً يمكنك الضغط على الزر أدناه.',
          readyDescUnconfigured:
            'تم تجهيز رسالة الحجز ببياناتك الكاملة وفتح واتساب. بمجرد إضافة رقم واتساب العيادة في الإعدادات المركزية سيتم الإرسال لرقم العيادة مباشرة.',
          openWhatsappBtn: 'فتح واتساب الآن',
          copyBtn: 'نسخ بيانات الحجز',
          copiedBtn: 'تم النسخ',
        }
      : {
          kicker: 'Appointments',
          heading: 'Book An Appointment',
          intro:
            'Reserve your visit with Dr. Mariam Ibrahim. Enter your details and choose your service and preferred date to send your booking request directly via WhatsApp.',
          selectedLabel: 'Selected Service',
          note: 'Every inquiry is reviewed with care to confirm your ideal appointment slot and answer any questions ahead of your visit.',
          nameLabel: 'Patient Name',
          namePlaceholder: 'Your full name',
          phoneLabel: 'Phone Number',
          phonePlaceholder: 'Your mobile number',
          serviceLabel: 'Selected Service',
          dateLabel: 'Preferred Appointment Date',
          notesLabel: 'Additional Notes',
          optional: '(Optional)',
          notesPlaceholder: 'Share any preferences, preferred time of day, or questions...',
          submitBtn: 'Book via WhatsApp',
          readyTitle: 'Your Appointment Request Is Ready',
          readyDescConfigured:
            'WhatsApp has been opened with your complete booking details. If it did not open automatically, tap the button below.',
          readyDescUnconfigured:
            'Your booking message with all patient details is ready and WhatsApp has been launched. Add the clinic’s official WhatsApp number in central settings to route directly to the clinic inbox.',
          openWhatsappBtn: 'Open in WhatsApp',
          copyBtn: 'Copy Details',
          copiedBtn: 'Copied',
        };

  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="relative z-10 bg-[#F7F3ED]/48 py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
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
              id="booking-heading"
              className={`mt-4 text-[#292725] [text-wrap:balance] ${
                isRtl
                  ? 'font-arabic text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.22]'
                  : 'font-editorial text-[clamp(2.15rem,3.6vw,3.35rem)] font-medium leading-[1.12]'
              }`}
            >
              {copy.heading}
            </h2>

            <p className="mt-5 max-w-[46ch] text-[15px] sm:text-[16px] leading-[1.75] text-[#59534C]">
              {copy.intro}
            </p>

            {/* Live Selected Service Summary */}
            <div className="mt-9 border-y border-[#DFD4C4] py-6">
              <p
                className={`text-[12px] font-medium text-[#7A7269] ${
                  isRtl ? 'tracking-normal' : 'tracking-[0.12em]'
                }`}
              >
                {copy.selectedLabel}
              </p>
              <p
                className={`mt-2 leading-snug text-[#292725] ${
                  isRtl
                    ? 'font-arabic text-[20px] font-semibold'
                    : 'font-editorial text-[24px] font-medium'
                }`}
              >
                {isRtl ? activeServiceOption.labelAr : activeServiceOption.labelEn}
              </p>
            </div>

            <div className="mt-8 space-y-3 text-[14px] leading-[1.75] text-[#59534C]">
              <p>{copy.note}</p>
            </div>

            {/* Social Media Links in Contact / Booking Section */}
            <div className="mt-8 pt-6 border-t border-[#DFD4C4]">
              <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#96774B]">
                {lang === 'ar' ? 'تابع عيادة د. مريم إبراهيم' : 'Connect On Social Media'}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href={CLINIC_SETTINGS.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#D5C7B2] bg-[#FFFFFF] text-[#292725] transition-colors duration-200 hover:border-[#C6A77B] hover:text-[#96774B]"
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#D5C7B2] bg-[#FFFFFF] text-[#292725] transition-colors duration-200 hover:border-[#C6A77B] hover:text-[#96774B]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
                    <path d="M14.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.6V3.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.5H8.7V13h2.6v8h3.2Z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Appointment Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-sm border border-[#E5DACB]/90 bg-[#FFFFFF]/90 backdrop-blur-[6px] p-6 sm:p-9 lg:p-10">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Patient Name */}
                  <div>
                    <label
                      htmlFor="patient-name"
                      className="block text-[13px] font-medium text-[#292725]"
                    >
                      {copy.nameLabel} <span className="text-[#96774B]">*</span>
                    </label>
                    <div className="relative mt-2">
                      <User
                        aria-hidden="true"
                        className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C8378] ${
                          isRtl ? 'right-3.5' : 'left-3.5'
                        }`}
                        strokeWidth={1.75}
                      />
                      <input
                        ref={nameInputRef}
                        id="patient-name"
                        name="patientName"
                        type="text"
                        autoComplete="name"
                        placeholder={copy.namePlaceholder}
                        value={patientName}
                        onChange={(e) => {
                          setPatientName(e.target.value);
                          if (errors.patientName) {
                            setErrors((prev) => ({ ...prev, patientName: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errors.patientName)}
                        aria-describedby={errors.patientName ? 'patient-name-error' : undefined}
                        className={`min-h-[46px] w-full rounded-sm border bg-[#FAF8F4] py-2.5 text-[15px] text-[#292725] placeholder:text-[#9A9186] transition-colors focus:border-[#C6A77B] focus:bg-[#FFFFFF] ${
                          isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'
                        } ${errors.patientName ? 'border-[#A63A3A]' : 'border-[#E2D6C5]'}`}
                      />
                    </div>
                    {errors.patientName && (
                      <p
                        id="patient-name-error"
                        className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#A63A3A]"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.patientName}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone-number"
                      className="block text-[13px] font-medium text-[#292725]"
                    >
                      {copy.phoneLabel} <span className="text-[#96774B]">*</span>
                    </label>
                    <div className="relative mt-2">
                      <Phone
                        aria-hidden="true"
                        className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C8378] ${
                          isRtl ? 'right-3.5' : 'left-3.5'
                        }`}
                        strokeWidth={1.75}
                      />
                      <input
                        id="phone-number"
                        name="phoneNumber"
                        type="tel"
                        autoComplete="tel"
                        placeholder={copy.phonePlaceholder}
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (errors.phoneNumber) {
                            setErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errors.phoneNumber)}
                        aria-describedby={errors.phoneNumber ? 'phone-number-error' : undefined}
                        className={`min-h-[46px] w-full rounded-sm border bg-[#FAF8F4] py-2.5 text-[15px] tabular-nums text-[#292725] placeholder:text-[#9A9186] transition-colors focus:border-[#C6A77B] focus:bg-[#FFFFFF] ${
                          isRtl ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'
                        } ${errors.phoneNumber ? 'border-[#A63A3A]' : 'border-[#E2D6C5]'}`}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p
                        id="phone-number-error"
                        className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#A63A3A]"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{errors.phoneNumber}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Selected Service */}
                <div>
                  <label
                    htmlFor="selected-service"
                    className="block text-[13px] font-medium text-[#292725]"
                  >
                    {copy.serviceLabel} <span className="text-[#96774B]">*</span>
                  </label>
                  <select
                    id="selected-service"
                    name="service"
                    value={selectedService}
                    onChange={(e) => {
                      onServiceChange(e.target.value);
                      if (errors.service) {
                        setErrors((prev) => ({ ...prev, service: undefined }));
                      }
                    }}
                    aria-invalid={Boolean(errors.service)}
                    className={`mt-2 min-h-[46px] w-full rounded-sm border bg-[#FAF8F4] px-4 py-2.5 text-[15px] text-[#292725] transition-colors focus:border-[#C6A77B] focus:bg-[#FFFFFF] ${
                      errors.service ? 'border-[#A63A3A]' : 'border-[#E2D6C5]'
                    }`}
                  >
                    <optgroup label={lang === 'ar' ? 'خدمات الأسنان' : 'Dental Services'}>
                      {BOOKING_SERVICE_OPTIONS.filter((opt) => opt.group === 'dental').map((option) => (
                        <option key={option.value} value={option.value}>
                          {isRtl ? option.labelAr : option.labelEn}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label={lang === 'ar' ? 'خدمات التجميل' : 'Aesthetic Services'}>
                      {BOOKING_SERVICE_OPTIONS.filter((opt) => opt.group === 'aesthetic').map((option) => (
                        <option key={option.value} value={option.value}>
                          {isRtl ? option.labelAr : option.labelEn}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label={lang === 'ar' ? 'الزيارات المنزلية' : 'Home Dental Visits'}>
                      {BOOKING_SERVICE_OPTIONS.filter((opt) => opt.group === 'home').map((option) => (
                        <option key={option.value} value={option.value}>
                          {isRtl ? option.labelAr : option.labelEn}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Preferred Appointment Date */}
                <div>
                  <label
                    htmlFor="preferred-date"
                    className="block text-[13px] font-medium text-[#292725]"
                  >
                    {copy.dateLabel} <span className="text-[#96774B]">*</span>
                  </label>
                  <div className="relative mt-2">
                    <Calendar
                      aria-hidden="true"
                      className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C8378] ${
                        isRtl ? 'right-3.5' : 'left-3.5'
                      }`}
                      strokeWidth={1.75}
                    />
                    <input
                      id="preferred-date"
                      name="appointmentDate"
                      type="date"
                      min={todayIso}
                      value={appointmentDate}
                      onChange={(e) => {
                        setAppointmentDate(e.target.value);
                        if (errors.appointmentDate) {
                          setErrors((prev) => ({ ...prev, appointmentDate: undefined }));
                        }
                      }}
                      aria-invalid={Boolean(errors.appointmentDate)}
                      aria-describedby={errors.appointmentDate ? 'preferred-date-error' : undefined}
                      className={`min-h-[46px] w-full rounded-sm border bg-[#FAF8F4] py-2.5 text-[15px] tabular-nums text-[#292725] transition-colors focus:border-[#C6A77B] focus:bg-[#FFFFFF] ${
                        isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'
                      } ${errors.appointmentDate ? 'border-[#A63A3A]' : 'border-[#E2D6C5]'}`}
                    />
                  </div>
                  {errors.appointmentDate && (
                    <p
                      id="preferred-date-error"
                      className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#A63A3A]"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{errors.appointmentDate}</span>
                    </p>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label
                    htmlFor="additional-notes"
                    className="block text-[13px] font-medium text-[#292725]"
                  >
                    {copy.notesLabel}{' '}
                    <span className="font-normal text-[#7A7269]">{copy.optional}</span>
                  </label>
                  <textarea
                    id="additional-notes"
                    name="notes"
                    rows={3}
                    placeholder={copy.notesPlaceholder}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2 w-full rounded-sm border border-[#E2D6C5] bg-[#FAF8F4] px-4 py-3 text-[15px] leading-relaxed text-[#292725] placeholder:text-[#9A9186] transition-colors focus:border-[#C6A77B] focus:bg-[#FFFFFF]"
                  />
                </div>

                {/* WhatsApp Booking Submit Button */}
                <button
                  type="submit"
                  className={`inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-sm bg-[#292725] px-6 py-3.5 text-[14px] font-medium text-[#F7F3ED] whitespace-nowrap transition-colors duration-200 hover:bg-[#3B3733] cursor-pointer ${
                    isRtl ? 'tracking-normal' : 'tracking-[0.04em]'
                  }`}
                >
                  <MessageCircle className="h-4 w-4 text-[#C6A77B]" strokeWidth={1.85} />
                  <span>{copy.submitBtn}</span>
                </button>
              </form>

              {/* Confirmation & Direct WhatsApp Launch Area */}
              {submittedMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  role="status"
                  className="mt-7 rounded-sm border border-[#C6A77B]/60 bg-[#FAF7F2] p-5 sm:p-6"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#292725] text-[#C6A77B]">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3
                        className={`leading-tight text-[#292725] ${
                          isRtl
                            ? 'font-arabic text-[18px] font-semibold'
                            : 'font-editorial text-[22px] font-medium'
                        }`}
                      >
                        {copy.readyTitle}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-[#59534C]">
                        {hasConfiguredWhatsAppNumber
                          ? copy.readyDescConfigured
                          : copy.readyDescUnconfigured}
                      </p>
                    </div>
                  </div>

                  <pre className="mt-4 whitespace-pre-wrap rounded-[2px] border border-[#E6DBCC] bg-[#FFFFFF] p-4 font-sans text-[13px] leading-relaxed text-[#3A3632]">
                    {submittedMessage}
                  </pre>

                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-sm bg-[#292725] px-5 py-2.5 text-[13px] font-medium text-[#F7F3ED] whitespace-nowrap transition-colors hover:bg-[#3B3733] ${
                        isRtl ? 'tracking-normal' : 'tracking-[0.04em]'
                      }`}
                    >
                      <MessageCircle className="h-4 w-4 text-[#C6A77B]" strokeWidth={1.85} />
                      <span>{copy.openWhatsappBtn}</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm border border-[#D8CBB8] bg-[#FFFFFF] px-5 py-2.5 text-[13px] font-medium text-[#292725] whitespace-nowrap transition-colors hover:border-[#C6A77B] hover:bg-[#F7F3ED] cursor-pointer ${
                        isRtl ? 'tracking-normal' : 'tracking-[0.04em]'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-[#96774B]" strokeWidth={2} />
                          <span>{copy.copiedBtn}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 text-[#7A7269]" strokeWidth={1.75} />
                          <span>{copy.copyBtn}</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
