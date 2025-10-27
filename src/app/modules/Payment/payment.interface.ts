import { Types } from "mongoose";


export type TPayment = {
    courseId: Types.ObjectId; // Reference to the Student (User)
    coursePrice: number;
    paymentMethod: string;
    transactionId: string;
    userId: Types.ObjectId; // Reference to the Course......
}