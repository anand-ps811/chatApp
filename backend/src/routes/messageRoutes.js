import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getmessages ,sendMessage,getUserforsidebar} from '../controllers/messageController.js';
const router = express.Router();

router.get('/users',authMiddleware,getUserforsidebar)
router.get('/:id',authMiddleware,getmessages)
router.post('/send/:id',authMiddleware,sendMessage)
export default router;