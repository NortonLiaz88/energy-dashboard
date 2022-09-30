import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import theme from './styles/theme';
import RoutesSystem from './routes';
import GlobalStyle from './styles/global';
import Header from './components/molecules/Header';

const queryClient = new QueryClient();

// eslint-disable-next-line react/function-component-definition
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <RoutesSystem />
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
