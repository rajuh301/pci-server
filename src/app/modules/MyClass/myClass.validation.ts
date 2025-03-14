// src/app/modules/MyClass/myClass.validation.ts

import { z } from 'zod';

// Validation schema for creating a class
const createMyClassValidationSchema = z.object({
    body: z.object({
        student: z.string({ required_error: 'Student ID is required' }),
        course: z.string({ required_error: 'Course ID is required' }),
        enrollment: z.string({ required_error: 'Enrollment ID is required' }),
        classDetails: z.object({
            title: z.string({ required_error: 'Class title is required' }),
            description: z.string({ required_error: 'Class description is required' }),
            date: z.string({ required_error: 'Class date is required' }),
            duration: z.number({ required_error: 'Class duration is required' }).min(1),
        }),
    }),
});

export const MyClassValidations = {
    createMyClassValidationSchema,
};