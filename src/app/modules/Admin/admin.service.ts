import { sendVerificationEmail } from "../../utils/emailSender";
import { generateVerificationCode } from "../../utils/generateCode";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const createAdmin = async (payload: TAdmin) => {
  // Check if admin already exists by email
  const existingAdmin = await Admin.isAdminExistsByEmail(payload.email);
  if (existingAdmin) {
    throw new Error('Admin with this email already exists');
  }
  const verificationCode = generateVerificationCode(); // Implement this function to generate a random code
  payload.verificationCode = verificationCode;
  payload.isVerified = false;


  const admin = await Admin.create(payload);
  await sendVerificationEmail(admin.email, verificationCode);

  return admin;
};


const verifyAdminEmail = async (email: string, code: string) => {
  const admin = await Admin.findOne({ email });


  if (!admin) {
    throw new Error('Admin not found');
  }

  if (admin.verificationCode !== code) {
    throw new Error('Invalid verification code');
  }

  admin.isVerified = true;
  admin.verificationCode = undefined;
  await admin.save();

  return admin;
};


export const AdminServices = {
  createAdmin,
  verifyAdminEmail
};
