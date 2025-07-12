import { BrowserRouter, Routes as AppRoutes, Route } from 'react-router-dom';
import { LanguageMenu, Navbar, SocialIcons, ThemeButton } from '@/components';
import { usePageTracking } from '@/services/analytics';
import { HomeV2, About, Work, Contact, Error } from '../pages';

export const Routes = () => {
  return (
    <main className="main-app">
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <RouterApp />
      </BrowserRouter>
    </main>
  );
};

const RouterApp = () => {
  usePageTracking();
  return (
    <>
      <Navbar />
      <AppRoutes>
        <Route path="/" element={<HomeV2 />} />
        <Route path="/about" element={<About />} />
        <Route path="/work-experience" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </AppRoutes>
      <SocialIcons />
      <ThemeButton />
      <LanguageMenu />
    </>
  );
};
