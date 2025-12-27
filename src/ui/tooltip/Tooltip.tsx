'use client';

import { useState, type HTMLAttributes } from 'react';

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({
  content,
  children,
  position = 'top',
  className = '',
  ...props
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowStyles = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-secondary-900',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-secondary-900',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-secondary-900',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-secondary-900',
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...props}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 whitespace-nowrap rounded-md bg-secondary-900 px-2 py-1 text-xs text-white ${positionStyles[position]}`}
          role="tooltip"
        >
          {content}
          <div
            className={`absolute h-0 w-0 border-4 border-transparent ${arrowStyles[position]}`}
          />
        </div>
      )}
    </div>
  );
}

