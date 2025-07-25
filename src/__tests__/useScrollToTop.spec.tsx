import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import useScrollToTop from '../hooks/useScrollToTop';

describe('useScrollToTop hook', () => {
  beforeEach(() => {
    window.scroll = vi.fn();
    window.scrollTo = vi.fn();
  });

  it('calls window.scroll on dependency change', () => {
    let deps = [1];
    const { rerender } = renderHook(() => useScrollToTop(deps));

    expect(window.scroll).toHaveBeenCalledTimes(1);

    deps = [2];
    rerender();

    expect(window.scroll).toHaveBeenCalledTimes(2);
  });

  it('uses fallback window.scrollTo if window.scroll fails', () => {
    (window.scroll as Mock).mockImplementation(() => {
      throw new Error('Test error');
    });

    renderHook(() => useScrollToTop([1]));

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
