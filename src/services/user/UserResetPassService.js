const OTPSModel = require('../../models/Users/OTPSModel');

const UserResetPassService = async (Request, DataModel) => {
    const { email } = Request.body;
    const OTPCode = Request.body.OTP;
    const NewPass = Request.body.password;
    const statusUpdate = 1;

    try {
        // Database First Process
        const OTPUsedCount = await OTPSModel.aggregate([
            { $match: { email, otp: OTPCode, status: statusUpdate } },
            { $count: 'total' },
        ]);

        if (OTPUsedCount.length > 0) {
            // Database Second Process
            const PassUpdate = await DataModel.updateOne({ email }, { password: NewPass });
            return { status: 'success', data: PassUpdate };
        }

        return { status: 'fail', data: 'Invalid Request' };
    } catch (e) {
        return { status: 'fail', data: error.toString() };
    }
};
module.exports = UserResetPassService;
