import { Router } from 'express';

// Controllers
import auth from '../controllers/Auth';
import userController from '../controllers/User.controller';
import postController from '../controllers/Posts.controller';
import likeController from '../controllers/Like.controller';
import commentController from '../controllers/Comment.controller';

// Access token in request header
import verifyToken from '../accessToken';

//
import multerImage from '../multerImage';

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

router.post('/create_post', verifyToken, multerImage.single('image'), postController.createPost);
router.put('/update_post', verifyToken, postController.updatePost);
router.get('/search_post', verifyToken, postController.search);
router.delete('/delete_post', verifyToken, postController.delete);
router.get('/posts', verifyToken, postController.getAllPost);

/**
 * @description Like router
 */
router.post('/create_like_post', verifyToken, likeController.create);
router.delete('/unlike_post', verifyToken, likeController.unlike);
router.get('/get_like_post', verifyToken, likeController.getLike);
router.get('/like', verifyToken, likeController.getAllLike);

/**
 * @description Comment router
 */
router.post('/create_comment_post', verifyToken, commentController.createComment);
router.put('/update_comment_post', verifyToken, commentController.updateComment);
router.delete('/delete_comment_post', verifyToken, commentController.deleteComment);
router.get('/get_comment_post', verifyToken, commentController.showComment);

export default router;
