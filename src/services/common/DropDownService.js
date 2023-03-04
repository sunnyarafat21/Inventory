const DropDownService = async (Request, DataModel, Projection) => {
    try {
        const UserEmail = Request.headers.email;
        const data = await DataModel.aggregate([
            { $match: { UserEmail } },
            { $project: Projection },
        ]);
        return { status: 'success', data };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
};
module.exports = DropDownService;
