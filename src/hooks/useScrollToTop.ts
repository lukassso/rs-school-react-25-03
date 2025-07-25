import { useEffect } from 'react';

/**
 * Custom hook that scrolls the window to the top whenever one of the dependencies changes.
 * @param dependencies - An array of dependencies that trigger the scroll effect.
 */
function useScrollToTop(dependencies: React.DependencyList) {
  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      console.error('Failed to scroll to top:', error);
      window.scrollTo(0, 0);
    }
  }, dependencies);
}

export default useScrollToTop;
