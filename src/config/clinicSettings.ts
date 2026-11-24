/**
 * Central Clinic Settings
 *
 * Update the clinic's WhatsApp phone number and social media links here.
 * All booking actions and footer links automatically pull from this single source of truth.
 */

export interface ClinicSettings {
  brandName: {
    en: string;
    ar: string;
  };
  brandSubtitle: {
    en: string;
    ar: string;
  };
  /**
   * Enter the clinic's WhatsApp number in international format without '+' or spaces.
   * Example for Egypt: "2010XXXXXXXX"
   * You can also configure VITE_CLINIC_WHATSAPP_NUMBER in environment variables.
   * Leave empty ("") until the clinic's official number is ready to be connected.
   */
  whatsappNumber: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
}

export const CLINIC_SETTINGS: ClinicSettings = {
  brandName: {
    en: 'Dr. Mariam Ibrahim',
    ar: 'د. مريم إبراهيم',
  },
  brandSubtitle: {
    en: 'Dental Surgeon & Facial Aesthetics Clinic',
    ar: 'جراحة الفم والأسنان وعيادة التجميل الجلدي',
  },
  whatsappNumber: (import.meta.env.VITE_CLINIC_WHATSAPP_NUMBER as string | undefined)?.trim() || '',
  socialLinks: {
    instagram: 'https://www.instagram.com/dr.mariamibrahim',
    facebook: 'https://www.facebook.com/share/1CPAfZ4iZ9/?mibextid=wwXIfr',
    tiktok: '',
  },
};

/**
 * Formats a WhatsApp booking URL using the centrally configured clinic number.
 * If whatsappNumber is configured, routes directly to that clinic chat; otherwise opens
 * WhatsApp's composer with the prefilled patient booking message.
 */
export function buildWhatsAppBookingUrl(message: string): string {
  const sanitizedNumber = CLINIC_SETTINGS.whatsappNumber.replace(/[^\d]/g, '');
  const encodedMessage = encodeURIComponent(message);

  if (sanitizedNumber.length > 0) {
    return `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`;
  }

  return `https://wa.me/?text=${encodedMessage}`;
}
