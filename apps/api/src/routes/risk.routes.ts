import { Router } from 'express';
import { riskController } from '../controllers/risk.controller';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validation.middleware';
import { riskProfileSchema, automationRuleSchema } from '../validators/risk.validator';

const router = Router();

router.use(requireAuthenticated());

router.get('/profile', riskController.getProfile);
router.patch('/profile', validateBody(riskProfileSchema), riskController.updateProfile);

router.get('/rules', riskController.getRules);
router.post('/rules', validateBody(automationRuleSchema), riskController.createRule);
router.patch('/rules/:id', riskController.updateRule);
router.delete('/rules/:id', riskController.deleteRule);

export default router;