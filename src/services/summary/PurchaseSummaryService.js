const PurchasesModel = require('../../models/Purchases/PurchasesModel');

const PurchaseSummaryService = async (Request) => {
    try {
        const UserEmail = Request.headers.email;

        const data = await PurchasesModel.aggregate([
            { $match: { UserEmail } },
            {
                $facet: {
                    Total: [
                        {
                            $group: {
                                _id: 0,
                                TotalAmount: { $sum: '$GrandTotal' },
                            },
                        },
                    ],
                    Last30Days: [
                        {
                            $group: {
                                _id: {
                                    $dateToString: { format: '%Y-%m-%d', date: '$CreatedDate' },
                                },
                                TotalAmount: { $sum: '$GrandTotal' },
                            },
                        },
                        { $sort: { _id: -1 } },
                        { $limit: 30 },
                    ],
                },
            },
        ]);

        return { status: 'success', data };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
};
module.exports = PurchaseSummaryService;
