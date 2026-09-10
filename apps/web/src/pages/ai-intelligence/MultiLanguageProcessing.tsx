import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

const languages = [
  { code: 'EN', name: 'English', example: 'Buy EURUSD at 1.1050' },
  { code: 'PT', name: 'Portuguese', example: 'Comprar EURUSD a 1.1050' },
  { code: 'ES', name: 'Spanish', example: 'Comprar EURUSD en 1.1050' },
  { code: 'FR', name: 'French', example: 'Acheter EURUSD à 1.1050' },
  { code: 'DE', name: 'German', example: 'Kaufen EURUSD bei 1.1050' },
  { code: 'AR', name: 'Arabic', example: 'شراء EURUSD عند 1.1050' },
  { code: 'RU', name: 'Russian', example: 'Купить EURUSD по 1.1050' },
  { code: 'TR', name: 'Turkish', example: 'EURUSD al 1.1050' },
  { code: 'ID', name: 'Indonesian', example: 'Beli EURUSD di 1.1050' },
  { code: 'HI', name: 'Hindi', example: 'EURUSD खरीदें 1.1050' },
];

export function MultiLanguageProcessing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Multi-Language Processing</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          SignalForge understands signals in any language
        </p>
      </div>

      <Card>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          The AI parser automatically detects language and translates intent, so you can follow providers
          in any language without manual translation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {languages.map((lang) => (
            <div key={lang.code} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="primary">{lang.code}</Badge>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{lang.name}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">"{lang.example}"</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}