// src/app/modules/Enrollment/enrollment.controller.ts

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrollmentServices } from './enrollment.service';

// Create a new enrollment

const createEnrollment = catchAsync(async (req: Request, res: Response) => {
    const enrollmentData = req.body;
    const result = await EnrollmentServices.createEnrollment(enrollmentData);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Enrollment created successfully!',
        data: result,
    });
});




const approvedStudent = catchAsync(async (req: Request, res: Response) => {
    const { student, status } = req.body;

    if (status !== 'APPROVED') {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Invalid status. Only "APPROVED" is allowed.',
        });
    }

    const result = await EnrollmentServices.approvedStudent(student);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student approved successfully!',
        data: result,
    });
});


const rejectStudent = catchAsync(async (req: Request, res: Response) => {
    const { student, status } = req.body;

    if (status !== 'APPROVED' && status !== 'REJECTED') {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Invalid status. Only "APPROVED or REJECTED" is allowed.',
        });
    }

    const result = await EnrollmentServices.rejectStudent(student);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student Rejected successfully!',
        data: result,
    });
});




const getAllEnrollments = catchAsync(async (req: Request, res: Response) => {
    const result = await EnrollmentServices.getAllEnrollments();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Enrollments retrieved successfully!',
        data: result,
    });
});

// Get a single enrollment by ID
const getSingleEnrollment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await EnrollmentServices.getSingleEnrollment(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Enrollment retrieved successfully!',
        data: result,
    });
});

// Update an enrollment by ID
const updateEnrollment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await EnrollmentServices.updateEnrollment(id, updateData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Enrollment updated successfully!',
        data: result,
    });
});

// Delete an enrollment by ID
const deleteEnrollment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await EnrollmentServices.deleteEnrollment(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Enrollment deleted successfully!',
        data: result,
    });
});



const getMyEnrollment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await EnrollmentServices.getMyEnrollment(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get my Enrollment successfully!',
        data: result,
    });
});




export const EnrollmentControllers = {
    createEnrollment,
    getAllEnrollments,
    getSingleEnrollment,
    updateEnrollment,
    deleteEnrollment,
    approvedStudent,
    getMyEnrollment,
    rejectStudent
};