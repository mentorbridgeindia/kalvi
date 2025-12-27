import { type HTMLAttributes, forwardRef } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ header, footer, children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-lg border border-secondary-200 bg-white shadow-sm ${className}`}
        {...props}
      >
        {header ? (
          <div className="border-b border-secondary-200 px-6 py-4">
            {header}
          </div>
        ) : null}
        <div className="px-6 py-4">{children}</div>
        {footer ? (
          <div className="border-t border-secondary-200 px-6 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    );
  }
);

Card.displayName = 'Card';

