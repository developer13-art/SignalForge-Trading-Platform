import { Router } from 'express';
import { referralsController } from '../controllers/referrals.controller';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { requireKycForReferral } from '../middleware/kyc.middleware';

const router = Router();

router.use(requireAuthenticated());

router.get('/dashboard', requireKycForReferral(), referralsController.getDashboard);
router.get('/wallet', requireKycForReferral(), referralsController.getWallet);
router.get('/rewards', requireKycForReferral(), referralsController.getRewards);
router.get('/leaderboard', requireKycForReferral(), referralsController.getLeaderboard);

export default router;