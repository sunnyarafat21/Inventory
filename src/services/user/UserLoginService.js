const CreateToken = require('../../utility/CreateToken');

const UserLoginService = async (Request, DataModel) => {
    try {
        const data = await DataModel.aggregate([
            { $match: Request.body },
            {
                $project: {
                    _id: 0,
                    email: 1,
                    firstName: 1,
                    lastName: 1,
                    mobile: 1,
                    photo: 1,
                },
            },
        ]);
        if (data.length > 0) {
            const token = await CreateToken(data[0].email);
            return { status: 'success', token, data: data[0] };
        }

        return { status: 'unauthorized' };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
};
module.exports = UserLoginService;
