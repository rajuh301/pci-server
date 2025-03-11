
export const generateVerificationCode = (): string => {
    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
};