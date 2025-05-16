import { BrowserRouter, Routes as AppRoutes, Route } from 'react-router-dom';
import { HomeV2, About, Work, Contact, Error } from '../pages';
import { LanguageMenu, Navbar, SocialIcons, ThemeButton } from '@/components';
import { ThemeContext } from '@/theme';
import { useContext, useEffect } from 'react';

export const Routes = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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
        <ThemeButton />
      </BrowserRouter>
    </main>
  );
};
