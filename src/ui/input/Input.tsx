import { type InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, className = '', ...props }, ref) => {
    const baseStyles =
      'w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0';
    const errorStyles = error
      ? 'border-error-300 text-error-900 placeholder-error-400 focus:border-error-500 focus:ring-error-500'
      : 'border-secondary-300 text-secondary-900 placeholder-secondary-400 focus:border-primary-500 focus:ring-primary-500';

    const combinedClassName = `${baseStyles} ${errorStyles} ${className}`;

    return <input ref={ref} className={combinedClassName} {...props} />;
  }
);

Input.displayName = 'Input';
