// src/app/modules/Course/course.service.ts

import { TCourse, TCourseFilters } from './course.interface';
import { Course } from './course.model';
import { QueryBuilder } from '../../builder/QueryBuilder';

// Create a new course
const createCourse = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

// Get all courses with filtering, sorting, and pagination
const getAllCourses = async (filters: TCourseFilters) => {
  const courseQuery = new QueryBuilder(Course.find(), filters)
    .search(['title', 'description'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery.populate('instructor');
  return result;


};





// Get a single course by ID
const getSingleCourse = async (id: string) => {
  const result = await Course.findById(id).populate('instructor')
  // .populate('instructor', 'name email') // Populate instructor details
  // .populate('enrolledStudents', 'name email'); // Populate enrolled students
  return result;
};

// Update a course by ID
const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const result = await Course.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};




// Push video link(s) into videoUrls array
const uploadclass = async (id: string, videoUrls: string | string[]) => {
  const urlsToAdd = Array.isArray(videoUrls) ? videoUrls : [videoUrls];

  const result = await Course.findByIdAndUpdate(
    id,
    { $push: { videoUrls: { $each: urlsToAdd } } },
    { new: true, runValidators: true }
  );

  return result;
};


// Delete a course by ID
const deleteCourse = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);
  return result;
};

export const CourseServices = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  uploadclass
};