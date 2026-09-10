export class NormalizationService {
  normalizeSymbol(symbol: string): string {
    const aliases: Record<string, string> = {
      'gold': 'XAUUSD',
      'silver': 'XAGUSD',
      'euro': 'EURUSD',
      'cable': 'GBPUSD',
      'fiber': 'EURUSD',
      'aussie': 'AUDUSD',
      'kiwi': 'NZDUSD',
      'loonie': 'USDCAD',
      'swissy': 'USDCHF',
    };
    const key = symbol.toLowerCase().replace('/', '').replace(/\s/g, '');
    return aliases[key] || symbol.toUpperCase().replace('/', '');
  }

  normalizeDirection(direction: string): 'BUY' | 'SELL' | null {
    const upper = direction.toUpperCase();
    if (['BUY', 'LONG', 'BULLISH'].includes(upper)) return 'BUY';
    if (['SELL', 'SHORT', 'BEARISH'].includes(upper)) return 'SELL';
    return null;
  }

  normalizeEntryType(type: string): 'MARKET' | 'LIMIT' | 'STOP' {
    const upper = type?.toUpperCase();
    if (upper === 'LIMIT') return 'LIMIT';
    if (upper === 'STOP') return 'STOP';
    return 'MARKET';
  }
}

export const normalizationService = new NormalizationService();