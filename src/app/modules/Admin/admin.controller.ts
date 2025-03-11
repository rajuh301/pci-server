import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";
import { Admin } from "./admin.model";

const adminRegister = catchAsync(async (req, res) => {
    const user = await AdminServices.createAdmin(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Admin Created Successfully',
        data: user,
    });
});



  const verifyAdminEmail = catchAsync(async (req, res) => {
    const { email, code } = req.body;
  
    const student = await AdminServices.verifyAdminEmail(email, code);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Email verified successfully',
      data: student,
    });
  });

export const AdminControllers = {
    adminRegister,
    verifyAdminEmail
};
