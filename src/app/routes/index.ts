import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { CourseRoutes } from '../modules/Course/course.route';



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




];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
