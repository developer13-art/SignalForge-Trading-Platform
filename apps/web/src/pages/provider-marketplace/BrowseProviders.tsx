import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Spinner } from '../../components/ui/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { ProviderCard } from '../../components/cards/ProviderCard';
import { ProviderIcon, SearchIcon, FilterIcon } from '../../components/ui/icons';
import { marketplaceService, Provider } from '../../services/marketplace.service';

export function BrowseProviders() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filtered, setFiltered] = useState<Provider[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    marketplaceService.getProviders().then((data) => {
      setProviders(data);
      setFiltered(data);
    }).finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(providers);
      return;
    }
    const q = search.toLowerCase();
    setFiltered(providers.filter(p => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)));
  }, [search, providers]);

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Browse Providers</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Discover and subscribe to signal providers
          </p>
        </div>
        <Link to="/marketplace/providers/categories">
          <Button variant="outline">
            <FilterIcon size={18} />
            Categories
          </Button>
        </Link>
      </div>

      <Card>
        <Input
          placeholder="Search providers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<SearchIcon size={18} />}
        />
      </Card>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <ProviderCard
              key={p.id}
              name={p.name}
              avatarUrl={p.logoUrl}
              description={p.description}
              isVerified={p.isVerified}
              rating={p.rating}
              subscribers={p.subscriberCount}
              monthlyReturn={p.monthlyReturn}
              onClick={() => window.location.href = `/marketplace/providers/${p.id}`}
            />
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={<ProviderIcon size={32} className="text-gray-400" />}
            title="No Providers Found"
            description={search ? 'No providers match your search.' : 'Providers will appear here once available.'}
          />
        </Card>
      )}
    </div>
  );
}