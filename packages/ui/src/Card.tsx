import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow border border-gray-100 ${className || ''}`}>
      {children}
    </div>
  );
}