// App.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/services/analytics';

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    trackPageView('page_view');
  }, [location]);
}
