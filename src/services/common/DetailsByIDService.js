const mongoose = require('mongoose');

const DetailsByIDService = async (Request, DataModel) => {
    try {
        const DetailsID = Request.params.id;
        const UserEmail = Request.headers.email;

        const { ObjectId } = mongoose.Types;
        const QueryObject = {};
        QueryObject._id = ObjectId(DetailsID);
        QueryObject.UserEmail = UserEmail;
        const data = await DataModel.aggregate([{ $match: QueryObject }]);
        return { status: 'success', data };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
};
module.exports = DetailsByIDService;
