/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE, USER_STATUS } from './user.constant';

export type TStudent = {
  phoneNumber: any;
  _id?: string;
  name: string;
  role: keyof typeof USER_ROLE;
  email: string;
  password: string;
  status: keyof typeof USER_STATUS;
  passwordChangedAt?: Date;
  profilePhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
  verificationCode?: string; // New field
  isVerified?: boolean; // New field
};

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  mobileNumber?: string;
  role: 'ADMIN' | 'STUDENT'; 
};

export interface IstudentModel extends Model<TStudent> {
  isUserExistsByEmail(email: string): Promise<TStudent | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}




