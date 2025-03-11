import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

export const UserRoutes = router;

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.studentRegister
);


router.post(
  '/verify-email',
  validateRequest(UserValidation.verifyEmailValidationSchema),
  UserControllers.verifyEmail
);

router.get('/', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);
