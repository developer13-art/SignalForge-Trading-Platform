import { Router } from 'express';
import { usersController } from '../controllers/users.controller';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validation.middleware';
import { updateProfileSchema, changePasswordSchema } from '../validators/user.validator';

const router = Router();

router.use(requireAuthenticated());

router.get('/profile', usersController.getProfile);
router.patch('/profile', validateBody(updateProfileSchema), usersController.updateProfile);
router.post('/change-password', validateBody(changePasswordSchema), usersController.changePassword);
router.get('/sessions', usersController.getSessions);
router.delete('/sessions/:id', usersController.revokeSession);

export default router;