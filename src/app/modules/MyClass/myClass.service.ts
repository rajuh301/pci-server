// src/app/modules/MyClass/myClass.service.ts

import { Enrollment } from '../Enrollment/enrollment.model';
import { TMyClass } from './myClass.interface';
import { MyClass } from './myClass.model';

// Update video links for a class
const updateVideoLinks = async (classId: string, videoLinks: string[]) => {
    const updatedClass = await MyClass.findByIdAndUpdate(
        classId,
        { 'classDetails.videoLinks': videoLinks },
        { new: true, runValidators: true }
    );

    if (!updatedClass) {
        throw new Error('Class not found');
    }

    return updatedClass;
};





const createClass = async (payload: TMyClass) => {
    const result = await MyClass.create(payload); // Create a new class
    return result;
  };


const getMyClasses = async (studentId: string) => {
    // Check if the student is approved
    const isApproved = await Enrollment.find({
        student: studentId,
        status: 'APPROVED',
    });

    if (!isApproved) {
        throw new Error('Access denied: Your enrollment is not approved.');
    }

    // Fetch classes where the student is enrolled
    const classes = await MyClass.find({ student: studentId })
        .populate('course', 'title description') // Populate course details
        .populate('enrollment', 'status'); // Populate enrollment status

    return classes;
};



export const MyClassService = {
    updateVideoLinks,
    getMyClasses,
    createClass
};