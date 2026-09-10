import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { CheckIcon } from './icons';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className, ...props }, ref) => {
    return (
      <div className="flex items-start gap-2">
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <div className={clsx(
            'w-5 h-5 border-2 rounded transition-colors cursor-pointer flex items-center justify-center',
            'peer-checked:bg-primary-600 peer-checked:border-primary-600',
            'peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2',
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600',
            className
          )}>
            <CheckIcon size={14} className="text-white opacity-0 peer-checked:opacity-100" />
          </div>
        </div>
        <label className="flex-1 cursor-pointer">
          {label && <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>}
          {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
          {error && <p className="text-xs text-red-600 dark:text-red-400 mt-1">{error}</p>}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';