import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';
import { AdminControllers } from './admin.controller';

const router = express.Router();

export const AdminRoutes = router;

router.post(
    '/create-admin',
    // auth(USER_ROLE.ADMIN),
    validateRequest(AdminValidation.createAdminValidationSchema),
    AdminControllers.adminRegister
);


router.post(
    '/verify-email',
    validateRequest(AdminValidation.verifyEmailValidationSchema),
    AdminControllers.verifyAdminEmail
);


// router.get('/', UserControllers.getAllUsers);
// router.get('/:id', UserControllers.getSingleUser);
