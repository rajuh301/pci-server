import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_APP_PASS,
  },
});

export const sendVerificationEmail = async (email: string, code: string) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'Email Verification',
    text: `Your verification code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
};