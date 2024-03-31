import { RefObject, useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement>(
  handler
): RefObject<T> => {
  const domNode = useRef<T>(null);

  useEffect(() => {
    const outsideClick = (event: MouseEvent) => {
      if (!domNode.current?.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', outsideClick);
    return () => {
      document.removeEventListener('mousedown', outsideClick);
    };
  }, []);

  return domNode;
};
