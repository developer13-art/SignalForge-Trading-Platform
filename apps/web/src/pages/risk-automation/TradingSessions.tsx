import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Switch } from '../../components/ui/Switch';
import { Spinner } from '../../components/ui/Spinner';
import { ClockIcon } from '../../components/ui/icons';
import { riskService, RiskProfile } from '../../services/risk.service';
import toast from 'react-hot-toast';

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

interface Session {
  day: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
}

export function TradingSessions() {
  const [profile, setProfile] = useState<RiskProfile | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    riskService.getProfile().then((p) => {
      setProfile(p);
      const existing = (p.tradingSessions as Session[]) || [];
      const merged = DAYS.map((day) => {
        const found = existing.find((s) => s.day === day);
        return found || { day, enabled: false, startTime: '00:00', endTime: '23:59' };
      });
      setSessions(merged);
    }).finally(() => setIsLoading(false));
  }, []);

  const updateSession = (day: string, updates: Partial<Session>) => {
    setSessions(sessions.map((s) => s.day === day ? { ...s, ...updates } : s));
  };

  const handleSave = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      await riskService.updateProfile({ ...profile, tradingSessions: sessions } as any);
      toast.success('Trading sessions updated');
    } catch {
      toast.error('Failed to update');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-12"><Spinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Trading Sessions</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Restrict trading to specific days and hours
        </p>
      </div>

      <Card>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center shrink-0">
            <ClockIcon size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Weekly Schedule</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Signals will only execute during enabled sessions
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.day} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <Switch
                checked={session.enabled}
                onChange={(enabled) => updateSession(session.day, { enabled })}
                label={session.day.charAt(0) + session.day.slice(1).toLowerCase()}
              />
              {session.enabled && (
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <Input
                    label="Start Time (UTC)"
                    type="time"
                    value={session.startTime}
                    onChange={(e) => updateSession(session.day, { startTime: e.target.value })}
                  />
                  <Input
                    label="End Time (UTC)"
                    type="time"
                    value={session.endTime}
                    onChange={(e) => updateSession(session.day, { endTime: e.target.value })}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} isLoading={isSaving}>Save Changes</Button>
      </div>
    </div>
  );
}