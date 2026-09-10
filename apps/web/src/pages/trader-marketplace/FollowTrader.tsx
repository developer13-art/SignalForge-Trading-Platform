import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CheckIcon, ArrowLeftIcon } from '../../components/ui/icons';
import { marketplaceService } from '../../services/marketplace.service';
import toast from 'react-hot-toast';

export function FollowTrader() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      await marketplaceService.followTrader(id);
      toast.success('Now following this trader');
      navigate('/marketplace/traders/my-followed');
    } catch (error: any) {
      toast.error(error?.response?.data?.error?.message || 'Failed to follow');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600">
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Follow Trader</h1>
      </div>

      <Card>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Following this trader will notify you of their new signals and trades. You can enable copy trading separately.
          </p>

          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckIcon size={16} className="text-green-500 mt-0.5 shrink-0" />
              Get notified of new trades
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckIcon size={16} className="text-green-500 mt-0.5 shrink-0" />
              See their trade history
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CheckIcon size={16} className="text-green-500 mt-0.5 shrink-0" />
              Optionally enable copy trading
            </li>
          </ul>

          <Button onClick={handleFollow} isLoading={isLoading} className="w-full">
            Confirm Follow
          </Button>
        </div>
      </Card>
    </div>
  );
}