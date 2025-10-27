import { TPayment } from "./payment.interface";
import { Payment } from "./payment.model";

const createPayment = async (payload: TPayment) => {
    const result = await Payment.create(payload);
    return result;
};


const getPayment = async () => {
    const result = await Payment.find()
    .populate('userId')
    .populate('courseId');
    return result;
};




export const PaymentServices = {
    createPayment,
    getPayment
};