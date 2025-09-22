import { Router } from 'express';
import { getBreedInfo } from '../controllers/breedController';

const router = Router();

router.get('/:breedName', getBreedInfo);

export default router;