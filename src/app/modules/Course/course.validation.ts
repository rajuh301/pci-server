// src/app/modules/Course/course.validation.ts

import { z } from 'zod';

// Validation schema for creating a course
const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string({ required_error: 'Title is required' }),
        description: z.string({ required_error: 'Description is required' }),
        instructor: z.string({ required_error: 'Instructor is required' }),
        duration: z.number({ required_error: 'Duration is required' }).min(1),
        price: z.number({ required_error: 'Price is required' }).min(0),
        startDate: z.string({ required_error: 'Start date is required' }),
        endDate: z.string({ required_error: 'End date is required' }),
        isActive: z.boolean().optional(),
    }),
});

// Validation schema for updating a course
const updateCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        instructor: z.string().optional(),
        duration: z.number().min(1).optional(),
        price: z.number().min(0).optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        isActive: z.boolean().optional(),
    }),
});

export const CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
};