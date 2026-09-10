import { Router } from 'express';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { dnaService } from '../services/provider-dna/dna.service';

const router = Router();
router.use(requireAuthenticated());

router.get('/:providerId', async (req, res, next) => {
  try {
    const dna = await dnaService.getProviderDna(req.params.providerId);
    res.json({ success: true, data: dna });
  } catch (error) { next(error); }
});

router.post('/test', async (req, res, next) => {
  try {
    const { providerId, testMessage } = req.body;
    const result = await dnaService.testDna(providerId, testMessage);
    res.json({ success: true, data: result });
  } catch (error) { next(error); }
});

export default router;