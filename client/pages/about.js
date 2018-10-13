import React from 'react';
import { ThemeProvider } from 'styled-components';
import About from '../components/About';

import colors from '../components/ui/variables';

export default () => (
  <ThemeProvider theme={colors}>
    <About />
  </ThemeProvider>
);
