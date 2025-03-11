import { USER_ROLE } from '../User/user.constant';

export type TLoginUser = {
  email: string;
  password: string;
};

export type TRegisterStudent = {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  role: keyof typeof USER_ROLE;
  address: string;
  trcCardNumber: string;
  trcValidity: string; // Should follow the YYYY-MM-DD format
  passport: string;
  nidNumber: string;
  paymentMethodSelection: string;
  transactionID: string;
  profilePhoto?: string; // Optional field
};



