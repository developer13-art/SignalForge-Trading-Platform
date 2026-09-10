import React from 'react';
import { clsx } from 'clsx';
import { ChevronUpIcon, ChevronDownIcon } from '../ui/icons';

interface TableSortProps {
  column: string;
  label: string;
  sortKey: string | null;
  sortOrder: 'asc' | 'desc';
  onSort: (key: string) => void;
}

export function TableSort({ column, label, sortKey, sortOrder, onSort }: TableSortProps) {
  const isActive = sortKey === column;

  return (
    <button
      onClick={() => onSort(column)}
      className={clsx(
        'flex items-center gap-1 text-xs font-medium uppercase tracking-wider transition-colors',
        isActive
          ? 'text-primary-600 dark:text-primary-400'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
      )}
    >
      {label}
      <span className="flex flex-col">
        <ChevronUpIcon size={12} className={clsx(isActive && sortOrder === 'asc' ? 'text-primary-600' : 'opacity-30')} />
        <ChevronDownIcon size={12} className={clsx('-mt-1', isActive && sortOrder === 'desc' ? 'text-primary-600' : 'opacity-30')} />
      </span>
    </button>
  );
}