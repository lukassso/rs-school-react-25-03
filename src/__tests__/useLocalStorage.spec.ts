import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import useLocalStorage from '../hooks/useLocalStorage';

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('should return the initial value if nothing is in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should return the stored value from localStorage', () => {
    window.localStorage.setItem('testKey', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));
    expect(result.current[0]).toBe('stored');
  });

  it('should update localStorage when the value is set', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));

    act(() => {
      const setValue = result.current[1];
      setValue('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(window.localStorage.getItem('testKey')).toBe(
      JSON.stringify('updated')
    );
  });

  it('should handle function as a value updater', () => {
    const { result } = renderHook(() => useLocalStorage('count', 0));

    act(() => {
      const setCount = result.current[1];
      setCount((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(window.localStorage.getItem('count')).toBe('1');
  });
});
