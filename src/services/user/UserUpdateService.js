const UserUpdateService = async (Request, DataModel) => {
    try {
        const data = await DataModel.updateOne({ email: Request.headers.email }, Request.body);
        return { status: 'success', data };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
};
module.exports = UserUpdateService;
