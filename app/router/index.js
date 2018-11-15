import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send("<h1>Wellcome to web server</h1>");
})


export default router;