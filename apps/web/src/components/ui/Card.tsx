import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

export function Card({ children, className, hoverable = false, onClick, padding = 'md' }: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'card',
          paddingStyles[padding],
          hoverable && 'cursor-pointer hover:shadow-glow',
          className
        )
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}