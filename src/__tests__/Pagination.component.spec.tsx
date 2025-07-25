import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../components/Pagination.component';

describe('Pagination component', () => {
  const onPageChangeMock = vi.fn();

  it('renders correctly and shows the current page and total pages', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.getByText('Page 5 of 10')).toBeInTheDocument();
  });

  it('disables the "Previous" button on the first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
  });

  it('disables the "Next" button on the last page', () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('calls onPageChange with the correct page number when "Next" is clicked', async () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(onPageChangeMock).toHaveBeenCalledWith(6);
  });

  it('calls onPageChange with the correct page number when "Previous" is clicked', async () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />
    );
    await userEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  it('does not render if totalPages is 1 or less', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={onPageChangeMock}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
