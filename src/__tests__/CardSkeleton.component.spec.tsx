import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardSkeleton from '../components/CardSkeleton.component';

describe('CardSkeleton component', () => {
  it('renders correctly without crashing', () => {
    // Render the component
    render(<CardSkeleton />);

    // Use the data-testid to find the element
    const skeletonElement = screen.getByTestId('card-skeleton');

    // Assert that the element is present in the document
    expect(skeletonElement).toBeInTheDocument();
  });

  it('has the correct base styling classes for a skeleton', () => {
    const { container } = render(<CardSkeleton />);
    const skeletonDiv = container.firstChild;

    // It verifies that the styling that makes it look like a skeleton is applied.
    expect(skeletonDiv).toHaveClass('h-38 w-67 bg-gray-300 rounded');
  });
});
