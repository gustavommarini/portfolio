import { logEvent } from 'firebase/analytics';
import { analytics } from './firebaseConfig';

// Custom event types for better tracking
export const ANALYTICS_EVENTS = {
  // Page views
  PAGE_VIEW: 'page_view',

  // Navigation
  NAVIGATION_CLICK: 'navigation_click',
  BUTTON_CLICK: 'button_click',
  LINK_CLICK: 'link_click',
  EXPANDED_SKILLS: 'expanded_skills',

  // Errors
  ERROR_OCCURRED: 'error_occurred',

  // Social
  ACCESS_SOCIAL: 'access_social',
} as const;

// Track page views
export const trackPageView = (pageName: string, pageTitle?: string) => {
  if (!analytics) return;

  logEvent(analytics, ANALYTICS_EVENTS.PAGE_VIEW, {
    page_title: pageTitle || pageName,
    page_location: window.location.href,
    page_path: window.location.pathname,
  });
};

// Track navigation and interactions
export const trackNavigation = (destination: string, source?: string) => {
  if (!analytics) return;

  logEvent(analytics, ANALYTICS_EVENTS.NAVIGATION_CLICK, {
    destination,
    source: source || 'unknown',
  });
};

export const trackButtonClick = (buttonName: string, location: string) => {
  if (!analytics) return;

  logEvent(analytics, ANALYTICS_EVENTS.BUTTON_CLICK, {
    button_name: buttonName,
    location,
  });
};

export const trackLinkClick = (linkUrl: string, linkText: string) => {
  if (!analytics) return;

  logEvent(analytics, ANALYTICS_EVENTS.LINK_CLICK, {
    link_url: linkUrl,
    link_text: linkText,
  });
};

// Track errors
export const trackError = (
  errorType: string,
  errorMessage: string,
  location: string
) => {
  if (!analytics) return;

  logEvent(analytics, ANALYTICS_EVENTS.ERROR_OCCURRED, {
    error_type: errorType,
    error_message: errorMessage,
    location,
  });
};

// Track social interaction
export const trackSocialAccess = (contentType: string, contentId: string) => {
  if (!analytics) return;

  logEvent(analytics, ANALYTICS_EVENTS.ACCESS_SOCIAL, {
    content_type: contentType,
    content_id: contentId,
  });
};

// Track expanded skills actions
export const trackExpandedSkills = (
  title: string,
  companyName: string,
  locationJob: string,
  action: string
) => {
  if (!analytics) return;

  logEvent(analytics, ANALYTICS_EVENTS.EXPANDED_SKILLS, {
    content_type: title,
    action,
    companyName,
    locationJob,
  });
};

// Custom hook for tracking page views
export const usePageTracking = () => {
  const trackPage = (pageName: string, pageTitle?: string) => {
    trackPageView(pageName, pageTitle);
  };

  return { trackPage };
};
