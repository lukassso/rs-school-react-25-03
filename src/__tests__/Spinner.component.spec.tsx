import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Spinner from '../components/Spinner.component';

describe('Spinner component', () => {
  it('renders correctly', () => {
    render(<Spinner />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Spinner size="sm" />);
    expect(screen.getByTestId('spinner')).toHaveClass('w-6', 'h-6');

    rerender(<Spinner size="md" />);
    expect(screen.getByTestId('spinner')).toHaveClass('w-12', 'h-12');

    rerender(<Spinner size="lg" />);
    expect(screen.getByTestId('spinner')).toHaveClass('w-24', 'h-24');
  });
});
