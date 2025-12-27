import { STATUS, type Status } from '@/lib/constants';
import { type HTMLAttributes } from 'react';

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: Status;
}

export function StatusBadge({
  status,
  className = '',
  ...props
}: StatusBadgeProps) {
  const isActive = status === STATUS.ACTIVE;

  const baseStyles =
    'flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium gap-2 font-bold w-fit';
  const statusStyles = isActive
    ? 'bg-success-100 text-success-800'
    : 'bg-red-100 text-red-800';

  return (
    <span className={`${baseStyles} ${statusStyles} ${className}`} {...props}>
      <span className="">{status}</span>
    </span>
  );
}
