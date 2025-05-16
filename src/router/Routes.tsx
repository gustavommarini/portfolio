import { BrowserRouter, Routes as AppRoutes, Route } from 'react-router-dom';
import { HomeV2, About, Work, Contact, Error } from '../pages';
import { LanguageMenu, Navbar, SocialIcons } from '@/components';

export const Routes = () => {
  return (
    <main className="main-app">
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Navbar />
        <AppRoutes>
          <Route path="/" element={<HomeV2 />} />
          <Route path="/about" element={<About />} />
          <Route path="/work-experience" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={<Error customErrorMsg="wrong_route_error" />}
          />
        </AppRoutes>
        <SocialIcons />
        <LanguageMenu />
      </BrowserRouter>
    </main>
  );
};
