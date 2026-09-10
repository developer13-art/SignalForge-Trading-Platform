import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, className, ...props }, ref) => {
    return (
      <label className={clsx('flex items-start gap-2 cursor-pointer', className)}>
        <div className="relative flex items-center mt-0.5">
          <input ref={ref} type="radio" className="peer sr-only" {...props} />
          <div className={clsx(
            'w-5 h-5 border-2 rounded-full transition-colors flex items-center justify-center',
            'peer-checked:border-primary-600',
            'peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2',
            'border-gray-300 dark:border-gray-600'
          )}>
            <div className="w-2.5 h-2.5 rounded-full bg-primary-600 scale-0 peer-checked:scale-100 transition-transform" />
          </div>
        </div>
        {(label || description) && (
          <div className="flex-1">
            {label && <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>}
            {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
          </div>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';