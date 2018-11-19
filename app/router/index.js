import { Router } from 'express';

// Controllers
import auth from '../controllers/Auth';
import userController from '../controllers/User.controller';
import postController from '../controllers/Posts.controller';

// Access token in request header
import verifyToken from '../accessToken';

const router = new Router();
/**
 * @description Authentication
 */
router.get('/', auth.home);
router.post('/login', auth.login);

/**
 * @description User router
 */
router.get('/user', userController.user);
router.post('/create_user', userController.createUser);
router.put('/update_user', verifyToken, userController.updateUser);
router.delete('/delete_user', userController.deleteUser);

/**
 * @description Post router
 */

router.post('/create_post', verifyToken, postController.createPost);
router.put('/update_post', verifyToken, postController.updatePost);
router.get('/posts', verifyToken, postController.getAllPost);

export default router;
