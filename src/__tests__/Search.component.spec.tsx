import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SearchComponent from '../components/Search.component';

describe('SearchComponent', () => {
  const defaultProps = {
    isLoading: false,
    onSearch: vi.fn(),
    searchTerm: '',
    onSearchTermChange: vi.fn(),
  };

  it('renders the search input and button', () => {
    render(<SearchComponent {...defaultProps} />);
    expect(
      screen.getByPlaceholderText('Search Pikachu, Charizard...')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('displays the provided search term in the input', () => {
    render(<SearchComponent {...defaultProps} searchTerm="Charizard" />);
    expect(screen.getByDisplayValue('Charizard')).toBeInTheDocument();
  });

  it('calls onSearchTermChange when the user types in the input', async () => {
    const handleChange = vi.fn();
    render(
      <SearchComponent {...defaultProps} onSearchTermChange={handleChange} />
    );
    const input = screen.getByPlaceholderText('Search Pikachu, Charizard...');
    await userEvent.type(input, 'Pikachu');
    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onSearch when the search button is clicked', async () => {
    const handleSearch = vi.fn();
    render(<SearchComponent {...defaultProps} onSearch={handleSearch} />);
    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  it('disables the input and button when isLoading is true', () => {
    render(<SearchComponent {...defaultProps} isLoading={true} />);
    expect(
      screen.getByPlaceholderText('Search Pikachu, Charizard...')
    ).toBeDisabled();
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
  });

  it('calls onSearch when the Enter key is pressed', async () => {
    const handleSearch = vi.fn();
    render(<SearchComponent {...defaultProps} onSearch={handleSearch} />);
    const input = screen.getByPlaceholderText('Search Pikachu, Charizard...');

    await userEvent.type(input, 'test');
    await userEvent.keyboard('{enter}');

    expect(handleSearch).toHaveBeenCalledTimes(1);
  });
});
