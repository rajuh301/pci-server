import { QueryBuilder } from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { TStudent } from './user.interface';
import { Student } from './user.model';

import { generateVerificationCode } from '../../utils/generateCode';
import { sendVerificationEmail } from '../../utils/emailSender';
import { Admin } from '../Admin/admin.model';

const createStudent = async (payload: TStudent) => {
  const verificationCode = generateVerificationCode(); // Implement this function to generate a random code
  payload.verificationCode = verificationCode;
  payload.isVerified = false;

  const student = await Student.create(payload);

  await sendVerificationEmail(student.email, verificationCode);

  return student;
};


const verifyEmail = async (email: string, code: string) => {
  const student = await Student.findOne({ email });


  if (!student) {
    throw new Error('Student not found');
  }

  if (student.verificationCode !== code) {
    throw new Error('Invalid verification code');
  }

  student.isVerified = true;
  student.verificationCode = undefined;
  await student.save();

  return student;
};


const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(Student.find(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await Student.findById(id);

  return user;
};

export const UserServices = {
  createStudent,
  verifyEmail,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
