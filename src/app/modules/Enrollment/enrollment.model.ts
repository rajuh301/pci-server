// src/app/modules/Enrollment/enrollment.model.ts

import { Schema, model } from 'mongoose';
import { TEnrollment } from './enrollment.interface';

const EnrollmentSchema = new Schema<TEnrollment>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Student is required'],



    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course', // Reference to the Course model
      required: [true, 'Course is required'],
    },
    enrollmentDate: {
      type: Date,
      default: Date.now, // Default to the current date
    },


    paymentAmount: {
      type: String,
      required: [true, "Input payment amount"]
    },

    paymentBank: {
      type: String,
      required: [true, "Input bank name"]
    },

    screenShort: {
      type: String,
      required: [true, "Input payment screen short"]
    },


    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the Enrollment model
export const Enrollment = model<TEnrollment>('Enrollment', EnrollmentSchema);