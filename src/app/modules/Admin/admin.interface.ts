/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { ADMIN_ROLE, Admin_STATUS } from './admin.constant';
import { USER_ROLE, USER_STATUS } from '../User/user.constant';

export type TAdmin = {
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

export interface IAdminModel extends Model<TAdmin> {
    isAdminExistsByEmail(email: string): Promise<TAdmin | null>;
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string
    ): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number
    ): boolean;
}
