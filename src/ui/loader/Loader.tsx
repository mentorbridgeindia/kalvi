import { type HTMLAttributes } from 'react';

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export function Loader({ size = 'md', className = '', ...props }: LoaderProps) {
  const sizeStyles = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div
      className={`inline-block animate-spin rounded-full border-primary-600 border-t-transparent ${sizeStyles[size]} ${className}`}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

