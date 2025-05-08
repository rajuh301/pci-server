/* eslint-disable no-useless-escape */
import bcryptjs from 'bcryptjs';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { USER_ROLE, USER_STATUS } from './user.constant';
import { IstudentModel, TStudent } from './user.interface';

const StudentSchema = new Schema<TStudent, IstudentModel>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.keys(USER_ROLE),
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    status: {
      type: String,
      enum: Object.keys(USER_STATUS),
      default: USER_STATUS.ACTIVE,
    },
    passwordChangedAt: {
      type: Date,
    },
    profilePhoto: {
      type: String,
      default: null,
    },
    verificationCode: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  }
);

// Hash password only if it is modified
StudentSchema.pre('save', async function (next) {
  const user = this; // Current document being saved

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // Ensure the password is defined
  if (!user.password) {
    return next(new Error('Password is required'));
  }

  try {
    // Hash the password
    user.password = await bcryptjs.hash(
      user.password, // Plain text password
      Number(config.bcrypt_salt_rounds) // Salt rounds
    );
    next();
  } catch (error:any) {
    next(error);
  }
});

// Set password to empty string after saving (for security)
StudentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Static method to check if a user exists by email
StudentSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await Student.findOne({ email }).select('+password');
};

// Static method to compare passwords
StudentSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcryptjs.compare(plainTextPassword, hashedPassword);
};

// Static method to check if JWT was issued before password change
StudentSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: number,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

// Static method to verify email using verification code
StudentSchema.statics.verifyEmail = async function (
  email: string,
  code: string
) {
  const student = await Student.findOne({ email });

  if (!student) {
    throw new Error('Student not found');
  }

  if (student.verificationCode !== code) {
    throw new Error('Invalid verification code');
  }

  // Mark the student as verified and clear the verification code
  student.isVerified = true;
  student.verificationCode = undefined;

  // Save the updated student document
  await student.save();

  return student;
};

export const Student = model<TStudent, IstudentModel>('Student', StudentSchema);


