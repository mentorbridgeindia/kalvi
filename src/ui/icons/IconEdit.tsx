import { PencilIcon } from '@heroicons/react/24/outline';
import { type SVGProps } from 'react';

export interface IconEditProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function IconEdit({ className = '', ...props }: IconEditProps) {
  return <PencilIcon className={className} {...props} />;
}

