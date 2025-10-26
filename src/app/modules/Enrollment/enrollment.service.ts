// src/app/modules/Enrollment/enrollment.service.ts

import { QueryBuilder } from '../../builder/QueryBuilder';
import { TEnrollment } from './enrollment.interface';
import { Enrollment } from './enrollment.model';

// Create a new enrollment
const createEnrollment = async (payload: TEnrollment) => {
    const result = await Enrollment.create(payload);
    return result;
};

// Get all enrollments with filtering, sorting, and pagination
// const getAllEnrollments = async (filters: Record<string, unknown>) => {
//     const enrollmentQuery = new QueryBuilder(Enrollment.find(), filters)
//         .search(['status'])
//         .filter()
//         .sort()
//         .paginate()
//         .fields();

//     const result = await enrollmentQuery.modelQuery
//         .populate('student', 'name email') // Populate student details
//         .populate('course', 'title description'); // Populate course details

//     return result;
// };



const getAllEnrollments = async () => {
    const result = await Enrollment.find().populate('student');;
    return result;
};


// Get a single enrollment by ID
const getSingleEnrollment = async (id: string) => {
    const result = await Enrollment.find({ student: id })
        .populate('student') // Populate student details
        .populate('course'); // Populate course details
    return result;
};

// Update an enrollment by ID
const updateEnrollment = async (id: string, payload: Partial<TEnrollment>) => {
    const result = await Enrollment.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

// Delete an enrollment by ID
const deleteEnrollment = async (id: string) => {
    const result = await Enrollment.findByIdAndDelete(id);
    return result;
};



const approvedStudent = async (_id: string) => {
    const result = await Enrollment.findOneAndUpdate(
        { _id: _id },
        { status: 'APPROVED' },
        { new: true } // Returns the updated document
    );

    return result;
};



const getMyEnrollment = async (studentId: string) => {
    const result = await Enrollment.find({ student: studentId })
        .populate('student') // Populate student details
        .populate('course'); // Populate course details
    return result;
};


export const EnrollmentServices = {
    createEnrollment,
    getAllEnrollments,
    getSingleEnrollment,
    updateEnrollment,
    deleteEnrollment,
    approvedStudent,
    getMyEnrollment
};