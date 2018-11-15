import { Router } from 'express';

// Controllers
import Auth from '../controllers/Auth';

const router = new Router();

router.get('/', Auth.home);


export default router;