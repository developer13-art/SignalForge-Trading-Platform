import { Router } from 'express';
import { aiController } from '../controllers/ai.controller';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validation.middleware';
import { parseSignalSchema, classifyMessageSchema, testProviderDnaSchema } from '../validators/ai.validator';

const router = Router();

router.use(requireAuthenticated());

router.post('/parse', validateBody(parseSignalSchema), aiController.parseMessage);
router.post('/classify', validateBody(classifyMessageSchema), aiController.classifyMessage);
router.post('/process', aiController.processMessage);
router.get('/provider-dna/:providerId', aiController.getProviderDna);
router.post('/provider-dna/test', validateBody(testProviderDnaSchema), aiController.testProviderDna);
router.get('/logs', aiController.getProcessingLogs);

export default router;