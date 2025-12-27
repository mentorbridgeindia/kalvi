import { TrashIcon } from '@heroicons/react/24/outline';
import { type SVGProps } from 'react';

export interface IconTrashProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function IconTrash({ className = '', ...props }: IconTrashProps) {
  return <TrashIcon className={className} {...props} />;
}

