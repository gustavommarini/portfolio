import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import './language/i18n.ts';
import { Routes } from './router';
import { ThemeProvider } from './theme';
import { DataProvider } from './context/dataContext.tsx';
import { consoleCopyrightMessage } from './console-message.ts';

consoleCopyrightMessage();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <DataProvider>
        <Routes />
      </DataProvider>
    </ThemeProvider>
  </StrictMode>
);
