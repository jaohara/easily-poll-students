import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders easy poll logo', () => {
  render(<App />);
  const logoElement = screen.getByText(/easy poll/i);
  expect(logoElement).toBeInTheDocument();
});

// TODO: Implement this as EpCopyright is finalized
// test('renders ep-copyright component', () => {
//   render(<App />);
//   const copyrightElement = screen.getByText(/copyright 2023/i);
//   expect(copyrightElement).toBeInTheDocument();
// });