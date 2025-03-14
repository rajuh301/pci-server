// src/app/modules/MyClass/myClass.model.ts

import { Schema, model } from 'mongoose';
import { TMyClass } from './myClass.interface';

const MyClassSchema = new Schema<TMyClass>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model (Student)
            required: [true, 'Student is required'],
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course', // Reference to the Course model
            required: [true, 'Course is required'],
        },
        enrollment: {
            type: Schema.Types.ObjectId,
            ref: 'Enrollment', // Reference to the Enrollment model
            required: [true, 'Enrollment is required'],
        },
        classDetails: {
            title: {
                type: String,
                required: [true, 'Class title is required'],
            },
            description: {
                type: String,
                required: [true, 'Class description is required'],
            },
            date: {
                type: Date,
                required: [true, 'Class date is required'],
            },
            duration: {
                type: Number,
                required: [true, 'Class duration is required'],
                min: [1, 'Duration must be at least 1 minute'],
            },
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Create the MyClass model
export const MyClass = model<TMyClass>('MyClass', MyClassSchema);