// src/app/modules/Enrollment/enrollment.route.ts

import express from 'express';
import { EnrollmentControllers } from './enrollment.controller';
import { EnrollmentValidations } from './enrollment.validation';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import authStudent from '../../middlewares/auth.student';

const router = express.Router();

// Create a new enrollment (Accessible by students)
router.post(
    '/',
    authStudent(USER_ROLE.STUDENT),
    validateRequest(EnrollmentValidations.createEnrollmentValidationSchema),
    EnrollmentControllers.createEnrollment
);



// Get all enrollments (Accessible by admins)
router.get('/', auth(USER_ROLE.ADMIN), EnrollmentControllers.getAllEnrollments);


router.patch('/approve', auth(USER_ROLE.ADMIN), EnrollmentControllers.approvedStudent);



// Get a single enrollment by ID (Accessible by admins and the enrolled student)
router.get('/:id', auth(USER_ROLE.ADMIN, USER_ROLE.STUDENT), EnrollmentControllers.getSingleEnrollment);

// Update an enrollment by ID (Accessible by admins)
router.patch(
    '/:id',
    auth(USER_ROLE.ADMIN),
    validateRequest(EnrollmentValidations.updateEnrollmentValidationSchema),
    EnrollmentControllers.updateEnrollment
);

// Delete an enrollment by ID (Accessible by admins)
router.delete('/:id', auth(USER_ROLE.ADMIN), EnrollmentControllers.deleteEnrollment);

export const EnrollmentRoutes = router;