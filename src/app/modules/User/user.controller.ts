import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import { Admin } from '../Admin/admin.model';

const studentRegister = catchAsync(async (req, res) => {
  const user = await UserServices.createStudent(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Created Successfully',
    data: user,
  });
});

const verifyEmail = catchAsync(async (req, res) => {
  const { email, code } = req.body;

  const student = await UserServices.verifyEmail(email, code);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Email verified successfully',
    data: student,
  });
});


const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users Retrieved Successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved Successfully',
    data: user,
  });
});

export const UserControllers = {
  getSingleUser,
  verifyEmail,
  studentRegister,
  getAllUsers
};
