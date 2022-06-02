import { Router } from 'express';
import Controller from '../controllers/SpreadsheetController.js';

const router = Router();

const controller = new Controller();

router.get('/metadata', controller.metadata);
router.get('/rows/:pageTitle', controller.getRows);
router.post('/rows/:pageTitle', controller.addOneRow);
router.put('/rows/:pageTitle/:from/:to', controller.updateRow);

export default router;