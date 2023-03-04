const CreateService = async (Request, DataModel) => {
    try {
        const PostBody = Request.body;
        PostBody.UserEmail = Request.headers.email;

        const data = await DataModel.create(PostBody);
        return { status: 'success', data };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
};
module.exports = CreateService;
