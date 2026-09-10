import React from 'react';
import { clsx } from 'clsx';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  status?: 'online' | 'offline' | 'busy';
}

export function Avatar({ src, alt, name, size = 'md', className, status }: AvatarProps) {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-2xl',
  };

  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
  };

  const initials = name
    ?.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={alt || name}
          className={clsx('rounded-full object-cover', sizes[size], className)}
        />
      ) : (
        <div
          className={clsx(
            'rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center font-semibold text-primary-700 dark:text-primary-400',
            sizes[size],
            className
          )}
        >
          {initials || '?'}
        </div>
      )}
      {status && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-gray-900',
            statusSizes[size],
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}