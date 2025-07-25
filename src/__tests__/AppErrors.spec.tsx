import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import AppErrors from '../layout/AppErrors';

const ProblemChild = () => {
  throw new Error('Test Error');
};

describe('AppErrors (ErrorBoundary)', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders children when there is no error', () => {
    render(
      <AppErrors>
        <div>Success</div>
      </AppErrors>
    );
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('catches an error and displays a fallback UI', () => {
    render(
      <AppErrors>
        <ProblemChild />
      </AppErrors>
    );
    expect(screen.getByText(/oops! something went wrong/i)).toBeInTheDocument();
  });
});
