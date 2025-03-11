export const ADMIN_ROLE = {
  ADMIN: 'ADMIN',
  USER: 'STUDENT',
} as const;

export const Admin_STATUS = {
  ACTIVE: 'ACTIVE',
  BLOCKED: 'BLOCKED',
} as const;

export const AdminSearchableFields = [
  'name',
  'email',
  'phone',
  'role',
  'status',
];
