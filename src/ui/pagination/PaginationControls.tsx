import { type HTMLAttributes } from 'react';
import { Button } from '../button';

export interface PaginationControlsProps
  extends HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  className = '',
  ...props
}: PaginationControlsProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={`flex items-center justify-between ${className}`}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </Button>
        {showPageNumbers && (
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 text-sm text-secondary-500"
                  >
                    ...
                  </span>
                );
              }

              const pageNum = page as number;
              const isActive = pageNum === currentPage;

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`h-8 w-8 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-secondary-700 hover:bg-secondary-100'
                  }`}
                  aria-label={`Go to page ${pageNum}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        )}
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next
        </Button>
      </div>
      <div className="text-sm text-secondary-600">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}

