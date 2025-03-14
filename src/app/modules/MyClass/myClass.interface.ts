// src/app/modules/MyClass/myClass.interface.ts

import { Types } from 'mongoose';

export type TMyClass = {
    student: Types.ObjectId; // Reference to the Student (User)
    course: Types.ObjectId; // Reference to the Course
    enrollment: Types.ObjectId; // Reference to the Enrollment
    classDetails: {
        title: string;
        description: string;
        date: Date;
        duration: number; // Duration in minutes
    };
};