// App.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);

  const header = screen.getByText(/СOVID Stats/i);

  expect(header).toBeInTheDocument();
});
