// src/app/modules/Enrollment/enrollment.validation.ts

import { z } from 'zod';

// Validation schema for creating an enrollment
const createEnrollmentValidationSchema = z.object({
    body: z.object({
        student: z.string({ required_error: 'Student ID is required' }),
        course: z.string({ required_error: 'Course ID is required' }),
        paymentAmount: z.string({ required_error: 'Payment amount is required' }),
        paymentBank: z.string({ required_error: 'Payment bank is required' }),
        screenShort: z.string({ required_error: 'Screen Short is required' }),
        status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
    }),
});

// Validation schema for updating an enrollment
const updateEnrollmentValidationSchema = z.object({
    body: z.object({
        status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
    }),
});

export const EnrollmentValidations = {
    createEnrollmentValidationSchema,
    updateEnrollmentValidationSchema,
};