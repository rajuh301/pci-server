/* eslint-disable no-useless-escape */
import bcryptjs from 'bcryptjs';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { USER_ROLE, USER_STATUS } from '../User/user.constant';
import { IAdminModel, TAdmin } from './admin.interface';

const adminSchema = new Schema<TAdmin, IAdminModel>(
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

// Pre-save hook to hash the password
adminSchema.pre('save', async function (next) {
  const admin = this; // Current document being saved

  // Only hash the password if it has been modified (or is new)
  if (!admin.isModified('password')) {
    return next();
  }

  // Ensure the password is defined
  if (!admin.password) {
    return next(new Error('Password is required'));
  }

  try {
    // Hash the password
    admin.password = await bcryptjs.hash(
      admin.password, // Plain text password
      Number(config.bcrypt_salt_rounds) // Salt rounds
    );
    next();
  } catch (error:any) {
    next(error);
  }
});

// Post-save hook to clear the password field
adminSchema.post('save', function (doc, next) {
  doc.password = ''; // Clear password field after save
  next();
});

// Static method to check if the admin exists by email
adminSchema.statics.isAdminExistsByEmail = async function (email: string) {
  return await Admin.findOne({ email }).select('+password');
};

// Static method to compare passwords
adminSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcryptjs.compare(plainTextPassword, hashedPassword);
};

// Static method to verify if JWT was issued before the password change
adminSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: number,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

// Static method to verify email using verification code
adminSchema.statics.verifyEmail = async function (email: string, code: string) {
  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new Error('Admin not found');
  }

  if (admin.verificationCode !== code) {
    throw new Error('Invalid verification code');
  }

  // Use findOneAndUpdate to avoid triggering the pre('save') hook
  const updatedAdmin = await Admin.findOneAndUpdate(
    { email },
    { isVerified: true, verificationCode: undefined },
    { new: true } // Return the updated document
  );

  return updatedAdmin;
};

export const Admin = model<TAdmin, IAdminModel>('Admin', adminSchema);