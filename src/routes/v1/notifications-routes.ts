import express, { Router } from 'express';
import notificationsController from '../../controllers/v1/notifications-controller';

const router: Router = express.Router();

router.post('/send', notificationsController.sendNotifications);

export default router;
