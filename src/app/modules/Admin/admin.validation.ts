import { z } from 'zod';
import { ADMIN_ROLE, Admin_STATUS } from './admin.constant';

const createAdminValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        role: z.nativeEnum(ADMIN_ROLE).default(ADMIN_ROLE.ADMIN),
        email: z
            .string({
                required_error: 'Email is required',
            })
            .email({
                message: 'Invalid email',
            }),
        password: z.string({
            required_error: 'Password is required',
        }),

        status: z.nativeEnum(Admin_STATUS).default(Admin_STATUS.ACTIVE),


    }),
});

const updateAdminValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        role: z.nativeEnum(ADMIN_ROLE).optional(),
        email: z.string().email().optional(),
        password: z.string().optional(),
        status: z.nativeEnum(Admin_STATUS).optional(),
        phoneNumber: z.string().optional(),
        address: z.string().optional(),

    }),
});



const verifyEmailValidationSchema = z.object({
    body: z.object({
      email: z.string().email(),
      code: z.string(),
    }),
  });


export const AdminValidation = {
    createAdminValidationSchema,
    updateAdminValidationSchema,
    verifyEmailValidationSchema
};
