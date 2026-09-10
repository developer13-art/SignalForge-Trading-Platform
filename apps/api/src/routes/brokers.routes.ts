import { Router } from 'express';
import { brokersController } from '../controllers/brokers.controller';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { requireKycForTrading } from '../middleware/kyc.middleware';

const router = Router();

router.use(requireAuthenticated());

router.get('/', brokersController.getBrokers);
router.get('/accounts', brokersController.getAccounts);
router.post('/accounts/connect', requireKycForTrading(), brokersController.connect);
router.get('/accounts/:id', brokersController.getAccount);
router.post('/accounts/:id/disconnect', brokersController.disconnect);
router.post('/accounts/:id/sync', brokersController.sync);

export default router;