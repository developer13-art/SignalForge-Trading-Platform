import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { StarIcon, UsersIcon } from '../ui/icons';

interface ProviderCardProps {
  name: string;
  avatarUrl?: string;
  description?: string;
  rating?: number;
  subscribers?: number;
  monthlyReturn?: number;
  isVerified?: boolean;
  onClick?: () => void;
}

export function ProviderCard({
  name,
  avatarUrl,
  description,
  rating,
  subscribers,
  monthlyReturn,
  isVerified,
  onClick,
}: ProviderCardProps) {
  return (
    <Card hoverable={!!onClick} onClick={onClick}>
      <div className="flex items-start gap-3 mb-3">
        <Avatar src={avatarUrl} name={name} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">{name}</h3>
            {isVerified && <Badge variant="primary">Verified</Badge>}
          </div>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{description}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
        {rating !== undefined && (
          <div>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <StarIcon size={12} className="text-yellow-500 fill-yellow-500" />
              Rating
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">
              {rating.toFixed(1)}
            </p>
          </div>
        )}
        {subscribers !== undefined && (
          <div>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <UsersIcon size={12} />
              Subs
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">
              {subscribers}
            </p>
          </div>
        )}
        {monthlyReturn !== undefined && (
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Return</p>
            <p className={`text-sm font-semibold mt-0.5 ${
              monthlyReturn >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {monthlyReturn >= 0 ? '+' : ''}{monthlyReturn.toFixed(1)}%
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}