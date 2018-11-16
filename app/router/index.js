import { Router } from 'express';

// Controllers
import auth from '../controllers/Auth';
import userController from '../controllers/User.controller';

const router = new Router();
/**
 * @description auth root
 */
router.get('/', auth.home);

/**
 * @description user router
 */
router.post('/create_user', userController.createUser);
router.put('/update_user', userController.updateUser);

export default router;
