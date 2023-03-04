const ExpensesModel = require('../../models/Expenses/ExpensesModel');

const ExpenseReportService = async (Request) => {
    try {
        const UserEmail = Request.headers.email;
        const { FormDate } = Request.body;
        const { ToDate } = Request.body;

        const data = await ExpensesModel.aggregate([
            {
                $match: {
                    UserEmail,
                    CreatedDate: { $gte: new Date(FormDate), $lte: new Date(ToDate) },
                },
            },
            {
                $facet: {
                    Total: [
                        {
                            $group: {
                                _id: 0,
                                TotalAmount: { $sum: '$Amount' },
                            },
                        },
                    ],
                    Rows: [
                        {
                            $lookup: {
                                from: 'expensetypes',
                                localField: 'TypeID',
                                foreignField: '_id',
                                as: 'Type',
                            },
                        },
                    ],
                },
            },
        ]);

        return { status: 'success', data };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
};
module.exports = ExpenseReportService;
