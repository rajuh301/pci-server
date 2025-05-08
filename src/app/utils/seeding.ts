/* eslint-disable no-console */
import config from '../config';
import { Admin } from '../modules/Admin/admin.model';
import { USER_ROLE, USER_STATUS } from '../modules/User/user.constant';

export const seed = async () => {
  try {
    const admin = await Admin.findOne({
      role: USER_ROLE.ADMIN,
      email: config.admin_email,
      status: USER_STATUS.ACTIVE,
    });

    if (!admin) {
      console.log('Seeding started...');

      await Admin.create({
        name: 'Admin',
        role: USER_ROLE.ADMIN,
        email: config.admin_email,
        password: config.admin_password,
        profilePhoto: config.admin_profile_photo,
        status: USER_STATUS.ACTIVE,
      });

      console.log('✅ Admin created successfully...');
      console.log('✅ Seeding completed...');
    } else {
      console.log('ℹ️ Admin already exists...');
    }
  } catch (error) {
    console.log('❌ Error in seeding:', error);
  }
};
