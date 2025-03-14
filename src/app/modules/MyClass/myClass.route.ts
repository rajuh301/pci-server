// src/app/modules/MyClass/myClass.route.ts

import express from 'express';
import { MyClassControllers } from './myClass.controller';
import { USER_ROLE } from '../User/user.constant';
import authStudent from '../../middlewares/auth.student';

const router = express.Router();



router.get('/:studentId', authStudent(USER_ROLE.STUDENT),
    MyClassControllers.getMyClasses);


export const MyClassRoutes = router;






