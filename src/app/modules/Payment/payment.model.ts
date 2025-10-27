
import { Schema, model } from 'mongoose';
import { TPayment } from './payment.interface';

const PaymentSchema = new Schema<TPayment>(
    {
        courseId: {
            type: Schema.Types.ObjectId,
            required: [true, 'Course ID is required'],
            ref: "Course"
        },
        coursePrice: {
            type: Number,
            required: [true, 'Course Price is required'],
        },

        paymentMethod: {
            type: String,
            required: [true, 'payment Methord is required'],
        },

        transactionId: {
            type: String,
            required: [true, 'Transaction Id is required'],
        },

        userId: {
            type: Schema.Types.ObjectId,
            required: [true, 'User ID is required'],
            ref: "Student"
        },


    },
    {
        timestamps: true,
    }
);

// Create the Course model
export const Payment = model<TPayment>('Payment', PaymentSchema);