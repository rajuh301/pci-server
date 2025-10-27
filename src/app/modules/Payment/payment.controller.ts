import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { PaymentServices } from "./payment.service";


const createPayment = catchAsync(async (req: Request, res: Response) => {
    const paymentData = req.body;
    const result = await PaymentServices.createPayment(paymentData);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Submit payment successfully!',
        data: result,
    });
});


const getPayment = catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentServices.getPayment();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Payment retrieved successfully!',
        data: result,
    });
});



export const PaymentControllers = {
    createPayment,
    getPayment

};