// src/app/modules/MyClass/myClass.controller.ts

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { MyClassService } from './myClass.service';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Update video links for a class
const updateVideoLinks = catchAsync(async (req: Request, res: Response) => {
    const { classId } = req.params;
    const { videoLinks } = req.body;

    const result = await MyClassService.updateVideoLinks(classId, videoLinks);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Video links updated successfully!',
        data: result,
    });
});

const createClass = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await MyClassService.createClass(payload);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Class created successfully!',
        data: result,
    });
});


const getMyClasses = catchAsync(async (req: Request, res: Response) => {
    const { classId } = req.params;

    const result = await MyClassService.getMyClasses(classId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Retrive class successfully!',
        data: result,
    });
});

export const MyClassControllers = {
    updateVideoLinks,
    getMyClasses,
    createClass
};