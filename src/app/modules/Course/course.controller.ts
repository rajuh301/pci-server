// src/app/modules/Course/course.controller.ts

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';
import { catchAsync } from '../../utils/catchAsync';

// Create a new course
const createCourse = catchAsync(async (req: Request, res: Response) => {
    const courseData = req.body;
    const result = await CourseServices.createCourse(courseData);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Course created successfully!',
        data: result,
    });
});

// Get all courses
const getAllCourses = catchAsync(async (req: Request, res: Response) => {
    const filters = req.query;
    const result = await CourseServices.getAllCourses(filters);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses retrieved successfully!',
        data: result,
    });
});

// Get a single course by ID
const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseServices.getSingleCourse(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course retrieved successfully!',
        data: result,
    });
});

// Update a course by ID
const updateCourse = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;
    const result = await CourseServices.updateCourse(id, updateData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course updated successfully!',
        data: result,
    });
});

// Delete a course by ID
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourse(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course deleted successfully!',
        data: result,
    });
});

export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteCourse,
};