import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import AppErrors from '../layout/AppErrors';

// A component that throws an error
const ProblemChild = () => {
  throw new Error('Test Error From Child');
};

describe('AppErrors (ErrorBoundary)', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Suppress console.error output for this test, as the error is expected
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders children when there is no error', () => {
    render(
      <AppErrors>
        <div>Child component rendered successfully</div>
      </AppErrors>
    );
    expect(
      screen.getByText('Child component rendered successfully')
    ).toBeInTheDocument();
  });

  it('catches an error in a child component and displays a fallback UI', () => {
    render(
      <AppErrors>
        <ProblemChild />
      </AppErrors>
    );
    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'An unexpected error has occurred. Please try refreshing the page.'
      )
    ).toBeInTheDocument();
  });

  it('logs the error and errorInfo to the console', () => {
    render(
      <AppErrors>
        <ProblemChild />
      </AppErrors>
    );
    expect(consoleErrorSpy).toHaveBeenCalled();
    // Check if called with the specific error and info object
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Uncaught error:',
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
  });
});
