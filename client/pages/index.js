import React from 'react';
import { ThemeProvider } from 'styled-components';
import App from '../containers/App';

import colors from '../components/ui/variables';

export default () => (
  <ThemeProvider theme={colors}>
    <App />
  </ThemeProvider>
);
