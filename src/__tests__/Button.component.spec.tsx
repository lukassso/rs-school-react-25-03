import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Button from '../components/Button.component';

describe('Button component', () => {
  it('renders with default children text', () => {
    render(<Button />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('renders with provided children', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls default onClick handler (alert) when no onClick prop is provided', async () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Button />);
    await userEvent.click(screen.getByRole('button'));
    expect(alertMock).toHaveBeenCalledWith('Button clicked!');
    alertMock.mockRestore();
  });
});
