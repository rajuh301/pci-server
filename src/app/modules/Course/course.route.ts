// src/app/modules/Course/course.route.ts

import express from 'express';
import { CourseControllers } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { CourseValidations } from './course.validation';

const router = express.Router();

// Create a new course (Only accessible by admin)
router.post(
    '/',
    // auth(USER_ROLE.ADMIN),
    validateRequest(CourseValidations.createCourseValidationSchema),
    CourseControllers.createCourse
);

// Get all courses (Accessible by all roles)
router.get('/', CourseControllers.getAllCourses);

// Get a single course by ID (Accessible by all roles)
router.get('/:id', CourseControllers.getSingleCourse);

// Update a course by ID (Only accessible by admin)
router.patch(
    '/:id',
    auth(USER_ROLE.ADMIN),
    validateRequest(CourseValidations.updateCourseValidationSchema),
    CourseControllers.updateCourse
);

// Delete a course by ID (Only accessible by admin)
router.delete('/:id', auth(USER_ROLE.ADMIN), CourseControllers.deleteCourse);

export const CourseRoutes = router;