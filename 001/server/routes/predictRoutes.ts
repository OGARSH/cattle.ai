import { Router } from 'express';
import multer from 'multer';
import { predict } from '../controllers/predictController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), predict);

export default router;