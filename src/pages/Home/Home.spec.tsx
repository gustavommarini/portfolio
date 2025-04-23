import { render, renderHook, screen } from '@testing-library/react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import Home from './Home';

describe('Home', () => {
  test('Should found only header1', async () => {
    const t = renderHook(() => useTranslation());
    render(
      <I18nextProvider i18n={t.result.current.i18n}>
        <Home />
      </I18nextProvider>
    );
    expect(screen.getByRole('heading', { level: 1 }));
  });

  test('renders the images for all the installed libs', async () => {
    const t = renderHook(() => useTranslation());
    render(
      <I18nextProvider i18n={t.result.current.i18n}>
        <Home />
      </I18nextProvider>
    );
    const links = await screen.findAllByRole('link');
    expect(links).toHaveLength(8);
  });
});
