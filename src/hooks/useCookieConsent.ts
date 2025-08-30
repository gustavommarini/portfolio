import { useState, useEffect } from 'react';

export interface UseCookieConsentReturn {
  showConsent: boolean;
  hasConsented: boolean | null;
  acceptCookies: () => void;
  closeConsent: () => void;
}

export const useCookieConsent = (): UseCookieConsentReturn => {
  const [showConsent, setShowConsent] = useState(false);
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already made a choice
    const consentStatus = localStorage.getItem('cookie-consent');

    if (consentStatus === null) {
      // No previous consent, show the banner
      setShowConsent(true);
      setHasConsented(null);
    } else {
      // User has already made a choice
      setHasConsented(consentStatus === 'accepted');
      setShowConsent(false);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setHasConsented(true);
    setShowConsent(false);
  };

  const closeConsent = () => {
    setShowConsent(false);
  };

  return {
    showConsent,
    hasConsented,
    acceptCookies,
    closeConsent,
  };
};
