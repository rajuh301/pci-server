
import { Types } from 'mongoose';

export type TCourse = {
    title: string;
    description: string;
    instructor: Types.ObjectId; // Reference to the User (instructor)
    duration: number; // Duration in hours
    isClass: number;
    videoUrls: string[];
    price: number;
    startDate: Date;
    endDate: Date;
    enrolledStudents?: Types.ObjectId[]; // Array of enrolled students (references to User)
    isActive: boolean;
};

export type TCourseFilters = {
    searchTerm?: string;
    isClass?: number;
    minPrice?: number;
    maxPrice?: number;
    startDate?: Date;
    endDate?: Date;
    isActive?: boolean;
};