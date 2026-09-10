import { Router } from 'express';
import { requireAuthenticated } from '../middleware/auth.middleware';

const router = Router();
router.use(requireAuthenticated());

router.get('/:traderId', async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: {
        traderId: req.params.traderId,
        consistency: 0,
        discipline: 0,
        riskScore: 0,
        style: 'Unknown',
        martingale: false,
        grid: false,
        recovery: false,
        newsExposure: 'low',
      },
    });
  } catch (error) { next(error); }
});

export default router;