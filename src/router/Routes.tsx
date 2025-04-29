import { BrowserRouter, Routes as AppRoutes, Route } from 'react-router-dom';
import { Home, About, Work, Contact } from '../pages';
import { LanguageMenu, Navbar, SocialIcons } from '@/components';

export const Routes = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Navbar />
      <AppRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work-experience" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </AppRoutes>
      <SocialIcons />
      <LanguageMenu />
    </BrowserRouter>
  );
};
