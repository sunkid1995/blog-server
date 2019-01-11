import { Router } from 'express';

// Controllers
import auth from '../controllers/Auth';
import userController from '../controllers/User.controller';
import postController from '../controllers/Posts.controller';
import likeController from '../controllers/Like.controller';
import commentController from '../controllers/Comment.controller';

// Access token in request header
import checkAuth from '../middleware/checkAuth';

// multer
import multerImage from '../multerImage';

const router = new Router();
/**
 * @description Authentication
 */
router.get('/', checkAuth, auth.home);
router.post('/signup', auth.signup);
router.post('/signin', auth.signin);

/**
 * @description User router
 */
router.get('/user', userController.user);
router.post('/create_user', userController.createUser);
router.put('/update_user', checkAuth, userController.updateUser);
router.delete('/delete_user', userController.deleteUser);

/**
 * @description Post router
 */

router.post('/create_post', checkAuth, multerImage.single('image'), postController.createPost);
router.put('/update_post', checkAuth, postController.updatePost);
router.get('/search_post', checkAuth, postController.search);
router.delete('/delete_post', checkAuth, postController.delete);
router.get('/posts', checkAuth, postController.getAllPost);

/**
 * @description Like router
 */
router.post('/create_like_post', checkAuth, likeController.create);
router.delete('/unlike_post', checkAuth, likeController.unlike);
router.get('/get_like_post', checkAuth, likeController.getLike);
router.get('/like', checkAuth, likeController.getAllLike);

/**
 * @description Comment router
 */
router.post('/create_comment_post', checkAuth, commentController.createComment);
router.put('/update_comment_post', checkAuth, commentController.updateComment);
router.delete('/delete_comment_post', checkAuth, commentController.deleteComment);
router.get('/get_comment_post', checkAuth, commentController.showComment);
router.get('/comment', checkAuth, commentController.comment);

export default router;
