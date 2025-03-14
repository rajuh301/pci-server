// src/app/modules/Enrollment/enrollment.interface.ts

import { Types } from 'mongoose';

export type TEnrollment = {
  student: Types.ObjectId; // Reference to the Student (User)
  course: Types.ObjectId; // Reference to the Course
  enrollmentDate: Date;

  paymentAmount: string;
  paymentBank: string;
  screenShort: string

  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};