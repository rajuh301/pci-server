import httpStatus from 'http-status';
import config from '../../config';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { catchAsync } from '../../utils/catchAsync';
import { generateVerificationCode } from '../../utils/generateCode';
import { sendVerificationEmail } from '../../utils/emailSender';

const registerStudent = catchAsync(async (req, res) => {
  const { email } = req.body;

  // Generate a verification code
  const verificationCode = generateVerificationCode();

  // Save the verification code in the database (optional)
  // For example, you can store it in the user document
  const result = await AuthServices.registerStudent({
    ...req.body,
    verificationCode, // Add the verification code to the payload
  });

  // Send the verification code via email
  await sendVerificationEmail(email, verificationCode);

  const { refreshToken, accessToken } = result;

  // Set the refresh token in the cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  // Send the response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully! Check your email for the verification code.',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student logged in successfully!',
    data: {
      accessToken,
      refreshToken,
    },
  });
});


const loginAdmin = catchAsync(async (req, res) => {
  const result = await AuthServices.loginAdmin(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin logged in successfully!',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated successfully!',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token retrieved successfully!',
    data: result,
  });
});

export const AuthControllers = {
  registerStudent,
  loginUser,
  loginAdmin,
  changePassword,
  refreshToken,
};
