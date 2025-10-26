
import { Schema, model } from 'mongoose';
import { TCourse } from './course.interface';

const CourseSchema = new Schema<TCourse>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
        },
        instructor: {
            type: Schema.Types.ObjectId,
            ref: 'Admin', // Reference to the User model (instructor)
            required: [true, 'Instructor is required'],
        },
        duration: {
            type: Number,
            required: [true, 'Duration is required'],
            min: [1, 'Duration must be at least 1 hour'],
        },

        isClass: {
            type: Number,
            required: [true, 'Class is required'],
            trim: true,
        },

        videoUrls: {
            type: [String],
            required: [true, "At least one video URL is required"],
        },


        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required'],
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required'],
            validate: {
                validator: function (value: Date) {
                    return value > this.startDate; // Ensure end date is after start date
                },
                message: 'End date must be after start date',
            },
        },
        enrolledStudents: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User', // Reference to the User model (students)
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Create the Course model
export const Course = model<TCourse>('Course', CourseSchema);