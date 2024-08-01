import { useState, useEffect } from 'react';

export function useScrollToTop(threshold: number = 400) {
  const [showTopButton, setShowTopButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > threshold) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return showTopButton;
}
