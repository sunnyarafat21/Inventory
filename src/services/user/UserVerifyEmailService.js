const OTPSModel = require('../../models/Users/OTPSModel');
const SendEmailUtility = require('../../utility/SendEmailUtility');

const UserVerifyEmailService = async (Request, DataModel) => {
    try {
        // Email Account Query
        const { email } = Request.params;
        const OTPCode = Math.floor(100000 + Math.random() * 900000);

        // Database First process
        const UserCount = await DataModel.aggregate([{ $match: { email } }, { $count: 'total' }]);

        if (UserCount.length > 0) {
            // OTP Insert

            // Database Second process
            await OTPSModel.create({ email, otp: OTPCode });

            // Email Send
            const SendEmail = await SendEmailUtility(
                email,
                `Your PIN Code is= ${OTPCode}`,
                'Inventory PIN Verification'
            );

            return { status: 'success', data: SendEmail };
        }

        return { status: 'fail', data: 'No User Found' };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
};
module.exports = UserVerifyEmailService;
