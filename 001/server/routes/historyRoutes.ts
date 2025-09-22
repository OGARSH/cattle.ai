import { Router } from 'express';
import { 
  getHistory, 
  createHistoryRecord, 
  deleteHistoryRecord 
} from '../controllers/historyController';

const router = Router();

router.get('/', getHistory);
router.post('/', createHistoryRecord);
router.delete('/:recordId', deleteHistoryRecord);

export default router;