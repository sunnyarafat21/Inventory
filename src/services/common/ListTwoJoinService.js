const ListTwoJoinService = async (Request, DataModel, SearchArray, JoinStage1, JoinStage2) => {
    try {
        const pageNo = Number(Request.params.pageNo);
        const perPage = Number(Request.params.perPage);
        const searchValue = Request.params.searchKeyword;
        const UserEmail=Request.headers['email'];
        const skipRow = (pageNo - 1) * perPage;
        let data;
        if (searchValue !== '0') {
            data = await DataModel.aggregate([
                {  $match: { UserEmail: UserEmail }  },
                JoinStage1, JoinStage2,
                {  $match: { $or: SearchArray }  },
                {
                    $facet: {
                        Total:  [{ $count: 'count'  }],
                        Rows:  [{ $skip: skipRow }, { $limit: perPage  }],
                    },
                },
            ]);;
        } else {
            data = await DataModel.aggregate([
                {  $match: { UserEmail: UserEmail }  },
                JoinStage1, JoinStage2,
                {
                    $facet:  {
                        Total: [{ $count: 'count'  }],
                        Rows: [{ $skip: skipRow }, { $limit: perPage  }],
                    },
                },
            ]);;
        }
        return {  status: 'success', data: data };;
    } catch (error) {
        return {  status: 'fail', data: error.toString() };;
    }
};
module.exports = ListTwoJoinService
