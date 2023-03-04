const UserVerifyOtpService = async (Request, DataModel) => {
    try {
        const { email } = Request.params;
        const OTPCode = Request.params.otp;
        const status = 0;
        const statusUpdate = 1;

        // Database First Process
        const OTPCount = await DataModel.aggregate([
            { $match: { email, otp: OTPCode, status } },
            { $count: 'total' },
        ]);

        if (OTPCount.length > 0) {
            // Second Process
            const OTPUpdate = await DataModel.updateOne(
                { email, otp: OTPCode, status },
                { email, otp: OTPCode, status: statusUpdate }
            );
            return { status: 'success', data: OTPUpdate };
        }

        return { status: 'fail', data: 'Invalid OTP Code' };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
};
module.exports = UserVerifyOtpService;
