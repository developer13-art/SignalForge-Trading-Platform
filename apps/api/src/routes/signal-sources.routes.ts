import { Router } from 'express';
import { sourcesController } from '../controllers/sources.controller';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { requireKycForTrading } from '../middleware/kyc.middleware';
import { validateBody } from '../middleware/validation.middleware';
import { createSourceSchema, updateSourceSchema } from '../validators/source.validator';
import {
  telegramConnectSchema,
  telegramVerifySchema,
  selectChannelSchema,
} from '../validators/telegram.validator';

const router = Router();

router.use(requireAuthenticated());

// Signal Sources
router.post('/', requireKycForTrading(), validateBody(createSourceSchema), sourcesController.createSource);
router.get('/', sourcesController.getSources);
router.get('/:id', sourcesController.getSource);
router.patch('/:id', validateBody(updateSourceSchema), sourcesController.updateSource);
router.delete('/:id', sourcesController.deleteSource);

// Telegram
router.post('/telegram/connect', requireKycForTrading(), validateBody(telegramConnectSchema), sourcesController.initiateTelegramConnection);
router.post('/telegram/verify', requireKycForTrading(), validateBody(telegramVerifySchema), sourcesController.verifyTelegramConnection);
router.get('/telegram/status', sourcesController.getTelegramStatus);
router.get('/telegram/channels', sourcesController.discoverTelegramChannels);
router.post('/telegram/channels/select', validateBody(selectChannelSchema), sourcesController.selectTelegramChannel);
router.post('/telegram/disconnect', sourcesController.disconnectTelegram);

// Messages
router.get('/messages/all', sourcesController.getMessages);
router.get('/messages/:id', sourcesController.getMessage);

export default router;