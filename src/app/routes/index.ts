import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { EnrollmentRoutes } from '../modules/Enrollment/enrollment.route';
import { MyClassRoutes } from '../modules/MyClass/myClass.route';
import { PaymentRoutes } from '../modules/Payment/payment.route';



const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },

  {
    path: '/users',
    route: UserRoutes,
  },

  {
    path: '/admin',
    route: AdminRoutes,
  },

  {
    path: '/course',
    route: CourseRoutes,
  },

  {
    path: '/enrollment',
    route: EnrollmentRoutes,
  },

 
  {
    path: '/myClass',
    route: MyClassRoutes,
  },
 
  {
    path: '/payment',
    route: PaymentRoutes,
  },




];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
