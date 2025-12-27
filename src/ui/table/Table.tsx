import { type HTMLAttributes, forwardRef } from 'react';

export interface TableColumn<T> {
  key: string;
  header: React.ReactNode;
  render: (item: T) => React.ReactNode;
}

export interface TableProps<T> extends HTMLAttributes<HTMLTableElement> {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
}

// This fixes the lint error by properly declaring the generic type and merging with forwardRef
const TableInner = <T,>(
  {
    columns,
    data,
    emptyMessage = 'No data available',
    className = '',
    ...props
  }: TableProps<T>,
  ref: React.Ref<HTMLTableElement>
) => {
  return (
    <div className="overflow-x-auto">
      <table
        ref={ref}
        className={`min-w-full divide-y divide-secondary-200 ${className}`}
        {...props}
      >
        <thead className="bg-secondary-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-secondary-700"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-secondary-200 bg-white">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-sm text-secondary-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-secondary-50">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="whitespace-nowrap px-6 py-4 text-sm text-secondary-900"
                  >
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export const Table = forwardRef(TableInner) as <T>(
  props: TableProps<T> & { ref?: React.Ref<HTMLTableElement> }
) => React.ReactElement;

(Table as any).displayName = 'Table';
export default Table;
