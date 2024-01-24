import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders title of page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Pizza Pop Price Scraper/i);
  expect(linkElement).toBeInTheDocument();
});

test('search for placeholder text in search', () => {
  render(<App />);
  const searchText = screen.getByPlaceholderText(/Search for product.../i);
  expect(searchText).toBeInTheDocument();
});