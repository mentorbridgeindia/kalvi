import { PlusIcon } from '@heroicons/react/24/outline';
import { type SVGProps } from 'react';

export interface IconPlusProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function IconPlus({ className = '', ...props }: IconPlusProps) {
  return <PlusIcon className={className} {...props} />;
}

