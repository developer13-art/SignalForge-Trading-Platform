import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { SearchIcon, FilterIcon, TraderIcon, StarIcon, UsersIcon } from '../../components/ui/icons';
import { marketplaceService, Trader } from '../../services/marketplace.service';

export function BrowseTraders() {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [filtered, setFiltered] = useState<Trader[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    marketplaceService.getTraders().then((data) => {
      setTraders(data);
      setFiltered(data);
    }).finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(traders);
      return;
    }
    const q = search.toLowerCase();
    setFiltered(traders.filter(t => t.displayName.toLowerCase().includes(q) || t.bio?.toLowerCase().includes(q)));
  }, [search, traders]);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Browse Traders</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Follow skilled traders and copy their strategies
          </p>
        </div>
        <Link to="/marketplace/traders/categories">
          <Button variant="outline">
            <FilterIcon size={18} />
            Categories
          </Button>
        </Link>
      </div>

      <Card>
        <Input
          placeholder="Search traders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<SearchIcon size={18} />}
        />
      </Card>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((trader) => (
            <Card key={trader.id} hoverable onClick={() => window.location.href = `/marketplace/traders/${trader.id}`}>
              <div className="flex items-start gap-3 mb-3">
                <Avatar src={trader.avatarUrl} name={trader.displayName} size="lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{trader.displayName}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{trader.bio}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                {trader.rating !== undefined && (
                  <div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <StarIcon size={12} className="text-yellow-500 fill-yellow-500" />
                      Rating
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{trader.rating.toFixed(1)}</p>
                  </div>
                )}
                {trader.followerCount !== undefined && (
                  <div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <UsersIcon size={12} />
                      Followers
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{trader.followerCount}</p>
                  </div>
                )}
                {trader.monthlyReturn !== undefined && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Return</p>
                    <p className={`text-sm font-semibold mt-0.5 ${trader.monthlyReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {trader.monthlyReturn >= 0 ? '+' : ''}{trader.monthlyReturn.toFixed(1)}%
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={<TraderIcon size={32} className="text-gray-400" />}
            title="No Traders Found"
            description={search ? 'No traders match your search.' : 'Traders will appear here once available.'}
          />
        </Card>
      )}
    </div>
  );
}