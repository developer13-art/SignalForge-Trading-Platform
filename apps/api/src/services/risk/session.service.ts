export class TradingSessionService {
  checkSession(sessions: any[] | null): boolean {
    if (!sessions || sessions.length === 0) return true;

    const now = new Date();
    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const currentDay = dayNames[now.getDay()];
    const currentTime = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}`;

    const todaySession = sessions.find((s: any) => s.day === currentDay);
    if (!todaySession || !todaySession.enabled) return false;

    return currentTime >= todaySession.startTime && currentTime <= todaySession.endTime;
  }
}

export const tradingSessionService = new TradingSessionService();