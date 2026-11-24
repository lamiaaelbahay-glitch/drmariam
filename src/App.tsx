import { useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ScrollPortraitBackdrop } from './components/ScrollPortraitBackdrop';
import { ServicesSection } from './components/ServicesSection';
import { BOOKING_SERVICE_OPTIONS } from './data/services';
import { LanguageProvider } from './i18n/LanguageContext';

function ClinicPage() {
  const [selectedService, setSelectedService] = useState<string>(
    BOOKING_SERVICE_OPTIONS[0].value
  );
  const [bookingFocusTrigger, setBookingFocusTrigger] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookFromHeaderOrHero = () => {
    scrollToSection('booking');
    setBookingFocusTrigger((count) => count + 1);
  };

  const handleSelectServiceForBooking = (bookingValue: string) => {
    setSelectedService(bookingValue);
    scrollToSection('booking');
    setBookingFocusTrigger((count) => count + 1);
  };

  return (
    <div className="relative min-h-screen bg-[#F7F3ED] text-[#292725]">
      {/* Site-Wide Transparent Scroll-Following Portrait Backdrop */}
      <ScrollPortraitBackdrop />

      <Navbar onBookClick={handleBookFromHeaderOrHero} />

      <main className="relative z-10">
        <HeroSection
          onExploreServices={() => scrollToSection('services')}
          onBookAppointment={handleBookFromHeaderOrHero}
        />

        <AboutSection onBookClick={handleBookFromHeaderOrHero} />

        <ServicesSection onSelectService={handleSelectServiceForBooking} />

        <BookingSection
          selectedService={selectedService}
          onServiceChange={setSelectedService}
          focusTrigger={bookingFocusTrigger}
        />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ClinicPage />
    </LanguageProvider>
  );
}
