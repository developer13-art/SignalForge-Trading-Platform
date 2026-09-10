import { drawdownService } from '../risk/drawdown.service';

export const analyticsDrawdownService = {
  getDrawdown: drawdownService.calculateCurrentDrawdown.bind(drawdownService),
};