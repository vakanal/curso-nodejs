import express, { Router } from 'express';
import { isAuth, isValidHostname, isAdmin } from '../../middlewares/auth';
import usersController from '../../controllers/v1/users-controller';

const router: Router = express.Router();

router.post('/login', usersController.login);
router.post('/create', usersController.createUser);
router.post(
  '/update',
  isValidHostname,
  isAuth,
  isAdmin,
  usersController.updateUser
);
router.post(
  '/delete',
  isValidHostname,
  isAuth,
  isAdmin,
  usersController.deleteUser
);
router.get(
  '/get-all',
  isValidHostname,
  isAuth,
  isAdmin,
  usersController.getUsers
);

export default router;
