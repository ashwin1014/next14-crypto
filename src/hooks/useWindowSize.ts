'use client';

import { useState, useEffect, useCallback } from 'react';

import { breakpoints } from '@/theme/constants';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
  isMobile: boolean;
  isScreenMd: boolean;
}

export function useWindowSize(): WindowSize {
  const isClient = typeof window === 'object';

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSize, isClient]);

  return {
    ...windowSize,
    isMobile: windowSize.width !== undefined && windowSize.width <= breakpoints.sm,
    isScreenMd: windowSize.width !== undefined && windowSize.width <= breakpoints.xl,
  };
}

export default useWindowSize;
